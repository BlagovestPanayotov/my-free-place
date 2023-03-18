import { del, get, post, put } from './api.js';


const endpoints = {
    'getAll': '/classes/Destination',
    'getById': '/data/destinations/',
    'createItem': '/classes/Destination',
    'deleteItem': '/data/albums/',
    'editItem': '/data/albums/',
    'getCountries': '/classes/Country',
    'searchItems': (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`,
    // 'getMyItems': (userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    // 'addLike': '/data/likes',
    // 'getLikes': (itemId) => `/data/likes?where=theaterId%3D%22${itemId}%22&distinct=_ownerId&count`,
    // 'hasLiked': (itemId, userId) => `/data/likes?where=theaterId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    // 'getResentGames': '/data/games?sortBy=_createdOn%20desc&distinct=category&offset=0&pageSize=3',
    // 'getComments': (itemId) => `/data/comments?where=gameId%3D%22${itemId}%22`,
    // 'postComment':'/data/comments',
};

export function getCountries() {
    return get(endpoints.getCountries);
}

export function getAll() {
    return get(endpoints.getAll);
}

export function getById(itemId) {
    return get(endpoints.getById + itemId);
}

export function createItem(data, userId) {
    const destinationData = { ...data, owner: { __type: 'Pointer', className: '_User', objectId: userId } };
    return post(endpoints.createItem, destinationData);
}

// export function deleteItem(itemId) {
//     return del(endpoints.deleteItem + itemId);
// }

// export function editItem(itemId, data) {
//     return put(endpoints.editItem + itemId, data);
// }

// // export function getMyItems(userId) {
// //     return get(endpoints.getMyItems(userId));
// // }

// // // export function getResentGames() {
// // //     return get(endpoints.getResentGames);
// // // }

// // // export function getComments(itemId){
// // //     return get(endpoints.getComments(itemId));
// // // }

// // // export function postComment(data){
// // //     return post(endpoints.postComment,data);
// // // }

// // export function addLike(data) {
// //     return post(endpoints.addLike, data);
// // }

// // export function getLikes(itemId) {
// //     return get(endpoints.getLikes(itemId));
// // }

// // export function hasLiked(itemId, userId) {
// //     return get(endpoints.hasLiked(itemId, userId))
// // }

// export function searchItems(query){
//     return get(endpoints.searchItems(query));
// }

