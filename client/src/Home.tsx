import React, { useEffect, useState } from "react"
import { auth } from "./firebase"

const Home : React.FC = () =>
{

  const styles: { [key: string] : React.CSSProperties }  =
  {
    container:
    {
      position: "relative",
      width: "100%",
      height: "100vh",
      backgroundColor: "#b3e6ff",
      zIndex: -1,
    },
    nav:
    {
      display: "flex",
      position: "relative",
      left: "70%",
      backgroundColor: "#3385ff",
      width: "30em",
    },
    navOption:
    {
      marginTop: "1.25em",
      marginLeft: "2em",
    }
  }

  const [loggedIn, setLogIn] = useState<boolean>(false)

  useEffect( () =>
  {
    if(auth.currentUser?.uid) setLogIn(true)
  }, [])


  return (
    <>
      <div style={ styles.container }>
        <div style={ styles.nav }>
          <div style={ styles.navOption }>
            { !loggedIn && <p>Login</p> }
            { loggedIn && <p>Dashboard</p> }
          </div>
          <div style={ styles.navOption }>
            <p>Signup</p>
          </div>
        </div>


      </div>
    </>
  )
}


export default Home
