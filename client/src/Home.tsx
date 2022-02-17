import React, { useEffect, useState } from "react"
import { auth } from "./firebase"
import { Link } from "react-router-dom"

const styles: { [key: string] : React.CSSProperties }  =
{
  container:
  {
    position: "relative",
    top: "10%",
    left: "10%",
    right: "10%",
    paddingBottom: "10em",
    // height: "0vh",
    // backgroundColor: "#b3e6ff",
  },
  nav:
  {
    display: "flex",
    position: "relative",
    right: "-70%",
    // backgroundColor: "#3385ff",
    width: "15em",
  },
  outer:
  {
    position: "relative",
    marginLeft: "7em",
    marginTop: "5em",
    display: "flex",
    gap: "15em"
  },
  navOption:
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "10em",
    height: "5em"
  },
  calling:
  {
    width: "16em",
  },
  blob:
  {
    position:"absolute",
    width: "80%",
    height: "90%",
    left:"32%",
    top: "2%"
  },
  section2:
  {
    position: "relative",
    height: "60vh",
    backgroundColor: "#B7E5EE"
  }
}

const Footer : React.FC = () =>
{

  return (
    <div style={ styles.section2 }>
      <h1 style={{fontFamily: "Carrois Gothic", fontSize: "3.5em", display:"flex", justifyContent:"center", paddingTop:"1em"}}>WHAT WE OFFER</h1>
    </div>
  )
}

const Home : React.FC = () =>
{
  document.title = "BellCalls | Home";

  const [loggedIn, setLogIn] = useState<boolean>(false)

  useEffect( () =>
  {
    if(auth.currentUser?.uid) setLogIn(() => true)

  }, [])


  return (
    <  >

      <svg style={styles.blob} id="10015.io" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor:"rgb(255, 241, 204)", stopOpacity:"1"}} />
            <stop offset="100%" style={{stopColor:"rgb(255, 214, 102)", stopOpacity:"1"}} />
          </linearGradient>
        </defs>
      	<path fill="url(#grad1)" d="M445.5,296Q415,352,368.5,385.5Q322,419,267,427.5Q212,436,173.5,398.5Q135,361,80.5,332Q26,303,54.5,248.5Q83,194,108.5,156Q134,118,176,104Q218,90,274,66Q330,42,383,78Q436,114,456,177Q476,240,445.5,296Z" />
      </svg>

      <div style={ styles.nav }>
        <div style={ styles.navOption }>
          { !loggedIn && <Link to="/signup" style={{ textDecoration: 'none' }}> <p style={{cursor:"pointer"}}>Signup</p> </Link> }
        </div>
        <div style={ styles.navOption }>
          { !loggedIn && <Link to="/login" style={{ textDecoration: 'none' }}> <p style={{cursor:"pointer"}}>Login</p> </Link> }
          { loggedIn && <Link to="/dash" style={{ textDecoration: 'none' }}> <p style={{cursor:"pointer"}}>Dashboard</p> </Link> }
        </div>
      </div>

      <div style={ styles.container }>

        <div style={ styles.outer }>

          <div style={ {...styles.flexside, ...styles.calling} }>
            <p style={ {fontFamily: "Arbutus Slab", fontSize:"3em"} }> Allow us to Automate your calls and help you keep Track </p>
          </div>

          <div style={ styles.flexside }>
            <img style= {{ width:"25em", alignSelf:"flex-end" }}src="/images/cityofbell.png" alt="city of bell"/>
          </div>

        </div>
      </div>

      <Footer />

      <div style={ styles.footer }>
      {/*
      footer mention for icons
      <a href="https://www.flaticon.com/free-icons/car" title="car icons">Car icons created by Freepik - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/phone" title="phone icons">Phone icons created by Gregor Cresnar - Flaticon</a>
      */}
      </div>
    </>

  )
}


export default Home
