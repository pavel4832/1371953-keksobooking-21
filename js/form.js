'use strict';

const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const page = document.querySelector(`main`);
const map = document.querySelector(`.map`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const successMessageTemplate = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);
const errorMessageTemplate = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);
const noticeForm = document.querySelector(`.ad-form`);
const avatarField = noticeForm.querySelector(`#avatar`);
const avatarImage = noticeForm.querySelector(`.ad-form-header__preview img`);
const addressField = noticeForm.querySelector(`#address`);
const typeField = noticeForm.querySelector(`#type`);
const priceField = noticeForm.querySelector(`#price`);
const timeInField = noticeForm.querySelector(`#timein`);
const timeOutField = noticeForm.querySelector(`#timeout`);
const roomsField = noticeForm.querySelector(`#room_number`);
const guestsField = noticeForm.querySelector(`#capacity`);
const imagesField = noticeForm.querySelector(`#images`);
const imagePlace = noticeForm.querySelector(`.ad-form__photo`);
const MinApartmentsPrice = {
  PALACE: `10000`,
  FLAT: `1000`,
  HOUSE: `5000`,
  BUNGALOW: `0`
};

window.fillAddressField = (offsetX, offsetY) => {
  const xLocation = parseInt(mapPinMain.style.left, 10) + offsetX;
  const yLocation = parseInt(mapPinMain.style.top, 10) + offsetY;
  addressField.value = `${xLocation}, ${yLocation}`;
};

const checkValidType = () => {
  const type = typeField.value;
  const minPrice = MinApartmentsPrice[type.toUpperCase()];

  priceField.setAttribute(`placeholder`, minPrice);
  priceField.setAttribute(`min`, minPrice);
};

window.checkValidGuest = () => {
  const roomNumber = roomsField.value;
  const guestNumber = guestsField.value;

  if (roomNumber === `100` && guestNumber !== `0`) {
    guestsField.setCustomValidity(`Это жилье не для гостей. Измените выбор`);
  } else if (guestNumber === `0` && roomNumber !== `100`) {
    guestsField.setCustomValidity(`Это жилье для размещения гостей. Измените выбор комнат`);
  } else if (roomNumber < guestNumber) {
    guestsField.setCustomValidity(`Количество гостей превышает количество комнат. Уменьшите количество гостей`);
  } else {
    guestsField.setCustomValidity(``);
  }
  guestsField.reportValidity();
};

const checkValidTime = (timeSource, timeChange) => {
  const time = timeChange.options;

  for (let i = 0; i < time.length; i++) {
    time[i].removeAttribute(`selected`);
  }

  time[timeSource.selectedIndex].setAttribute(`selected`, `selected`);
};

const getTargetElement = () => {
  const error = page.querySelector(`.error`);
  const success = page.querySelector(`.success`);
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
  const element = getTargetElement();

  evt.preventDefault();

  if (evt.target === element) {
    closePopup();
  }
};

const closePopup = () => {
  const element = getTargetElement();

  page.removeChild(element);
  document.removeEventListener(`keydown`, onPopupEscPress);
  document.removeEventListener(`click`, onPopupOutsideClick);
};

const onDataLoadSuccess = () => {
  const fragment = document.createDocumentFragment();
  const successMessage = successMessageTemplate.cloneNode(true);

  fragment.appendChild(successMessage);
  page.appendChild(fragment);

  document.addEventListener(`keydown`, onPopupEscPress);
  document.addEventListener(`click`, onPopupOutsideClick);
  window.deactivatePage();
};

const onDataLoadError = () => {
  const fragment = document.createDocumentFragment();
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const tryAgainButton = errorMessage.querySelector(`.error__button`);

  fragment.appendChild(errorMessage);
  page.appendChild(fragment);

  tryAgainButton.addEventListener(`click`, closePopup);
  tryAgainButton.addEventListener(`keydown`, onEnterPress);
  document.addEventListener(`keydown`, onPopupEscPress);
  document.addEventListener(`click`, onPopupOutsideClick);
};

const setImage = (evt, target) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    target.src = ``;

    reader.addEventListener(`load`, (event) => {
      target.src = event.target.result;
    });

    reader.readAsDataURL(file);
  }
};

const getNewImage = (evt) => {
  const file = document.createElement(`img`);
  file.setAttribute(`height`, `100%`);
  file.setAttribute(`width`, `100%`);
  file.setAttribute(`alt`, `Фотография жилья`);
  file.style.borderRadius = `5px`;
  setImage(evt, file);
  return file;
};

avatarField.addEventListener(`change`, (evt) => {
  setImage(evt, avatarImage);
});

typeField.addEventListener(`change`, () => {
  checkValidType();
});

timeInField.addEventListener(`change`, () => {
  checkValidTime(timeInField, timeOutField);
});

timeOutField.addEventListener(`change`, () => {
  checkValidTime(timeOutField, timeInField);
});

guestsField.addEventListener(`change`, () => {
  window.checkValidGuest();
});

roomsField.addEventListener(`change`, () => {
  window.checkValidGuest();
});

imagesField.addEventListener(`change`, (evt) => {
  imagePlace.innerHTML = ``;
  imagePlace.appendChild(getNewImage(evt));
});

noticeForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  window.load(UPLOAD_URL, `POST`, onDataLoadSuccess, onDataLoadError, new FormData(noticeForm));
});
