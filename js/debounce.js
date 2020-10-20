'use strict';

const DEBOUNCE_INTERVAL = 500;

window.debounce = (cb) => {
  let lastTimeout = null;

  return (...rest) => {
    let parameters = rest;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};
