(function () {
  'use strict';

  var Plates = (function () {
    var BARBELL_WEIGHT = 45;
    var PLATES = [45, 35, 25, 10, 5, 2.5];
    var Plates = function (stackOfWeights, targetWeightSpan, minimumNote, steppers) {
      this.stackOfWeights = stackOfWeights;
      this.targetWeightSpan = targetWeightSpan;
      this.minimumNote = minimumNote;
      this.steppers = steppers;
    };

    Plates.prototype.init = function () {
      this.minimumNote.style.display = 'none';
      for (var i = 0; i < this.steppers.length; i++) {
        var stepper = this.steppers[i];
        stepper.onclick = this.incrementByButton.bind(this);
        stepper.innerHTML = stepper.dataset.step;
      }

      if (!localStorage.getItem('targetWeight')) {
        this.setTargetWeight(45);
      }
      var currentWeight = this.getCurrentWeight();
      this.setTargetWeight(currentWeight);
      this.createPlatesHtml(currentWeight);
    };

    Plates.prototype.calculate = function (weight) {
      if (weight < BARBELL_WEIGHT || weight % 5 !== 0) {
        return;
      }

      var results = [];
      weight -= BARBELL_WEIGHT;
      weight /= 2;
      while (weight > 0) {
        for (var i = 0; i < PLATES.length; i++) {
          if (weight >= PLATES[i]) {
            weight -= PLATES[i];
            results.push(PLATES[i]);
            break;
          }
        }
      }

      return results;
    };

    Plates.prototype.clearStackOfWeights = function () {
      while (this.stackOfWeights.firstChild) {
        this.stackOfWeights.removeChild(this.stackOfWeights.firstChild);
      }
    };

    Plates.prototype.getPlateWidthInPercentage = function (plate) {
      var number = PLATES.indexOf(plate);
      return 100 - (number * 10);
    };

    Plates.prototype.createPlateHtml = function (weight) {
      var li = document.createElement('li');
      li.className = 'plate';
      li.innerHTML = weight;
      li.style.width = this.getPlateWidthInPercentage(weight) + '%';
      return li;
    };

    Plates.prototype.createPlatesHtml = function (weight) {
      if (isNaN(weight) || weight <= 45) {
        weight = 45;
        this.minimumNote.style.display = 'block';
      } else {
        this.minimumNote.style.display = 'none';
      }

      this.clearStackOfWeights();
      var weights = this.calculate(weight);
      for (var i = 0; i < weights.length; i++) {
        var theWeight = weights[i];
        var plateHtml = this.createPlateHtml(theWeight);
        this.stackOfWeights.appendChild(plateHtml);
      }

      this.targetWeightSpan.innerHTML = weight;
    };

    Plates.prototype.setTargetWeight = function (weight) {
      if (isNaN(weight) || weight < 45) {
        weight = 45;
      }
      localStorage.setItem('targetWeight', weight);
    };

    Plates.prototype.getCurrentWeight = function () {
      var weightAsString = localStorage.getItem('targetWeight');
      return (weightAsString && parseInt(weightAsString)) || 45;
    }

    Plates.prototype.getStepValue = function (domElement) {
      var step = domElement.dataset.step;
      var operator = step[0];
      var value = parseInt(step.substring(1));
      return value * (operator === '+' ? 1 : -1);
    }

    Plates.prototype.incrementByButton = function (event) {
      var theWeight = this.getCurrentWeight();
      theWeight += this.getStepValue(event.target);
      this.setTargetWeight(theWeight);
      this.createPlatesHtml(theWeight);
    }

    return Plates;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Plates;
  } else {
    var stackOfWeights = document.getElementById('stackOfWeights');
    var targetWeightSpan = document.getElementById('targetWeightSpan');
    var minimumNote = document.getElementById('minimumNote');
    var steppers = document.getElementsByClassName('stepper');
    var plates = new Plates(stackOfWeights, targetWeightSpan, minimumNote, steppers);
    plates.init();

    // load fastclick
    window.addEventListener('load', function() {
      new FastClick(document.body);
    }, false);

    // decide whether to show download app message or nah
    var downloadAppMessage = document.getElementById('downloadAppMessage');
    if (window.navigator.userAgent.indexOf('iPhone') != -1) {
      downloadAppMessage.style.display = 'block';
      if (window.navigator.standalone === true) {
        downloadAppMessage.style.display = 'none';
      }
    } else {
      downloadAppMessage.style.display = 'none';
    }
  }

})();
