'use strict';

(function () {
  const FILTER = document.querySelector(`.map__filters`);
  const TYPE_FIELD = FILTER.querySelector(`#housing-type`);
  const PRICE_FIELD = FILTER.querySelector(`#housing-price`);
  const ROOMS_FIELD = FILTER.querySelector(`#housing-rooms`);
  const GUESTS_FIELD = FILTER.querySelector(`#housing-guests`);
  const FEATURES_LIST = FILTER.querySelectorAll(`#housing-features input`);

  const filterByField = (pin, value) => {
    if (value === `any`) {
      return true;
    } else {
      return String(pin) === value;
    }
  };

  const filterByPrice = (pin, value) => {
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

  const getFeatures = () => {
    let features = [];
    FEATURES_LIST.forEach((element) => {
      if (element.checked) {
        features.push(element.value);
      }
    });

    return features;
  };

  const filterByFeatures = (element, features) => {
    return features.every((feature) => {
      return element.offer.features.indexOf(feature) !== -1;
    });
  };

  const filter = (pins) => {
    let houseType = TYPE_FIELD.value;
    let housePrice = PRICE_FIELD.value;
    let houseRooms = ROOMS_FIELD.value;
    let houseGuests = GUESTS_FIELD.value;
    let features = getFeatures();
    return pins.filter((element) => {
      return filterByField(element.offer.type, houseType) && filterByPrice(element.offer.price, housePrice) && filterByField(element.offer.rooms, houseRooms) && filterByField(element.offer.guests, houseGuests) && filterByFeatures(element, features);
    });
  };

  window.filterPins = window.debounce((pins) => {
    window.pin.removePins();
    window.map.closeCard();

    window.pin.renderPins(filter(pins));
  });
})();
