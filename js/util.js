'use strict';

const ESC_KEYCODE = `Escape`;
const ENTER_KEYCODE = `Enter`;

window.util = {
  isEscEvent: (evt, action) => {
    if (evt.key === ESC_KEYCODE) {
      action();
    }
  },
  isEnterEvent: (evt, action) => {
    if (evt.key === ENTER_KEYCODE) {
      action();
    }
  }
};
