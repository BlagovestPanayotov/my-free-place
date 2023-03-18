// import { clearUserData, setUserData } from '../utils/util.js';
import { get, post } from './api.js';

const endpoints = {
    'login': '/users/login',
    'register': '/users',
    'logout': '/users/logout',
};

export async function login(email, password) {
    const { username, objecId, sessionToken } = await post(endpoints.login, { email, password });
    return {
        sessionToken,
        objecId,
        username,
        password
    };
}

export async function register({email, username, password}) {
    const { sessionToken, objecId } = await post(endpoints.register, { email, username, password });

    return {
        sessionToken,
        objecId,
        username,
        password
    };
}

export async function logout() {
    get(endpoints.logout);
    return null;
}
