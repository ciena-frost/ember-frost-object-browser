import Ember from 'ember'
import layout from '../templates/components/frost-object-browser-action-bar'

const {
  Component,
  computed
} = Ember

/**
 * @module
 * @augments ember/Component
 */
export default Component.extend({

  // ================================================================
  // Dependencies
  // ================================================================

  // ================================================================
  // Properties
  // ================================================================

  /** @type {Object} */
  layout,

  /** @type {Boolean} */
  multiSelect: false,

  // ================================================================
  // Computed Properties
  // ================================================================

  /**
   * Whether the button should be disabled
   *
   * @function
   * @returns {Boolean}
   */
  isDisabled: computed(
    'selectedItems.[]',
    function () {
      const length = this.get('selectedItems.length')

      if (this.get('multiSelect')) {
        return length < 1
      } else {
        return length !== 1
      }
    }
  ),

  // ================================================================
  // Functions
  // ================================================================

  // ================================================================
  // Events
  // ================================================================

  // ================================================================
  // Actions
  // ================================================================

  /**
   * @type {Object}
   */
  actions: {

    /**
     * Handles expanding/contracting of the filters
     *
     * @function actions:onActionClick
     * @param {ember/Array} selectedItems The selected items
     * @returns {undefined}
     */
    onActionClick (selectedItems) {
      const onActionClick = this.get('onActionClick')

      if (onActionClick) {
        onActionClick(selectedItems)

        if (this.get('text').toLowerCase().indexOf('delete') !== -1) {
          selectedItems.clear()
        }
      }
    }
  }
})
