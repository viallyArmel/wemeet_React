import React, { Component } from 'react';
import getAllEvents from '../API/APIWemeet';
import userIco from '../resources/icon/user.png';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';


export default class Event extends Component {

    constructor (props){
        super(props);

        this.state = {
            events : [],
            eventsToShow : [],
            loading : false,
            currentPage : 1,
            eventsPerPage : 6,
        }
    }

    componentDidMount(){
       
        getAllEvents().then(res => res.data).then(data => {
        
            this.setState({
                events : data,
                eventsToShow : data
            });
        });
    }

    

    
    render() {
        const indexOfLastEvent = this.state.currentPage * this.state.currentPage;
        const indexOfFirstEvent = this.state.indexOfLastEvent - this.state.eventsPerPage;
        const currentEvents = this.state.eventsToShow.splice(indexOfFirstEvent, indexOfLastEvent);

        const paginate = (numPage) => this.setState({currentPage : numPage});

        return (
            <div className='container'>
                {
                    currentEvents.map(event => {
                        return (
                            <div className='container-fluid row' key={'rowEvent'}>
                                <div className='block-event'>
                                    <div className='col col-sm-3'>
                                        <div className='shadow bg-body rounded'>
                                            <div className='col'>
                                                <span className='row' id='labelEvent'>
                                                    <h4>{event.label}</h4>
                                                </span>
                                                <span className='row' id='cityName'>
                                                    <h5>`[${event.cityName}]`</h5>
                                                </span>
                                                <span className='row'>
                                                    <span className='col' id='nbPersonnes'>
                                                        <img className='icon' src={userIco} alt='user icon'/>
                                                        {event.nbParticipants}
                                                    </span>
                                                    <span className='col' id='voir'>
                                                        <Link to='/eventDetails' id='linkVoir'>voir</Link>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                <Pagination eventsPerPage={this.state.eventsPerPage} totalEvents={this.state.eventsToShow.length} paginate={paginate}/>
            </div>
        );
    }
}
