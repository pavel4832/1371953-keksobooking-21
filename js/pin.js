'use strict';

(function () {
  const MAX_PIN_QUANTITY = 5;
  const MAP_PINS = document.querySelector(`.map__pins`);
  const PIN_TEMPLATE = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
  const OFFSET_X = 25;
  const OFFSET_Y = 70;

  const disablePin = () => {
    const PIN = document.querySelector(`.map__pin--active`);

    if (PIN) {
      PIN.classList.remove(`map__pin--active`);
    }
  };

  window.pin = {
    renderPins: (pins) => {
      const FRAGMENT = document.createDocumentFragment();
      let pinQuantity = pins.length > MAX_PIN_QUANTITY ? MAX_PIN_QUANTITY : pins.length;

      for (let i = 0; i < pinQuantity; i++) {
        const PIN_ELEMENT = PIN_TEMPLATE.cloneNode(true);
        PIN_ELEMENT.style = `left: ${pins[i].location.x - OFFSET_X}px; top: ${pins[i].location.y - OFFSET_Y}px;`;
        PIN_ELEMENT.querySelector(`img`).src = pins[i].author.avatar;
        PIN_ELEMENT.querySelector(`img`).alt = pins[i].offer.title;
        FRAGMENT.appendChild(PIN_ELEMENT);
        PIN_ELEMENT.addEventListener(`click`, () => {
          disablePin();
          PIN_ELEMENT.classList.add(`map__pin--active`);
          window.map.showCard(pins[i]);
        });
      }

      MAP_PINS.appendChild(FRAGMENT);
    },
    removePins: () => {
      const PINS = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      PINS.forEach((element) => {
        MAP_PINS.removeChild(element);
      });
    }
  };
})();
