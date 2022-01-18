import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Dash from "./dash"
import Signup from "./Signup"
import Login from "./Login"
import PrivateRoute from './PrivateRoute'

function App() {
  const [data, setData] = useState<string>("")

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <>
      <div style={{ position:"absolute", top:"30px", left:"30px", fontFamily:"'Permanent Marker', cursive"}}>
        Bell calls
        <p>{!data ? "Loading..." : data}</p>
      </div>
      <Router>
        <Switch>

          <PrivateRoute exact path="/" component={ Dash } />
          <Route path="/signup" component={ Signup } />
          <Route path="/login" component={ Login } />

        </Switch>
      </Router>
    </>
  )
}

export default App;
