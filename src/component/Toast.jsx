import React, { useEffect } from "react";
import { useState } from 'react';
import '../style/components/eventForm.scss';
import checkIco from '../resources/icon/success.png';
import errorIco from '../resources/icon/alert.png';

//                              COMPOSANT NON UTILISé | remplacé par les modals

const Toast = ({title, message, isError }) => {
    const [icon] = useState({
        check : checkIco,
        error : errorIco
    });

    useEffect (() => {
        const elt = document.getElementById('liveToast');
        elt.style.visibility = 'visible';
        
       setTimeout(() => {
        elt.style.visibility = 'hidden';
       }, 2000);
    }, []);

    return (
        <div className="position-fixed bottom-0 end-0 p-3" >
            <div id="liveToast" className="toastLive" role="alert" aria-live="assertive" aria-atomic="true" >
                <div className="headToast">
                    <h4 className="me-auto"><strong>{title}</strong></h4>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                   { message }
                   <span><img src={isError ? icon.error : icon.check} alt="icon" /></span>
                </div>
            </div>
        </div>
    );
}
export default Toast;