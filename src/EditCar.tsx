import React from "react"

import { IState as IProps} from "./dash"

interface Ifunc { carUpdate : (e : React.FormEvent<HTMLFormElement>, document ?: string) => void }

const EditCar : React.FC<IProps & Ifunc> = ({ cars, carUpdate }) =>
{
    return (
        <div>none</div>
    )
}

export default EditCar