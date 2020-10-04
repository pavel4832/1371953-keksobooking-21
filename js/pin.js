'use strict';

(function () {
  const MAP_PINS = document.querySelector(`.map__pins`);
  const PIN_TEMPLATE = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
  const OFFSET_X = 25;
  const OFFSET_Y = 70;

  window.renderPins = function (pins) {
    const FRAGMENT = document.createDocumentFragment();

    for (let i = 0; i < pins.length; i++) {
      const PIN_ELEMENT = PIN_TEMPLATE.cloneNode(true);

      PIN_ELEMENT.style = `left: ${pins[i].location.x - OFFSET_X}px; top: ${pins[i].location.y - OFFSET_Y}px;`;
      PIN_ELEMENT.querySelector(`img`).src = pins[i].author.avatar;
      PIN_ELEMENT.querySelector(`img`).alt = pins[i].offer.title;
      FRAGMENT.appendChild(PIN_ELEMENT);
      PIN_ELEMENT.addEventListener(`click`, function () {
        window.showCard(pins[i]);
      });
    }
    MAP_PINS.appendChild(FRAGMENT);
  };
})();
