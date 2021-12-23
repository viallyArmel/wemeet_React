import React, { Component } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Event from './Event';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Home extends Component {

    constructor (props){
        super(props);

        this.state = {
            searchCityName : "",
            callback : props.callback
        }
    }

    changeSearchValue (event) {
        this.setState({ searchCityName : event.target.value}, () => {
            this.state.callback(this.state.searchCityName);
        });
    }

    render() {

        console.log("Je suuis dans le render")

        return (
            <div>
                <Navbar />
                    <div className='container-fluid'>
                        <div className='body-home'>
                            <div className='row mb-3'>
                                <div className='container' id='titleHome'>
                                    <h1>Salut Vially dag,</h1>
                                    <h1>que veux-tu programmer ?</h1>
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
                                        (event) => this.changeSearchValue(event)
                                    }/>
                                </div>
                                <Event/>
                            </div>
                        </div>
                    </div>
                    <div className='vide'></div>
                <Footer />
            </div>
        );
    }
}
