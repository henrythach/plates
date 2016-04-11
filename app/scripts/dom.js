const app = app || {};

(function () {
  'use strict';

  app.dom = {
    clearChildrenFrom(element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  };
})();
