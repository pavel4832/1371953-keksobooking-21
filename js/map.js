'use strict';

const map = document.querySelector(`.map`);

const onCardEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    window.map.closeCard();
  }
};

window.map = {
  closeCard: () => {
    const ELEMENT = map.querySelector(`.map__card`);
    if (ELEMENT) {
      map.removeChild(ELEMENT);
      document.removeEventListener(`keydown`, onCardEscPress);
    }
  },
  showCard: (element) => {
    let card = map.querySelector(`.map__card`);

    if (card) {
      map.removeChild(card);
    }

    window.renderCard(element);

    card = map.querySelector(`.map__card`);

    document.addEventListener(`keydown`, onCardEscPress);

    card.querySelector(`.popup__close`).addEventListener(`click`, () => {
      window.map.closeCard();
    });

    card.querySelector(`.popup__close`).addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        window.map.closeCard();
      }
    });
  }
};
