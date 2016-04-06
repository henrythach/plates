'use strict';

var test = require('tape');
var Plates = require('./plates');

test('calcuate plate math', function (t) {
  var plates = new Plates();

  t.same(plates.calculate(0), undefined);
  t.same(plates.calculate(1), undefined);
  t.same(plates.calculate(93), undefined);
  t.same(plates.calculate(-10), undefined);
  t.same(plates.calculate('hellokitty'), undefined);
  t.same(plates.calculate(null), undefined);
  t.same(plates.calculate(undefined), undefined);

  t.same(plates.calculate(45), []);
  t.same(plates.calculate(50), [2.5]);
  t.same(plates.calculate(55), [5]);
  t.same(plates.calculate(60), [5, 2.5]);
  t.same(plates.calculate(65), [10]);
  t.same(plates.calculate(70), [10, 2.5]);
  t.same(plates.calculate(75), [10, 5]);
  t.same(plates.calculate(80), [10, 5, 2.5]);
  t.same(plates.calculate(85), [10, 10]);
  t.same(plates.calculate(90), [10, 10, 2.5]);
  t.same(plates.calculate(95), [25]);
  t.same(plates.calculate(100), [25, 2.5]);
  t.same(plates.calculate(105), [25, 5]);
  t.same(plates.calculate(110), [25, 5, 2.5]);
  t.same(plates.calculate(115), [35]);
  t.same(plates.calculate(120), [35, 2.5]);
  t.same(plates.calculate(125), [35, 5]);
  t.same(plates.calculate(130), [35, 5, 2.5]);
  t.same(plates.calculate(135), [45]);

  for (var i = 135; i <= 225; i += 5) {
    t.same(plates.calculate(i), [45].concat(plates.calculate(i - 90)));
  }

  t.end();
});

test('getting plate width percentage', function (t) {
  var plates = new Plates();

  t.same(plates.getPlateWidthInPercentage(45),  100);
  t.same(plates.getPlateWidthInPercentage(35),  90);
  t.same(plates.getPlateWidthInPercentage(25),  80);
  t.same(plates.getPlateWidthInPercentage(10),  70);
  t.same(plates.getPlateWidthInPercentage(5),   60);
  t.same(plates.getPlateWidthInPercentage(2.5), 50);

  t.end();
});
