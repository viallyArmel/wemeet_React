import React, { useState } from "react";
import Navbar from "./Navbar";
import '../style/components/userForm.scss';
import {createUser} from "../API/APIWemeet";
import { regexName, regexEmail, regexPassword } from "../Utils/utils";
import Modal from 'react-modal';
import '../style/components/modal.scss';
import { StyleModal1 } from '../Utils/utils';
import BreadCrumb from "./BreadCrumb";
import Footer from "./Footer";

Modal.setAppElement('#root');

const UserForm = () => {
    const [userData, setUserData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        address : "",
        postalCode : ""
    });

    const [isModalSuccessOpen, setModalSuccess] = useState(false);
    const [isModalErrorOpen, setModalError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const saveUser = () => {

        const data = {
            firstName : userData.firstName,
            lastName : userData.lastName,
            email : userData.email,
            password : userData.password,
            checkPassword : userData.checkPassword,
            address : userData.address,
            postalCode : userData.postalCode
        };

        createUser(data).
            then(res => showAlert(res.data.status, false)).
            catch(e => showAlert(e.message, true));
    }

    const handleClose = (setClose, refresh) => {
        setClose(false);
        refresh === true && window.location.reload();
    }

    const showAlert = (msg, isError) => {

        if (isError) {
            setErrorMsg(msg);
            setModalError(true);
        } else {
            setSuccessMsg(msg);
            setModalSuccess(true);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!regexName(userData.firstName)) {
            showAlert( "Merci de ne pas placer de chiffres dans votre prénom !", true);
        } else if (!regexName(userData.lastName)) {
            showAlert("Merci de ne pas placer de chiffres dans votre nom ! \n", true);
        } else if (!regexEmail(userData.email)) {
            showAlert("Le format de l'adresse mail doit corrspondre à \"mon@exemple.com\".\n",true);
        } else if (!regexPassword(userData.password)) {
            showAlert("Le mot de passe doit comprendre entre 6 et 25 caractère avec au moins une majuscule et une minuscule.", true);
        } else if(userData.password !== userData.checkPassword) {
            showAlert("Les mots de passe doivent être identiques ! \n",true);
        } else {
            saveUser();
        }
            // showAlert(alertMsg, true);
    }

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUserData({...userData, [name]: value});
    }

    return (
        <div>
            <Navbar/>
            <div className="formcontrol">
                <div className="background">
                    <h1 id="libellé">S'inscrire</h1>
                    <BreadCrumb labels={["home", "register"]} endPoints={["/home"]} />
                    <div id="inscription">
                        <form id="userForm" onSubmit={handleSubmit}>
                            <label htmlFor="firstName">Prénom * :</label>
                            <input id="firstName" type="text" name="firstName" placeholder="votre prénom" onChange={handleChange} required />

                            <label htmlFor="lastName">Nom * :</label>
                            <input id="lastName" type="text" name="lastName" placeholder="votre nom" onChange={handleChange} required />

                            <label htmlFor="email">Email * :</label>
                            <input id="email" type="text" name="email" placeholder="votre e-mail" onChange={handleChange} required />

                            <label htmlFor="password">Mot de passe * :</label>
                            <input id="password" type="password" name="password" placeholder="votre mot de passe" onChange={handleChange} required />

                            <label htmlFor="checkPassword">Confirmer mot de passe * :</label>
                            <input id="checkPassword" type="password" name="checkPassword" placeholder="confirmez votre mot de passe" onChange={handleChange} required />

                            <label htmlFor="address">Adresse * :</label>
                            <input id="address" type="text" name="address" placeholder="votre adresse" onChange={handleChange} required />

                            <label htmlFor="postalCode">Code postal * :</label>
                            <input id="postalCode" type="number" name="postalCode" placeholder="votre code postal" onChange={handleChange} required />

                            <div id="submit">
                                <input className={"mt-5"} type="submit" value="Enregistrer" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalSuccessOpen} onRequestClose={() => handleClose(setModalSuccess, true)} style={StyleModal1}
                   closeTimeoutMS={200} className="myModal">
                <div className='success'>
                    <div onClick={() => handleClose(setModalSuccess, true)} className="cross">&times;</div>
                    {successMsg}
                </div>
            </Modal>
            <Modal isOpen={isModalErrorOpen} onRequestClose={() => handleClose(setModalError)} style={StyleModal1}
                   closeTimeoutMS={200} className="myModal">
                <div className='faillure'>
                    <div onClick={() => handleClose(setModalError)} className="cross">&times;</div>
                    {errorMsg}
                </div>
            </Modal>
            <div className="vide"></div>
            <div className="vide"></div>
            <div className="vide"></div>
            <Footer/>
        </div>
    );
}

export default UserForm;