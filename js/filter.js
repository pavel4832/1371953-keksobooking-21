'use strict';

(function () {
  const FILTER = document.querySelector(`.map__filters`);
  const TYPE_FIELD = FILTER.querySelector(`#housing-type`);
  let filter = {
    onTypeChange: function () {}
  };

  window.filter = {
    setTypeChangeHandler: function (cb) {
      filter.onTypeChange = cb;
    }
  };

  TYPE_FIELD.addEventListener(`change`, function () {
    const houseType = TYPE_FIELD.value;
    filter.onTypeChange(houseType);
  });
})();
