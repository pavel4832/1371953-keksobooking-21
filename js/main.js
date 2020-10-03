'use strict';

const MAP = document.querySelector(`.map`);
const MAP_PIN_MAIN = MAP.querySelector(`.map__pin--main`);
const MainPinDimensions = {
  WIDTH: 62,
  HEIGHT: 84,
  OFFSET_X: 31
};
const MAP_PINS = document.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const CARD_TEMPLATE = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);
const PINS = [];
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
const minApartmentsPrice = {
  palace: `10000`,
  flat: `1000`,
  house: `5000`,
  bungalow: `0`
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
const NOTICE_FORM = document.querySelector(`.ad-form`);
const FORM_FIELDS = document.querySelectorAll(`.map__filters select, .map__filters fieldset, .ad-form fieldset`);
const ADDRESS_FIELD = NOTICE_FORM.querySelector(`#address`);
const TYPE_FIELD = NOTICE_FORM.querySelector(`#type`);
const PRICE_FIELD = NOTICE_FORM.querySelector(`#price`);
const TIME_IN_FIELD = NOTICE_FORM.querySelector(`#timein`);
const TIME_OUT_FIELD = NOTICE_FORM.querySelector(`#timeout`);
const ROOM_FIELD = NOTICE_FORM.querySelector(`#room_number`);
const GUEST_FIELD = NOTICE_FORM.querySelector(`#capacity`);

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

const getPins = function (array) {
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
  MAP.insertBefore(FRAGMENT, ELEMENT_AFTER);
};

const fillAddressField = function (offsetX, offsetY) {
  let xLocation = parseInt(MAP_PIN_MAIN.style.left, 10) + offsetX;
  let yLocation = parseInt(MAP_PIN_MAIN.style.top, 10) + offsetY;
  ADDRESS_FIELD.value = `${xLocation}, ${yLocation}`;
};

const onCardEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeCard();
  }
};

const closeCard = function () {
  const ELEMENT = MAP.querySelector(`.map__card`);
  MAP.removeChild(ELEMENT);
  document.removeEventListener(`keydown`, onCardEscPress);
};

const showCard = function (element) {
  let CARD = MAP.querySelector(`.map__card`);

  if (CARD) {
    MAP.removeChild(CARD);
  }

  renderCard(element);

  CARD = MAP.querySelector(`.map__card`);

  document.addEventListener(`keydown`, onCardEscPress);

  CARD.querySelector(`.popup__close`).addEventListener(`click`, function () {
    closeCard();
  });

  CARD.querySelector(`.popup__close`).addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closeCard();
    }
  });
};

const setPinHandlers = function (array) {
  const PIN_ELEMENTS = MAP.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  for (let i = 0; i < array.length; i++) {
    PIN_ELEMENTS[i].addEventListener(`click`, function () {
      showCard(array[i]);
    });
  }
};

const checkValidType = function () {
  let type = TYPE_FIELD.value;
  let minPrice = minApartmentsPrice[type];

  PRICE_FIELD.setAttribute(`placeholder`, minPrice);
  PRICE_FIELD.setAttribute(`min`, minPrice);
};

const checkValidTime = function (timeSource, timeChange) {
  const time = timeChange.options;

  for (let i = 0; i < time.length; i++) {
    time[i].removeAttribute(`selected`);
  }

  time[timeSource.selectedIndex].setAttribute(`selected`, `selected`);
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

const activatePage = function () {
  enableFormFields(FORM_FIELDS);
  MAP.classList.remove(`map--faded`);
  NOTICE_FORM.classList.remove(`ad-form--disabled`);
  fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.HEIGHT);
  getPins(PINS);
  renderPins(PINS);
  setPinHandlers(PINS);
  checkValidType();
  checkValidGuest();

  MAP_PIN_MAIN.removeEventListener(`mousedown`, onMouseLeftPress);
  MAP_PIN_MAIN.removeEventListener(`keydown`, onEnterPress);
};

fillAddressField(MainPinDimensions.OFFSET_X, MainPinDimensions.OFFSET_X);
disableFormFields(FORM_FIELDS);

MAP_PIN_MAIN.addEventListener(`mousedown`, onMouseLeftPress);
MAP_PIN_MAIN.addEventListener(`keydown`, onEnterPress);

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
