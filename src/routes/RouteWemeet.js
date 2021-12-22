import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from '../component/Home';
import ConnexionPage from "../component/ConnexionPage";
import Event from "../component/Event";
import EventDetails from "../component/EventDetails";

export default function RouteWemeet(){
    return (
        <Router>
            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path='/login' element={<ConnexionPage/>}/>
                <Route path='/myEvent' element={<Event/>}/>
                <Route path='/allEvent' element={<Event/>}/>
                <Route path='/eventDetails' element={<EventDetails/>}/>
            </Routes>
        </Router>
    )
}