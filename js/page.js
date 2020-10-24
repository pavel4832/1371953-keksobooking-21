'use strict';

const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const map = document.querySelector(`.map`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const noticeForm = document.querySelector(`.ad-form`);
const allFields = document.querySelectorAll(`.ad-form fieldset, .map__filters select, .map__filters fieldset`);
const formFields = document.querySelectorAll(`.ad-form fieldset`);
const filterFields = document.querySelectorAll(`.map__filters select, .map__filters fieldset`);
const resetButton = document.querySelector(`.ad-form__reset`);
const avatarImage = noticeForm.querySelector(`.ad-form-header__preview img`);
const imagePlace = noticeForm.querySelector(`.ad-form__photo`);
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
  enableFormFields(filterFields);
};

const onResetPress = () => {
  window.deactivatePage();
  resetButton.removeEventListener(`click`, onResetPress);
};

const activatePage = () => {
  enableFormFields(formFields);
  map.classList.remove(`map--faded`);
  noticeForm.classList.remove(`ad-form--disabled`);
  window.form.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.HEIGHT);
  window.load(LOAD_URL, `GET`, onDataLoadSuccess, onDataLoadError);
  mapPinMain.removeEventListener(`mousedown`, onMouseLeftPress);
  mapPinMain.removeEventListener(`keydown`, onEnterPress);
  resetButton.addEventListener(`click`, onResetPress);
};

window.deactivatePage = () => {
  noticeForm.reset();
  avatarImage.src = `img/muffin-grey.svg`;
  imagePlace.innerHTML = ``;
  disableFormFields(allFields);
  window.form.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.OFFSET_X);
  map.classList.add(`map--faded`);
  noticeForm.classList.add(`ad-form--disabled`);
  mapPinMain.addEventListener(`mousedown`, onMouseLeftPress);
  mapPinMain.addEventListener(`keydown`, onEnterPress);
  window.pin.removePins();
  window.map.closeCard();
};
