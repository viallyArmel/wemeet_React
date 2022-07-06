import axios from "axios";
import axiosRetry from 'axios-retry';
import jwtDecode from "jwt-decode";
import { hasAuthenticated } from "../services/AuthApi";
import { getItem } from "../services/LocaleStorage";

const tokenName = 'wemeetToken';
let token = getItem(tokenName);

axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay
});

const PREFIX_URL = "http://localhost:3001/";

//eventRole
const getEventRoles = async (eventId) => {
    return await axios.get(`${PREFIX_URL}eventRole/${eventId}`);
}


//calendar
const getCalendars = async (id) => {
    return await axios.get(`${PREFIX_URL}calendar/${id}`);
}
const createCalendar = async ({eventId, date}) => {
    return await axios({
        method: 'post',
        url: `${PREFIX_URL}calendar/`,
        data: {
            eventId, date,
        },
        headers : {
            Authorization : "Bearer " + token
        }
    });
}
const updateCalendar = async ({eventId, oldDate, newDate}) => {
    return await axios({
        method: 'patch',
        url: `${PREFIX_URL}calendar/`,
        data: {
            eventId, oldDate, newDate,
        },
        headers : {
            Authorization : "Bearer " + token
        }
    });
}
const deleteCalendar = async ({eventId, date}) => {
    return await axios({
        method: 'delete',
        url: `${PREFIX_URL}calendar/`,
        data : {
            eventId, date,
        },
        headers : {
            Authorization : "Bearer " + token
        }
    });
}

//surveyLine
const createSurveyLine = async ({survey, label, nbVotes, role}) => {
    return await axios({
        method : 'post',
        url : `${PREFIX_URL}surveyLine/`,
        data : {
            survey,
            label, nbVotes, role,
        },
        headers : {
            Authorization : "Bearer " + token
        }
    });
}

const updateSurveyLine = async ({lineNumber, survey, label, nbVotes}) => {
    return await axios({
        method : 'patch',
        url : `${PREFIX_URL}surveyLine/`,
        data : {
            lineNumber,
            survey,
            label, nbVotes,
        },
        headers : {
            Authorization : "Bearer " + token
        }
    });
}

const deleteSurveyLine = async ({lineNumber, survey, role}) => {
    return await axios({
        method : 'delete',
        url : `${PREFIX_URL}surveyLine/`,
        data : {
            lineNumber,
            survey,
            role,
        },
        headers : {
            Authorization : "Bearer " + token
        }
    });
}

//survey
const getSurveys = async (eventId) => {
    return await axios.get(`${PREFIX_URL}survey/${eventId}`);
}
const updateSurvey = async ({id, label, description, role}) => {
    return await axios({
        method : 'patch',
        url : `${PREFIX_URL}survey/`,
        data : {
            id, label, description, role,
        },
        headers : {
            Authorization : "Bearer " + token
        }
    });
}
const deleteSurvey = async ({id, role}) => {
    return await axios({
        method : 'delete',
        url : `${PREFIX_URL}survey/`,
        data : {
            id, role,
        },
        headers : {
            Authorization : "Bearer " + token
        }
    });
}

const createSurvey = async ({label, description, event, role}) => {
    return await axios({
        method: "post",
        url: `${PREFIX_URL}survey/`,
        data : {
            label, description, event, role,
        },
        headers : {
            Authorization : "Bearer " + token
        }
    })
}

//user
export const currentUser = () => {
    return hasAuthenticated() ? jwtDecode(token) : null;
}

const getUser = async (id) => {
    return await axios({
        method: "get",
        url: `${PREFIX_URL}user/${id}`,
        headers : {
            Authorization : "Bearer " + token
        }
    });
}

const getAllUsers = async () => {
    return await axios({
        method: "get",
        url: `${PREFIX_URL}user/all`,
        headers : {
            Authorization : "Bearer " + token
        }
    });
}

//event
const getEvent = async (id) => {
    return await axios.get(`${PREFIX_URL}event/${id}`);
}

const getAllEvents = async () => {
    return await axios.get(`${PREFIX_URL}event/`);
};

const deleteEvent = async (id) => {

    return await axios({
        method: "delete",
        url: `${PREFIX_URL}event/`,
        data: {
            id: id,
        },
        headers : {
            Authorization : "Bearer " + token
        }
    });
}

const updateEvent = async (id, label, cityName, description, isPrivate) => {
    return await axios({
        method: "patch",
        url: `${PREFIX_URL}event/`,
        data: {
            id, label, cityName, description, isPrivate,
        },
        headers : {
            Authorization : "Bearer " + token
        }
    });
}
const createEvent = async ({ email, label, cityName, isPrivate, description }) => {
    
    return await axios({
        method: "post",
        url: `${PREFIX_URL}event/`,
        data: {
            email,
            label,
            cityName,
            isPrivate,
            description,
        },
        headers : {
            Authorization : "Bearer " + token
        }
    });
}

const createUser = async ({firstName, lastName, email, password, address, postalCode}) => {
    return await axios({
       method: "post",
       url: `${PREFIX_URL}user/`,
       data: {
           firstName,
           lastName,
           email,
           password,
           address,
           postalCode
       },
        headers : {
           Authorization : "Bearer " + token
        }
    });
}


export {
    getAllEvents, PREFIX_URL, deleteEvent, createEvent, getEventRoles,
    getUser, getAllUsers, createUser, getEvent, getSurveys, createSurvey, getCalendars,
    updateEvent, deleteCalendar, updateCalendar, createCalendar, 
    updateSurvey, deleteSurvey,
    createSurveyLine, deleteSurveyLine, updateSurveyLine,
};