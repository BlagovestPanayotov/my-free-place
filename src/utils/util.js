export function submitHandler(callback, values) {
    return (event) => {
        event.preventDefault();
        callback(values);
    };
}


