import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import layout from '../templates/components/frost-object-browser-content'
import _ from 'lodash'
import ObjectBrowserStates from '../mixins/frost-object-browser-states'

export default Ember.Component.extend(ObjectBrowserStates, {

  // ================================================================
  // Dependencies
  // ================================================================

  // ================================================================
  // Properties
  // ================================================================

  layout,

  classNames: ['content'],

  // ================================================================
  // Computed Properties
  // ================================================================

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
