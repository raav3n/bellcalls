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
                    <div className='p2' key={`car${count}_div`}><input type="checkbox" key={`car${count}_in`}  /> <label key={`car${count}_lb`} > Car {count++} : <strong key={`car${count}_sr`}>Model</strong> - {c.model}  <strong key={`car${count}_sr2`}>Plate</strong> - {c.plate} </label></div>
                </>
            )
        })
    }    

    return ( 
        <>
            <Card style={{width:'30rem'}} > 
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