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
  });
})();
