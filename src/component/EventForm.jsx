import React, { useState } from "react";
import Navbar from "./Navbar";
import '../style/components/eventForm.scss';
import { createEvent, currentUser } from "../API/APIWemeet";
import Modal from 'react-modal';
import '../style/components/modal.scss';
import { StyleModal1 } from '../Utils/utils';
import { useParams } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";

const EventForm = () => {

    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        city: "",
        isPrivate: false
    });

    const { label } = useParams();
    eventData.title === "" && setEventData({ title: label });

    const [isModalSuccessOpen, setModalSuccess] = useState(false);
    const [isModalErrorOpen, setModalError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
   
    const saveEvent = (e) => {
        e.preventDefault();
        eventData.isPrivate === "on" && (eventData.isPrivate = true);
        eventData.city = eventData.city.toLowerCase();

        const user = currentUser().value;

        if (user) {
            const data = {
                label: eventData.title,
                description: eventData.description,
                cityName: eventData.city,
                email: user.email,
                isPrivate: eventData.isPrivate
            };

            createEvent(data).
                then(res => showAlert(res.data.status, false)).
                catch(e => showAlert(e.message, true));
        }

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

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setEventData({ ...eventData, [name]: value });
    }

    return (
        <div>
            <Navbar />
            <div className="formControl">
                <div className="background">
                    <h1 id="libellé">Créer un évènement</h1>
                    <BreadCrumb labels={["home", "Add event"]} endPoints={["/home"]} />
                    <div id="inscription">
                        <form id="eventForm" action="" onSubmit={saveEvent}>

                            <label htmlFor="title">Titre * :</label>
                            <input id="title" type="text" name="title" placeholder="titre de l'évènement" defaultValue={label} onChange={handleChange} required />

                            <label htmlFor="description">Description  : </label>
                            <textarea id="description" name="description" placeholder="Plus de details (ex : adresse, heure, etc...)" onChange={handleChange}></textarea>

                            <label htmlFor="city">Ville * :</label>
                            <input id="city" type="text" name="city" placeholder="ex : namur..." onChange={handleChange} required />

                            <label htmlFor="isPrivate">Rendre privé</label>
                            <input type="checkbox" name="isPrivate" onChange={handleChange} />

                            <div id="submit">
                                <input type="submit" value="Enregistrer" />
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
        </div>
    );

}
export default EventForm;