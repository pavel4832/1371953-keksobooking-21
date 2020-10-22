'use strict';

const filter = document.querySelector(`.map__filters`);
const typeField = filter.querySelector(`#housing-type`);
const priceField = filter.querySelector(`#housing-price`);
const roomsField = filter.querySelector(`#housing-rooms`);
const guestField = filter.querySelector(`#housing-guests`);
const featuresList = filter.querySelectorAll(`#housing-features input`);

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
  featuresList.forEach((element) => {
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

const useFilter = (pins) => {
  const houseType = typeField.value;
  const housePrice = priceField.value;
  const houseRooms = roomsField.value;
  const houseGuests = guestField.value;
  const features = getFeatures();
  return pins.filter((element) => {
    return filterByField(element.offer.type, houseType) && filterByPrice(element.offer.price, housePrice) && filterByField(element.offer.rooms, houseRooms) && filterByField(element.offer.guests, houseGuests) && filterByFeatures(element, features);
  });
};

const filterPins = window.debounce((pins) => {
  window.pin.removePins();
  window.map.closeCard();

  window.pin.renderPins(useFilter(pins));
});

filter.addEventListener(`change`, () => {
  filterPins(window.pins);
});
