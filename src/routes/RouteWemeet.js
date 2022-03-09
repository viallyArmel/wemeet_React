import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from '../component/Home';
import ConnexionPage from "../component/ConnexionPage";
import Event from "../component/Event";
import EventDetails from "../component/EventDetails";
import { hasAuthenticated } from "../services/AuthApi";
import Auth from "../contexts/Auth";
import AuthenticatedRoute from "../component/AuthenticatedRoute";

export default function RouteWemeet(){
    const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

    return (
        
        <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <Router>
                <Routes>
                    <Route exact path='/home' element={<Home/>}/>
                    <Route exact path='/login' element={<ConnexionPage />}/>
                    <Route exact path='/myEvent' element={<AuthenticatedRoute><Event/></AuthenticatedRoute>}/>
                    <Route exact path='/allEvent' element={<Event/>}/>
                    <Route exact path='/eventDetails' element={<AuthenticatedRoute><EventDetails/></AuthenticatedRoute>}/>
                    <Route path="/" element={<Navigate to="/login"/>} />
                </Routes>
            </Router>
        </Auth.Provider>
    )
}
