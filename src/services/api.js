import { clearUserData, getUserData } from '../utils/util.js';

const host = 'https://parseapi.back4app.com';
const appId = '7lsh5rhmA2IVHfHGm1lbZ5kA9hZBWVbAjABErazj';
const apiKey = 'nvZyKVTNAPJhHeVBA9ITJEugXEBKIMNjiJxKLIHn';

async function request(method, url='/', body) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-JavaScript-Key': apiKey 
        }
    };

    if (body !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    const user = getUserData();
    if (user) {
        options.headers['X-Parse-Session-Token'] = user.sessionToken;
    }

    try {
        const response = await fetch(host + url, options);

        if (response.status === 204) {
            return response;
        }

        const result = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                clearUserData();
            }
            throw new Error(result.message || result.error);
        }

        return result;

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');