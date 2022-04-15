import React, { useState } from "react";
import userIco from '../resources/icon/user.png';
import { Link } from 'react-router-dom';
import deleteIco from '../resources/icon/delete.png';
import locationIco from '../resources/icon/location.png';
import { deleteEvent } from "../API/APIWemeet";
import Modal from 'react-modal';
import '../style/components/modal.scss';
import { StyleModal1 } from '../Utils/utils';

Modal.setAppElement('#root');


const EventBlock = ({ events, loading }) => {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [isModalSuccessOpen, setModalSuccess] = useState(false);
    const [isModalErrorOpen, setModalError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [confirmModal, setConfirmModal] = useState(false);

    if (loading) {
        return (
            <div className="loading">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const deleteBlocEvent = ({ id }, modal) => {
        deleteEvent(id).
            then(res => showAlert(res.data.status, modal, false)).
            catch(e => showAlert(e.message, modal, true));
    }

    const handleClose = (setClose, refresh) => {
        setClose(false);
        refresh === true && window.location.reload();
    }

    const showAlert = (msg, modal, isError) => {
        modal && handleClose(modal);

        if (isError) {
            setErrorMsg(msg);
            setModalError(true);
        } else {
            setSuccessMsg(msg);
            setModalSuccess(true);
        }
    }

    return (
        <div className='container-fluid'>
            <div className=" block-event">
                <div className="row row-cols-4 ">
                    {
                        events.map(event => {
                            return (
                                <div className='col shadow bg-body rounded single-event' key={event.id}>
                                    <span className="row">
                                        <span className="iconMenu" >
                                            <button onClick={() => {
                                                setSelectedEvent(event);
                                                setConfirmModal(true);
                                            }} type="button" className="btn btn-light">
                                                <img title="supprimer" className="iconDelete" src={deleteIco} alt="menu event" />
                                            </button>
                                        </span>
                                    </span>
                                    <span className='row'>
                                        <h4>{event.label}</h4>
                                    </span>
                                    <span className='row'>
                                        <span><img src={locationIco} alt='location icon' /><h6>{event.city_name}</h6></span>
                                    </span>
                                    <span className='row'>
                                        <span className='col'>
                                            <img onClick={() => {
                                                setIsOpenModal(true);
                                                setSelectedEvent(event);
                                            }} className='icon userIcon' src={userIco} alt='user icon' />
                                            {event.nbParticipants}
                                        </span>
                                        <span className='col'>
                                            <Link className='linkSeeMore' to={{ pathname: `/eventDetails/${event.id}`, state: { event: event } }} >voir...</Link>
                                        </span>
                                    </span>
                                </div>
                            );
                        })
                    }
                </div>
               
                <Modal isOpen={isOpenModal} onRequestClose={() => setIsOpenModal(false)} style={StyleModal1}
                    closeTimeoutMS={200} className="myModal">
                    {isOpenModal && (

                        <div>
                            <div onClick={() => setIsOpenModal(false)} className="cross">&times;</div>
                            <div className="scrollbar">
                                {selectedEvent.participants.length === 0 ? (
                                    <h4 className="titleListe">Aucun participants a cet évènement ! </h4>
                                ) : (
                                    <>
                                        <h4 className="titleListe">Participants</h4>
                                        <ul id="listeParticipants">
                                            {
                                                selectedEvent.participants.map((p, index) => {
                                                    return (
                                                        <li key={p.id}> {p.last_name} {p.first_name} </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </Modal>
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
                <Modal isOpen={confirmModal} onRequestClose={() => handleClose(setConfirmModal)} style={StyleModal1}
                    closeTimeoutMS={200} className="myModal">
                    <div>
                        <h2>Confirmation </h2>
                        <div onClick={() => handleClose(setConfirmModal)} className="cross">&times;</div>
                    </div>
                    <div className='content'>
                        <span> Supprimer l'event " {selectedEvent.label} ?" </span>
                    </div>
                    <div className='zoneBtn'>
                        <input type='submit' id='Modifier' onClick={() => deleteBlocEvent(selectedEvent, setConfirmModal)} value={"Supprimer"} />
                        <input type='submit' id='Supprimer' value="Cancel" onClick={() => handleClose(setConfirmModal)} />
                    </div>
                </Modal>
            </div>
        </div>
    );

}

export default EventBlock;