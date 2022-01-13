import React, { useRef, useState } from "react"
import storage, { auth } from "./firebase"
import { Form, Button } from "react-bootstrap"
import { IState as IProps} from "./dash"
import firebase from "firebase"
import EditCar from "./EditCar"

export interface Istate { toggleDisplay : () => void }

const AddCar : React.FC<IProps & Istate > = ({ cars , toggleDisplay }) =>
{
    const [loading, setLoading] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const inputColor = useRef<HTMLInputElement>(null)
    const inputModel = useRef<HTMLInputElement>(null)
    const inputPlate = useRef<HTMLInputElement>(null)

    const carAddUpdate = (e : React.FormEvent<HTMLFormElement>, document ?: string) =>
    {
        e.preventDefault()
        setLoading(true)

        if( inputModel.current != null && inputColor.current != null && inputPlate.current != null)
        {
            const docnum : string = "car"+(cars.length+1).toString()

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
       { !editMode && <Form onSubmit={ carAddUpdate }>
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
            </Form> }

            {editMode && < EditCar cars = { cars } carUpdate = { carAddUpdate } /> }
        </>
    )
}

export default AddCar