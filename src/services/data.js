/* eslint-disable quotes */
import { del, get, post, put } from './api.js';

// pagination for back4app => https://parseapi.back4app.com/classes/Destination?limit={1}&skip={0}
// count of collection => https://parseapi.back4app.com/classes/Destination?count=1&limit=0
//serch query => https://parseapi.back4app.com/classes/{collection name}?where=%7B%22{field name}%22%3A%7B%22%24regex%22%3A%22{text}%22%7D%7D

const ownerPointer = (userId) => ({ __type: 'Pointer', className: '_User', objectId: userId });
const destinationPointer = (destinationId) => ({ __type: 'Pointer', className: 'Destination', objectId: destinationId });
const commentPointer = (commentId) => ({ __type: 'Pointer', className: 'Comment', objectId: commentId });

const endpoints = {
    //destinations data
    'getAll': (skip) => `/classes/Destination/?count=1&include=owner&skip=${skip}&limit=6`,
    'getById': '/classes/Destination/',
    'createItem': '/classes/Destination',
    'deleteItem': '/classes/Destination/',
    'editItem': '/classes/Destination/',
    'getCountries': '/classes/Country',
    'searchItems': ({ destination, country }) => {
        const query = encodeURIComponent(JSON.stringify({
            "destination": {
                "$regex": destination
            },
            "country": {
                "$regex": country
            }
        }));

        return `/classes/Destination?where=${query}&count=1&include=owner&skip=0&limit=6`;
    },
    'getMyItems': (skip, userId) => {
        const query = encodeURIComponent(JSON.stringify({
            "owner": {
                "$regex": userId
            }
        }));

        return `/classes/Destination?count=1&where=${query}&include=owner&skip=${skip}&limit=6`;
    },

    //comments data
    'getComments': (skip, destinationId) => {
        //Kz8JWGaAcS owner
        //ZQcrzDGT6S destination
        const query = encodeURIComponent(JSON.stringify({
            "destination": {
                "$regex": destinationId
            }
        }));

        return `/classes/Comment?&count=1&where=${query}&skip=${skip}&limit=3`;
    },
    'postComment': '/classes/Comment',
    'deleteComent': (commentId) => `/classes/Comment/${commentId}`,

    //comments likes
    'getLikesComment': (commentId) => {
        const query = encodeURIComponent(JSON.stringify({
            "commentId": {
                "$regex": commentId
            }
        }));

        return `/classes/LikeComment?where=${query}&count=1`;
    },
    'hasLikedComment': (commentId, userId) => {
        const query = encodeURIComponent(JSON.stringify({
            "commentId": {
                "$regex": commentId
            },
            "ownerId": {
                "$regex": userId
            }
        }));
        return `/classes/LikeComment?where=${query}`;
    },
    'addLikeComment': '/classes/LikeComment',

    //destinations likes
    'getLikesDestination': (destinationId) => {
        const query = encodeURIComponent(JSON.stringify({
            "destinationId": {
                "$regex": destinationId
            }
        }));

        return `/classes/LikeDestination?where=${query}&count=1`;
    },
    'hasLikedDestination': (destinationId, userId) => {
        const query = encodeURIComponent(JSON.stringify({
            "destinationId": {
                "$regex": destinationId
            },
            "ownerId": {
                "$regex": userId
            }
        }));
        return `/classes/LikeDestination?where=${query}`;
    },
    'addLikeDestination': '/classes/LikeDestination',

    //user data

    'getUserData': (userId) => `/users/${userId}`

    // 'getMyItems': (userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    // 'addLike': '/data/likes',
    // 'getResentGames': '/data/games?sortBy=_createdOn%20desc&distinct=category&offset=0&pageSize=3',

};


//exports

export function getCountries() {
    return get(endpoints.getCountries);
}

export function getAll(page) {
    return get(endpoints.getAll(page));
}

export function getById(itemId) {
    return get(endpoints.getById + itemId);
}

export function createItem(data, user) {
    const destinationData = { ...data, owner: ownerPointer(user.objectId) };
    return post(endpoints.createItem, user, destinationData);
}

export function deleteItem(itemId, user) {
    return del(endpoints.deleteItem + itemId, user);
}

export function editItem(itemId, data, user) {
    const destinationData = { ...data, owner: ownerPointer(user.objectId) };
    return put(endpoints.editItem + itemId, user, destinationData);
}

export function getMyItems(skip, userId, user) {
    return get(endpoints.getMyItems(skip, userId), user);
}

export function searchItems(values, user) {
    return get(endpoints.searchItems(values), user);
}

export function getComments(skip,destinationId) {
    return get(endpoints.getComments(skip,destinationId));
}

export function postComment(data, user, destinationId) {
    const commentData = {
        ...data,
        owner: ownerPointer(user.objectId),
        destination: destinationPointer
            (destinationId)
    };
    return post(endpoints.postComment, user, commentData);
}

export function deleteComent(commentId, user) {
    return del(endpoints.deleteComent(commentId), user);
}

export function getLikesComment(commentId) {
    return get(endpoints.getLikesComment(commentId));
}

export function hasLikedComment(commentId, userId) {
    return get(endpoints.hasLikedComment(commentId, userId));
}

export function addLikeComment(commentId, user) {
    const data = {
        ownerId: ownerPointer(user.objectId),
        commentId: commentPointer(commentId)
    };
    return post(endpoints.addLikeComment, user, data);
}

export function getLikesDestination(destinationId) {
    return get(endpoints.getLikesDestination(destinationId));
}

export function hasLikedDestination(destinationId, userId) {
    return get(endpoints.hasLikedDestination(destinationId, userId));
}

export function addLikeDestination(destinationId, user) {
    const data = {
        ownerId: ownerPointer(user.objectId),
        destinationId: destinationPointer(destinationId)
    };
    return post(endpoints.addLikeDestination, user, data);
}

export function getUserData(user) {
    return get(endpoints.getUserData(user.objectId, user));
}


// // // export function getResentGames() {
// // //     return get(endpoints.getResentGames);
// // // }

// // export function addLike(data) {
// //     return post(endpoints.addLike, data);
// // }
