(function () {
  'use strict';

  describe('utils', function () {
    let utils = app.utils;
    it('should calculate stuff', () => {
      assert.deepEqual([], utils.calculate(45));
      assert.deepEqual([], utils.calculate(0));
      assert.deepEqual([], utils.calculate(1));
      assert.deepEqual([], utils.calculate(93));
      assert.deepEqual([], utils.calculate(-10));
      assert.deepEqual([], utils.calculate('hellokitty'));
      assert.deepEqual([], utils.calculate(null));
      assert.deepEqual([], utils.calculate(undefined));

      assert.deepEqual([], utils.calculate(45));
      assert.deepEqual([2.5], utils.calculate(50));
      assert.deepEqual([5], utils.calculate(55));
      assert.deepEqual([5, 2.5], utils.calculate(60));
      assert.deepEqual([10], utils.calculate(65));
      assert.deepEqual([10, 2.5], utils.calculate(70));
      assert.deepEqual([10, 5], utils.calculate(75));
      assert.deepEqual([10, 5, 2.5], utils.calculate(80));
      assert.deepEqual([10, 10], utils.calculate(85));
      assert.deepEqual([10, 10, 2.5], utils.calculate(90));
      assert.deepEqual([25], utils.calculate(95));
      assert.deepEqual([25, 2.5], utils.calculate(100));
      assert.deepEqual([25, 5], utils.calculate(105));
      assert.deepEqual([25, 5, 2.5], utils.calculate(110));
      assert.deepEqual([35], utils.calculate(115));
      assert.deepEqual([35, 2.5], utils.calculate(120));
      assert.deepEqual([35, 5], utils.calculate(125));
      assert.deepEqual([35, 5, 2.5], utils.calculate(130));
      assert.deepEqual([45], utils.calculate(135));

      for (var i = 135; i <= 225; i += 5) {
        assert.deepEqual([45].concat(utils.calculate(i - 90)), utils.calculate(i));
      }
    });
  });
})();
