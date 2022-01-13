import React, { useEffect, useState  } from 'react'
import { IState as IProps, IMode} from "./dash"
import { Card, ListGroup, Alert, Button, InputGroup, DropdownButton, Dropdown } from "react-bootstrap" 
// import { ItoggleDis } from './AddCar'
import { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext'

interface IsetCarSel { setCarSel : React.Dispatch<React.SetStateAction<string>> }

const Cars : React.FC<IProps & IMode & IsetCarSel> = ({ cars, setMode, setCarSel }) =>
{
    const carList = () : JSX.Element[] => 
    {
        let count = 1
        return cars.map((c) => 
        {
            return ( 
                <React.Fragment key={ c.docName! }>
                    <label> Car {count++} </label> <ListGroup.Item  as="li" className='mb-1'action href={ JSON.stringify(c)} id={ c.docName! }> {c.color.toUpperCase()} {c.model.toUpperCase()}, Plate : {c.plate} </ListGroup.Item>
                </React.Fragment>
            )
        })
    }    

    const [width, setWidth] = useState<React.CSSProperties>({ width : window.innerWidth/2 })
    const [option, setOption] = useState<string>("")


    useEffect(() => {
        if(window.innerWidth < 500) setWidth({ width: window.innerWidth-100 })
        // console.log(cars)
    }, []) 

    const optionSelect = (e ?: AccordionEventKey) =>
    {
        if(e)
        {
            setOption("Select a car to " + e.toString().toUpperCase())
            setMode(e.toString().toUpperCase())
            
        }
     }

    const carSelect = (e : AccordionEventKey) =>
    {
        if(e)
        {
            // console.log(e)    
            setCarSel(e.toString())      
        }
    }
 
    return ( 
        <>
            <Card style={{...width, maxHeight: window.innerHeight/2}} > 
                <Card.Body className='m-auto'>  

                    {option && <Alert variant={ option.split(" ")[option.split(" ").length-1].toLowerCase() === "delete" ? "danger" : "secondary"} className='text-center'> { option } </Alert>}

                    <InputGroup className='mt-2 mb-2 m-auto'>
                        <DropdownButton variant='outline-secondary' title="Options" id="options_dropdown"  onSelect={ optionSelect }>
                            <Dropdown.Item eventKey="edit">Edit</Dropdown.Item>
                            <Dropdown.Item eventKey="delete">Delete</Dropdown.Item>
                        </DropdownButton>

                        <Button variant='primary' onClick={ () => {setOption("Select a car to CALL for"); setMode("CALL")} } >Call</Button>
                    </InputGroup>

                    <div style={{ cursor:"pointer" , userSelect:"none"}}>

                        <ListGroup as="ul" className='d-flex flex-column' onSelect={ carSelect }>
                            { carList() }
                        </ListGroup>

                    </div>

                </Card.Body> 
            </Card>
        </>
        )
}

export default Cars