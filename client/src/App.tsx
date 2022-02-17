import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Dash from "./dash"
import Signup from "./Signup"
import Login from "./Login"
import PrivateRoute from './PrivateRoute'
import Home from "./Home"

function App() {

  return (
    <>
      <div style={{ position:"absolute", top:"30px", left:"30px", fontFamily:"'Permanent Marker', cursive", fontSize:"20px"}}>
        Bell calls
      </div>
      <Router>
        <Switch>

          <Route exact path="/" component={ Home } />
          <PrivateRoute path="/dash" component={ Dash } />
          <Route path="/signup" component={ Signup } />
          <Route path="/login" component={ Login } />

        </Switch>
      </Router>
    </>
  )
}

export default App;
