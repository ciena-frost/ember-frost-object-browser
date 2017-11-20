import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-object-browser'

export default Component.extend({
  // == Dependencies ==========================================================
  layout,
  // == Properties ============================================================
  propTypes: {
    // options
    content: PropTypes.EmberComponent.isRequired,
    controls: PropTypes.EmberComponent.isRequired,
    filters: PropTypes.EmberComponent.isRequired,
    // FIXME: For the next major release, make this `i18n.labels.refineBy` (@job13er 2017-06-06)
    i18n: PropTypes.shape({
      refineByLabel: PropTypes.string.isRequired
    })

    // state
  },

  getDefaultProps () {
    return {
      i18n: {
        refineByLabel: 'Refine by'
      }
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == Ember Lifecycle Hooks =================================================

  // == DOM Events ============================================================

  // == Actions ===============================================================
  actions: {
    onMouseEnterHandler (element) {
      debugger
      window.Ps.update(element)
    }
  }
})
