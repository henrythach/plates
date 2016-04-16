const app = app || {};

(function () {
  'use strict';

  const PLATES = [45, 35, 25, 10, 5, 2.5];

  app.dom = {
    clearChildrenFrom(element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    },

    getPlateWidthInPercentage(plate) {
      var number = PLATES.indexOf(plate);
      return 100 - (number * 10);
    },

    createPlateHtml(weight) {
      var li = document.createElement('li');
      li.className = 'plate';
      li.innerHTML = weight;
      li.style.width = app.dom.getPlateWidthInPercentage(weight) + '%';
      return li;
    },

    insertPlatesToContainer(plates, container) {
      plates.forEach((theWeight) => {
        var plateHtml = app.dom.createPlateHtml(theWeight);
        container.appendChild(plateHtml);
      });
    }
  };
})();
