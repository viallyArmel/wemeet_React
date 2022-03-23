import axios from "axios";
import axiosRetry from 'axios-retry';
//import jwtDecode from "jwt-decode";
import { getItem } from "../services/LocaleStorage";
//import { hasAuthenticated, headerWithToken } from "../services/AuthApi";


const tokenName = 'wemeetToken';
let token = getItem(tokenName);

axiosRetry(axios, {
    retries : 3,
    retryDelay : axiosRetry.exponentialDelay
});

const PREFIX_URL = "http://localhost:3002/";

const getAllEvents = async () => {
    return await axios.get(`${PREFIX_URL}event/`);
};

const deleteEvent = async (id) => {

    return await axios({
        method : "delete",
        url : `${PREFIX_URL}event/`,
        data : {
            id : id,
            authorization : token
        }
    });
}



export {getAllEvents, PREFIX_URL, deleteEvent};