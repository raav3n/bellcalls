import React, { useState, useEffect } from 'react'
import Cars  from "./Cars"
import storage  from "./firebase"
import { auth } from "./firebase"
import firebase from 'firebase/app';
import { Card, Button, Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom"
import AddCar from "./AddCar"

export interface IState
{
    cars : 
    {
        model :string,
        color : string,
        plate : string,
        docName : string
    }[]
}

export 


const Dash : React.FC = () =>
{
    const history = useHistory()

    const [cars, setCars] = useState<IState["cars"]>([])
    const [display, setDisplay] = useState<boolean>(false)
    const [signOutPad, setSignOutPad] = useState<React.CSSProperties>({ paddingLeft: window.innerWidth-300 })

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
                        {...car.data(), docName: car.id }
                    )))
            
                })
            }
        })

        console.log(auth.currentUser?.email)
        
    }, [display])

    useEffect(() =>
    {
        if(window.innerWidth < 400) setSignOutPad({ paddingLeft: window.innerWidth-100 })
    }, [])

    const _toggleDisplay = () =>
    {
        setDisplay(() => !display)
    }

    const signOut = () =>
    {
        auth.signOut().then(() => 
        {
            history.push("/login")
        }).catch((error) => 
        {
            console.log("cant sign out bro")
        });
    }

    return (
        <>

            <div className='' style={{ ...signOutPad, whiteSpace:"nowrap", paddingRight:"20px"}}>
                <Button variant="primary" type='submit' className='mt-3' onClick={signOut}>Sign Out</Button>
            </div>

            <div className='d-flex align-items-center justify-content-center flex-column' style = {{minHeight: "90vh"}}>        {/*watch out for minHeight*/}
                {cars.length > 0 && !display && < Cars cars = { cars } toggleDisplay = {  _toggleDisplay } />} 

                {/* <h2 className='mb-1 text-center'>Cars</h2> */}

                { !display && <div className='mt-2' onClick={_toggleDisplay} style={{cursor:"pointer"}}>Want to add a Car?</div> }
                { display && <Card style={{minWidth: window.innerWidth/2}}>

                    <Card.Body className='align-self-center' >
                        <div className="d-grid gap-2">

                            <h2 className='text-center mb-4'>Add Car</h2>
                            
                            < AddCar cars={ cars } toggleDisplay={ _toggleDisplay } />

                            

                        {cars.length > 0 && <div className='text-center mt-2' onClick={_toggleDisplay} style={{cursor:"pointer"}}>Cancel</div>}

                        </div>
                    </Card.Body>
                </Card> }
            </div>
        </>
    )
}

export default Dash