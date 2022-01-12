import React from 'react'
import { IState as IProps} from "./dash"
import { Card } from "react-bootstrap" 

const Cars : React.FC<IProps> = ({ cars }) =>
{
    const carList = () : JSX.Element[] => 
    {
        let count = 1
        return cars.map((c) => 
        {
            return ( 
                <React.Fragment key={count}>
                    <input type="checkbox"/> <label> Car {count++} : <strong>Model</strong> - {c.model}  <strong>Plate</strong> - {c.plate} </label><br/>
                </React.Fragment>
            )
        })
    }    

    return ( 
        <>
            <Card style={{minWidth:'30rem'}} > 
                <Card.Body className='m-auto'>  
                    <h2 className='mb-3 text-center'>Cars</h2>
                    <div id="carList" className='"d-flex flex-column mb-3'>
                        { carList() }
                    </div>
                </Card.Body> 
            </Card>
        </>
        )
}

export default Cars