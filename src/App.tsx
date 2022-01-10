import React from 'react';
import Dash from "./dash"
import { Container } from "react-bootstrap"

function App() {
  return (
    <>
      <Container className='d-flex vh-100' style = {{minHeight: "100vh" }}>
        <div className='m-auto align-self-center' style={{ maxWidth: "400px" }}>
          < Dash />
        </div>
      </Container>
    </>
  )
}

export default App;
