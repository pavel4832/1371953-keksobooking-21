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
const MIN_PRICE = 1000;
const MAX_PRICE = 1000000;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const apartmentsType = {
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
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
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

const getRoomText = function (rooms) {
  let room;

  if (rooms === 1) {
    room = `комната`;
  } else if (rooms === 5) {
    room = `комнат`;
  } else {
    room = `комнаты`;
  }
  return room;
};

const getGuestText = function (guests) {
  let guest;

  if (guests === 1) {
    guest = `гостя`;
  } else {
    guest = `гостей`;
  }
  return guest;
};

const fillSrcField = function (element, src) {
  if (src) {
    element.src = src;
  } else {
    element.style.display = `none`;
  }
};

const fillTextField = function (element, text) {
  if (text) {
    element.textContent = text;
  } else {
    element.style.display = `none`;
  }
};

const fillTextCapacity = function (element, rooms, guests) {
  const ROOM_TEXT = getRoomText(rooms);
  const GUEST_TEXT = getGuestText(guests);

  if (rooms && guests) {
    element.textContent = `${rooms} ${ROOM_TEXT} для ${guests} ${GUEST_TEXT}`;
  } else {
    element.style.display = `none`;
  }
};

const fillTextTime = function (element, checkin, checkout) {
  if (checkin && checkout) {
    element.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    element.style.display = `none`;
  }
};

const setFeatures = function (parent, target, source) {
  if (source) {
    parent.innerHTML = ``;
    for (let i = 0; i < source.length; i++) {
      for (let j = 0; j < target.length; j++) {
        if (target[j].classList.contains(`popup__feature--${source[i]}`)) {
          parent.appendChild(target[j]);
        }
      }
    }
  } else {
    parent.style.display = `none`;
  }
};

const addPhotos = function (target, element, source) {
  if (source) {
    target.innerHTML = ``;
    for (let i = 0; i < source.length; i++) {
      let newElement = element.cloneNode(true);
      target.appendChild(newElement);
      newElement.src = source[i];
    }
  } else {
    target.style.display = `none`;
  }
};

const renderCard = function (pin) {
  const FRAGMENT = document.createDocumentFragment();
  const PARENT = document.querySelector(`.map`);
  const ELEMENT_AFTER = document.querySelector(`.map__filters-container`);
  const CARD_ELEMENT = CARD_TEMPLATE.cloneNode(true);
  const FEATURES_LIST = CARD_ELEMENT.querySelector(`.popup__features`);
  const FEATURE_ITEMS = CARD_ELEMENT.querySelectorAll(`.popup__feature`);
  const PHOTOS_LIST = CARD_ELEMENT.querySelector(`.popup__photos`);
  const PHOTO_ITEM = CARD_ELEMENT.querySelector(`.popup__photo`);

  fillSrcField(CARD_ELEMENT.querySelector(`.popup__avatar`), pin.author.avatar);
  fillTextField(CARD_ELEMENT.querySelector(`.popup__title`), pin.offer.title);
  fillTextField(CARD_ELEMENT.querySelector(`.popup__text--address`), pin.offer.address);
  fillTextField(CARD_ELEMENT.querySelector(`.popup__text--price`), pin.offer.price);
  fillTextField(CARD_ELEMENT.querySelector(`.popup__type`), apartmentsType[pin.offer.type]);
  fillTextCapacity(CARD_ELEMENT.querySelector(`.popup__text--capacity`), pin.offer.rooms, pin.offer.guests);
  fillTextTime(CARD_ELEMENT.querySelector(`.popup__text--time`), pin.offer.checkin, pin.offer.checkout);
  setFeatures(FEATURES_LIST, FEATURE_ITEMS, pin.offer.features);
  fillTextField(CARD_ELEMENT.querySelector(`.popup__description`), pin.offer.description);
  addPhotos(PHOTOS_LIST, PHOTO_ITEM, pin.offer.photos);

  FRAGMENT.appendChild(CARD_ELEMENT);
  PARENT.insertBefore(FRAGMENT, ELEMENT_AFTER);
};

const PINS = getPins();

MAP.classList.remove(`map--faded`);

renderPins(PINS);
renderCard(PINS[0]);
