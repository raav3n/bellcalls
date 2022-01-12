import React, { useRef, useState } from "react"
import storage, { auth } from "./firebase"
import { Form, Button } from "react-bootstrap"
import { IState as IProps} from "./dash"

const AddCar : React.FC<IProps> = ({ cars }) =>
{
    const [loading, setLoading] = useState<boolean>(false)
    const inputColor = useRef<HTMLInputElement>(null)
    const inputModel = useRef<HTMLInputElement>(null)
    const inputPlate = useRef<HTMLInputElement>(null)

    const addCar = (e : React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault()
        setLoading(true)

        if( inputModel.current != null && inputColor.current != null && inputPlate.current != null)
        {
            const docnum : string = "car"+(cars.length+1).toString()

            storage.collection(auth.currentUser!.uid).doc(docnum).set({
                color : inputColor.current.value,
                model : inputModel.current.value,
                plate : inputPlate.current.value
            }).then(() => console.log("done"))
        }

        setLoading(false)
    }

    return (
        <>
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
            <Button variant="primary" type='submit' disabled={loading} className='w-100 mt-3' >Add Car</Button>
            </Form>
        </>
    )
}

export default AddCar