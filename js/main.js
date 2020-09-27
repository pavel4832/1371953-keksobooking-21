'use strict';

const MAP = document.querySelector(`.map`);
const MAP_PINS = document.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const PINS_QUANTITY = 8;
const MAX_PRICE = 1000000;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const ROOM_QUANTITY = 5;
const GUEST_QUANTITY = 3;
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MIN_X_POSITION = 25;
const MAX_X_POSITION = MAP_PINS.clientWidth;
const MIN_Y_POSITION = 200;
const MAX_Y_POSITION = 700;
const OFFSET_X = 25;
const OFFSET_Y = 70;

const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomArray = function (array, quantity) {
  let newArray = [];

  for (let i = 0; i < getRandomNumber(1, quantity); i++) {
    let number = getRandomNumber(0, quantity);
    newArray[i] = array[number];
  }

  newArray = newArray.filter(function (item, index) {
    return newArray.indexOf(item) === index;
  });
  return newArray;
};

const getPins = function () {
  const array = [];

  for (let i = 0; i < PINS_QUANTITY; i++) {
    const xLocation = getRandomNumber(MIN_X_POSITION, MAX_X_POSITION);
    const yLocation = getRandomNumber(MIN_Y_POSITION, MAX_Y_POSITION);
    const photosNumber = getRandomNumber(1, PHOTOS.length);

    array[i] = {
      author: {
        avatar: `img/avatars/user0` + (i + 1) + `.png`
      },
      offer: {
        title: `Заголовок объявления`,
        address: xLocation + ` ` + yLocation,
        price: getRandomNumber(0, MAX_PRICE),
        type: TYPES[getRandomNumber(0, TYPES.length - 1)],
        rooms: getRandomNumber(1, ROOM_QUANTITY),
        guests: getRandomNumber(1, GUEST_QUANTITY),
        checkin: TIMES[getRandomNumber(0, TIMES.length - 1)],
        checkout: TIMES[getRandomNumber(0, TIMES.length - 1)],
        features: getRandomArray(FEATURES, FEATURES.length),
        description: `Описание объявления`,
        photos: PHOTOS.slice(0, photosNumber)
      },
      location: {
        x: xLocation,
        y: yLocation
      }
    };
  }
  return array;
};

const renderPins = function (pins) {
  const FRAGMENT = document.createDocumentFragment();

  for (let i = 0; i < pins.length; i++) {
    const PIN_ELEMENT = PIN_TEMPLATE.cloneNode(true);

    PIN_ELEMENT.style = `left: ${pins[i].location.x - OFFSET_X}px; top: ${pins[i].location.y - OFFSET_Y}px;`;
    PIN_ELEMENT.querySelector(`img`).src = pins[i].author.avatar;
    PIN_ELEMENT.querySelector(`img`).alt = pins[i].offer.title;
    FRAGMENT.appendChild(PIN_ELEMENT);
  }
  MAP_PINS.appendChild(FRAGMENT);
};

const PINS = getPins();

MAP.classList.remove(`map--faded`);

renderPins(PINS);
