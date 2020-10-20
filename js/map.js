'use strict';

const MAP = document.querySelector(`.map`);

const onCardEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    window.map.closeCard();
  }
};

window.map = {
  closeCard: () => {
    const ELEMENT = MAP.querySelector(`.map__card`);
    if (ELEMENT) {
      MAP.removeChild(ELEMENT);
      document.removeEventListener(`keydown`, onCardEscPress);
    }
  },
  showCard: (element) => {
    let CARD = MAP.querySelector(`.map__card`);

    if (CARD) {
      MAP.removeChild(CARD);
    }

    window.renderCard(element);

    CARD = MAP.querySelector(`.map__card`);

    document.addEventListener(`keydown`, onCardEscPress);

    CARD.querySelector(`.popup__close`).addEventListener(`click`, () => {
      window.map.closeCard();
    });

    CARD.querySelector(`.popup__close`).addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        window.map.closeCard();
      }
    });
  }
};
