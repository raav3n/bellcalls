import React, { useRef, useState, useEffect } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import firebase from "firebase/app"
import { auth } from './firebase'
import { Link, useHistory } from "react-router-dom"

const Login : React.FC = () =>
{
    let user : firebase.auth.UserCredential
    const history = useHistory()

    const email_in = useRef<HTMLInputElement>(null)
    const pass_in = useRef<HTMLInputElement>(null)

    const login = (e : React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault()

        setLoading(true)
        setError("")

        if(email_in.current ==null && pass_in.current == null ) setError("Please enter email and password to login")

        //login
        if(email_in.current != null && pass_in.current != null && !error)
        {
            auth.signInWithEmailAndPassword(email_in.current.value, pass_in.current.value).then( (userCreds : firebase.auth.UserCredential) => 
            {
                user = userCreds
                history.push("/")
            })
            .catch( (error : firebase.FirebaseError ) =>
            {
                setError("Email and/or password is incorrect")
                console.log(error.code)
                console.log(error.message)
            })
        }

        setLoading(false)
    }

    const [display, setDisplay] = useState<string>("password")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [loggedIn, setLoggedIn] = useState<boolean>(true)

    const showHide = () =>
    {
        const val = display === "text" ? "password" : "text"
        setDisplay(() => val)
    }

    useEffect(() =>
    {
        auth.onAuthStateChanged((user) =>
        {
            if(user) history.push("/")
            else 
            {
                setLoggedIn(false)
                email_in.current!.focus()
            }
        }) 

    }, [])
    
    return (
    <>
        <div className='d-flex align-items-center justify-content-center flex-column' style = {{minHeight: "100vh"}}>
            {!loggedIn && <Card style={{width:'350px', minHeight:"350px"}} >

                <Card.Body className='m-auto w-100'>
                    <h2 className='text-center mb-4'>Log In</h2>
                    <Form onSubmit={ login }>
                        {error && <Alert variant='danger'>{ error }</Alert> }
                        <Form.Group className="mb-3" controlId="FormBasicEmail">
                            <Form.Label><strong>Email</strong></Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={email_in} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="FormBasicPassword">
                            <Form.Label><strong>Password</strong></Form.Label>
                            <Form.Control type={ display } placeholder="Enter password" ref={pass_in} required />
                            <span onClick={ showHide } style={{ cursor: "pointer", userSelect: "none", fontSize: "15px" }}> { display==="text" && <p>HIDE</p> } { display==="password" && <p>SHOW</p> } </span>
                        </Form.Group>
                        
                        <div className="d-flex justify-content-center"><Button disabled={ loading } type="submit" variant="primary" style={{width:"150px"}} >Log in</Button></div>

                    </Form>

                </Card.Body>

            </Card> }

            <div className='mt-3' style={{userSelect:"none", cursor:"pointer"}}><Link to="/signup" style={{ textDecoration: 'none' }}> New here? Sign up </Link></div>
        </div>
    </>
    )
}


export default Login