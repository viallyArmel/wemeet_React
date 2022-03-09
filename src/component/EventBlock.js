import React from "react";
import userIco from '../resources/icon/user.png';
import { Link } from 'react-router-dom';
import deleteIco from '../resources/icon/delete.png';
import locationIco from '../resources/icon/location.png';
import { deleteEvent } from "../API/APIWemeet";


const EventBlock = ({events, loading}) => {
   
    if (loading){
        return (
            <div className="loading">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const deleteBlocEvent = ({id}) => {
        deleteEvent(id)
        .then(() => alert('delete success !'))
        .catch((err) => alert('delete failled !'));
    }

    return (
        <div className='container'>
            <div className="container block-event">
                <div className="row row-cols-4 ">
                    {
                        events.map(event => {
                            return (
                                <div className='col block-event shadow bg-body rounded' key={event.id}>
                                    <span className="row">
                                        <span className="iconMenu" >
                                            <button onClick={() => deleteBlocEvent(event)} type="button" className="btn btn-light">
                                                <img title="supprimer" className="iconDelete" src={deleteIco} alt="menu event"  />
                                            </button>
                                        </span>
                                    </span>
                                    <span className='row'>
                                        <h4>{event.label}</h4>
                                    </span>
                                    <span className='row'>
                                        <span><img src={locationIco} alt='location icon'/><h6>{event.city_name}</h6></span>
                                    </span>
                                    <span className='row'>
                                        <span className='col'>
                                            <img className='icon' src={userIco} alt='user icon'/>
                                            {event.nbParticipants}
                                        </span>
                                        <span className='col'>
                                            <Link className='linkSeeMore' to={'/eventDetails'}>voir...</Link>
                                        </span>
                                    </span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );

}

export default EventBlock;