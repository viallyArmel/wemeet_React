import React, { useEffect, useState } from "react";
import ReactModal from 'react-modal';
import { StyleModal1 } from '../Utils/utils';
import '../style/components/modal.scss';
import voteIco from '../resources/icon/vote.png';
import LocationIco from '../resources/icon/location.png';

ReactModal.setAppElement('#root');
//                              COMPOSANT NON UTILISé

const Modal = ({ modalOpen, closeModal, title, modalCible, selectedData, editable, saveable, deleteable, confirmModal, onEdit, onDelete, onSave, onConfirm }) => {
    const [open, setModal] = useState(false);
    const [toEdit, setToEdit] = useState(false);



    const [eventDatas, setEventDatas] = useState({
        labelEvent: "",
        description: "",
        labelSurvey: "",
        labelSL: "",
        date: "",
        city: "",
        nbVotes: 0,
        isPrivate: false,
    });



    useEffect(() => {
        setModal(modalOpen);

    }, [modalOpen]);

    const chooseModalCible = (modalCible) => {
        switch (modalCible) {

            case "addSurvey": return (
                <span><input type="text" name='labelSurvey' placeholder='titre du sondage' /></span>
            );
            case "addSurveyLine": return (
                <>
                    <span><input type="text" name='labelSL' onChange={handleChange} placeholder='titre de la proposition' /></span>
                    <span>
                        <img src={voteIco} alt='vote icon' />
                        <span className='title'> <input type='number' onChange={handleChange} name='nbVotes' min={0} defaultValue={0} /> </span>
                    </span>
                </>
            );
            case "survey": return (
                <>
                    {toEdit ? (
                        <span><input type="text" name='labelSurvey' onChange={handleChange} defaultValue={selectedData.title} /></span>
                    ) : (
                        <span className='title'> {selectedData.title} </span>
                    )}
                </>
            );
            case "surveyLine": return (
                <>
                    {toEdit ? (
                        <>
                            <span><input type="text" name='labelSL' onChange={handleChange} defaultValue={selectedData.label} /></span>
                            <span>
                                <img src={voteIco} alt='vote icon' />
                                <span className='title'> <input type='number' name='nbVotes' onChange={handleChange} min={0} defaultValue={selectedData.nb_votes} /> </span>
                            </span>
                        </>
                    ) : (
                        <>
                            <span>{selectedData.label}</span>
                            <span>
                                <img src={voteIco} alt='vote icon' />
                                <span className='title'> {selectedData.nb_votes} </span>
                            </span>
                        </>
                    )}
                </>
            );
            case "calendar": return (
                <>
                    {toEdit ? (
                        <span><input type="date" name='date' onChange={handleChange} defaultValue={selectedData.date} min={selectedData.date} /></span>
                    ) : (
                        <span> {selectedData.date} </span>
                    )}
                </>
            );
            case "city": return (
                <>
                    {toEdit ? (
                        <span><input type="text" name='city' onChange={handleChange} defaultValue={selectedData.city_name} /></span>
                    ) : (
                        <>
                            <img src={LocationIco} alt="location icon" />
                            <span className='title'> {selectedData.city_name} </span>
                        </>
                    )}
                </>
            );
            case "description": return (
                <>
                    {toEdit ? (
                        <span><textarea name='description' onChange={handleChange} defaultValue={selectedData.description} /></span>
                    ) : (
                        <span className='title'> {selectedData.description} </span>
                    )}
                </>
            );
            case "label": return (
                <>
                    {toEdit ? (
                        <>
                            <span><input type="text" name='labelEvent' onChange={handleChange} defaultValue={selectedData.label} /></span>
                            <span>
                                Privé : <input name='isPrivate' onChange={handleChange} type="checkbox" />
                            </span>
                        </>
                    ) : (
                        <>
                            <span className='title'> {selectedData.label} </span>
                            <span> [ {selectedData.isPrivate ? "Privé" : "Public"} ]</span>
                        </>
                    )}
                </>
            );
            default: return (
                <>
                    {selectedData.participants.length === 0 ? (
                        <h4 className="titleListe">Aucun participants a cet évènement ! </h4>
                    ) : (
                        <>
                            <h4 className="titleListe">Participants</h4>
                            <ul id="listeParticipants">
                                {
                                    selectedData.participants.map((p, index) => {
                                        return (
                                            <li key={index}> {p.last_name} {p.first_name} </li>
                                        );
                                    })
                                }
                            </ul>
                        </>
                    )}
                </>
            );
        }
    }

    // const removeSurvey = ({ id, modal }) => {
    //     deleteSurvey({ id, role }).
    //       then(res => console.log(res.data.status)).
    //       catch(e => console.log(e.message));
    //   }

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setEventDatas({ ...eventDatas, [name]: value });
    };

    const handleClose = (setClose, refresh) => {
        setClose()
        refresh === true && window.location.reload();
    }

    return (
        <ReactModal isOpen={open} onRequestClose={closeModal} style={StyleModal1}
            closeTimeoutMS={200} className="myModal">
            <div>
                <h2> {title} </h2>
                <div onClick={() => handleClose(closeModal)} className="cross">&times;</div>
            </div>
            <div className='content'>
                {chooseModalCible(modalCible)}
            </div>

            <div className='zoneBtn'>
                {editable &&
                    <>
                        {toEdit ? (
                            <input type='submit' id='Modifier' onClick={() => {
                                setToEdit(false);
                                eventDatas.date !== "" && onEdit();

                            }} value={"Valider modifications"} />
                        ) : (
                            <>
                                <input type='submit' id='Modifier' onClick={() => setToEdit(true)} value={"Modifier"} />
                                {deleteable && <input type='submit' id='Supprimer' value="Supprimer" onClick={onDelete} />}
                            </>
                        )}
                    </>}
                {(saveable && !editable) && (
                    <span className='imgBlock'>
                        <input type='submit' id='Ajouter' value='Ajouter' onClick={() => onSave} />
                    </span>
                )}

            </div>
        </ReactModal>

    );
}

export default Modal;