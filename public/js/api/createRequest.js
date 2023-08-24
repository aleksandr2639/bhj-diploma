/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest(),
          arr =[],
          formData = new FormData();
    let url;

    try {
        if( options.method === 'GET') {
            for (const [key, value] of Object.entries(options.data)) {
                arr.push(`${key} = ${value}`)
            }
            url = `${options.url}?${arr.join('&')}`;
            xhr.open(options.method, url);
            xhr.send();
        } else {
            for (const [key, value] of Object.entries(options.data)) {
                formData.append(key, value);
            }
            url = `${options.url}`;
            xhr.open(options.method, url);
            xhr.send(formData);
        }
        xhr.responseType = 'json';

        xhr.onload = () => {
            if (xhr.status < 400) {
                options.callback(xhr.error, xhr.response);
            } else {
                console.error(`Ошибка ${xhr.status}: ${xhr.statusText}.`);
            }
        }
    }
    catch (e) {
        options.callback(e);
    }
};
