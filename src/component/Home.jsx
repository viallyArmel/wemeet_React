import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Event from './Event';
import 'bootstrap/dist/css/bootstrap.min.css';
import { currentUser } from '../API/APIWemeet';
import { Link } from 'react-router-dom';
import Auth from '../contexts/Auth';

export const Home = () => {

    const [searchCityName, setSearchCityName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [titleEvent, setTitleEvent] = useState("");
    const { setIsAuthenticated } = useContext(Auth);

    useEffect(() => {

        const user = currentUser()?.value;
        
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        } else
            setIsAuthenticated(false);
    }, [setIsAuthenticated]);

    titleEvent === "" && setTitleEvent("title");

    return (
        <div>
            <Navbar />
            <div className='container-fluid'>
                <div className='body-home'>
                    <div className='row mb-3'>
                        <div className='container' id='titleHome'>
                            <h1>Salut {firstName} {lastName},</h1>
                            <h1>que veux-tu programmer ?</h1>
                        </div>
                    </div>
                    <div className="row mb-3" id="mini-form">
                        <div className="col col-sm-10">
                            <input type="text" onChange={(e) => setTitleEvent(e.target.value)} className="form-control form-control-sm" id="colFormLabelSm" placeholder="Titre de l'évènement" />
                        </div>
                        <div className="col">
                            <Link to={`/addEvent/${titleEvent}`}><button className='my-btn radius'>Créer</button></Link>
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
                                ((event) => setSearchCityName(event.target.value))
                            } />
                        </div>
                        <Event searchCityName={searchCityName.toLowerCase()} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}

export default Home;
