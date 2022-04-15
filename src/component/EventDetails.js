import React, { useContext, useEffect, useState } from 'react';
import { createCalendar, createSurvey, createSurveyLine, deleteCalendar, deleteSurvey, deleteSurveyLine, getCalendars, getEvent, getEventRoles, getSurveys, getUser, updateCalendar, updateEvent, updateSurvey, updateSurveyLine } from '../API/APIWemeet';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import '../style/components/eventDetails.scss';
import UserIco from '../resources/icon/user.png';
import LocationIco from '../resources/icon/location.png';
import addIco from '../resources/icon/add.png';
import checkIco from '../resources/icon/check-mark.png';
import minusIco from '../resources/icon/minus.png';
import crossIco from '../resources/icon/false.png';
import editIco from '../resources/icon/edit.png';
//import moreIco from '../resources/icon/more.png';
import voteIco from '../resources/icon/vote.png';
import Footer from '../component/Footer';
import Modal from 'react-modal';
import { StyleModal1 } from '../Utils/utils';
import '../style/components/modal.scss';
import { acceptableDate, dateToString } from '../Utils/utils';
import Auth from '../contexts/Auth';

Modal.setAppElement('#root');

export const EventDetails = () => {

  const { id } = useParams();
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [city_name, setCity_name] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState({});
  const [selectedSurveyLine, setSelectedSurveyLine] = useState({});
  const [selectedSurvey, setSelectedSurvey] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPrivateCheckBox, setIsPrivateCheckBox] = useState(false);
  const [is_private, setIsPrivate] = useState(false);

  const [eventDatas, setEventDatas] = useState({
    labelEvent: "",
    description: "",
    labelSurvey: "",
    labelSL: "",
    date: "",
    city: "",
    nbVotes: 0,
  });


  //modal useState
  const [isModalParticipantOpen, setModalParticipant] = useState(false);
  const [isModalLabelEventOpen, setModalLabelEvent] = useState(false);
  const [isModalDescriptionEventOpen, setModalDescriptionEvent] = useState(false);
  const [isModalCityOpen, setModalCity] = useState(false);
  const [isModalCalendarOpen, setModalCalendar] = useState(false);
  const [isModalSurveyOpen, setModalSurvey] = useState(false);
  const [isModalSurveyLineOpen, setModalSurveyLine] = useState(false);
  const [toEdit, setToEdit] = useState(false);
  const [addSurveyLineModalOpen, setAddSurveyLineModal] = useState(false);
  const [addSurveyModalOpen, setAddSurveyModal] = useState(false);
  const [isModalSuccessOpen, setModalSuccess] = useState(false);
  const [isModalErrorOpen, setModalError] = useState(false);
  const { isAuthenticated } = useContext(Auth);

  const role = 'organizer';

  useEffect(() => {

    if (!isAuthenticated) {
      window.location.replace('/login');
    }

    //event
    getEvent(id).then(res => {
      const event = res.data;

      setCity_name(event.city_name);
      setDescription(event.description);
      setLabel(event.label);
      setIsPrivate(event.is_private);
      setIsPrivateCheckBox(event.is_private);
      setParticipants(event.participants);

      //survey
      getSurveys(id).then(res => {
        setSurveys(res.data);

      }).catch(e => showAlert(e.message, true));

      //calendar
      getCalendars(id).then(res => {
        setCalendars(res.data);

      }).catch(e => showAlert(e.message, true));

    }).catch(e => showAlert(e.message, true))

    //eventRole
    getEventRoles(id).then(res => {

      const roles = res.data;
      const organizer = roles.filter(r => {
        return r.role === 'organizer';
      });

      //user
      getUser(organizer[0].user).then(res => {

        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);

      }).catch((e) => showAlert(e.message, true));
    }).catch(e => showAlert(e.message, true));

  }, [id, isAuthenticated]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setEventDatas({ ...eventDatas, [name]: value });
  };

  const handleClose = (setClose, refresh) => {
    setClose(false);
    setToEdit(false);
    refresh === true && window.location.reload();
  }

  const patchCalender = ({ eventId, oldDate, newDate, modal }) => {
    if (!acceptableDate(newDate, oldDate)) {
      showAlert("Invalid date ! Maybe it has already passed !", modal, true);
    } else {

      updateCalendar({ eventId, oldDate, newDate }).
        then(res => showAlert(res.data.status, modal, false)).
        catch(e => showAlert(e.message, modal, true));
    }
  }

  const remmoveCalendar = ({ eventId, date, modal }) => {
    deleteCalendar({ eventId, date }).
      then(res => showAlert(res.data.status, modal, false)).
      catch(e => showAlert(e.message, modal, true));
  }

  const postCalendar = ({ eventId, date, modal }) => {
    if (date === "" || !acceptableDate(date)) {
      showAlert("Invalid date ! Maybe it has already passed !", modal, true);
    } else {

      createCalendar({ eventId, date }).
        then(res => showAlert(res.data.status, modal, false)).
        catch(e => showAlert(e.message, modal, true));
    }
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

  const patchEvent = ({ id, labelEvent, cityName, description, isPrivate, modal }) => {

    cityName && cityName.toLowerCase();
    updateEvent(id, labelEvent, cityName, description, isPrivate).
      then(res => {
        showAlert(res.data.status, modal, false);
      }).catch(e => {
        showAlert(e.message, modal, true);
      });

  };

  const removeSurvey = ({ id, modal }) => {
    deleteSurvey({ id, role }).
      then(res => showAlert(res.data.status, modal, false)).
      catch(e => showAlert(e.message, modal, true));
  }

  const patchSurvey = ({ id, label, modal }) => {

    updateSurvey({ id, label, role }).
      then(res => showAlert(res.data.status, modal, false)).
      catch(e => showAlert(e.message, modal, true));
  }

  const postSurvey = ({ event, label, description, modal }) => {
    createSurvey({ label, description, event, role }).
      then(res => showAlert(res.data.status, modal, false)).
      catch(e => showAlert(e.message, modal, true));
  }

  const patchSurveyLine = ({ label, nbVotes, survey, lineNumber, modal }) => {

    updateSurveyLine({ label, nbVotes, survey, lineNumber }).
      then(res => showAlert(res.data.status, modal, false)).
      catch(e => showAlert(e.message, modal, true));
  }

  const remmoveSurveyLine = ({ survey, lineNumber, modal }) => {

    deleteSurveyLine({ survey, lineNumber, role }).
      then(res => showAlert(res.data.status, modal, false)).
      catch(e => showAlert(e.message, modal, true));
  }

  const addSurveyLine = ({ survey, label, nbVotes, modal }) => {

    createSurveyLine({ survey, label, nbVotes, role }).
      then(res => showAlert(res.data.status, modal, false)).
      catch(e => showAlert(e.message, modal, true));
  }

  return (
    <div>
      <Navbar />
      <div className='eventDetail'>

        <div id='entete'>
          <span id="label"> {label} </span>
          <span> [ {is_private ? "Privé" : "Public"} ]</span>
          <span className='editIcon'><img onClick={() => setModalLabelEvent(true)} src={editIco} alt='edit' title='Modifier' /></span>
          <h4>Organisé par {first_name} {last_name} <span onClick={() => setModalParticipant(true)}><img id="userIco" title='Afficher les pariticipants' alt="user icon" src={UserIco} /> {participants.length} </span> </h4>
        </div>

        <div id='description'>
          <h3>Description <span className='editIcon'><img onClick={() => setModalDescriptionEvent(true)} src={editIco} alt='edit' title='Modifier' /></span></h3>
          {description}
        </div>

        <div className='trait'></div>

        <div className='map'>
          <span ><img src={LocationIco} alt="location icon" />
            <span id='ville' >{city_name}</span>
          </span>
          <span className='editIcon'><img src={editIco} onClick={() => setModalCity(true)} alt='edit' title='Modifier' /></span>
        </div>

        <div className='trait'></div>

        <div id='disponibilité'>
          <h3>Disponibilité</h3>
          {
            calendars.map((c, index) => {
              return (
                <div key={index} className='item' title='Clicker pour modifier/supprimer' onClick={() => {
                  setSelectedCalendar(c);
                  setModalCalendar(true);
                }}>
                  <span> {c.date} </span>
                  <span className='imgBlock'>
                    <span> <img title='Oui' src={checkIco} alt='check' /> {c.nb_yes} </span>
                    <span> <img title='Non' src={crossIco} alt="cross" /> {c.nb_no} </span>
                    <span> <img title='Peut-être' src={minusIco} alt='minus' /> {c.nb_maybe} </span>
                  </span>
                </div>
              );
            })
          }

          <div className='item'>
            <input type="date" name='date' pattern="\d{4}-\d{2}-\d{2}" required min={dateToString(new Date(Date.now()))} onChange={handleChange} />
            <span className="validity"></span>
            <span className='imgBlock'><img src={addIco} title='Nouvelle date' alt='add' onClick={() => {
              postCalendar({ eventId: id, date: eventDatas.date, modal: setModalCalendar });
            }} /></span>
          </div>
        </div>

        <div className='trait'></div>

        {surveys.map((s, index) => {
          return (
            <div key={index} className='sondage'>
              <h3>
                {s.title}
                <span className='editIcon'><img src={editIco} alt='edit' onClick={() => {
                  setModalSurvey(true)
                  setSelectedSurvey(s);

                }} title='Modifier' /></span>
              </h3>
              <table>
                {
                  s.surveyLines !== 0 && s.surveyLines.map((sl, index) => {
                    return (
                      <tr className='celulle' key={index} onClick={() => {
                        setModalSurveyLine(true)
                        setSelectedSurveyLine(sl)
                      }
                      }>
                        <td> {sl.label} </td>
                        <td> {sl.nb_votes} </td>
                        <td> <img src={voteIco} alt='vote icon' /> </td>
                      </tr>
                    );
                  })
                }
                <tr className='cellule' onClick={() => {
                  setAddSurveyLineModal(true)
                  setSelectedSurvey(s);

                }}>
                  <td>Ajouter une Suggestion</td>
                  <td></td>
                  <td><img src={addIco} title='Nouvelle surveyLine' alt='add' /></td>
                </tr>
              </table>
            </div>
          );
        })}
        <div id='addSurvey' onClick={() => setAddSurveyModal(true)}>
          <h3>
            Ajouter un sondage
            <span className='imgBlock'><img src={addIco} title='Nouvelle date' alt='add' /></span>
          </h3>

        </div>
      </div>
      {/* LES MODAUX */}

      {/* Modal : tout s'est bien passé */}
      <Modal isOpen={isModalSuccessOpen} onRequestClose={() => handleClose(setModalSuccess, true)} style={StyleModal1}
        closeTimeoutMS={200} className="myModal">
        <div className='success'>
          <div onClick={() => handleClose(setModalSuccess, true)} className="cross">&times;</div>
          {successMsg}
        </div>
      </Modal>

      {/* Modal error */}
      <Modal isOpen={isModalErrorOpen} onRequestClose={() => handleClose(setModalError)} style={StyleModal1}
        closeTimeoutMS={200} className="myModal">
        <div className='faillure'>
          <div onClick={() => handleClose(setModalError)} className="cross">&times;</div>
          {errorMsg}
        </div>
      </Modal>

      {/* modal addSurvey */}
      <Modal isOpen={addSurveyModalOpen} onRequestClose={() => handleClose(setAddSurveyModal)} style={StyleModal1}
        closeTimeoutMS={200} className="myModal">
        <div>
          <h2>Ajouter un sondage </h2>
          <div onClick={() => handleClose(setAddSurveyModal)} className="cross">&times;</div>
        </div>
        <div className='content'>
          <span><input type="text" name='labelSurvey' onChange={handleChange} placeholder='titre du sondage' /></span>
        </div>
        <div className='zoneBtn'>
          <span className='imgBlock'>
            <input type='submit' id='Ajouter' value='Ajouter' onClick={() => {
              postSurvey({ label: eventDatas.labelSurvey, event: id, modal: setAddSurveyModal });
            }} />
          </span>
        </div>
      </Modal>

      {/* modal addSurveyLine */}
      <Modal isOpen={addSurveyLineModalOpen} onRequestClose={() => handleClose(setAddSurveyLineModal)} style={StyleModal1}
        closeTimeoutMS={200} className="myModal">
        <div>
          <h2>Ajouter une proposition </h2>
          <div onClick={() => handleClose(setAddSurveyLineModal)} className="cross">&times;</div>
        </div>
        <div className='content'>
          <span><input type="text" name='labelSL' onChange={handleChange} placeholder='titre de la proposition' /></span>
          <span>
            <img src={voteIco} alt='vote icon' />
            <span className='title'> <input type='number' onChange={handleChange} name='nbVotes' min={0} defaultValue={0} /> </span>
          </span>
        </div>
        <div className='zoneBtn'>
          <span className='imgBlock'>
            <input type='submit' id='Ajouter' value='Ajouter' onClick={() => {
              addSurveyLine({ survey: selectedSurvey.id, label: eventDatas.labelSL, nbVotes: eventDatas.nbVotes, modal: setAddSurveyLineModal });
            }} />
          </span>
        </div>
      </Modal>

      {/* modal survey */}
      <Modal isOpen={isModalSurveyOpen} onRequestClose={() => handleClose(setModalSurvey)} style={StyleModal1}
        closeTimeoutMS={200} className="myModal">
        <div>
          <h2>Titre du sondage </h2>
          <div onClick={() => handleClose(setModalSurvey)} className="cross">&times;</div>
        </div>
        <div className='content'>
          {toEdit ? (
            <span><input type="text" name='labelSurvey' onChange={handleChange} defaultValue={selectedSurvey.title} /></span>
          ) : (
            <span className='title'> {selectedSurvey.title} </span>
          )}
        </div>
        <div className='zoneBtn'>
          {toEdit ? (
            <input type='submit' id='Modifier' onClick={() => {
              setToEdit(false);
              eventDatas.labelSurvey !== "" && patchSurvey({ id: selectedSurvey.id, label: eventDatas.labelSurvey, modal: setModalSurvey });

            }} value={"Valider modifications"} />
          ) : (
            <>
              <input type='submit' id='Modifier' onClick={() => setToEdit(true)} value={"Modifier"} />
              <input type='submit' id='Supprimer' value="Supprimer" onClick={() => {
                removeSurvey({ id: selectedSurvey.id, modal: setModalSurvey });
              }} />
            </>
          )}
        </div>

      </Modal>

      {/* modal Survey Line*/}
      <Modal isOpen={isModalSurveyLineOpen} onRequestClose={() => handleClose(setModalSurveyLine)} style={StyleModal1}
        closeTimeoutMS={200} className="myModal">
        <div>
          <h2>Proposition </h2>
          <div onClick={() => handleClose(setModalSurveyLine)} className="cross">&times;</div>
        </div>
        <div className='content'>
          {toEdit ? (
            <>
              <span><input type="text" name='labelSL' onChange={handleChange} defaultValue={selectedSurveyLine.label} /></span>
              <span>
                <img src={voteIco} alt='vote icon' />
                <span className='title'> <input type='number' name='nbVotes' onChange={handleChange} min={0} defaultValue={selectedSurveyLine.nb_votes} /> </span>
              </span>
            </>
          ) : (
            <>
              <span>{selectedSurveyLine.label}</span>
              <span>
                <img src={voteIco} alt='vote icon' />
                <span className='title'> {selectedSurveyLine.nb_votes} </span>
              </span>
            </>
          )
          }
        </div>
        <div className='zoneBtn'>
          {toEdit ? (
            <input type='submit' id='Modifier' onClick={() => {
              setToEdit(false);
              eventDatas.labelSL !== "" && patchSurveyLine({ label: eventDatas.labelSL, nbVotes: eventDatas.nbVotes, survey: selectedSurveyLine.survey, lineNumber: selectedSurveyLine.line_number, modal: setModalSurveyLine });

            }} value={"Valider modifications"} />
          ) : (
            <>
              <input type='submit' id='Modifier' onClick={() => setToEdit(true)} value={"Modifier"} />
              <input type='submit' id='Supprimer' value="Supprimer" onClick={() => {
                remmoveSurveyLine({ survey: selectedSurveyLine.survey, lineNumber: selectedSurveyLine.line_number, modal: setModalSurveyLine });
              }} />
            </>
          )}
        </div>
      </Modal>

      {/* modal calendar */}
      <Modal isOpen={isModalCalendarOpen} onRequestClose={() => handleClose(setModalCalendar)} style={StyleModal1}
        closeTimeoutMS={200} className="myModal">
        <div>
          <h2>Disponibilité </h2>
          <div onClick={() => handleClose(setModalCalendar)} className="cross">&times;</div>
        </div>
        <div className='content'>
          {toEdit ? (
            <span><input type="date" name='date' onChange={handleChange} defaultValue={selectedCalendar.date} min={selectedCalendar.date} /></span>
          ) : (
            <span> {selectedCalendar.date} </span>
          )
          }
        </div>
        <div className='zoneBtn'>
          {toEdit ? (
            <input type='submit' id='Modifier' onClick={() => {
              setToEdit(false);
              eventDatas.date !== "" && patchCalender({ eventId: id, oldDate: selectedCalendar.date, newDate: eventDatas.date, modal: setModalCalendar });

            }} value={"Valider modifications"} />
          ) : (
            <>
              <input type='submit' id='Modifier' onClick={() => setToEdit(true)} value={"Modifier"} />
              <input type='submit' id='Supprimer' value="Supprimer" onClick={() => {
                remmoveCalendar({ eventId: id, date: selectedCalendar.date, modal: setModalCalendar });
              }} />
            </>
          )}

        </div>
      </Modal>

      {/* modal city event */}
      <Modal isOpen={isModalCityOpen} onRequestClose={() => handleClose(setModalCity)} style={StyleModal1}
        closeTimeoutMS={200} className="myModal">
        <div>
          <h2>Ville </h2>
          <div onClick={() => handleClose(setModalCity)} className="cross">&times;</div>
        </div>
        <div className='content'>
          {toEdit ? (
            <span><input type="text" name='city' onChange={handleChange} defaultValue={city_name} /></span>
          ) : (
            <>
              <img src={LocationIco} alt="location icon" />
              <span className='title'> {city_name} </span>
            </>
          )
          }
        </div>
        <div className='zoneBtn'>
          {toEdit ? (
            <input type='submit' id='Modifier' onClick={() => {
              setToEdit(false);
              eventDatas.city !== "" && patchEvent({ id, cityName: eventDatas.city, modal: setModalCity });

            }} value={"Valider modifications"} />
          ) : (
            <input type='submit' id='Modifier' onClick={() => setToEdit(true)} value={"Modifier"} />
          )}
        </div>
      </Modal>

      {/* modal description event */}
      <Modal isOpen={isModalDescriptionEventOpen} onRequestClose={() => handleClose(setModalDescriptionEvent)} style={StyleModal1}
        closeTimeoutMS={200} className="myModal">
        <div>
          <h2>Description de l'évènement</h2>
          <div onClick={() => handleClose(setModalDescriptionEvent)} className="cross">&times;</div>
        </div>
        <div className='content'>
          {toEdit ? (

            <span><textarea name='description' onChange={handleChange} defaultValue={description} /></span>

          ) : (
            <span className='title'> {description} </span>
          )
          }
        </div>
        <div className='zoneBtn'>
          {toEdit ? (
            <input type='submit' id='Modifier' onClick={() => {
              setToEdit(false);
              eventDatas.description !== "" && patchEvent({ id, description: eventDatas.description, modal: setModalDescriptionEvent });

            }} value={"Valider modifications"} />
          ) : (
            <input type='submit' id='Modifier' onClick={() => setToEdit(true)} value={"Modifier"} />
          )}
        </div>
      </Modal>

      {/* modal titre event */}
      <Modal isOpen={isModalLabelEventOpen} onRequestClose={() => handleClose(setModalLabelEvent)} style={StyleModal1}
        closeTimeoutMS={200} className="myModal">
        <div>
          <h2>Titre de l'évènement</h2>
          <div onClick={() => handleClose(setModalLabelEvent)} className="cross">&times;</div>
        </div>
        <div className='content'>
          {toEdit ? (
            <>
              <span><input type="text" name='labelEvent' onChange={handleChange} defaultValue={label} /></span>
              <span>
                Privé : <input name='isPrivate' defaultChecked={is_private ? "checked" : ""} onClick={() => setIsPrivateCheckBox(!isPrivateCheckBox)} type="checkbox" />
              </span>
            </>
          ) : (
            <>
              <span className='title'> {label} </span>
              <span> [ {is_private ? "Privé" : "Public"} ]</span>
            </>
          )
          }
        </div>
        <div className='zoneBtn'>
          {toEdit ? (
            <input type='submit' id='Modifier' onClick={() => {
              setToEdit(false);
              if (eventDatas.labelEvent !== "" || is_private !== isPrivateCheckBox) {
                is_private !== isPrivateCheckBox && eventDatas.labelEvent === "" && (eventDatas.labelEvent = label);
                patchEvent({ id, labelEvent: eventDatas.labelEvent, modal: setModalLabelEvent, isPrivate: isPrivateCheckBox });
              }

            }} value={"Valider modifications"} />
          ) : (
            <input type='submit' id='Modifier' onClick={() => setToEdit(true)} value={"Modifier"} />
          )}
        </div>
      </Modal>

      {/* modal participants */}
      <Modal isOpen={isModalParticipantOpen} onRequestClose={() => setModalParticipant(false)} style={StyleModal1}
        closeTimeoutMS={200} className="myModal">
        {isModalParticipantOpen && (

          <div>
            <div onClick={() => setModalParticipant(false)} className="cross">&times;</div>
            <div className="scrollbar">
              {participants.length === 0 ? (
                <h4 className="titleListe">Aucun participants a cet évènement ! </h4>
              ) : (
                <>
                  <h4 className="titleListe">Participants</h4>
                  <ul id="listeParticipants">
                    {
                      participants.map((p, index) => {
                        return (
                          <li key={index}> {p.last_name} {p.first_name} </li>
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
      <Footer />
    </div>
  );

}

export default EventDetails;
