/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest(),
          arr =[],
          formData = new FormData();
    let url;

        if( options.method === 'GET') {
            if(options.data) {
            for (const [key, value] of Object.entries(options.data)) {
                arr.push(`${key} = ${value}`)
            }
            }
            url = `${options.url}?${arr.join('&')}`;

        } else {
            for (const [key, value] of Object.entries(options.data)) {
                formData.append(key, value);
            }
            url = `${options.url}`;

        }
        xhr.responseType = 'json';

        xhr.onload = () => {
            if (xhr.status < 400) {
                options.callback(xhr.error, xhr.response);
            } else {
                console.log(`Ошибка ${xhr.status}: ${xhr.statusText}.`);
            }
        }

    try{
            xhr.open(options.method,url)
            xhr.send(formData)
    }
    catch (e) {
        options.callback(e);
    }
};
