import Ember from 'ember'
import layout from '../templates/components/frost-object-browser-filter'
import _ from 'lodash'

const {
  Component
} = Ember

/**
 * An abstract method to call a passed funtionName with passed arguments
 *
 * @function
 * @param {Object} context The context of the object
 * @param {String} functionName The name of the function
 * @param {Any} args The passed arguments to call the function with
 * @returns {undefined}
 */
function callIfDefined (context, functionName, ...args) {
  let func = context.get(functionName)

  if (_.isFunction(func)) {
    func(...args)
  }
}

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

  /** @type {String[]} */
  classNames: ['facets'],

  // ================================================================
  // Computed Properties
  // ================================================================

  // ================================================================
  // Functions
  // ================================================================

  /**
   * Sets the filter state
   *
   * @function
   * @param {Object} filterState The selected filters to be applied
   * @returns {undefined}
   */
  updateFilterState (filterState) {
    this.set('activeFilters', filterState)
    callIfDefined(this, 'onFilter', filterState)
  },

  // ================================================================
  // Events
  // ================================================================

  /**
   * init event hook
   *
   * @returns {undefined}
   */
  init () {
    this._super(...arguments)
    let filters = this.get('activeFilters')

    if (filters === undefined || filters === null) {
      this.set('activeFilters', {})
    }
  },

  // ================================================================
  // Actions
  // ================================================================

  /**
   * @type {Object}
   */
  actions: {

    /**
     * Handles updating of the filters
     *
     * @function actions:filter-change
     * @param {String} filterName The name of the filter that changed
     * @param {Object} value The selected filter value
     * @returns {undefined}
     */
    'filter-change' (filterName, value) {
      let filterState = this.get('activeFilters')
      // Create a new filter state object, this helps with observers
      filterState = _.clone(filterState)
      filterState[filterName] = value
      this.updateFilterState(filterState)
    },

    /**
     * Handles clearing of the filters
     *
     * @function actions:clear-filter
     * @param {String} filterName The name of the filter to clear
     * @returns {undefined}
     */
    'clear-filter' (filterName) {
      let filterState = this.get('activeFilters')
      filterState = _.extend({}, filterState)
      filterState[filterName] = [null]

      let filterData = this.get('filters')
      let filterIndex = _.findIndex(filterData, function (item) {
        return item.name === filterName
      })

      this.set(`filters.${filterIndex}.selectedValue`, null)

      this.updateFilterState(filterState)
    },

    /**
     * Handles expanding/contracting of the filters
     *
     * @function actions:toggle-hidden
     * @param {Number} index The filter item to show/hide
     * @returns {undefined}
     */
    'toggle-hidden' (index) {
      const filterIsShowing = `filters.${index}.showing`

      const newVal = !this.get(filterIsShowing)
      this.set(filterIsShowing, newVal)
    }
  }
})
