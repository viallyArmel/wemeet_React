import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { login } from '../services/AuthApi';
import Auth from '../contexts/Auth';

const ConnexionPage = () => {

    const {isAuthenticated, setIsAuthenticated} = useContext(Auth);
    const [msgError, setMsgError] = useState("");
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = ({target}) => {
        const {name, value} = target;
        setUser({...user, [name] : value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const res = await login(user);
            
            if (res){
                setIsAuthenticated(res);
                window.location.replace('/home');
            }else {
                setMsgError("You are not Administrator !");
                setIsAuthenticated(false);
            }
        
        }catch(err){
            setMsgError(err.message);
        }
    }

    useEffect(() => {
        if (isAuthenticated){
            window.location.replace('/home');
        }
    }, [isAuthenticated]);
  
    return(
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
                        <form onSubmit={handleSubmit}>
                            
                            <div className='text-center row'> <h2>Connexion</h2> </div>
                            <div className='row input'>
                                <input type='email' placeholder='Adresse E-mail' className='form-control'
                                    id="email" name='email' required 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='row input'>
                                <input type='password' placeholder='Mot de passe' className='form-control'
                                    id="password" name='password' required 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='row input'>
                                <input type="submit" className='btn btn-dark' value="Connexion" />
                            </div>
                            {(msgError !== "") && (<div className='errorMessage'>
                                <div className="alert alert-danger" role="alert">
                                    {msgError}
                                </div>
                            </div>)}
                        </form>
                    </div>
                </div>
            </div>
            <div className='vide'></div>
            <Footer/>
        </div>
    );
    
}

export default ConnexionPage;
