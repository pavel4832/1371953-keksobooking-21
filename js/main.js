'use strict';

(function () {
  const MAP = document.querySelector(`.map`);
  const MAP_PIN_MAIN = MAP.querySelector(`.map__pin--main`);
  const NOTICE_FORM = document.querySelector(`.ad-form`);
  const FORM_FIELDS = document.querySelectorAll(`.map__filters select, .map__filters fieldset, .ad-form fieldset`);
  const MainPinDimensions = {
    WIDTH: 62,
    HEIGHT: 84,
    OFFSET_X: 31
  };

  const disableFormFields = function (fields) {
    for (let i = 0; i < fields.length; i++) {
      fields[i].setAttribute(`disabled`, `disabled`);
    }
  };

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
    const PINS = window.getPins();

    enableFormFields(FORM_FIELDS);
    MAP.classList.remove(`map--faded`);
    NOTICE_FORM.classList.remove(`ad-form--disabled`);
    window.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.HEIGHT);
    window.renderPins(PINS);
    MAP_PIN_MAIN.removeEventListener(`mousedown`, onMouseLeftPress);
    MAP_PIN_MAIN.removeEventListener(`keydown`, onEnterPress);
  };

  disableFormFields(FORM_FIELDS);
  window.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.OFFSET_X);
  MAP_PIN_MAIN.addEventListener(`mousedown`, onMouseLeftPress);
  MAP_PIN_MAIN.addEventListener(`keydown`, onEnterPress);
})();
