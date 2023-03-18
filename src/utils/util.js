export function submitHandler(callback,values) {
    return (event) => {
        event.preventDefault();
        const formData = values;
        
        callback(formData, event.target);
    };
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('user'));
}

export function setUserData(data) {
    sessionStorage.setItem('user', JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem('user');
}

