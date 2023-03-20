export function submitHandler(callback, values) {
    return (event) => {
        event.preventDefault();
        callback(values);
    };
}

const user = {};

export function getUserData() {
    return user;
}

export function setUserData(data) {
    user = {...data};
}

export function clearUserData() {
    user = {};
}

