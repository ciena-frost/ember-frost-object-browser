import Ember from 'ember'
const {A, Controller, get, inject, isEmpty, isPresent, run} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {generateFacetView} from 'ember-frost-bunsen/utils'
import {sort} from 'ember-frost-sort'
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
  isLoading: false,
  itemsPerPage: 10,
  loadingText: 'Loading actions',
  page: 0,
  scrollTop: 0,
  selectedItems: [],
  sortOrder: ['id'],
  sortingProperties: [
    {label: 'Id', value: 'id'},
    {label: 'Label', value: 'label'}
  ],
  totalItems: 100, // Typically extracted from meta on the request
  componentKeyNames: {
    controls: 'controlNames'
  },
  componentKeyNamesForTypes: {
    a: {
      itemName: 'list-item',
      itemExpansionName: 'list-item-expansion',
      controlNames: [
        'singleSelect'
      ]
    },
    b: {
      itemName: 'list-item',
      itemExpansionName: 'list-item-expansion',
      controlNames: [
        'multiSelect',
        'includesF'
      ]
    },
    c: {
      itemName: 'list-item',
      itemExpansionName: 'list-item-expansion',
      controlNames: [
        'includesF'
      ]
    },
    d: {
      itemName: 'list-item',
      itemExpansionName: 'list-item-expansion',
      controlNames: [
        'detailsButton'
      ]
    },
    default: {
      itemName: 'list-item',
      itemExpansionName: 'list-item-expansion'
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('selectedItems.@each.id')
  detailLinkRouteNames (selectedItems) {
    return selectedItems.map((selectedItem) => {
      return `${window.location.origin}/#/user/${selectedItem.get('id')}`
    })
  },

  @readOnly
  @computed('filters', 'model.[]', 'page', 'sortOrder.[]')
  items (filters, model, page, sortOrder) {
    if (isEmpty(model)) {
      return []
    }

    // Client side filtering
    let filteredItems = model
    if (!isEmpty(filters)) {
      filteredItems = model.filter((item) => {
        return A(Object.keys(filters)).every(key => {
          return get(item, key).indexOf(get(filters, key)) >= 0
        })
      })
    }

    // Client side sorting
    const sortedItems = sort(filteredItems, sortOrder)

    // Client side pagination
    const itemsPerPage = this.get('itemsPerPage')
    const pageSliceStart = itemsPerPage * page
    return sortedItems.slice(pageSliceStart, pageSliceStart + itemsPerPage + 1)
  },

  @readOnly
  @computed('selectedItems.@each.label')
  labelIncludesF (selectedItems) {
    return selectedItems.find((selectedItem) => {
      return selectedItem.get('label').toLowerCase().includes('f')
    })
  },

  // == Functions =============================================================

  fetchPage (page) {
    this.store.query('list-item', {
      pageSize: this.get('itemsPerPage'),
      start: (page * this.get('itemsPerPage'))
    }).then((response) => {
      this.set('model', this.store.peekAll('list-item'))
    })
  },

  doneLoading () {
    this.set('isLoading', false)
  },

  // == Ember Lifecycle Hooks =================================================

  // == Actions ===============================================================

  actions: {
    // BEGIN-SNIPPET client-typed-controller
    onExpansionChange (expandedItems) {
      this.get('expandedItems').setObjects(expandedItems)
    },

    onFilteringChange (filters) {
      this.set('filters', _.cloneDeep(filters))
      this.store.unloadAll('list-item')
      this.get('selectedItems').clear()
      this.fetchPage(0)
    },

    onGenericAction (selectedItems, message) {
      this.get('notifications').success(message, {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onPaginationChange (page) {
      this.setProperties({
        page,
        scrollTop: 0
      })
      this.fetchPage(page)
    },

    onSelectionChange (selectedItems) {
      this.get('selectedItems').setObjects(selectedItems)
      if (isPresent(selectedItems)) {
        this.set('isLoading', true)
        this.get('notifications').success('Set isLoading flag to true', {
          autoClear: true,
          clearDuration: 2000
        })
        run.debounce(this, this.doneLoading, 2000)
      }
    },

    onSortingChange (sortOrder) {
      this.get('sortOrder').setObjects(sortOrder)
      this.store.unloadAll('list-item')
      this.get('selectedItems').clear()
      this.fetchPage(0)
    }
    // END-SNIPPET
  }
})
