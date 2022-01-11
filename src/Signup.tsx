import React, { useRef, useState, useEffect } from 'react'
import { Card, Form, Alert, Button } from "react-bootstrap"
import firebase from 'firebase/app';
import { auth } from './firebase'

const Signup : React.FC = () =>
{
    let user : firebase.auth.UserCredential

    const [display, setDisplay] = useState<string>("password")
    const [display2, setDisplay2] = useState<string>("password")
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const showHide = (id : number) =>
    {
        const val = display === "text" ? "password" : "text"
        const val2 = display2 === "text" ? "password" : "text"

        if(id === 1) setDisplay(()=>val)  
        else setDisplay2(()=>val2)
    }

    const email_in = useRef<HTMLInputElement>(null)
    const pass_in = useRef<HTMLInputElement>(null)
    const pass_conf_in = useRef<HTMLInputElement>(null)

    const register = (e : React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault()

        const emailReg = /\S+@\S+\.\S+/ 
        const passReg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/

        if(email_in.current != null && pass_conf_in.current != null && pass_in.current != null)
        {
            //passwords do not match
            if(pass_in.current.value != pass_conf_in.current.value) setError(() => "Passwords do not match")
            else if( !(emailReg.test(email_in.current.value)) && email_in.current.value != "") setError(() => "Invalid email")
            else if( !(passReg.test(pass_in.current.value)) && pass_in.current.value != "" ) setError(() => "Password is not strong")
            else if( email_in.current.value != "" && pass_in.current.value != "" && pass_conf_in.current.value != "" && !error)
            {
                setLoading(true)
                console.log("working")

                auth.createUserWithEmailAndPassword(email_in.current.value, pass_in.current.value).then( (userCreds : firebase.auth.UserCredential) =>
                {
                    user = userCreds
                }).catch( (error : Error)  =>
                {
                    console.log("oopsies")
                })

                setLoading(false)
            }
            else setError( () => "")
        }
    }

    useEffect(() =>
    {
        email_in.current!.focus()
    }, [])


    return (
        <>
            <Card style={{width:'300px', height:"650px"}} >

                <Card.Body className='m-auto'>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    <Form onClick={ register }>
                        {error && <Alert variant='danger'>{ error }</Alert> }
                        <Form.Group className="mb-3" controlId="FormBasicEmail">
                            <Form.Label><strong>Email</strong></Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={email_in} required />
                            <Form.Text className="text-muted">We'll never share your email with anyone else. </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="FormBasicPassword">
                            <Form.Label><strong>Password</strong></Form.Label>
                            <Form.Control type={ display } placeholder="Enter password" ref={pass_in} required />
                            <span onClick={ () => showHide(1) } style={{ cursor: "pointer", userSelect: "none", fontSize: "15px" }}> { display==="text" && <p>HIDE</p> } { display==="password" && <p>SHOW</p> } </span>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="FormBasicPasswordConfirm">
                            <Form.Label><strong>Confirm Password</strong></Form.Label>
                            <Form.Control type={ display2 } placeholder="Enter password again" ref={pass_conf_in} required />
                            <span onClick={ () => showHide(2) } style={{ cursor: "pointer", userSelect: "none", fontSize: "15px" }}> { display2==="text" && <p>HIDE</p> } { display2==="password" && <p>SHOW</p> } </span>
                        </Form.Group>
                        <div>
                            <strong>Password Requirements</strong>
                            <ul>
                                <li>8 characters long</li>
                                <li>At least uppercase letter</li>
                                <li>At least lowercase letter</li>
                                <li>At least one number</li>
                                <li>At least one symbol</li>
                            </ul>
                        </div>
                        <Button disabled={ loading } type="submit" variant="primary" className='w-100' >Submit</Button>
                    </Form>

                </Card.Body>

            </Card>

            <div className='mt-3' style={{userSelect:"none", cursor:"pointer"}}>Already have an account? Log in</div>
        </>
    )
}

export default Signup
