import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import _ from 'lodash'
import layout from '../templates/components/frost-object-browser-paginator'

const {
  Component
} = Ember

export default Component.extend({

  // ================================================================
  // Dependencies
  // ================================================================

  // ================================================================
  // Properties
  // ================================================================

  layout: layout,

  // ================================================================
  // Computed Properties
  // ================================================================

  /**
   * This tricky parameter prioritize page number property set outside of component,
   * if it's not set, we use our internal _pageNumber parameter
   */
  @readOnly
  @computed('pageNumber', '_pageNumber', 'valuesTotal', 'values.length')
  page: function (pageNumber, _pageNumber, valuesTotal) {
    if (pageNumber !== null) {
      return pageNumber
    }
    return _pageNumber
  },

  /**
   * Determines the starting page value in the display text
   */
  @readOnly
  @computed('page', 'itemsPerPage', 'total')
  computedOffset: function (page, itemsPerPage, total) {
    if (total === 0) {
      return 0
    }

    return page * itemsPerPage + 1
  },

  /**
   * Determines the ending page value in the display text
   */
  @readOnly
  @computed('page', 'itemsPerPage', 'total')
  computedEnd: function (page, itemsPerPage, total) {
    const pageMax = (page + 1) * itemsPerPage
    return (total < pageMax) ? total : pageMax
  },

  /**
   * Creates the pagination display test
   */
  @readOnly
  @computed('computedOffset', 'computedEnd', 'total')
  paginationText (computedOffset, computedEnd, total) {
    if (total === 0) {
      return '0 results found'
    }

    return `${computedOffset} to ${computedEnd} of ${total}`
  },

  /**
   * Determines whether the left buttons should be enabled/disabled
   */
  @readOnly
  @computed('page')
  leftButtonsDisabled: function (page) {
    return page === 0
  },

  /**
   * Determines whether the right buttons should be enabled/disabled
   */
  @readOnly
  @computed('page', 'itemsPerPage', 'total')
  rightButtonsDisabled: function (page, itemsPerPage, total) {
    if (total === 0) {
      return true
    }

    return page === Math.floor((total - 1) / itemsPerPage)
  },

  /**
   * Show total items count, if valuesTotal is set, just use this value,
   * otherwise shows length of value array
   */
  @readOnly
  @computed('valuesTotal', 'values', 'length', 'values.length')
  total: function (valuesTotal, values, length) {
    if (valuesTotal) {
      return valuesTotal
    }

    try {
      return values.get('length')
    } catch (err) {
    }

    if (_.isArray(values)) {
      return values.length
    }

    return length
  },

  // ================================================================
  // Functions
  // ================================================================

  /**
   * init event hook
   *
   * @returns {undefined}
   */
  init () {
    this._super(...arguments)
    this.componentInit()
  },

  /**
   * Sets up the initial state with _pageNumber set to 0
   *
   * @returns {undefined}
   */
  componentInit () {
    this.set('_pageNumber', 0)
  },

  // ================================================================
  // Events
  // ================================================================

  // ================================================================
  // Actions
  // ================================================================

  actions: {

    /**
     * When page number has been changed by paginaor
     * @param {String} where - new page number
     */
    onPageChanged (where) {
      const externalPageNumber = this.get('pageNumber')
      const total = this.get('total')
      const itemsPerPage = this.get('itemsPerPage')
      let currentPage = this.get('page')
      switch (where) {
        case 'begin':
          currentPage = 0
          break
        case 'back':
          currentPage--
          break
        case 'forward':
          currentPage++
          break
        case 'end':
          currentPage = Math.floor((total - 1) / itemsPerPage)
          break
      }

      if (externalPageNumber !== null) {
        this.sendAction('onPageChanged', currentPage)
      } else {
        this.set('_pageNumber', currentPage)
      }
    }
  }
})
