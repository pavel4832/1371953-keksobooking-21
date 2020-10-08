'use strict';

(function () {
  const PIN_TEMPLATE = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
  const OFFSET_X = 25;
  const OFFSET_Y = 70;

  window.renderPin = function (pin) {
    const PIN_ELEMENT = PIN_TEMPLATE.cloneNode(true);

    PIN_ELEMENT.style = `left: ${pin.location.x - OFFSET_X}px; top: ${pin.location.y - OFFSET_Y}px;`;
    PIN_ELEMENT.querySelector(`img`).src = pin.author.avatar;
    PIN_ELEMENT.querySelector(`img`).alt = pin.offer.title;
    PIN_ELEMENT.addEventListener(`click`, function () {
      window.showCard(pin);
    });

    return PIN_ELEMENT;
  };
})();
