import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";
import { Link } from "react-router-dom";



const Footer = () => {
  
    return (
        <div className="footer section text-center">
            <div className="container">
                <ul className="footer-item">
                    <Link to={'/about'}>
                        <li>A propos de nous</li>
                    </Link>
                    <Link to={'/confidentiality'}>
                        <li>Déclaration de confidentialité</li>
                    </Link>
                    <Link to={'/contact'}>
                        <li>Contact</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default Footer;

