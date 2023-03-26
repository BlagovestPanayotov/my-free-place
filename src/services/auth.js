import { get, post, put } from './api.js';

const endpoints = {
    'login': '/login',
    'register': '/users',
    'logout': '/users/me',
    'update': (userId) => `/users/${userId}`
};

export async function login({ username, password }) {
    const { objectId, sessionToken } = await post(endpoints.login, undefined, { username, password });
    const user = {
        sessionToken,
        objectId,
        username
    };
    return user;
}

export async function register({ email, username, password }) {
    const { sessionToken, objectId } = await post(endpoints.register, undefined, { email, username, password });
    const user = {
        sessionToken,
        objectId,
        username
    };
    return user;
}

export async function logout(user) {
    await get(endpoints.logout, user);
    return null;
}

export async function updateUser(user, data) {
    await put(endpoints.update(user.objectId), user, data);
    return;
}
