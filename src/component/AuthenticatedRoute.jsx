import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Auth from "../contexts/Auth";

const AuthenticatedRoute = ({ component }) => {
    const {isAuthenticated} = useContext(Auth);
    const location = useLocation();

    return isAuthenticated ? (component) : ( <Navigate to="/login" state={{from : location}}/> );
}

export default AuthenticatedRoute;