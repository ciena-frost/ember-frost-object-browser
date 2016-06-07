import computed, {readOnly} from 'ember-computed-decorators'
import FrostListItem from 'ember-frost-list/pods/components/frost-list-item/component'
import layout from '../templates/components/frost-object-browser-list-item'

export default FrostListItem.extend({

  // ================================================================
  // Dependencies
  // ================================================================

  // ================================================================
  // Properties
  // ================================================================

  layout: layout,

  classNames: ['frost-list-item'],

  classNameBindings: ['isSmall:small', 'isMedium:medium', 'isLarge:large'],

  // ================================================================
  // Computed Properties
  // ================================================================

  /**
   * Determines if the class name should be set to small
   */
  @readOnly
  @computed('detailLevel')
  isSmall: function (detailLevel) {
    return detailLevel === 'low'
  },

  /**
   * Determines if the class name should be set to medium
   */
  @readOnly
  @computed('detailLevel')
  isMedium: function (detailLevel) {
    return detailLevel === 'medium'
  },

  /**
   * Determines if the class name should be set to large
   */
  @readOnly
  @computed('detailLevel')
  isLarge: function (detailLevel) {
    return detailLevel === 'high'
  },

  /**
   * Forces bunsen to re-render when editing starts or save completes
   */
  @readOnly
  @computed('model._hash', 'model.hasDirtyAttributes')
  record () {
    return this.get('model')
  }

  // ================================================================
  // Functions
  // ================================================================

  // ================================================================
  // Events
  // ================================================================

  // ================================================================
  // Actions
  // ================================================================

})
