import React, { useRef, useState, useEffect } from "react"
import storage, { auth } from "./firebase"
import { Form, Button } from "react-bootstrap"
import firebase from "firebase"

export interface ItoggleDis { toggleDisplay : () => void }
export interface Imode { mode : string }
interface IcarSEl { carSel : string}

const AddCar : React.FC<IcarSEl & ItoggleDis & Imode > = ({ carSel , toggleDisplay, mode }) =>
{
    const [loading, setLoading] = useState<boolean>(false)
    // const [editMode, setEditMode] = useState<boolean>(false)
    const inputColor = useRef<HTMLInputElement>(null)
    const inputModel = useRef<HTMLInputElement>(null)
    const inputPlate = useRef<HTMLInputElement>(null)

    const carAddUpdate = ( document ?: string ) => ( e : React.FormEvent<HTMLFormElement> ) =>
    {
        e.preventDefault()
        setLoading(true)

        if( inputModel.current != null && inputColor.current != null && inputPlate.current != null)
        {
            // const docnum : string = "car"+(cars.length+1).toString()

            storage.collection(auth.currentUser!.uid).doc(document).set({
                color : inputColor.current.value,
                model : inputModel.current.value,
                plate : inputPlate.current.value
            }).catch((e : firebase.FirebaseError) => 
            {
                console.log(e.message)
                
            }).then(() => console.log("done"))
        }

        setLoading(false)

        toggleDisplay()
    }

    return (
        <>
        <Form onSubmit={ carAddUpdate( mode ? JSON.parse(carSel).docName : null ) }>
            <Form.Group id="Cmodel">
                <Form.Label>Car Model</Form.Label>
                {!mode && <Form.Control type="text" ref={inputModel} defaultValue={""} required />}
                {mode === "EDIT" && <Form.Control type="text" ref={inputModel} defaultValue={ JSON.parse(carSel).model} required />}
            </Form.Group>
            <Form.Group id="Ccolor">
                <Form.Label>Car Color</Form.Label>
                {!mode && <Form.Control type="text" ref={inputColor} required />}
                {mode === "EDIT" && <Form.Control type="text" ref={inputColor} defaultValue={ JSON.parse(carSel).color} required />}
            </Form.Group>
            <Form.Group id="Cplate">
                <Form.Label>Car Plate</Form.Label>
                {!mode && <Form.Control type="text" ref={inputPlate} required />}
                {mode === "EDIT" && <Form.Control type="text" ref={inputPlate} defaultValue={ JSON.parse(carSel).plate} required/>}
            </Form.Group>
            {!mode && <Button variant="primary" type='submit' disabled={loading} className='w-100 mt-3'>Add Car</Button>}
            {mode === "EDIT" && <Button variant="primary" type='submit' disabled={loading} className='w-100 mt-3'>Update Car</Button>}
        </Form> 

            {/* {editMode && < EditCar cars = { cars } carUpdate = { carAddUpdate } /> } */}
        </>
    )
}

export default AddCar