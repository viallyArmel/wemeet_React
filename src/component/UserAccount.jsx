import React, {useState, useEffect, useContext} from "react";
import Navbar from './Navbar';
import Footer from './Footer';
import {getUser, currentUser} from '../API/APIWemeet';
import {hasAuthenticated} from "../services/AuthApi";
import '../style/components/modal.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/components/userAccount.scss';

const UserAccount = () => {
    const [user, setUser] = useState(currentUser()?.value);

    useEffect(() => {
        if(hasAuthenticated()){
            getUser(user.id).then(res => setUser(res.data));
        } else {
            window.location.replace('/login');
        }
    }, []);

    return (
        <div>
            <Navbar/>
            <div className="background">
                <h1 className="pt-3 pb-3">Votre compte</h1>
            </div>
            <div id="wrapper">
                <div id="userInfos">
                    <div className="label" id="labFN">Votre prénom :</div>
                    <div className="content" id="contentFN">{user.first_name}</div>
                    <div className="label" id="labLN">Votre nom :</div>
                    <div className="content" id="contentLN">{user.last_name}</div>
                    <div className="label" id="labEM">Votre email :</div>
                    <div className="content" id="contentEM">{user.email}</div>
                    <div className="label" id="labAD">Votre adresse :</div>
                    <div className="content" id="contentAD">{user.postal_code} {user.address}</div>
                </div>
            </div>
            <div className="vide"></div> <br/><br/><br/><br/><br/>
            <Footer/>
        </div>
    )
}

export default UserAccount;