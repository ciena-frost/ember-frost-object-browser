import Ember from 'ember'
import layout from '../templates/components/frost-object-browser'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Ember.Component.extend(PropTypeMixin, {
  layout,
  classNames: ['frost-object-browser'],
  _items: Ember.computed('items', 'config', function () {
    return this.get('config') ? this.get('config.listMixinConfig.items') : this.get('items')
  }),

  propTypes: {
    items: PropTypes.EmberObject,
    facets: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.EmberObject
    ]),
    content: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.EmberObject
    ]),
    controls: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.EmberObject
    ]),
    objectBrowserMixinConfig: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.EmberObject
    ])
  },

  selectedItems: Ember.computed.filterBy('_items', 'isSelected', true)
})
