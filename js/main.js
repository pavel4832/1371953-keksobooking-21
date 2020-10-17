'use strict';

(function () {
  const FILTER = document.querySelector(`.map__filters`);
  const TYPE_FIELD = FILTER.querySelector(`#housing-type`);

  window.deactivatePage();
  window.scrollTo(0, 0);

  TYPE_FIELD.addEventListener(`change`, function () {
    window.filter.onTypeChange(window.pins);
  });
})();
