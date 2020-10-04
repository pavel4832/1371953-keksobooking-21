'use strict';

(function () {
  const MAP_PIN_MAIN = window.data.MAP.querySelector(`.map__pin--main`);
  const ADDRESS_FIELD = window.data.NOTICE_FORM.querySelector(`#address`);
  const TYPE_FIELD = window.data.NOTICE_FORM.querySelector(`#type`);
  const PRICE_FIELD = window.data.NOTICE_FORM.querySelector(`#price`);
  const TIME_IN_FIELD = window.data.NOTICE_FORM.querySelector(`#timein`);
  const TIME_OUT_FIELD = window.data.NOTICE_FORM.querySelector(`#timeout`);
  const ROOM_FIELD = window.data.NOTICE_FORM.querySelector(`#room_number`);
  const GUEST_FIELD = window.data.NOTICE_FORM.querySelector(`#capacity`);
  const minApartmentsPrice = {
    palace: `10000`,
    flat: `1000`,
    house: `5000`,
    bungalow: `0`
  };
  const MainPinDimensions = {
    WIDTH: 62,
    HEIGHT: 84,
    OFFSET_X: 31
  };

  const fillAddressField = function (offsetX, offsetY) {
    let xLocation = parseInt(MAP_PIN_MAIN.style.left, 10) + offsetX;
    let yLocation = parseInt(MAP_PIN_MAIN.style.top, 10) + offsetY;
    ADDRESS_FIELD.value = `${xLocation}, ${yLocation}`;
  };

  const checkValidType = function () {
    let type = TYPE_FIELD.value;
    let minPrice = minApartmentsPrice[type];

    PRICE_FIELD.setAttribute(`placeholder`, minPrice);
    PRICE_FIELD.setAttribute(`min`, minPrice);
  };

  const checkValidGuest = function () {
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

  const disableFormFields = function (fields) {
    for (let i = 0; i < fields.length; i++) {
      fields[i].setAttribute(`disabled`, `disabled`);
    }
  };

  const checkValidTime = function (timeSource, timeChange) {
    const time = timeChange.options;

    for (let i = 0; i < time.length; i++) {
      time[i].removeAttribute(`selected`);
    }

    time[timeSource.selectedIndex].setAttribute(`selected`, `selected`);
  };

  window.activateForm = function () {
    fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.HEIGHT);
    checkValidType();
    checkValidGuest();
  };

  fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.OFFSET_X);
  disableFormFields(window.data.FORM_FIELDS);

  TYPE_FIELD.addEventListener(`change`, function () {
    checkValidType();
  });

  TIME_IN_FIELD.addEventListener(`change`, function () {
    checkValidTime(TIME_IN_FIELD, TIME_OUT_FIELD);
  });

  TIME_OUT_FIELD.addEventListener(`change`, function () {
    checkValidTime(TIME_OUT_FIELD, TIME_IN_FIELD);
  });

  GUEST_FIELD.addEventListener(`change`, function () {
    checkValidGuest();
  });

  ROOM_FIELD.addEventListener(`change`, function () {
    checkValidGuest();
  });
})();
