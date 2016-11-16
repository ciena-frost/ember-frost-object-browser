/* globals module */

'use strict'

module.exports = {
  name: 'ember-frost-object-browser',

  included: function (app) {
    this._super.included(app)
  },

  init: function (app) {
    if (this._super.init) {
      this._super.init.apply(this, arguments)
    }

    this.options = this.options || {}
    this.options.babel = this.options.babel || {}
    this.options.babel.optional = this.options.babel.optional || []

    if (this.options.babel.optional.indexOf('es7.decorators') === -1) {
      this.options.babel.optional.push('es7.decorators')
    }
  }
}
