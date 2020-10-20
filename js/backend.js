'use strict';

(function () {
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  window.load = (url, method, onSuccess, onError, data) => {
    const XHR = new XMLHttpRequest();
    XHR.responseType = `json`;

    XHR.addEventListener(`load`, () => {
      if (XHR.status === StatusCode.OK) {
        onSuccess(XHR.response);
      } else {
        onError(`Статус ответа: ${XHR.status} ${XHR.statusText}`);
      }
    });
    XHR.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    XHR.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${XHR.timeout}мс`);
    });

    XHR.timeout = TIMEOUT_IN_MS;

    XHR.open(method, url);

    if (data) {
      XHR.send(data);
    } else {
      XHR.send();
    }
  };
})();
