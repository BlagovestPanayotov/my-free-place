export function submitHandler(callback, values) {
    return (event) => {
        event.preventDefault();
        callback(values);
    };
}

export function onBackClick(e, navigate) {
    e.preventDefault();
    navigate(-1);
}

