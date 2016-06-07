import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import layout from '../templates/components/frost-object-browser-content'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

const {
  A,
  Component
} = Ember

/**
 * @module
 * @augments ember/Component
 * @augments module:ember-prop-types
 */
export default Component.extend(PropTypeMixin, {

  // ================================================================
  // Dependencies
  // ================================================================

  // ================================================================
  // Properties
  // ================================================================

  /** @type {Object} */
  layout,

  /** @type {String[]} */
  classNames: ['content'],

  /** @type {?Number} */
  _pageNumber: null,

  propTypes: {
    detailLevel: PropTypes.string,
    itemsPerPage: PropTypes.number,
    pageNumber: PropTypes.number,
    selectedItems: PropTypes.array,
    valuesTotal: PropTypes.number
  },

  getDefaultProps () {
    return {
      detailLevel: 'low',
      itemsPerPage: 20,
      pageNumber: null,
      selectedItems: A([]),
      valuesTotal: null
    }
  },

  // ================================================================
  // Computed Properties
  // ================================================================

  @readOnly
  @computed('detailLevel', 'viewSchema')
  /**
   * The level of detail, if set, to use when displaying the data
   *
   * @function
   * @param {String} detailLevel The level of detail (ex. low, medium, high)
   * @param {Object} viewSchema An object describing the desired view
   */
  computedViewLevel: function (detailLevel, viewSchema) {
    if (viewSchema) {
      return viewSchema[detailLevel]
    } else {
      return {}
    }
  },

  /**
   * Values will be shown in browser after pagination logic applied
   */
  @readOnly
  @computed('values', '_pageNumber', 'pageNumber', 'itemsPerPage', 'values.length')
  computedValues: function (values, _pageNumber, pageNumber, itemsPerPage) {
    if (pageNumber !== null) {
      // pagination is contolled outside object-browser
      return values.slice(0, itemsPerPage)
    }
    return values.slice(_pageNumber * itemsPerPage, (_pageNumber + 1) * itemsPerPage)
  }

  // ================================================================
  // Functions
  // ================================================================

  // ================================================================
  // Events
  // ================================================================

  // ================================================================
  // Actions
  // ================================================================

})
