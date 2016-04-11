const app = app || {};

(function () {
  'use strict';

  const BARBELL_WEIGHT = 45;
  const PLATES = [45, 35, 25, 10, 5, 2.5];

  app.utils = {
    calculate(weight) {
      let results = [];

      if (weight < BARBELL_WEIGHT || weight % 5 !== 0) {
        return results;
      }

      weight -= BARBELL_WEIGHT;
      weight /= 2;
      while (weight > 0) {
        for (let plate of PLATES) {
          if (weight >= plate) {
            weight -= plate;
            results.push(plate);
            break;
          }
        }
      }

      return results;
    }
  };
})();
