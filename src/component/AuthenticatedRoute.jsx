import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Auth from "../contexts/Auth";

//                              COMPOSANT NON UTILISé (ca n'a pas fonctionné comme je voulais)

const AuthenticatedRoute = (component) => {
    const {isAuthenticated} = useContext(Auth);
    const location = useLocation();
    isAuthenticated && console.log(component);

    return isAuthenticated ? (component) : ( <Navigate to="/login" state={{from : location}}/> );
}

export default AuthenticatedRoute;