(function () {
  'use strict';

  describe('dom', function () {
    let dom = app.dom;
    it('should clear children from an element', () => {
      let list = document.createElement('ul');
      let item1 = document.createElement('li');
      let item2 = document.createElement('li');
      let item3 = document.createElement('li');
      list.appendChild(item1);
      list.appendChild(item2);
      list.appendChild(item3);

      assert.equal('<li></li><li></li><li></li>', list.innerHTML);
      dom.clearChildrenFrom(list);
      assert.equal('', list.innerHTML);
    });

    it('should create a <li> element for a plate', () => {
      var fourtyFive = dom.createPlateHtml(45);
      assert.equal('plate', fourtyFive.className);
      assert.equal('100%', fourtyFive.style.width);
      assert.equal('45', fourtyFive.innerHTML);

      var thirtyFive = dom.createPlateHtml(35);
      assert.equal('plate', thirtyFive.className);
      assert.equal('90%', thirtyFive.style.width);
      assert.equal('35', thirtyFive.innerHTML);

      var twentyFive = dom.createPlateHtml(25);
      assert.equal('plate', twentyFive.className);
      assert.equal('80%', twentyFive.style.width);
      assert.equal('25', twentyFive.innerHTML);

      var ten = dom.createPlateHtml(10);
      assert.equal('plate', ten.className);
      assert.equal('70%', ten.style.width);
      assert.equal('10', ten.innerHTML);

      var five = dom.createPlateHtml(5);
      assert.equal('plate', five.className);
      assert.equal('60%', five.style.width);
      assert.equal('5', five.innerHTML);

      var twoAndHalf = dom.createPlateHtml(2.5);
      assert.equal('plate', twoAndHalf.className);
      assert.equal('50%', twoAndHalf.style.width);
      assert.equal('2.5', twoAndHalf.innerHTML);
    });

    it('should insert plate html to container', () => {
      const weights = [45, 35, 25, 10, 5, 2.5];
      const weightPlates = weights.map(weight => dom.createPlateHtml(weight));
      const container = document.createElement('ul');
      dom.insertPlatesToContainer(weights, container);
      weightPlates.forEach((weightPlate, i) =>
        assert.isTrue(weightPlate.isEqualNode(container.children[i]))
      );
    });
  });
})();
