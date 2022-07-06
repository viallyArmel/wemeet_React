import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {getAllUsers} from '../API/APIWemeet';
import {hasAdminCredentials} from '../services/AuthApi';
import '../style/components/modal.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/components/userList.scss';

const UserList = () => {
    const [isAdmin, setIsAdmin] = useState(hasAdminCredentials());
    const [users, setUsers] = useState([]);

   useEffect(() => {
       if(isAdmin) {
           getAllUsers()
               .then(res => res.data)
               .then(data => setUsers(data))
               .catch(e => console.error(e));
       } else {
           window.location.replace('/home');
       }
   }, []);

    return (
        <div>
            <Navbar/>
            <div className="background">
                <h1 className="pt-3 pb-3">Admin zone - user list</h1>
            </div>
            <div id="userGrid">
                <div className="titles grid">
                    <div>Id</div>
                    <div>First name</div>
                    <div>Last name</div>
                    <div>Email</div>
                    <div>Address</div>
                    <div>Postal code</div>
                </div>
                {users.map(user => {
                    return (
                        <div className="user grid">
                            <div>{user.id}</div>
                            <div>{user.first_name}</div>
                            <div>{user.last_name}</div>
                            <div>{user.email}</div>
                            <div>{user.address}</div>
                            <div>{user.postal_code}</div>
                        </div>
                    );
                })}
            </div>
            <Footer/>
        </div>
    )
}

export default UserList;