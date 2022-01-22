const path = require('path');
const express = require("express");
const cors = require("cors");

//Initialize Firestore
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
initializeApp({  credential: cert(path.resolve(__dirname, './bellcalls-key.json')) });
const db = getFirestore();

//initialize Twilio
require('dotenv').config({ path: path.resolve(__dirname, './client/.env.local') });
const twilio_sid = process.env.TWILIO_ACCOUNT_SID;
const twilio_token = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio")(twilio_sid, twilio_token);

//PORT used
const PORT = process.env.PORT || 3001;

const app = express(express.static(path.resolve(__dirname, './client/build')));

// Configure Express to parse received requests with JSON payload
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//CORS configuration
app.use(cors({origin: 'http://localhost:3000', optionsSuccessStatus: 200})); //change later

//test get request
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


const callBackDomain = process.env.NGROK_URL;
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const { time } = require('console');

async function getTimestampValidation(uid)
{
  const doc = await db.collection(uid).doc("timestamp").get();
  const timestamp =doc.data().lastCall.toDate();
  const date = new Date();

  if(timestamp.getMonth() == date.getMonth() && timestamp.getDay() == date.getDay()) return false;
  else return true;
}

async function updateTimestamp(uid, car)
{
  const TimestampREF = db.collection(uid).doc("timestamp");
  const CarTrackerREF = db.collection(uid).doc(car);

  const res = await TimestampREF.update({ lastCall : FieldValue.serverTimestamp() });
  const res2 = await CarTrackerREF.update({ calledAlready : FieldValue.increment(1) }); //JSON.parse(carSel).calledAlready + 1
}

async function getAddress(uid)
{
  const addyRef = db.collection(uid).doc("address");

  const addy = await addyRef.get("address")
}

app.post("/", (req, res) =>
{
  //https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
  console.log(req.body);
  message = `Hello, the car is a ${req.body.color}, ${req.body.model}. The license plate is, ${req.body.plate}. The car will be staying overnight at 6810 bear ave. Thank you.`

  //https://www.twilio.com/blog/amd-node-delivery-reminder

  const timestamp = getTimestampValidation(req.body.uid);

  if(!timestamp)
  {
    res.sendStatus(403);
  }
  else
  {
    // twilio.calls.create
    // ({
    //   machineDetection: 'DetectMessageEnd',
    //   asyncAmd: true,
    //   asyncAmdStatusCallback: callBackDomain + "/amd-callback",
    //   asyncAmdStatusCallbackMethod: "POST",
    //   twiml: "<Response><Say>.</Say><Pause length='30'/></Response>", //little over a minute
    //   to: '+13234949031',
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   statusCallback: callBackDomain + "/status-callback",
    //   statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
    //   statusCallbackMethod: "POST"
    // }).then(call => console.log(call.sid)).done( () => res.sendStatus(200));
    res.sendStatus(200)

    //update timestamp for user
    updateTimestamp(req.body.uid, req.body.docName);
  }

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
      .update({twiml: `<Response><Pause length="2"/><Say>Answered by hooman</Say></Response>`})
      .catch(err => console.log(err));
  }
  else
  {
    // When an answering machine answers the call
    console.log("Call picked up by machine")
    // Update ongoing call and leave delivery reminder message on answering machine.
    twilio.calls(req.body.CallSid)
      .update({twiml: `<Response><Pause length="2"/><Say>${message}</Say><Pause length="1"/></Response>`})
      .catch(err => console.log(err));
    console.log("done");
  }
  res.sendStatus(200)
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
