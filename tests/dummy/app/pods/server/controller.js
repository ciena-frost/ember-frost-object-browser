import Ember from 'ember'
const {A, Controller, inject, isEmpty} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {generateFacetView} from 'ember-frost-bunsen/utils'
import _ from 'lodash'

export default Controller.extend({

  // == Dependencies ==========================================================
  notifications: inject.service('notification-messages'),

  // == Keyword Properties

  queryParams: ['filters', 'sortOrder'],

  // == Properties ============================================================

  expandedItems: [],
  filters: {},
  filterModel: {
    type: 'object',
    properties: {
      id: {type: 'string'},
      label: {type: 'string'}
    }
  },
  filterView: generateFacetView([
    {label: 'Id', model: 'id'},
    {label: 'Label', model: 'label'}
  ]),
  selectedItems: [],
  sortOrder: ['id'],
  sortingProperties: [
    {label: 'Id', value: 'id'},
    {label: 'Label', value: 'label'}
  ],

  // == Computed Properties ===================================================

  @readOnly
  @computed('selectedItems.@each.id')
  detailLinkRouteNames (selectedItems) {
    return selectedItems.map((selectedItem) => {
      return `${window.location.origin}/#/user/${selectedItem.get('id')}`
    })
  },

  @readOnly
  @computed('model.[]')
  items (model) {
    if (isEmpty(model)) {
      return []
    }

    // Server handles filtering/sorting
    return A(model.slice())
  },

  @readOnly
  @computed('selectedItems.@each.label')
  labelIncludesF (selectedItems) {
    return selectedItems.find((selectedItem) => {
      return selectedItem.get('label').toLowerCase().includes('f')
    })
  },

  // == Functions =============================================================

  fetch () {
    this.store.query('list-item', {
      pageSize: 100,
      start: 0,
      filter: this.get('filters'),
      sort: this.get('sortOrder')
    }).then((response) => {
      // response.get('meta')

      this.set('model', this.store.peekAll('list-item'))
    })
  },

  // == Ember Lifecycle Hooks =================================================

  // == Actions ===============================================================

  actions: {
    // BEGIN-SNIPPET server-controller
    onExpansionChange (expandedItems) {
      this.get('expandedItems').setObjects(expandedItems)
    },

    onFilteringChange (filters) {
      // Re-fetching the model, clear out the existing state
      this.get('selectedItems').clear()
      this.get('expandedItems').clear()
      this.set('filters', _.cloneDeep(filters))
      this.fetch()
      this.get('notifications').success('Server should return filtered results', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onGenericAction (selectedItems, message) {
      this.get('notifications').success(message, {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onSelectionChange (selectedItems) {
      this.get('selectedItems').setObjects(selectedItems)
    },

    onSortingChange (sortOrder) {
      // Re-fetching the model, clear out the existing state
      this.get('selectedItems').clear()
      this.get('expandedItems').clear()
      this.get('sortOrder').setObjects(sortOrder)
      this.fetch()
      this.get('notifications').success('Server should return sorted results', {
        autoClear: true,
        clearDuration: 2000
      })
    }
    // END-SNIPPET
  }
})
