import Ember from 'ember'
import _ from 'lodash'
import computed, {readOnly} from 'ember-computed-decorators'
import layout from '../templates/components/frost-object-browser'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

/**
 * @type SelectedRecord
 * @property {Boolean} isSelected - whether or not it is selected
 * @property {Object} record - the record itself
 */

export default Ember.Component.extend(PropTypeMixin, {
  // ================================================================
  // Dependencies
  // ================================================================

  // ================================================================
  // Properties
  // ================================================================

  classNames: ['frost-object-browser'],
  layout,
  _pageNumber: 0,

  propTypes: {
    contentHeight: PropTypes.number,
    detailLevel: PropTypes.string,
    itemsPerPage: PropTypes.number,
    pageNumber: PropTypes.number,
    selectedItems: PropTypes.array,
    valuesTotal: PropTypes.number
  },

  getDefaultProps () {
    return {
      contentHeight: 505,
      detailLevel: 'low',
      itemsPerPage: 20,
      pageNumber: null,
      selectedItems: Ember.A([]),
      valuesTotal: null
    }
  },

  // ================================================================
  // Computed Properties
  // ================================================================

  @readOnly
  @computed('contentHeight')
  computedStyle: function (height) {
    return `height: ${height}px;`
  },

  @readOnly
  @computed('detailLevel', 'viewSchema')
  computedViewLevel: function (detailLevel, viewSchema) {
    if (viewSchema) {
      return viewSchema[detailLevel]
    } else {
      return {}
    }
  },

  /**
   * This tricky parameter prioritize page number property set outside of component,
   * if it's not set, we use our internal _pageNumber parameter
   */
  @readOnly
  @computed('pageNumber', '_pageNumber', 'valuesTotal', 'values.length')
  computedPageNumber: function (pageNumber, _pageNumber, valuesTotal) {
    if (pageNumber !== null) {
      return pageNumber
    }
    return _pageNumber
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
  },

  /**
   * Show total items count, if valuesTotal is set, just use this value,
   * otherwise shows length of value array
   */
  @readOnly
  @computed('valuesTotal', 'values', 'length', 'values.length')
  computedValuesTotal: function (valuesTotal, values, length) {
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
   * If something has been deleted, remove it from our selected items.
   * @returns Array of remaining Selected Items
   */
  getRemainingSelectedItems () {
    let selectedItems = this.get('selectedItems')
    let vals = this.get('values')
    return Ember.A(
      _.filter(selectedItems, (item) => vals.indexOf(item) >= 0)
    )
  },

  // ================================================================
  // Events
  // ================================================================

  /**
   * This gets called whenever anything passed to us changes.
   */
  onValuesChanged: Ember.observer('values.[]', function () {
    let selectedItems = this.get('selectedItems')
    const remainingSelectedItems = this.getRemainingSelectedItems()
    if (selectedItems.length > remainingSelectedItems.length) {
      Ember.run.later(this, function () {
        this.set('selectedItems', remainingSelectedItems)
        const onRowSelect = this.get('onRowSelect')
        if (onRowSelect) {
          onRowSelect(remainingSelectedItems, [], [])
        }
      })
    }
  }),
  // ================================================================
  // Actions
  // ================================================================

  actions: {

    /**
     * Prepare arguments for and call our on-row-select callback
     * @param {SelectedRecord} selectedRecord - record that was just selected
     */
    onSelect (attr) {
      let newSelected = {}
      let deSelected = {}
      const allSelected = this.get('selectedItems')
      if (attr.isSelected) {
        allSelected.addObject(attr.record)
        newSelected = attr.record
      } else {
        allSelected.removeObject(attr.record)
        deSelected = attr.record
      }
      const onRowSelect = this.get('onRowSelect')
      if (onRowSelect) {
        onRowSelect(allSelected, newSelected, deSelected)
      }
    },

    /**
     * Change our LOD
     * @param {String} newLevel - new level ('low', 'med', high')
     */
    onDetailChange (newLevel) {
      const onDetailChange = this.get('onDetailChange')

      this.set('detailLevel', newLevel)

      if (onDetailChange) {
        onDetailChange(newLevel)
      }
    },

    /**
     * When page number has been changed by paginaor
     * @param {String} where - new page number
     */
    onPageChanged (where) {
      const externalPageNumber = this.get('pageNumber')
      const total = this.get('computedValuesTotal')
      const itemsPerPage = this.get('itemsPerPage')
      let currentPage = this.get('computedPageNumber')
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
