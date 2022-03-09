import React, { Component } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Event from './Event';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getItem } from '../services/LocaleStorage';
import { tokenName } from '../services/AuthApi';
import jwtDecode from 'jwt-decode';


export default class Home extends Component {

    constructor (props){
        super(props);

        this.state = {
            searchCityName : "",
            firstName : "",
            lastName : ""
        }
    }

    componentDidMount(){
        const token = getItem(tokenName);
        if (token !== null){
            const {value} = jwtDecode(token);
            this.setState({firstName : value.firstName, lastName : value.lastName});
        }
    }

    messageAccueil(){
        return (
            <>
                <h1>Salut {this.state.firstName} {this.state.lastName},</h1>
                <h1>que veux-tu programmer ?</h1>
            </>
        )
    }

    changeSearchValue (event) {
        this.setState({ searchCityName : event.target.value});
    }

    render() {
        return (
            <div>
                <Navbar />
                    <div className='container-fluid'>
                        <div className='body-home'>
                            <div className='row mb-3'>
                                <div className='container' id='titleHome'>
                                    {this.messageAccueil()}
                                </div>
                            </div>
                            <div className="row mb-3" id="mini-form">
                                <div className="col col-sm-10">
                                    <input type="text" className="form-control form-control-sm" id="colFormLabelSm" placeholder="Titre de l'évènement"/>
                                </div>
                                <div className="col">
                                    <button className='my-btn radius'>Créer</button>
                                </div> 
                            </div>
                        </div>
                        <div className='container'>
                            <div className='container-fluid'>
                                <nav className='row'>
                                    <div className='col col-sm-6 item-event text-center'>
                                        <span><h3>Tous les évènements</h3></span>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <div>
                            <div className='row'>
                                <h5 className='col col-sm-3'><label><strong>Trier par ville :</strong></label></h5>
                                <div className='col col-sm-4'>
                                    <input type='text' placeholder='ex: namur' className='form-control shadow bg-body rounded' onChange={
                                        ((event) => this.changeSearchValue(event))
                                    }/>
                                </div>
                                <Event searchCityName={this.state.searchCityName} />
                            </div>
                        </div>
                    </div>
                    <div className='vide'></div>
                <Footer />
            </div>
        );
    }
}
