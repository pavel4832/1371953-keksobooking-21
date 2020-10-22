'use strict';

const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const MainPinDimensions = {
  WIDTH: 62,
  HEIGHT: 84,
  OFFSET_X: 31
};
const minXPosition = 0 - (MainPinDimensions.WIDTH / 2);
const maxXPosition = mapPins.clientWidth - (MainPinDimensions.WIDTH / 2);
const minYPosition = 130 - MainPinDimensions.HEIGHT;
const maxYPosition = 630 - MainPinDimensions.HEIGHT;

const dragMainPin = (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const checkValidPosition = (coords) => {
    if (coords.x <= minXPosition) {
      coords.x = minXPosition;
    }
    if (coords.x >= maxXPosition) {
      coords.x = maxXPosition;
    }
    if (coords.y <= minYPosition) {
      coords.y = minYPosition;
    }
    if (coords.y >= maxYPosition) {
      coords.y = maxYPosition;
    }
  };

  const getNewCoords = (moveEvt) => {
    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    let newCoords = {
      x: mapPinMain.offsetLeft - shift.x,
      y: mapPinMain.offsetTop - shift.y
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    checkValidPosition(newCoords);
    mapPinMain.style.top = (newCoords.y) + `px`;
    mapPinMain.style.left = (newCoords.x) + `px`;
    window.fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.HEIGHT);
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();
    getNewCoords(moveEvt);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    getNewCoords(upEvt);
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

mapPinMain.addEventListener(`mousedown`, (evt) => {
  dragMainPin(evt);
});
