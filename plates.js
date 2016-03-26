(function () {
  'use strict';

  var BARBELL_WEIGHT = 45;
  var MAX_WEIGHT = 495;
  var PLATES = [45, 35, 25, 10, 5, 2.5];

  function calculate(weight) {
    if (weight < BARBELL_WEIGHT || weight % (2.5 * 2) !== 0) {
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
  }

  var stackOfWeights = document.getElementById('stackOfWeights');
  var incrementButton = document.getElementById('incrementButton');
  var decrementButton = document.getElementById('decrementButton');
  var targetWeightInput = document.getElementById('targetWeightInput');
  var targetWeight = document.getElementById('targetWeightRange');
  var targetWeightInput = document.getElementById('targetWeightInput');

  function clearChildrenFrom(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function getPlateWidthInPercentage(plate) {
    var number = PLATES.indexOf(plate);
    return 100 - (number * 10);
  }

  function createPlateHtml(weight) {
    var li = document.createElement('li');
    li.className = 'plate';
    li.innerHTML = weight;
    li.style.width = getPlateWidthInPercentage(weight) + '%';
    return li;
  }

  function createPlatesHtml(weight) {
    if (isNaN(weight) || weight < 45) {
      weight = 45;
    }

    clearChildrenFrom(stackOfWeights);
    var weights = calculate(weight);
    for (var i = 0; i < weights.length; i++) {
      var theWeight = weights[i];
      var plateHtml = createPlateHtml(theWeight);
      stackOfWeights.appendChild(plateHtml);
    }

    decrementButton.style.visibility = (weight <= 45) ? 'hidden' : 'visible';
    incrementButton.style.visibility = (weight >= MAX_WEIGHT) ? 'hidden' : 'visible';
  }

  function setTargetWeight(weight) {
    if (isNaN(weight) || weight < 45) {
      weight = 45;
    }
    targetWeightRange.valueAsNumber = weight;
    targetWeightInput.valueAsNumber = weight;
    localStorage.targetWeight = weight;
  }

  function roundToNearestFive(number) {
    return Math.ceil(number / 5.0) * 5;
  }

  targetWeightRange.oninput = targetWeightInput.onchange = function (e) {
    var theWeight = roundToNearestFive(e.target.valueAsNumber);
    setTargetWeight(theWeight);
    createPlatesHtml(theWeight);
  };

  incrementButton.onclick = decrementButton.onclick = function (e) {
    var theWeight = targetWeightInput.valueAsNumber;
    theWeight += (e.target === incrementButton) ? 5 : -5;
    setTargetWeight(theWeight);
    createPlatesHtml(theWeight);
  };

  if (localStorage.targetWeight) {
    setTargetWeight(localStorage.targetWeight);
    createPlatesHtml(localStorage.targetWeight);
  }

})();
