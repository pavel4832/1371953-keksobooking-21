'use strict';

const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const MAP = document.querySelector(`.map`);
const MAP_PIN_MAIN = MAP.querySelector(`.map__pin--main`);
const NOTICE_FORM = document.querySelector(`.ad-form`);
const ALL_FIELDS = document.querySelectorAll(`.ad-form fieldset, .map__filters select, .map__filters fieldset`);
const FORM_FIELDS = document.querySelectorAll(`.ad-form fieldset`);
const FILTER_FIELDS = document.querySelectorAll(`.map__filters select, .map__filters fieldset`);
const RESET_BUTTON = document.querySelector(`.ad-form__reset`);
const MainPinDimensions = {
  WIDTH: 62,
  HEIGHT: 84,
  OFFSET_X: 31
};
window.pins = [];

const disableFormFields = (fields) => {
  fields.forEach((element) => {
    element.setAttribute(`disabled`, `disabled`);
  });
};

const enableFormFields = (fields) => {
  fields.forEach((element) => {
    element.removeAttribute(`disabled`);
  });
};

const onMouseLeftPress = (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
};

const onEnterPress = (evt) => {
  window.util.isEnterEvent(evt, () => {
    activatePage();
  });
};

const onDataLoadError = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const onDataLoadSuccess = (data) => {
  window.pins = data;
  window.pin.renderPins(data);
  enableFormFields(FILTER_FIELDS);
};

const onResetPress = () => {
  window.deactivatePage();
  RESET_BUTTON.removeEventListener(`click`, onResetPress);
};

const activatePage = () => {
  enableFormFields(FORM_FIELDS);
  MAP.classList.remove(`map--faded`);
  NOTICE_FORM.classList.remove(`ad-form--disabled`);
  window.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.HEIGHT);
  window.load(LOAD_URL, `GET`, onDataLoadSuccess, onDataLoadError);
  MAP_PIN_MAIN.removeEventListener(`mousedown`, onMouseLeftPress);
  MAP_PIN_MAIN.removeEventListener(`keydown`, onEnterPress);
  RESET_BUTTON.addEventListener(`click`, onResetPress);
};

window.deactivatePage = () => {
  NOTICE_FORM.reset();
  disableFormFields(ALL_FIELDS);
  window.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.OFFSET_X);
  MAP.classList.add(`map--faded`);
  NOTICE_FORM.classList.add(`ad-form--disabled`);
  MAP_PIN_MAIN.addEventListener(`mousedown`, onMouseLeftPress);
  MAP_PIN_MAIN.addEventListener(`keydown`, onEnterPress);
  window.pin.removePins();
  window.map.closeCard();
};
