'use strict';

const MAP = document.querySelector(`.map`);
const MAP_PINS = document.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const CARD_TEMPLATE = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);
const PINS_QUANTITY = 8;
const MAX_PRICE = 1000000;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const APARTMENTS_TYPE_RU = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
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
        address: xLocation + `, ` + yLocation,
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

const getFeatures = function (arrayTarget, mask) {
  const newArray = [];
  const index = [];

  for (let i = 0; i < mask.offer.features.length; i++) {
    for (let j = 0; j < arrayTarget.length; j++) {
      if (arrayTarget[j].classList.contains(`popup__feature--${mask.offer.features[i]}`)) {
        index.push(j);
      }
    }
  }

  for (let i = 0; i < index.length; i++) {
    newArray[i] = arrayTarget[index[i]];
  }
  return newArray;
};

const clearChildren = function (array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const child = array[i];

    child.parentElement.removeChild(child);
  }
};

const addNewChildren = function (target, array) {
  for (let i = 0; i < array.length; i++) {
    target.appendChild(array[i]);
  }
};

const addPhotos = function (target, element, source) {
  if (source.offer.photos.length === 1) {
    element.src = source.offer.photos[0];
  } else {
    element.src = source.offer.photos[0];
    for (let i = 1; i < source.offer.photos.length; i++) {
      target.appendChild(element.cloneNode(true));
    }

    const PHOTO_ITEMS = target.children;

    for (let i = 1; i < PHOTO_ITEMS.length; i++) {
      PHOTO_ITEMS[i].src = source.offer.photos[i];
    }
  }
};

const renderCard = function (pins) {
  const CARD_ELEMENT = CARD_TEMPLATE.cloneNode(true);
  const FEATURES_LIST = CARD_ELEMENT.querySelector(`.popup__features`);
  const FEATURE_ITEMS = FEATURES_LIST.children;
  const PHOTOS_LIST = CARD_ELEMENT.querySelector(`.popup__photos`);
  const PHOTO_ITEM = CARD_ELEMENT.querySelector(`.popup__photo`);
  let newFeatures = [];
  let room;
  let guest;

  if (pins[0].offer.rooms === 1) {
    room = `комната`;
  } else if (pins[0].offer.rooms === 5) {
    room = `комнат`;
  } else {
    room = `комнаты`;
  }

  if (pins[0].offer.guests === 1) {
    guest = `гостя`;
  } else {
    guest = `гостей`;
  }

  if (pins[0].author.avatar) {
    CARD_ELEMENT.querySelector(`.popup__avatar`).src = pins[0].author.avatar;
  } else {
    CARD_ELEMENT.querySelector(`.popup__avatar`).style.display = `none`;
  }

  if (pins[0].offer.title) {
    CARD_ELEMENT.querySelector(`.popup__title`).textContent = pins[0].offer.title;
  } else {
    CARD_ELEMENT.querySelector(`.popup__title`).style.display = `none`;
  }

  if (pins[0].offer.address) {
    CARD_ELEMENT.querySelector(`.popup__text--address`).textContent = pins[0].offer.address;
  } else {
    CARD_ELEMENT.querySelector(`.popup__text--address`).style.display = `none`;
  }

  if (pins[0].offer.price) {
    CARD_ELEMENT.querySelector(`.popup__text--price`).textContent = pins[0].offer.price;
  } else {
    CARD_ELEMENT.querySelector(`.popup__text--price`).style.display = `none`;
  }

  if (pins[0].offer.type) {
    CARD_ELEMENT.querySelector(`.popup__type`).textContent = APARTMENTS_TYPE_RU[pins[0].offer.type];
  } else {
    CARD_ELEMENT.querySelector(`.popup__type`).style.display = `none`;
  }

  if (pins[0].offer.rooms && pins[0].offer.guests) {
    CARD_ELEMENT.querySelector(`.popup__text--capacity`).textContent = `${pins[0].offer.rooms} ${room} для ${pins[0].offer.guests} ${guest}`;
  } else {
    CARD_ELEMENT.querySelector(`.popup__text--capacity`).style.display = `none`;
  }

  if (pins[0].offer.checkin && pins[0].offer.checkout) {
    CARD_ELEMENT.querySelector(`.popup__text--time`).textContent = `Заезд после ${pins[0].offer.checkin}, выезд до ${pins[0].offer.checkout}`;
  } else {
    CARD_ELEMENT.querySelector(`.popup__text--time`).style.display = `none`;
  }

  if (pins[0].offer.features) {
    newFeatures = getFeatures(FEATURE_ITEMS, pins[0]);
    clearChildren(FEATURE_ITEMS);
    addNewChildren(FEATURES_LIST, newFeatures);
  } else {
    CARD_ELEMENT.querySelector(`.popup__features`).style.display = `none`;
  }

  if (pins[0].offer.description) {
    CARD_ELEMENT.querySelector(`.popup__description`).textContent = pins[0].offer.description;
  } else {
    CARD_ELEMENT.querySelector(`.popup__description`).style.display = `none`;
  }

  if (pins[0].offer.photos) {
    addPhotos(PHOTOS_LIST, PHOTO_ITEM, pins[0]);
  } else {
    CARD_ELEMENT.querySelector(`.popup__photos`).style.display = `none`;
  }
};

const PINS = getPins();

MAP.classList.remove(`map--faded`);

renderPins(PINS);
renderCard(PINS);
