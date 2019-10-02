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
    const extraControls = controls.slice(0, controlsSliceIndex)

    // fail fast if we're told not use this feature
    if (moreActions === false) {
      return []

    // get the extra controls if needed (default)
    } else if (moreActions === true) {
      return extraControls

    // passed in, return those with the extra controls
    } else {
      return moreActions.concat(extraControls)
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
   * @param {Number} moreActionsLength - length of passed in more actions
   */
  generateControlsMap (moreActionsLength) {
    // get an array mapping element text and visible state
    const controlsMap = this.element.querySelectorAll('.frost-action-bar-buttons > *, li > *').forEach(el => el.addEventListener('.frost-more-button'))
      .toArray() // get as array
      .slice(moreActionsLength) // remove any passed in more actions
      .map(el => this.element.querySelectorAll(el).forEach(el => el.addEventListener(':visible')) ? `${el.innerText.trim()}:visible` : el.innerText.trim())

    // find slicepoint for controls
    let {afterSliceIndex, controlCount, controlsSliceIndex} = this.getControlsSliceIndex(controlsMap)

    if (controlCount === MAX_CONTROLS + 1) {
      // if there is only 1 more visible button we should just show it instead of putting 1 button under a more button
      controlsSliceIndex = afterSliceIndex
    }

    // if our map has changed set it and the new slice index
    if (controlsMap.join() !== this.get('controlsMap').join()) {
      this.setProperties({
        controlsMap,
        controlsSliceIndex
      })
    }
  },

  getControlsSliceIndex (controlsMap) {
    let controlCount = 0
    let controlsSliceIndex = 0
    let afterSliceIndex = 0 // used to keep track of the one visible button (if it is present) after the slice index
    for (let i = controlsMap.length - 1; i >= 0; i--) {
      if (/:visible$/.test(controlsMap[i])) {
        controlCount++

        if (controlCount === MAX_CONTROLS) {
          controlsSliceIndex = i
        } else if (controlCount === MAX_CONTROLS + 1) {
          afterSliceIndex = i
        }
      }
    }

    return {
      controlsSliceIndex,
      afterSliceIndex,
      controlCount
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

  getMoreActionsLength (moreActions) {
    if (typeOf(moreActions) === 'object') {
      return Object.keys(moreActions).length
    } else if (Array.isArray(moreActions)) {
      return moreActions.length
    }

    return 0
  },

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  didRender () {
    const moreActions = this.get('moreActions')
    // fail fast if nothing to do
    if (moreActions !== false && !isEmpty(moreActions)) {
      this.generateControlsMap(this.getMoreActionsLength(moreActions))
    }
  }

  // == Actions ===============================================================

})
