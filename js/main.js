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
    window.util.isEnterEvent(evt, activatePage);
  };

  const errorLoadHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const activatePage = function () {
    enableFormFields(FORM_FIELDS);
    MAP.classList.remove(`map--faded`);
    NOTICE_FORM.classList.remove(`ad-form--disabled`);
    window.form.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.HEIGHT);
    window.backend.load(window.pin.renderPins, errorLoadHandler);
    MAP_PIN_MAIN.removeEventListener(`mousedown`, onMouseLeftPress);
    MAP_PIN_MAIN.removeEventListener(`keydown`, onEnterPress);
  };

  const deactivatePage = function () {
    disableFormFields(FORM_FIELDS);
    window.form.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.OFFSET_X);
    MAP.classList.add(`map--faded`);
    NOTICE_FORM.classList.add(`ad-form--disabled`);
    MAP_PIN_MAIN.addEventListener(`mousedown`, onMouseLeftPress);
    MAP_PIN_MAIN.addEventListener(`keydown`, onEnterPress);
    window.pin.removePins();
  };

  deactivatePage();

  NOTICE_FORM.addEventListener(`submit`, function (evt) {
    evt.preventDefault();

    window.backend.upload(new FormData(NOTICE_FORM), window.form.successHandler, window.form.errorUploadHandler);
    deactivatePage();
  });
})();
