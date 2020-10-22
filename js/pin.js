'use strict';

const MAX_PIN_QUANTITY = 5;
const OFFSET_X = 25;
const OFFSET_Y = 70;
const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

const disablePin = () => {
  const pin = document.querySelector(`.map__pin--active`);

  if (pin) {
    pin.classList.remove(`map__pin--active`);
  }
};

window.pin = {
  renderPins: (pins) => {
    const fragment = document.createDocumentFragment();
    const pinQuantity = pins.length > MAX_PIN_QUANTITY ? MAX_PIN_QUANTITY : pins.length;

    for (let i = 0; i < pinQuantity; i++) {
      const pinElement = pinTemplate.cloneNode(true);
      pinElement.style = `left: ${pins[i].location.x - OFFSET_X}px; top: ${pins[i].location.y - OFFSET_Y}px;`;
      pinElement.querySelector(`img`).src = pins[i].author.avatar;
      pinElement.querySelector(`img`).alt = pins[i].offer.title;
      fragment.appendChild(pinElement);
      pinElement.addEventListener(`click`, () => {
        disablePin();
        pinElement.classList.add(`map__pin--active`);
        window.map.showCard(pins[i]);
      });
    }

    mapPins.appendChild(fragment);
  },
  removePins: () => {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    pins.forEach((element) => {
      mapPins.removeChild(element);
    });
  }
};
