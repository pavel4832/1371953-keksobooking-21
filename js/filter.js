'use strict';

(function () {
  const FILTER = document.querySelector(`.map__filters`);
  const TYPE_FIELD = FILTER.querySelector(`#housing-type`);
  const PRICE_FIELD = FILTER.querySelector(`#housing-price`);
  const ROOMS_FIELD = FILTER.querySelector(`#housing-rooms`);
  const GUESTS_FIELD = FILTER.querySelector(`#housing-guests`);
  const FEATURES_LIST = FILTER.querySelectorAll(`#housing-features input`);

  const filterByField = function (pin, value) {
    if (value === `any`) {
      return true;
    } else {
      return String(pin) === value;
    }
  };

  const filterByPrice = function (pin, value) {
    let price;
    if (value === `any`) {
      return true;
    } else {
      if (pin < 10000) {
        price = `low`;
      } else if (pin >= 10000 && pin <= 50000) {
        price = `middle`;
      } else {
        price = `high`;
      }
      return price === value;
    }
  };

  const getFeatures = function () {
    let features = [];
    for (let i = 0; i < FEATURES_LIST.length; i++) {
      if (FEATURES_LIST[i].checked) {
        features.push(FEATURES_LIST[i].value);
      }
    }
    return features;
  };

  const filterByFeatures = function (element, features) {
    return features.every(function (feature) {
      return element.offer.features.indexOf(feature) !== -1;
    });
  };

  const filter = function (pins) {
    let houseType = TYPE_FIELD.value;
    let housePrice = PRICE_FIELD.value;
    let houseRooms = ROOMS_FIELD.value;
    let houseGuests = GUESTS_FIELD.value;
    let features = getFeatures();
    return pins.filter(function (element) {
      return filterByField(element.offer.type, houseType) && filterByPrice(element.offer.price, housePrice) && filterByField(element.offer.rooms, houseRooms) && filterByField(element.offer.guests, houseGuests) && filterByFeatures(element, features);
    });
  };

  window.filterPins = window.debounce(function (pins) {
    window.pin.removePins();
    window.map.closeCard();

    window.pin.renderPins(filter(pins));
  });
})();
