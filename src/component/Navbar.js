import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import userIco from '../resources/icon/user.png';
import homeIco from '../resources/icon/home.png';
import mailIco from '../resources/icon/mail.png';
import offIco from '../resources/icon/off.png';
import eventAvailableIco from '../resources/icon/event-available.png';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

    constructor (props){
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <nav className="navbar navbar-light">
                <div className="container-fluid light-gold-color" id="bar">
                    <Link className="navbar-brand" to={"/home"}>WeMeet</Link>
                    <div className='row' id='compte'>
                        <div className='col'>Compte</div>
                        <div className='col'>
                            <div className='gold-color my-nav-item'>
                                <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                    VA
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='gold-color'>
                        <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header gold-color">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body light-gold-color">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={'/home'}>
                                        <div className='ico'><img className='icon' src={homeIco} alt='home icon'/>Accueil</div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to={'/event'}>
                                        <div className='ico'><img className='icon' src={eventAvailableIco} alt='event icon'/>Créer un évènement</div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active dropdown-toggle" to={'#'} id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div className='ico'><img className='icon' src={userIco} alt='user icon'/>Utilisateurs</div>
                                    </Link>
                                    <ul className='dropdown-menu' aria-labelledby="offcanvasNavbarDropdown">
                                        <li className='light-gold-color'><Link className="dropdown-item" to="#">Ajouter</Link></li>
                                        <li className='light-gold-color'><Link className="dropdown-item" to="#">Liste</Link></li>
                                    </ul>
                                </li>
                                <hr/>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/login'}>
                                        <div className='ico'><img className='icon' src={offIco} alt='disconnect icon'/>Déconnexion</div>
                                    </Link>
                                </li>
                                <div className='div-footer'>
                                    <hr/>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to={'contactForm'}>
                                            <div className='ico'><img className='icon' src={mailIco} alt='contact icon'/>Conctatez-nous</div>
                                        </Link>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
