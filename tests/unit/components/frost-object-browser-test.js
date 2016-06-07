import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import Ember from 'ember'
import PropTypeMixin from 'ember-prop-types'

describeComponent(
  'frost-object-browser',
  'Unit | frost-object-browser',
  {
    unit: true
  },
  function () {
    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(this.subject()),
        'PropTypeMixin Mixin is present'
      ).to.be.true
    })

    it('runs onSelect and updates selectedItems', function () {
      const selectedItems = Ember.A([])
      const component = this.subject({
        selectedItems: selectedItems
      })

      const itemRecord = Ember.Object.create({
        isSelected: true,
        record: {}
      })

      expect(
        component.get('selectedItems.length'),
        '"selectedItems" property has the correct length'
      ).to.be.eql(0)

      Ember.run(() => {
        component.send('onSelect', itemRecord)
      })

      expect(
        component.get('selectedItems.length'),
        '"selectedItems" property has the correct length'
      ).to.be.eql(1)

      itemRecord.isSelected = false

      Ember.run(() => {
        component.send('onSelect', itemRecord)
      })

      expect(
        component.get('selectedItems.length'),
        '"selectedItems" property has the correct length'
      ).to.be.eql(0)
    })
  }
)
