'use strict';

(function () {
  const FILTER = document.querySelector(`.map__filters`);
  const TYPE_FIELD = FILTER.querySelector(`#housing-type`);

  const filterByType = function (pin) {
    let houseType = TYPE_FIELD.value;
    return pin.offer.type === houseType;
  };

  window.filter = {
    onTypeChange: function (pins) {
      const houseType = TYPE_FIELD.value;
      window.pin.removePins();
      window.map.closeCard();
      if (houseType !== `any`) {
        window.pin.renderPins(pins.filter(filterByType));
      } else {
        window.pin.renderPins(pins);
      }
    }
  };
})();
