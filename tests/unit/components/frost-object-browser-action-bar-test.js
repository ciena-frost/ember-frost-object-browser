/* jshint expr:true */
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'

describeComponent(
  'frost-object-browser-action-bar',
  'FrostObjectBrowserActionBarComponent',
  {
    unit: true
  },
  function () {
    it('sets default values correctly', function () {
      const component = this.subject()

      expect(
        component.get('multiSelect'),
        'multiSelect: false'
      ).to.eql(false)
    })

    it('sets dependent keys correctly', function () {
      const component = this.subject()

      const isDisabledDependentKeys = [
        'selectedItems.[]'
      ]

      expect(
        component.isDisabled._dependentKeys,
        'Dependent keys are correct for isDisabled()'
      ).to.eql(isDisabledDependentKeys)
    })
  }
)
