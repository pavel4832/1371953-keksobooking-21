'use strict';

(function () {
  const FILTER = document.querySelector(`.map__filters`);
  const FORM_ELEMENTS = FILTER.querySelectorAll(`.map__filter, .map__checkbox`);

  window.deactivatePage();
  window.scrollTo(0, 0);

  for (let i = 0; i < FORM_ELEMENTS.length; i++) {
    FORM_ELEMENTS[i].addEventListener(`change`, function () {
      window.filterPins(window.pins);
    });
  }
})();
