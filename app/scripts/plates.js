/*global FastClick */
(function () {
  'use strict';

  const BARBELL_WEIGHT = 45;
  const PLATES = [45, 35, 25, 10, 5, 2.5];

  function calculate(weight) {
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

  var stackOfWeights = document.getElementById('stackOfWeights');
  var targetWeightSpan = document.getElementById('targetWeightSpan');
  var minimumNote = document.getElementById('minimumNote');
  minimumNote.style.display = 'none';

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
    if (isNaN(weight) || weight <= 45) {
      weight = 45;
      minimumNote.style.display = 'block';
    } else {
      minimumNote.style.display = 'none';
    }

    clearChildrenFrom(stackOfWeights);
    var weights = calculate(weight);
    weights.forEach((theWeight) => {
      var plateHtml = createPlateHtml(theWeight);
      stackOfWeights.appendChild(plateHtml);
    });

    targetWeightSpan.innerHTML = weight;
  }

  function setTargetWeight(weight) {
    if (isNaN(weight) || weight < 45) {
      weight = 45;
    }
    localStorage.setItem('targetWeight', weight);
  }

  function getCurrentWeight() {
    var weightAsString = localStorage.getItem('targetWeight');
    return (weightAsString && parseInt(weightAsString)) || 45;
  }

  function getStepValue(domElement) {
    var step = domElement.dataset.step;
    var operator = step[0];
    var value = parseInt(step.substring(1));
    return value * (operator === '+' ? 1 : -1);
  }

  function incrementByButton(event) {
    var theWeight = getCurrentWeight();
    theWeight += getStepValue(event.target);
    setTargetWeight(theWeight);
    createPlatesHtml(theWeight);
  }

  var steppers = document.getElementsByClassName('stepper');
  for (var i = 0; i < steppers.length; i++) {
    var stepper = steppers[i];
    stepper.onclick = incrementByButton;
    stepper.innerHTML = stepper.dataset.step;
  }

  if (!localStorage.getItem('targetWeight')) {
    setTargetWeight(45);
  }
  var currentWeight = getCurrentWeight();
  setTargetWeight(currentWeight);
  createPlatesHtml(currentWeight);

  // load fastclick
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
    }, false);
  }

  // decide whether to show download app message or nah
  var downloadAppMessage = document.getElementById('downloadAppMessage');
  if (window.navigator.userAgent.indexOf('iPhone') !== -1) {
    downloadAppMessage.style.display = 'block';
    if (window.navigator.standalone === true) {
      downloadAppMessage.style.display = 'none';
    }
  } else {
    downloadAppMessage.style.display = 'none';
  }
})();
