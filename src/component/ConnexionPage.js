import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


import Footer from './Footer';

class ConnexionPage extends React.Component {

  
    render() {
        return (
            <div className='body'>
                <div className='container-fluid main-page'>
                <span className='leftPosition'><Link to={'/sign'}>Créer un compte</Link></span>
                    <div className='container-fluid'>
                        <div className='blockTitleLogo'>
                            <div className='container-fluid spaceTitle radius'>
                                <div className='titleLogo'>
                                    <h1>WeMeet</h1>
                                </div>
                            </div>
                        </div>
                        <div className='col form-group block-border col-md-6 col-md-offset-3'>
                            <div className='text-center row'> <h2>Connexion</h2> </div>
                            <div className='row input'>
                                <input type='email' placeholder='Adresse E-mail' className='form-control'/>
                            </div>
                            <div className='row input'>
                                <input type='password'placeholder='Mot de passe' className='form-control'/>
                            </div>
                            <div className='row input'>
                                <button className='btn btn-dark'>Connexion</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='vide'></div>
                <Footer/>
                
            </div>
        );
    }
}

export default ConnexionPage;
