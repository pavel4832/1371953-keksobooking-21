'use strict';

const MAP = document.querySelector(`.map`);
const MAP_PINS = document.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const PINS_QUANTITY = 8;
const PRICES = [500, 1500, 1300, 650, 950, 2500, 3000, 1850];
const TYPE_QUANTITY = 4;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const ROOM_QUANTITY = 5;
const GUEST_QUANTITY = 3;
const TIME_QUANTITY = 3;
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES_QUANTITY = 6;
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS_QUANTITY = 3;
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MIN_X_POSITION = 0;
const MAX_X_POSITION = MAP_PINS.clientWidth;
const MIN_Y_POSITION = 130;
const MAX_Y_POSITION = 630;
const OFFSET_X = 50 / 2;
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

const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getPins = function () {
  const array = [];
  let imageNumbers = [];

  for (let i = 0; i < PINS_QUANTITY; i++) {
    imageNumbers[i] = i + 1;
  }

  imageNumbers = shuffleArray(imageNumbers);

  for (let i = 0; i < PINS_QUANTITY; i++) {
    array[i] = {
      author: {
        avatar: `img/avatars/user0` + imageNumbers[i] + `.png`
      },
      offer: {
        title: ``,
        address: ``,
        price: PRICES[i],
        type: TYPES[getRandomNumber(0, TYPE_QUANTITY - 1)],
        rooms: getRandomNumber(1, ROOM_QUANTITY),
        guests: getRandomNumber(1, GUEST_QUANTITY),
        checkin: TIMES[getRandomNumber(0, TIME_QUANTITY - 1)],
        checkout: TIMES[getRandomNumber(0, TIME_QUANTITY - 1)],
        features: getRandomArray(FEATURES, FEATURES_QUANTITY),
        description: ``,
        photos: getRandomArray(PHOTOS, PHOTOS_QUANTITY)
      },
      location: {
        x: getRandomNumber(MIN_X_POSITION, MAX_X_POSITION),
        y: getRandomNumber(MIN_Y_POSITION, MAX_Y_POSITION)
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
