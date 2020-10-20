'use strict';

const FILTER = document.querySelector(`.map__filters`);

window.deactivatePage();
window.scrollTo(0, 0);

FILTER.addEventListener(`change`, () => {
  window.filterPins(window.pins);
});
