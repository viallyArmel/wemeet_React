import React from "react";
import userIco from '../resources/icon/user.png';
import { Link } from 'react-router-dom';


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

    return (
        <div className='container'>
            <div className="container block-event">
                <div className="row row-cols-4 ">
                    {
                        events.map(event => {
                            return (
                                <div className='col block-event shadow bg-body rounded' key={event.id}>
                                    <span className='row'>
                                        <h4>{event.label}</h4>
                                    </span>
                                    <span className='row'>
                                        <h5>[ {event.city_name} ]</h5>
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