import React, { useState, useEffect, useRef } from 'react'
import Cars  from "./Cars"
import storage  from "./firebase"
import firebase from 'firebase/app';
import { Card, Button, Form } from 'react-bootstrap';

export interface IState
{
    cars : 
    {
        model :string,
        color : string,
        plate ?: string,
    }[]
}

const home : string = "test"

const Dash : React.FC= () =>
{
    const [cars, setCars] = useState<IState["cars"]>([])
    const [display, setDisplay] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const inputModel = useRef<HTMLInputElement>(null);
    const inputColor = useRef<HTMLInputElement>(null);
    const inputPlate = useRef<HTMLInputElement>(null);

    useEffect(() => 
    {
        storage.collection(home).onSnapshot((snap : firebase.firestore.QuerySnapshot) => 
        {
            setCars(snap.docs.map((car :firebase.firestore.DocumentData) => 
            (
                {...car.data()}
            )))
            
        })
        
    }, [])

    const _toggleDisplay = () =>
    {
        setDisplay(() => !display)
    }

    const addCar = (e : React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault()
        setLoading(true)

        if( inputModel.current != null && inputColor.current != null && inputPlate.current != null)
        {
            const docnum : string = "car"+(cars.length+1).toString()

            storage.collection(home).doc(docnum).set({
                color : inputColor.current.value,
                model : inputModel.current.value,
                plate : inputPlate.current.value
            }).then(() => console.log("done"))
        }

        setLoading(false)
    }

    return (
        <>
            
            < Cars cars = { cars } />

            { !display && <div className='mt-2' onClick={_toggleDisplay}>Want to add a Car?</div> }
            { display && <Card style={{width:'30rem'}} className='mt-3'>

                <Card.Body className='align-self-center' >
                    <div className="d-grid gap-2">

                        <h2 className='text-center mb-4'>Add Car</h2>

                        {/* {error && <Alert variant="danger">{error}</Alert>} */}

                        <Form onSubmit={addCar}>
                            <Form.Group id="Cmodel">
                                <Form.Label>Car Model</Form.Label>
                                <Form.Control type="text" ref={inputModel} required />
                            </Form.Group>
                            <Form.Group id="Ccolor">
                                <Form.Label>Car Color</Form.Label>
                                <Form.Control type="text" ref={inputColor} required />
                            </Form.Group>
                            <Form.Group id="Cplate">
                                <Form.Label>Car Plate</Form.Label>
                                <Form.Control type="text" ref={inputPlate} required/>
                            </Form.Group>
                            <Button variant="primary" type='submit' disabled={loading} className='w-100 mt-3'>Add Car</Button>
                        </Form>

                        <div className='text-center mt-2' onClick={_toggleDisplay}>Cancel</div>

                    </div>
                </Card.Body>
            </Card> }
        </>
    )
}

export default Dash