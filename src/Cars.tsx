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
                <>
                    <input type="checkbox" key={`car${count}_in`} /> <label key={`car${count}_lb`} > Car {count++} : <strong key={`car${count}_sr`}>Model</strong> - {c.model}  <strong key={`car${count}_sr2`}>Plate</strong> - {c.plate} </label> <br/>
                </>
            )
        })
    }    

    return ( 
        <>
            <Card style={{width:'40rem'}} > 
                <Card.Body>  
                    <h2 className='text-center mb-4'>Cars</h2>
                    { carList() }
                </Card.Body> 
            </Card>
        </>
        )
}

export default Cars