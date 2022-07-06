
import axios from "axios";
import { PREFIX_URL } from "../API/APIWemeet";
import jwtDecode from "jwt-decode";
import { addItem, getItem, removeItem } from "./LocaleStorage";


export const tokenName = 'wemeetToken';

export function hasAdminCredentials() {
    const token = getItem(tokenName);
    const { status } = jwtDecode(token);
    return status === "admin" && hasAuthenticated();
}

export function hasAuthenticated() {
    const token = getItem(tokenName);
    let isValid = false;

    token && (isValid = tokenIsValid(token));
    !isValid && removeItem(tokenName); 
    
    return isValid;
}


export const login = async (userInfos) => {
    try {
        const response = await axios.post(`${PREFIX_URL}user/login`, userInfos);
        const token = response.data;
        addItem(tokenName, token);
        const { status } = jwtDecode(token);
        return status === "admin" || "user";
    } catch (e) {
        return false;
    }
}

export function logout() {
    removeItem(tokenName);
}

function tokenIsValid(token) {
    const { exp } = jwtDecode(token);
    return exp * 1000 > new Date().getTime();
}

