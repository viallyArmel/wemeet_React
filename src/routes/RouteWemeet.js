import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from '../component/Home';
import ConnexionPage from "../component/ConnexionPage";
import Event from "../component/Event";
import EventDetails from "../component/EventDetails";
import { hasAuthenticated } from "../services/AuthApi";
import Auth from "../contexts/Auth";
import EventForm from "../component/EventForm";
import AuthenticatedRoute from "../component/AuthenticatedRoute";

export default function RouteWemeet(){
    const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

    return (
        
        <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <Router>
                <Routes>
                    {/* <AuthenticatedRoute path='/home' element={<Home/>} isAuthenticated = {isAuthenticated} /> */}
                    <Route exact path='/home' element={<AuthenticatedRoute><Home/></AuthenticatedRoute>} />
                    {/* <Route exact path='/home' element={<Home/>}/> */}
                    <Route exact path='/addEvent/:label' element={<AuthenticatedRoute><EventForm /></AuthenticatedRoute>}/>
                    <Route exact path='/login' element={<ConnexionPage />}/>
                    <Route exact path='/allEvent' element={<Event/>}/>
                    <Route exact path='/eventDetails/:id'  element={<AuthenticatedRoute><EventDetails /></AuthenticatedRoute>}/>
                    <Route path="*" element={<Navigate to="/home"/>} />
                </Routes>
            </Router>
        </Auth.Provider>
    )
}
