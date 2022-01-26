import React, { useEffect, useState  } from 'react'
import { IState as IProps, IMode} from "./dash"
import { Card, ListGroup, Alert, Button, InputGroup, DropdownButton, Dropdown, Row, Col } from "react-bootstrap"
import { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext'

interface IsetCarSel { setCarSel : React.Dispatch<React.SetStateAction<string>> }
interface Ioption { option : string, setOption :React.Dispatch<React.SetStateAction<string>> }

const Cars : React.FC<Ioption & IProps & IMode & IsetCarSel> = ({ option, setOption, cars, setMode, setCarSel, }) =>
{
    const carList = () : JSX.Element[] =>
    {

        // console.log(cars)
        // delete cars[null]

        return cars.filter(Boolean).map((c) =>
        {
            // {console.log(cars)}
            return (
                <div key={ c.docName! } className='d-flex flex-row' style={{whiteSpace:"nowrap"}}>
                    <ListGroup.Item  as="li" className='mb-1'action href={ JSON.stringify(c)} id={ c.docName! }> {c.color.toUpperCase()} {c.model.toUpperCase()}, Plate:{c.plate.toUpperCase()} </ListGroup.Item> <label className='ps-4'> { c.calledAlready }</label>
                </div>
            )
        })
    }

    const [width, setWidth] = useState<React.CSSProperties>({ width : window.innerWidth/2 })


    useEffect(() => { if(window.innerWidth < 500) setWidth({ width: window.innerWidth-50 }) }, [])
    // useEffect(() => {if( setCarSel && optionSelect ) setOption("")}, [setCarSel, optionSelect])

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
            setOption("")
        }
    }

    return (
        <>
            <Card style={{...width, maxHeight: window.innerHeight/2}} >

                {option && <Alert variant={ option.split(" ")[option.split(" ").length-1].toLowerCase() === "delete" ? "danger" : "secondary"} className='text-center'> { option } </Alert>}

                <Card.Body className='m-auto'>

                    <InputGroup className='mt-2 mb-2 m-auto'>
                        <DropdownButton variant='outline-secondary' title="Options" id="options_dropdown"  onSelect={ optionSelect }>
                            <Dropdown.Item eventKey="edit">Edit</Dropdown.Item>
                            <Dropdown.Item eventKey="delete">Delete</Dropdown.Item>
                        </DropdownButton>

                        <Button variant='primary' onClick={ () => {setOption("Select a car to CALL for"); setMode("CALL")} } >Call</Button>
                    </InputGroup>

                    <div style={{ cursor:"pointer" , userSelect:"none"}}>

                        <ListGroup as="ul" className='d-flex flex-column' onSelect={ carSelect }>
                            <Row className="mb-2">
                                <Col>Cars</Col>
                                <Col xs={3} style={{whiteSpace:"nowrap"}}>Calls Left</Col>
                            </Row>
                            { carList() }
                        </ListGroup>

                    </div>

                </Card.Body>
            </Card>
        </>
        )
}

export default Cars
