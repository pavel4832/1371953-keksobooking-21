'use strict';

(function () {
  const MAP = document.querySelector(`.map`);
  const MAP_PINS = document.querySelector(`.map__pins`);
  const MAP_PIN_MAIN = MAP.querySelector(`.map__pin--main`);
  const NOTICE_FORM = document.querySelector(`.ad-form`);
  const FORM_FIELDS = document.querySelectorAll(`.map__filters select, .map__filters fieldset, .ad-form fieldset`);
  const MainPinDimensions = {
    WIDTH: 62,
    HEIGHT: 84,
    OFFSET_X: 31
  };
  const MIN_X_POSITION = 0;
  const MAX_X_POSITION = MAP_PINS.clientWidth - MainPinDimensions.WIDTH;
  const MIN_Y_POSITION = 130;
  const MAX_Y_POSITION = 630;
  let activated = false;

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

  const dragMainPin = function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const checkValidPosition = function (coords) {
      if (coords.x <= MIN_X_POSITION) {
        coords.x = MIN_X_POSITION;
      }
      if (coords.x >= MAX_X_POSITION) {
        coords.x = MAX_X_POSITION;
      }
      if (coords.y <= MIN_Y_POSITION) {
        coords.y = MIN_Y_POSITION;
      }
      if (coords.y >= MAX_Y_POSITION) {
        coords.y = MAX_Y_POSITION;
      }
    };

    const getNewCoords = function (moveEvt) {
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      let newCoords = {
        x: MAP_PIN_MAIN.offsetLeft - shift.x,
        y: MAP_PIN_MAIN.offsetTop - shift.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      checkValidPosition(newCoords);
      MAP_PIN_MAIN.style.top = (newCoords.y) + `px`;
      MAP_PIN_MAIN.style.left = (newCoords.x) + `px`;
      window.form.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.HEIGHT);
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      getNewCoords(moveEvt);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      getNewCoords(upEvt);
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  const activatePage = function () {
    const PINS = window.getPins();

    enableFormFields(FORM_FIELDS);
    MAP.classList.remove(`map--faded`);
    NOTICE_FORM.classList.remove(`ad-form--disabled`);
    window.form.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.HEIGHT);
    window.form.activateForm();
    window.renderPins(PINS);
    MAP_PIN_MAIN.removeEventListener(`keydown`, onEnterPress);
    activated = true;
  };

  disableFormFields(FORM_FIELDS);
  window.form.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.OFFSET_X);
  MAP_PIN_MAIN.addEventListener(`mousedown`, function (evt) {
    if (!activated) {
      onMouseLeftPress(evt);
    } else {
      dragMainPin(evt);
    }
  });
  MAP_PIN_MAIN.addEventListener(`keydown`, onEnterPress);
})();
