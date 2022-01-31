import React, { useEffect, useState } from "react"
import { auth } from "./firebase"

const Home : React.FC = () =>
{

  const styles: { [key: string] : React.CSSProperties }  =
  {
    container:
    {
      // display: "flex",
      // justifyContent: "center",
      position: "absolute",
      top: "10%",
      left: "10%",
      right: "10%",
      bottom: 0,
      // transform: "translate(50%, 10%)",
      width: "80%",
      height: "90vh",
      backgroundColor: "#b3e6ff",
      // zIndex: -1,
    },
    nav:
    {
      display: "flex",
      position: "relative",
      left: "60%",
      // backgroundColor: "#3385ff",
      width: "30em",
    },
    navOption:
    {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // marginTop: "1.25em",
      // marginLeft: "2em",
      // backgroundColor: "#ffe6b3",
      position: "relative",
      width: "10em",
      height: "5em"
    }
  }

  const [loggedIn, setLogIn] = useState<boolean>(false)

  useEffect( () =>
  {
    if(auth.currentUser?.uid) setLogIn(() => true)

  }, [])


  return (
    <>
      <div style={ styles.nav }>
        <div style={ styles.navOption }>
          { !loggedIn && <p>Login</p> }
          { loggedIn && <p>Dashboard</p> }
        </div>
        <div style={ styles.navOption }>
          <p>Signup</p>
        </div>
      </div>
      <div style={ styles.container }>
        <div style={ styles.outer }>
          <div style={ styles.flexside }>
            <p> Allow us to Automate your calls and help you keep Track </p>

          </div>

          <div style={ styles.flexside }>

          </div>
        </div>
      </div>

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
