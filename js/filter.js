'use strict';

(function () {
  const FILTER = document.querySelector(`.map__filters`);
  const TYPE_FIELD = FILTER.querySelector(`#housing-type`);
  const PRICE_FIELD = FILTER.querySelector(`#housing-price`);
  const ROOMS_FIELD = FILTER.querySelector(`#housing-rooms`);
  const GUESTS_FIELD = FILTER.querySelector(`#housing-guests`);
  const FEATURES_LIST = FILTER.querySelectorAll(`#housing-features input`);

  const contains = function (target, source) {
    for (let i = 0; i < source.length; i++) {
      if (target.indexOf(source[i]) === -1) {
        return false;
      }
    }
    return true;
  };

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

  const filterByCheckbox = function (pins) {
    let features = [];
    for (let i = 0; i < FEATURES_LIST.length; i++) {
      if (FEATURES_LIST[i].checked) {
        features.push(FEATURES_LIST[i].value);
      }
    }
    if (features.length !== 0) {
      return pins.filter(function (element) {
        return contains(element.offer.features, features);
      });
    } else {
      return pins;
    }
  };

  const filter = function (pins) {
    let houseType = TYPE_FIELD.value;
    let housePrice = PRICE_FIELD.value;
    let houseRooms = ROOMS_FIELD.value;
    let houseGuests = GUESTS_FIELD.value;
    let filteredPins = pins.filter(function (element) {
      return filterByField(element.offer.type, houseType) && filterByPrice(element.offer.price, housePrice) && filterByField(element.offer.rooms, houseRooms) && filterByField(element.offer.guests, houseGuests);
    });
    return filterByCheckbox(filteredPins);
  };

  window.filterPins = window.debounce(function (pins) {
    window.pin.removePins();
    window.map.closeCard();

    window.pin.renderPins(filter(pins));
  });
})();
