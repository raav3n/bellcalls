import React, { useState, useEffect } from 'react'
import Cars  from "./Cars"
import storage  from "./firebase"
import { auth } from "./firebase"
import firebase from 'firebase/app';
import { Card, Button, Modal} from 'react-bootstrap';
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

export interface IMode { setMode : React.Dispatch<React.SetStateAction<string>>}

const Dash : React.FC = () =>
{
    const history = useHistory()

    const [cars, setCars] = useState<IState["cars"]>([])
    const [display, setDisplay] = useState<boolean>(false)
    const [signOutPad, setSignOutPad] = useState<React.CSSProperties>({ paddingLeft: window.innerWidth-300 })
    const [mode, setMode] = useState<string>("") // edit, delete, null
    const [carSel, setCarSel] = useState<string>("") // document reference name
    const [delConf, setDelConf] = useState<boolean>(false)

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
        setCarSel("")
        setMode("")
    }, [])

    useEffect(() =>
    {
        if(mode && carSel)
        {
            // console.log("YOOO"+JSON.parse(carSel).docName)
            if(mode === "EDIT")
            {
                setDisplay(true)   
            }
            else if(mode === "DELETE")
            {
                handleShow()
            }

            //rest
            // setCarSel("")
            // setMode("")
        }

    }, [mode, carSel])

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

    const deleteDoc = () =>
    {
        storage.collection(auth.currentUser!.uid).doc( JSON.parse(carSel).docName ).delete().then(() =>
        {
            console.log("doc deleted")
        }).catch((e : firebase.FirebaseError) =>
        {
            console.log(e.message)
        })
        setCarSel("")
        setMode("")
    }

    const resetVals = () =>
    {
        _toggleDisplay()
        setCarSel("")
        setMode("")
    }

    const handleClose = () => 
    {
        setDelConf(false);
        setCarSel("")
        setMode("")
    }

    const _toggleDisplay = () => setDisplay(!display)
    const handleShow = () => setDelConf(true);

    return (
        <>

            <div className='' style={{ ...signOutPad, whiteSpace:"nowrap", paddingRight:"20px"}}>
                <Button variant="primary" type='submit' className='mt-3' onClick={signOut}>Sign Out</Button>
            </div>

            { carSel && <Modal show={delConf} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the { (JSON.parse(carSel).color).toUpperCase() } { (JSON.parse(carSel).model).toUpperCase() }? <span className="text-muted"><br/>Can always be added again.</span></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}> No </Button>
                <Button variant="primary" onClick={ deleteDoc }>Yes</Button>
                </Modal.Footer>
            </Modal> }

            <div className='d-flex align-items-center justify-content-center flex-column' style = {{minHeight: "90vh"}}>        {/*watch out for minHeight*/}
                {cars.length > 0 && !display && < Cars cars = { cars } setMode={ setMode } setCarSel = { setCarSel } />} 

                {/* <h2 className='mb-1 text-center'>Cars</h2> */}

                { !display && <div className='mt-2' onClick={_toggleDisplay} style={{cursor:"pointer"}}>Want to add a Car?</div> }
                { display && <Card style={{minWidth: window.innerWidth/2}}>

                    <Card.Body className='align-self-center' >
                        <div className="d-grid gap-2">

                            {mode === "" && <h2 className='text-center mb-4'>Add Car</h2>}
                            {mode === "EDIT" && <h2 className='text-center mb-4'>Update Car</h2>}
                            
                            < AddCar carSel = { carSel } toggleDisplay={ _toggleDisplay } mode={ mode } />

                            

                        {cars.length > 0 && <div className='text-center mt-2' onClick={ resetVals } style={{cursor:"pointer"}}>Cancel</div>}

                        </div>
                    </Card.Body>
                </Card> }
            </div>
        </>
    )
}

export default Dash