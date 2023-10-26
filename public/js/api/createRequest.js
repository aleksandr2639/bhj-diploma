/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    const xhr = new XMLHttpRequest();
    options.method === "GET";
    let url = `${options.url}` + "?";
    for (let value in options.data) {
        url += `${value}=${options.data[value]}&`;
    }
    const formData = new FormData();
    for (let value in options.data) {
        formData.append(value, options.data[value]);
    }
    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    } catch (e) {
        options.callback(e);
    }

    xhr.responseType = 'json';

    xhr.onload = () => {
        if (xhr.status === 200) {
            options.callback(xhr.err, xhr.response);
        }
    };
    xhr.onerror = () => {
        options.callback(xhr.response.error, xhr.response);
    };
};
