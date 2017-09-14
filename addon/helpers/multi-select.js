import Ember from 'ember'
const {Helper, isArray} = Ember

/*
 * Returns false if one or more items are selectedItems
 * @param {Array} selectedItems
 * @see {@link https://github.com/emberjs/ember.js/issues/11867}
 * @returns {Boolean}
 */

export default Helper.extend({
  destroy () {
    if (this.teardown) this.teardown()
    this._super(...arguments)
  },
  setupRecompute (selectedItems, property) {
    if (this.teardown) this.teardown()
    var path = '[]'
    selectedItems.addObserver(path, this, this.recompute)
    this.teardown = () => {
      selectedItems.removeObserver(path, this, this.recompute)
    }
  },
  compute ([selectedItems, property]) {
    this.setupRecompute(selectedItems, property)
    return isArray(selectedItems) && selectedItems.length === 0
  }
})
