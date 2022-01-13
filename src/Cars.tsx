import React, { useEffect, useState } from 'react'
import { IState as IProps} from "./dash"
import { Card, ListGroup, Alert, Button, InputGroup, DropdownButton, Dropdown } from "react-bootstrap" 
import { Istate } from './AddCar'

const Cars : React.FC<IProps & Istate> = ({ cars, toggleDisplay }) =>
{
    const carList = () : JSX.Element[] => 
    {
        let count = 1
        return cars.map((c) => 
        {
            return ( 
                <React.Fragment key={ c.docName! }>
                    <label> Car {count++} </label> <ListGroup.Item  as="li" className='mb-1'action href={c.plate} id={ c.docName! }> {c.color.toUpperCase()} {c.model.toUpperCase()}, Plate : {c.plate} </ListGroup.Item>
                </React.Fragment>
            )
        })
    }    

    const [width, setWidth] = useState<React.CSSProperties>({ width : window.innerWidth/2 })
    const [options, setOptions] = useState<string>("")


    useEffect(() => {
        if(window.innerWidth < 500) setWidth({ width: window.innerWidth-100 })
        console.log(cars)
    }, []) 

    return ( 
        <>
            <Card style={{...width, maxHeight: window.innerHeight/2}} > 
                <Card.Body className='m-auto'>  

                    {options && <Alert variant="secondary" > { options } </Alert>}

                    <InputGroup className='mt-2 mb-2 m-auto'>
                            <DropdownButton variant='outline-secondary' title="Options" id="options_dropdown">
                                <Dropdown.Item href="#">Edit</Dropdown.Item>
                                <Dropdown.Item href="#">Delete</Dropdown.Item>
                            </DropdownButton>

                            <Button variant='primary' >Call</Button>
                        </InputGroup>

                    <div style={{ cursor:"pointer" , userSelect:"none"}}>

                        <ListGroup as="ul" className='d-flex flex-column'>
                            { carList() }
                        </ListGroup>

                    </div>

                </Card.Body> 
            </Card>
        </>
        )
}

export default Cars