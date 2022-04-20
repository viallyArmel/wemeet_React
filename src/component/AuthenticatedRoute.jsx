import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Auth from "../contexts/Auth";

const AuthenticatedRoute = (element) => {
    const { isAuthenticated } = useContext(Auth);

    return isAuthenticated ? element.children : <Navigate to="/login"/>;

}

export default AuthenticatedRoute;