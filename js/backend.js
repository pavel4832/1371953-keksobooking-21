'use strict';

const TIMEOUT_IN_MS = 10000;
const StatusCode = {
  OK: 200
};

window.load = (url, method, onSuccess, onError, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(method, url);

  if (data) {
    xhr.send(data);
  } else {
    xhr.send();
  }
};
