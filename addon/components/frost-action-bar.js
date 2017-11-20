/**
 * Component definition for the frost-action-bar component
 */

import Ember from 'ember'
const {get, getWithDefault, isEmpty, isPresent, typeOf} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-action-bar'
import {applicableControls} from '../utils/controls'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    controls: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.EmberComponent).isRequired,
      PropTypes.object.isRequired
    ]),
    // FIXME: for next major release, make this `i18n.messages.selectedItems()` (@job13er 2017-06-06)
    i18n: PropTypes.shape({
      formatSelectedItemsLabel: PropTypes.func.isRequired
    }),
    selectedItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ])).isRequired,
    itemTypeKey: PropTypes.string,
    componentKeyNamesForTypes: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]),
    isLoading: PropTypes.bool,

    // callbacks
    getSelectedItemsLabel: PropTypes.func

    // state
  },

  getDefaultProps () {
    return {
      // options
      i18n: {
        formatSelectedItemsLabel (count) {
          const items = (count > 1) ? 'Items' : 'Item'
          return `${count} ${items} selected`
        }
      },
      isLoading: false

      // callbacks

      // state
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('selectedItems.[]')
  isVisible (selectedItems) {
    return !isEmpty(selectedItems)
  },

  @readOnly
  @computed('selectedItems.[]')
  selectedItemsLabel (selectedItems) {
    return this.i18n.formatSelectedItemsLabel(selectedItems.length)
  },

  @readOnly
  @computed('controls')
  isControlsObject (controls) {
    return typeOf(controls) === 'object'
  },

  @readOnly
  @computed('isControlsObject', 'controls', 'selectedItems.[]')
  _controls (isControlsObject, controls, selectedItems) {
    if (isControlsObject) {
      return applicableControls(this.selectedTypesWithControls(selectedItems)).map((controlName) => {
        return controls[controlName]
      })
    }

    return controls
  },

  // == Functions =============================================================

  selectedTypesWithControls (selectedItems) {
    const componentKeyNamesForTypes = this.get('componentKeyNamesForTypes')
    const itemTypeKey = this.get('itemTypeKey')
    const componentKeyNames = this.get('componentKeyNames')

    if (isPresent(componentKeyNamesForTypes) && isPresent(itemTypeKey)) {
      return selectedItems.reduce((typesWithControls, item) => {
        const itemType = get(item, itemTypeKey)
        if (itemType) {
          const itemTypeContent = getWithDefault(componentKeyNamesForTypes, itemType, {})
          const itemTypeContentControls = getWithDefault(itemTypeContent, get(componentKeyNames, 'controls'), [])
          typesWithControls[itemType] = itemTypeContentControls
        }
        return typesWithControls
      }, {})
    }
  }

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

})
