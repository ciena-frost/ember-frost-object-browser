/**
 * Component definition for the frost-action-bar component
 */

import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-action-bar'
import {applicableControls} from '../utils/controls'

const {get, getWithDefault, isEmpty, isPresent, typeOf} = Ember
const MAX_CONTROLS = 4

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
    moreActions: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.EmberComponent),
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.bool,
      PropTypes.object
    ]),
    moreActionsText: PropTypes.string,
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
    alwaysVisible: PropTypes.bool,

    // callbacks
    getSelectedItemsLabel: PropTypes.func

    // state
  },

  getDefaultProps () {
    return {
      // options
      alwaysVisible: false,
      controlsMap: [],
      controlsSliceIndex: 0,
      i18n: {
        formatSelectedItemsLabel (count) {
          const items = (count > 1) ? 'Items' : 'Item'
          return `${count} ${items} selected`
        }
      },
      isLoading: false,
      moreActions: true,
      moreActionsText: 'More...'

      // callbacks

      // state
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('selectedItems.[]')
  isVisible (selectedItems) {
    return this.get('alwaysVisible') || !isEmpty(selectedItems)
  },

  @readOnly
  @computed('selectedItems.[]')
  selectedItemsLabel (selectedItems) {
    return this.i18n.formatSelectedItemsLabel(selectedItems.length)
  },

  @readOnly
  @computed('controls', 'selectedItems.[]', 'controlsSliceIndex')
  /**
   * gets controls for the action bar
   * @param {Ember.Component[]|object} controls - array or hash of controls
   * @param {Ember.Object[]|object[]} selectedItems - array of selected items for filtering controls
   * @param {number} controlsSliceIndex - index to slice the controls at for auto moreActions
   * @returns {Ember.Component[]} array of controls
   */
  _controls (controls, selectedItems, controlsSliceIndex) {
    controls = this.getNormalizedControls(controls, selectedItems)
    return controls.slice(controlsSliceIndex)
  },

  @readOnly
  @computed('controls', 'selectedItems.[]', 'moreActions', 'controlsSliceIndex')
  /**
   * gets controls for the action bar
   * @param {Ember.Component[]|object} controls - array or hash of controls
   * @param {Ember.Object[]|object[]} selectedItems - array of selected items for filtering moreActions
   * @param {Ember.Component[]|boolean|object[]|object} moreActions - array or hash of moreActions
   * @param {number} controlsSliceIndex - index to slice the controls at for auto moreActions
   *  or flag indicating whether to generate them automatically
   * @returns {object[]} array of moreActions definitions
   */
  _moreActions (controls, selectedItems, moreActions, controlsSliceIndex) {
    controls = this.getNormalizedControls(controls, selectedItems)
    moreActions = this.getNormalizedControls(moreActions, selectedItems)

    // fail fast if we're told not use this feature
    if (moreActions === false) {
      return []

    // get the extra controls if needed (default)
    } else if (moreActions === true) {
      return controls.slice(0, controlsSliceIndex)

    // passed in, return those
    } else {
      return moreActions
    }
  },

  // == Functions =============================================================

  /**
   * converts controls to array if they are given as a hash
   * filters out inapplicable controls
   * @param {Ember.Component[]|boolean|object[]|object} controls - array or hash of controls
   * @param {Ember.Object[]|object[]} selectedItems - array of selected items
   * @returns {Ember.Component[]|boolean|object[]} - array of controls or flag
   */
  getNormalizedControls (controls, selectedItems) {
    // convert hash of controls to array if necessary
    if (typeOf(controls) === 'object') {
      // filter out inapplicable controls
      controls = applicableControls(this.selectedTypesWithControls(selectedItems)).map((controlName) => {
        return controls[controlName]
      })
    }

    // check for POJOs and return copy
    if (Array.isArray(controls)) {
      return controls.map(control => {
        if (control.isPOJO === undefined && !control.set) {
          control.isPOJO = !!(control.hook && control.text && control.onClick)
        }
        return control
      })
    }

    return controls
  },

  /**
   * generates controlsMap for organizing the buttons
   * sets controlsMap and controlsSliceIndex based on visible components and their arrangement
   */
  generateControlsMap () {
    let renderedMoreButton = false
    // get an array mapping element text and visible state
    const controlsMap = this.$('.frost-action-bar-buttons > *, li > *')
      .toArray() // get as array
      .filter(el => {
        // remove more... button from list
        if (/frost-more-button/.test(el.className)) {
          renderedMoreButton = true
          return false
        }
        return true
      })
      .map(el => this.$(el).is(':visible') ? `${el.innerText.trim()}:visible` : el.innerText.trim())

    let controlsSliceIndex = 0
    const visibleControls = controlsMap.filter(item => /:visible$/.test(item))

    // max controls + 1 because we don't want to show the more button when there would be only one item in it
    if (visibleControls.length > MAX_CONTROLS + 1 || renderedMoreButton) {
      controlsSliceIndex = controlsMap.length - MAX_CONTROLS
    }

    // if our map has changed set it and the new slice index
    if (controlsMap.join() !== this.get('controlsMap').join()) {
      this.setProperties({
        controlsMap,
        controlsSliceIndex
      })
    }
  },

  /**
   * filters out inapplicable controls
   * @param {Ember.Object[]|object[]} selectedItems - array of selected items
   * @returns {Ember.Object[]|object[]} - array of applicable controls
   */
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
  },

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  didRender () {
    // fail fast if nothing to do
    if (this.get('moreActions') === true) {
      this.generateControlsMap()
    }
  }

  // == Actions ===============================================================

})
