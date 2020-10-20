'use strict';

const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;
const PAGE = document.querySelector(`main`);
const MAP = document.querySelector(`.map`);
const MAP_PIN_MAIN = MAP.querySelector(`.map__pin--main`);
const SUCCESS_MESSAGE_TEMPLATE = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);
const ERROR_MESSAGE_TEMPLATE = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);
const NOTICE_FORM = document.querySelector(`.ad-form`);
const AVATAR_FIELD = NOTICE_FORM.querySelector(`#avatar`);
const AVATAR_IMAGE = NOTICE_FORM.querySelector(`.ad-form-header__preview img`);
const ADDRESS_FIELD = NOTICE_FORM.querySelector(`#address`);
const TYPE_FIELD = NOTICE_FORM.querySelector(`#type`);
const PRICE_FIELD = NOTICE_FORM.querySelector(`#price`);
const TIME_IN_FIELD = NOTICE_FORM.querySelector(`#timein`);
const TIME_OUT_FIELD = NOTICE_FORM.querySelector(`#timeout`);
const ROOM_FIELD = NOTICE_FORM.querySelector(`#room_number`);
const GUEST_FIELD = NOTICE_FORM.querySelector(`#capacity`);
const IMAGES_FIELD = NOTICE_FORM.querySelector(`#images`);
const IMAGE_PLACE = NOTICE_FORM.querySelector(`.ad-form__photo`);
const minApartmentsPrice = {
  palace: `10000`,
  flat: `1000`,
  house: `5000`,
  bungalow: `0`
};

window.fillAddressField = (offsetX, offsetY) => {
  let xLocation = parseInt(MAP_PIN_MAIN.style.left, 10) + offsetX;
  let yLocation = parseInt(MAP_PIN_MAIN.style.top, 10) + offsetY;
  ADDRESS_FIELD.value = `${xLocation}, ${yLocation}`;
};

const checkValidType = () => {
  let type = TYPE_FIELD.value;
  let minPrice = minApartmentsPrice[type];

  PRICE_FIELD.setAttribute(`placeholder`, minPrice);
  PRICE_FIELD.setAttribute(`min`, minPrice);
};

const checkValidGuest = () => {
  let roomNumber = ROOM_FIELD.value;
  let guestNumber = GUEST_FIELD.value;

  if (roomNumber === `100` && guestNumber !== `0`) {
    GUEST_FIELD.setCustomValidity(`Это жилье не для гостей. Измените выбор`);
  } else if (guestNumber === `0` && roomNumber !== `100`) {
    GUEST_FIELD.setCustomValidity(`Это жилье для размещения гостей. Измените выбор комнат`);
  } else if (roomNumber < guestNumber) {
    GUEST_FIELD.setCustomValidity(`Количество гостей превышает количество комнат. Уменьшите количество гостей`);
  } else {
    GUEST_FIELD.setCustomValidity(``);
  }
  GUEST_FIELD.reportValidity();
};

const checkValidTime = (timeSource, timeChange) => {
  const time = timeChange.options;

  time.forEach((element) => {
    element.removeAttribute(`selected`);
  });

  time[timeSource.selectedIndex].setAttribute(`selected`, `selected`);
};

const activateForm = () => {
  checkValidType();
  checkValidGuest();
};

const getTargetElement = () => {
  const error = PAGE.querySelector(`.error`);
  const success = PAGE.querySelector(`.success`);
  return error ? error : success;
};

const onPopupEscPress = (evt) => {
  window.util.isEscEvent(evt, () => {
    closePopup();
  });
};

const onEnterPress = (evt) => {
  window.util.isEnterEvent(evt, () => {
    closePopup();
  });
};

const onPopupOutsideClick = (evt) => {
  const ELEMENT = getTargetElement();

  evt.preventDefault();

  if (evt.target === ELEMENT) {
    closePopup();
  }
};

const closePopup = () => {
  const ELEMENT = getTargetElement();

  PAGE.removeChild(ELEMENT);
  document.removeEventListener(`keydown`, onPopupEscPress);
  document.removeEventListener(`click`, onPopupOutsideClick);
};

const onDataLoadSuccess = () => {
  const FRAGMENT = document.createDocumentFragment();
  const SUCCESS_MESSAGE = SUCCESS_MESSAGE_TEMPLATE.cloneNode(true);

  FRAGMENT.appendChild(SUCCESS_MESSAGE);
  PAGE.appendChild(FRAGMENT);

  document.addEventListener(`keydown`, onPopupEscPress);
  document.addEventListener(`click`, onPopupOutsideClick);
  window.deactivatePage();
};

const onDataLoadError = () => {
  const FRAGMENT = document.createDocumentFragment();
  const ERROR_MESSAGE = ERROR_MESSAGE_TEMPLATE.cloneNode(true);
  const TRY_AGAIN_BUTTON = ERROR_MESSAGE.querySelector(`.error__button`);

  FRAGMENT.appendChild(ERROR_MESSAGE);
  PAGE.appendChild(FRAGMENT);

  TRY_AGAIN_BUTTON.addEventListener(`click`, closePopup);
  TRY_AGAIN_BUTTON.addEventListener(`keydown`, onEnterPress);
  document.addEventListener(`keydown`, onPopupEscPress);
  document.addEventListener(`click`, onPopupOutsideClick);
};

const setImage = (evt, target) => {
  const FILE = evt.target.files[0];
  const READER = new FileReader();
  target.src = ``;

  READER.addEventListener(`load`, (event) => {
    target.src = event.target.result;
  });
  READER.readAsDataURL(FILE);
};

const getNewImage = (evt) => {
  let file = document.createElement(`img`);
  file.setAttribute(`height`, `100%`);
  file.setAttribute(`width`, `100%`);
  file.setAttribute(`alt`, `Фотография жилья`);
  file.style.borderRadius = `5px`;
  setImage(evt, file);
  return file;
};

activateForm();

AVATAR_FIELD.addEventListener(`change`, (evt) => {
  setImage(evt, AVATAR_IMAGE);
});

TYPE_FIELD.addEventListener(`change`, () => {
  checkValidType();
});

TIME_IN_FIELD.addEventListener(`change`, () => {
  checkValidTime(TIME_IN_FIELD, TIME_OUT_FIELD);
});

TIME_OUT_FIELD.addEventListener(`change`, () => {
  checkValidTime(TIME_OUT_FIELD, TIME_IN_FIELD);
});

GUEST_FIELD.addEventListener(`change`, () => {
  checkValidGuest();
});

ROOM_FIELD.addEventListener(`change`, () => {
  checkValidGuest();
});

IMAGES_FIELD.addEventListener(`change`, (evt) => {
  IMAGE_PLACE.innerHTML = ``;
  IMAGE_PLACE.appendChild(getNewImage(evt));
});

NOTICE_FORM.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  window.load(UPLOAD_URL, `POST`, onDataLoadSuccess, onDataLoadError, new FormData(NOTICE_FORM));
});
