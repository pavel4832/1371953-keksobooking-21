'use strict';

(function () {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const MAP = document.querySelector(`.map`);
  const MAP_PIN_MAIN = MAP.querySelector(`.map__pin--main`);
  const NOTICE_FORM = document.querySelector(`.ad-form`);
  const FORM_FIELDS = document.querySelectorAll(`.ad-form fieldset`);
  const FILTER_FIELDS = document.querySelectorAll(`.map__filters select, .map__filters fieldset`);
  const RESET_BUTTON = document.querySelector(`.ad-form__reset`);
  const MainPinDimensions = {
    WIDTH: 62,
    HEIGHT: 84,
    OFFSET_X: 31
  };
  const FILTER = document.querySelector(`.map__filters`);
  const TYPE_FIELD = FILTER.querySelector(`#housing-type`);
  let houseType = TYPE_FIELD.value;
  let pins = [];

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

  const updatePins = function () {
    window.pin.removePins();
    window.map.closeCard();
    if (houseType !== `any`) {
      window.pin.renderPins(pins.filter(function (pin) {
        return pin.offer.type === houseType;
      }));
    } else {
      window.pin.renderPins(pins);
    }
  };

  window.filter.setTypeChangeHandler(function (value) {
    houseType = value;
    updatePins();
  });

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

  const successHandler = function (data) {
    pins = data;
    updatePins();
    enableFormFields(FILTER_FIELDS);
  };

  const activatePage = function () {
    enableFormFields(FORM_FIELDS);
    MAP.classList.remove(`map--faded`);
    NOTICE_FORM.classList.remove(`ad-form--disabled`);
    window.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.HEIGHT);
    window.load(LOAD_URL, `GET`, successHandler, errorLoadHandler);
    MAP_PIN_MAIN.removeEventListener(`mousedown`, onMouseLeftPress);
    MAP_PIN_MAIN.removeEventListener(`keydown`, onEnterPress);
    RESET_BUTTON.addEventListener(`click`, resetPage);
  };

  window.deactivatePage = function () {
    NOTICE_FORM.reset();
    disableFormFields(FORM_FIELDS);
    disableFormFields(FILTER_FIELDS);
    window.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.OFFSET_X);
    MAP.classList.add(`map--faded`);
    NOTICE_FORM.classList.add(`ad-form--disabled`);
    MAP_PIN_MAIN.addEventListener(`mousedown`, onMouseLeftPress);
    MAP_PIN_MAIN.addEventListener(`keydown`, onEnterPress);
    window.pin.removePins();
    window.map.closeCard();
  };

  const resetPage = function (evt) {
    evt.preventDefault();
    window.deactivatePage();
    RESET_BUTTON.removeEventListener(`click`, resetPage);
  };

  window.deactivatePage();
  window.scrollTo(0, 0);
})();
