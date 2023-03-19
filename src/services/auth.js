import { clearUserData, setUserData } from '../utils/util.js';
import { get, post } from './api.js';

const endpoints = {
    'login': '/login',
    'register': '/users',
    'logout': '/users/me',
};

export async function login({ username, password }) {
    const { objectId, sessionToken } = await post(endpoints.login, { username, password });
    const user = {
        sessionToken,
        objectId,
        username
    };
    return user;
}

export async function register({ email, username, password }) {
    const { sessionToken, objectId } = await post(endpoints.register, { email, username, password });
    const user = {
        sessionToken,
        objectId,
        username
    };
    return user;
}

export async function logout(user) {
    // clearUserData();
    await get(endpoints.logout,undefined,user);
    return null;
}
