import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import userIco from '../resources/icon/user.png';
import homeIco from '../resources/icon/home.png';
import mailIco from '../resources/icon/mail.png';
import offIco from '../resources/icon/off.png';
import addUserIco from '../resources/icon/add-user.png';
import listUserIco from '../resources/icon/list.png';
import eventAvailableIco from '../resources/icon/event-available.png';
import { Link } from 'react-router-dom';
import Auth from '../contexts/Auth';
import { logout, tokenName, hasAdminCredentials } from '../services/AuthApi';
import jwtDecode from 'jwt-decode';
import { getItem } from '../services/LocaleStorage';


const Navbar = () => {
    const {isAuthenticated, setIsAuthenticated} = useContext(Auth);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [isAdmin, setIsAdmin] = useState(hasAdminCredentials());

    useEffect (() => {
        const token = getItem(tokenName);
        if (token !== null){
            const {value} = jwtDecode(token);
            setLastName(value.lastName);
            setFirstName(value.firstName);
        }
    }, []);

    const getFirstLetter = () => {
        return (firstName.substring(0, 1) + lastName.substring(0, 1)).toUpperCase();
    }

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
    }
   
    return (
        <nav className="navbar navbar-light">
            <div className="container-fluid light-gold-color" id="bar">
                <Link className="navbar-brand" to={"/home"}>WeMeet</Link>
                <div className='row' id='compte'>
                  { (!isAuthenticated && (
                    <>
                        <span>Nous sommes ravis de faire votre connaissance !</span>
                    </>
                    )) || (
                        <>
                            <Link className='col' to={'/myAccount'}>Compte</Link>
                            <div className='col'>
                                <div className='gold-color my-nav-item'>
                                    <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                        {getFirstLetter()}
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                  }
                </div>
                <div className='gold-color'>
                    <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
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
                                <Link className="nav-link active" to={`/addEvent/title`}>
                                    <div className='ico'><img className='icon' src={eventAvailableIco} alt='event icon'/>Créer un évènement</div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <div className='ico  active dropdown-toggle' data-bs-toggle="dropdown">
                                    <img className='icon' src={userIco} alt='user icon'/>
                                    Utilisateurs
                                </div>
                        
                                <ul className='dropdown-menu menuUser' aria-labelledby="offcanvasNavbarDropdown">
                                    <li className='light-gold-color menuUserItem'>
                                        <Link className="dropdown-item" to="/sign">
                                        <img className='icon' src={addUserIco} alt='add user icon'/>
                                            Ajouter
                                        </Link>
                                    </li>
                                    <li className='light-gold-color menuUserItem'>
                                        {isAdmin ?
                                            <Link className="dropdown-item" to={"/users"}>
                                                <img className='icon' src={listUserIco} alt='list user icon'/>
                                                Liste
                                            </Link> : <></>
                                        }
                                    </li>
                                </ul>
                            </li>
                            <hr/>
                            <li className="nav-item">
                                <Link onClick={handleLogout} className="nav-link" to={'/login'}>
                                    <div className='ico'><img className='icon' src={offIco} alt='disconnect icon'/>Déconnexion</div>
                                </Link>
                            </li>
                            <div className='div-footer'>
                                <hr/>
                                <li className="nav-item">
                                    <Link className="nav-link active" to={'/contactForm'}>
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

export default Navbar;

