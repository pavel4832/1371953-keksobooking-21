'use strict';

const MIN_NUMBER = 1;
const MAX_ROOMS_NUMBER = 5;
const map = document.querySelector(`.map`);
const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);
const apartmentsType = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const getRoomText = (rooms) => {
  let room;

  if (rooms === MIN_NUMBER) {
    room = `комната`;
  } else if (rooms === MAX_ROOMS_NUMBER) {
    room = `комнат`;
  } else {
    room = `комнаты`;
  }
  return room;
};

const getGuestText = (guests) => {
  let guest;

  if (guests === MIN_NUMBER) {
    guest = `гостя`;
  } else {
    guest = `гостей`;
  }
  return guest;
};

const fillSrcField = (element, src) => {
  if (src) {
    element.src = src;
  } else {
    element.style.display = `none`;
  }
};

const fillTextField = (element, text) => {
  if (text) {
    element.textContent = text;
  } else {
    element.style.display = `none`;
  }
};

const fillTextCapacity = (element, rooms, guests) => {
  const roomText = getRoomText(rooms);
  const guestText = getGuestText(guests);

  if (rooms && guests) {
    element.textContent = `${rooms} ${roomText} для ${guests} ${guestText}`;
  } else {
    element.style.display = `none`;
  }
};

const fillTextTime = (element, checkin, checkout) => {
  if (checkin && checkout) {
    element.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    element.style.display = `none`;
  }
};

const setFeatures = (parent, target, source) => {
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

const addPhotos = (target, element, source) => {
  if (source) {
    target.innerHTML = ``;
    source.forEach((elem) => {
      let newElement = element.cloneNode(true);
      target.appendChild(newElement);
      newElement.src = elem;
    });
  } else {
    target.style.display = `none`;
  }
};

window.renderCard = (pin) => {
  const fragment = document.createDocumentFragment();
  const elementAfter = document.querySelector(`.map__filters-container`);
  const cardElement = cardTemplate.cloneNode(true);
  const featuresList = cardElement.querySelector(`.popup__features`);
  const featureItems = cardElement.querySelectorAll(`.popup__feature`);
  const photosList = cardElement.querySelector(`.popup__photos`);
  const photoItem = cardElement.querySelector(`.popup__photo`);

  fillSrcField(cardElement.querySelector(`.popup__avatar`), pin.author.avatar);
  fillTextField(cardElement.querySelector(`.popup__title`), pin.offer.title);
  fillTextField(cardElement.querySelector(`.popup__text--address`), pin.offer.address);
  fillTextField(cardElement.querySelector(`.popup__text--price`), pin.offer.price);
  fillTextField(cardElement.querySelector(`.popup__type`), apartmentsType[pin.offer.type]);
  fillTextCapacity(cardElement.querySelector(`.popup__text--capacity`), pin.offer.rooms, pin.offer.guests);
  fillTextTime(cardElement.querySelector(`.popup__text--time`), pin.offer.checkin, pin.offer.checkout);
  setFeatures(featuresList, featureItems, pin.offer.features);
  fillTextField(cardElement.querySelector(`.popup__description`), pin.offer.description);
  addPhotos(photosList, photoItem, pin.offer.photos);

  fragment.appendChild(cardElement);
  map.insertBefore(fragment, elementAfter);
};
