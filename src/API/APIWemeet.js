import axios from "axios";
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
    retries : 3,
    retryDelay : axiosRetry.exponentialDelay
});

const PREFIX_URL = "http://localhost:3001/";

const getAllEvents = async () => {
    return await axios.get(`${PREFIX_URL}event/`)
};


export default getAllEvents;