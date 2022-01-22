import React from "react"
import { Redirect } from "react-router-dom"
import { auth } from "./firebase"
import { Route, RouteProps } from "react-router-dom"

interface PrivateRouteProps extends RouteProps {component : React.ComponentType}

const PrivateRoute : React.FC<PrivateRouteProps> = ({component:Component, ...rest}) =>
{

    return (
        <Route {...rest} render={(props : any) => {
            return auth.currentUser ? <Component {...props} /> : <Redirect to={"/login"} /> 
        }} />
    )
}

export default PrivateRoute
