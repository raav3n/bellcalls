const path = require('path');
const express = require("express");
const cors = require("cors");
const router = express.Router();

require('dotenv').config({ path: path.resolve(__dirname, './client/.env.local') }); //{ path: path.resolve(__dirname, '../.env') }
const twilio_sid = process.env.TWILIO_ACCOUNT_SID; 
const twilio_token = process.env.TWILIO_AUTH_TOKEN; 
const twilio = require("twilio")(twilio_sid, twilio_token);


const PORT = process.env.PORT || 3001;

const app = express(express.static(path.resolve(__dirname, './client/build')));

// Configure Express to parse received requests with JSON payload
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({origin: 'http://localhost:3000'})); //change later

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


const callBackDomain = process.env.NGROK_URL;
const VoiceResponse = require('twilio').twiml.VoiceResponse;

app.get("/call", (req, res) => 
{
  res.json({ message: "Call here" });


  console.log("call");
//https://www.twilio.com/blog/amd-node-delivery-reminder
  twilio.calls.create
  ({
    machineDetection: 'DetectMessageEnd',
    asyncAmd: true,
    asyncAmdStatusCallback: callBackDomain + "/amd-callback",
    asyncAmdStatusCallbackMethod: "POST",
    twiml: "<Response><Say>.</Say><Pause length='30'/></Response>", //chnage length bc call takes like 2 minutes
    to: '+13234949031',
    from: process.env.TWILIO_PHONE_NUMBER,
    statusCallback: callBackDomain + "/status-callback",
    statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
    statusCallbackMethod: "POST"
  }).then(call => console.log(call)).done( () => console.log("complete"));
  
});

// Output call status
app.post("/status-callback", function (req, res) {
  console.log(`Call status changed: ${req.body.CallStatus}`);
  res.sendStatus(200);
});

// Process after AMD detection
app.post("/amd-callback", function (req, res) {
  const response = new VoiceResponse();

  if (req.body.AnsweredBy === 'human') 
  {
    // When a human answers the call
    console.log("Call picked up by human")
    // Update ongoing call and play delivery reminder message
    twilio.calls(req.body.CallSid)
      .update({twiml: `<Response><Pause length="1"/><Say>Answered by hooman</Say></Response>`})
      .catch(err => console.log(err));
  }
  else if(req.body.AnsweredBy === 'machine_start') 
  {
    response.say("Never gonna give you up ");
  }
  else  
  {
    // When an answering machine answers the call
    console.log("Call picked up by machine")
    // Update ongoing call and leave delivery reminder message on answering machine.
    twilio.calls(req.body.CallSid)
      .update({twiml: `<Response><Pause length="1"/><Say>Ima jump off a bridge if this didnt work.</Say><Pause length="1"/></Response>`})
      .catch(err => console.log(err));
    console.log("done");
  }
  res.sendStatus(200)
});

app.post("/", (req, res) =>
{
  //https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
  console.log(req.body);
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});