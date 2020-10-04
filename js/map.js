'use strict';

(function () {
  const onCardEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeCard();
    }
  };

  const closeCard = function () {
    const ELEMENT = window.data.MAP.querySelector(`.map__card`);
    window.data.MAP.removeChild(ELEMENT);
    document.removeEventListener(`keydown`, onCardEscPress);
  };

  const showCard = function (element) {
    let CARD = window.data.MAP.querySelector(`.map__card`);

    if (CARD) {
      window.data.MAP.removeChild(CARD);
    }

    window.renderCard(element);

    CARD = window.data.MAP.querySelector(`.map__card`);

    document.addEventListener(`keydown`, onCardEscPress);

    CARD.querySelector(`.popup__close`).addEventListener(`click`, function () {
      closeCard();
    });

    CARD.querySelector(`.popup__close`).addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        closeCard();
      }
    });
  };

  const setPinHandlers = function (array) {
    const PIN_ELEMENTS = window.data.MAP.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let i = 0; i < array.length; i++) {
      PIN_ELEMENTS[i].addEventListener(`click`, function () {
        showCard(array[i]);
      });
    }
  };

  window.showMap = function () {
    window.renderPins(window.data.PINS);
    setPinHandlers(window.data.PINS);
  };
})();
