import React, { useState, useEffect } from 'react'
import Cars  from "./Cars"
import storage  from "./firebase"
import { auth } from "./firebase"
import firebase from 'firebase/app';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom"
import AddCar from "./AddCar"

export interface IState
{
    cars : 
    {
        model :string,
        color : string,
        plate ?: string,
    }[]
}


const Dash : React.FC = () =>
{
    const history = useHistory()

    const [cars, setCars] = useState<IState["cars"]>([])
    const [display, setDisplay] = useState<boolean>(false)

    useEffect(() => 
    {
        if(!auth.currentUser?.uid) history.push("/login")

        storage.collection(auth.currentUser!.uid).doc("car1").get().then((doc : firebase.firestore.DocumentSnapshot) =>
        {
            if(!doc.exists) setDisplay(true)
            else
            {
                storage.collection(auth.currentUser!.uid).onSnapshot((snap : firebase.firestore.QuerySnapshot) => 
                {
                    setCars(snap.docs.map((car :firebase.firestore.DocumentData) => 
                    (
                        {...car.data()}
                    )))
            
                })
            }
        })
        
        
    }, [])

    const _toggleDisplay = () =>
    {
        setDisplay(() => !display)
    }

    const signOut = () =>
    {
        //sign out here
    }

    return (
        <>

            <div className='float-end me-4'>
                <Button variant="primary" type='submit' className='mt-3' onClick={signOut}>Sign Out</Button>
            </div>

            <div className='d-flex align-items-center justify-content-center flex-column' style = {{minHeight: "100vh"}}>
                {cars.length > 0 && < Cars cars = { cars } />}

                { !display && <div className='mt-2' onClick={_toggleDisplay} style={{cursor:"pointer"}}>Want to add a Car?</div> }
                { display && <Card style={{minWidth:'25rem'}} className='mt-3'>

                    <Card.Body className='align-self-center' >
                        <div className="d-grid gap-2">

                            <h2 className='text-center mb-4'>Add Car</h2>
                            
                            < AddCar cars={ cars } />

                        {cars.length > 0 && <div className='text-center mt-2' onClick={_toggleDisplay} style={{cursor:"pointer"}}>Cancel</div>}

                        </div>
                    </Card.Body>
                </Card> }
            </div>
        </>
    )
}

export default Dash