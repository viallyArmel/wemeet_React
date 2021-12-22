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
            eventsPerPage : 3,
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
        const indexOfLastEvent = this.state.currentPage * this.state.eventsPerPage;
        const indexOfFirstEvent = this.state.indexOfLastEvent - this.state.eventsPerPage;
        const currentEvents = this.state.eventsToShow.splice(indexOfFirstEvent, indexOfLastEvent);

        console.log(currentEvents);
        const paginate = (numPage) => this.setState({currentPage : numPage});

        
        return (
            <div className='container'>
                <div class="container block-event">
                            <div class="row row-cols-4 ">
                {
                    /*currentEvents.map(event => {
                        return (
                            <div className='container-fluid' key={event.id}>
                                <div className='container block-event row row-cols-3 '>
                                    <div className='col test'>
                                        <div className='shadow bg-body rounded'>
                                            <div className='col'>
                                                <span className='row'>
                                                    <h4>{event.label}</h4>
                                                </span>
                                                <span className='row'>
                                                    <h5>`[${event.cityName}]`</h5>
                                                </span>
                                                <span className='row'>
                                                    <span className='col'>
                                                        <img className='icon' src={userIco} alt='user icon'/>
                                                        {event.nbParticipants}
                                                    </span>
                                                    <span className='col'>
                                                        <Link to={'/eventDetails'}>voir</Link>
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
                */
                
                    currentEvents.map(event => {
                        return (
                            
                            <div className='col block-event shadow bg-body rounded'>
                            <span className='row'>
                                <h4>{event.label}</h4>
                            </span>
                            <span className='row'>
                                <h5>`[${event.cityName}]`</h5>
                            </span>
                            <span className='row'>
                                <span className='col'>
                                    <img className='icon' src={userIco} alt='user icon'/>
                                    {event.nbParticipants}
                                </span>
                                <span className='col'>
                                    <Link to={'/eventDetails'}>voir</Link>
                                </span>
                            </span>
                        </div>
                          
                        );
                    })
                    
                }
                </div>
                        </div>
                <Pagination eventsPerPage={this.state.eventsPerPage} totalEvents={this.state.eventsToShow.length} paginate={paginate}/>
            </div>
        );
    }
}
