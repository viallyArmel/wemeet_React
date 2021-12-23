import React, { Component } from 'react';
import getAllEvents from '../API/APIWemeet';
//import ReactPaginate from 'react-paginate';
import Pagination from './Pagination';
import EventBlock from './EventBlock';


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
        this.setState({loading : true});
       
        getAllEvents().then(res => res.data).then(data => {
            this.setState({
                events : data,
                eventsToShow : data
            });
        });

        this.setState({loading : false});
    }

    
    render() {
        const indexOfLastEvent = this.state.currentPage * this.state.eventsPerPage;
        const indexOfFirstEvent = indexOfLastEvent - this.state.eventsPerPage;
        const currentEvents = this.state.eventsToShow.slice(indexOfFirstEvent, indexOfLastEvent);

        const paginate = (numPage) => this.setState({currentPage : numPage});

        return (
            <div className='container'>
                <EventBlock events={currentEvents} loading={this.state.loading} />
                <Pagination eventsPerPage={this.state.eventsPerPage} totalEvents={this.state.events.length} paginate={paginate} />
            </div>
        );
    }
}
