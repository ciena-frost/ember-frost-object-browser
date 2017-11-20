import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-object-browser'

export default Component.extend({
  // == Dependencies ==========================================================
  layout,

  // == Keyword Properties ====================================================
  classNameBindings: ['_isFilterHidden:filter-invisible:filter-visible'],

  // == Properties ============================================================
  propTypes: {
    // required
    content: PropTypes.EmberComponent.isRequired,
    controls: PropTypes.EmberComponent.isRequired,
    filters: PropTypes.EmberComponent.isRequired,
    // FIXME: For the next major release, make this `i18n.labels.refineBy` (@job13er 2017-06-06)
    i18n: PropTypes.shape({
      refineByLabel: PropTypes.string.isRequired
    }),

    // options
    isFilterHiddenOnLoad: PropTypes.bool,
    onFilterDisplay: PropTypes.func,
    onFilterHide: PropTypes.func
    // state
  },

  getDefaultProps () {
    return {
      isFilterHiddenOnLoad: false,
      i18n: {
        refineByLabel: 'Refine by'
      }
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == Ember Lifecycle Hooks =================================================
  init () {
    this._super(...arguments)
    this.set('_isFilterHidden', this.get('isFilterHiddenOnLoad'))
  },

  // == DOM Events ============================================================

  // == Actions ===============================================================
  actions: {
    collapseFilter () {
      this.set('_isFilterHidden', true)

      const callback = this.onFilterHide
      if (callback) {
        callback()
      }
    },

    expandFilter () {
      this.set('_isFilterHidden', false)

      const callback = this.onFilterDisplay
      if (callback) {
        callback()
      }
    },

    onMouseEnterHandler (element) {
      window.Ps.update(element)
    }
  }
})
