'use strict';

(function () {
  window.data = {
    MAP: document.querySelector(`.map`),
    NOTICE_FORM: document.querySelector(`.ad-form`),
    FORM_FIELDS: document.querySelectorAll(`.map__filters select, .map__filters fieldset, .ad-form fieldset`),
    PINS: []
  };
  const MAP_PINS = document.querySelector(`.map__pins`);
  const PINS_QUANTITY = 8;
  const MIN_PRICE = 1000;
  const MAX_PRICE = 1000000;
  const ROOM_QUANTITY = 5;
  const GUEST_QUANTITY = 3;
  const MIN_X_POSITION = 25;
  const MAX_X_POSITION = MAP_PINS.clientWidth;
  const MIN_Y_POSITION = 200;
  const MAX_Y_POSITION = 700;
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

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

  getPins(window.data.PINS);
})();
