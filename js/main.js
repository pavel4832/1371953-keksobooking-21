'use strict';

(function () {
  const MAP_PIN_MAIN = window.data.MAP.querySelector(`.map__pin--main`);

  const enableFormFields = function (fields) {
    for (let i = 0; i < fields.length; i++) {
      fields[i].removeAttribute(`disabled`);
    }
  };

  const onMouseLeftPress = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  const onEnterPress = function (evt) {
    if (evt.key === `Enter`) {
      activatePage();
    }
  };

  const activatePage = function () {
    enableFormFields(window.data.FORM_FIELDS);
    window.data.MAP.classList.remove(`map--faded`);
    window.data.NOTICE_FORM.classList.remove(`ad-form--disabled`);
    window.activateForm();
    window.showMap();

    MAP_PIN_MAIN.removeEventListener(`mousedown`, onMouseLeftPress);
    MAP_PIN_MAIN.removeEventListener(`keydown`, onEnterPress);
  };

  MAP_PIN_MAIN.addEventListener(`mousedown`, onMouseLeftPress);
  MAP_PIN_MAIN.addEventListener(`keydown`, onEnterPress);
})();
