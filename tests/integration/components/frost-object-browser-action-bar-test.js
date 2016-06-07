/* jshint expr:true */
import Ember from 'ember'
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import sinon from 'sinon'

const itemObject = Ember.Object.create()
const selectedItems = Ember.A([])

describeComponent(
  'frost-object-browser-action-bar',
  'Integration: FrostObjectBrowserActionBarComponent',
  {
    integration: true
  },
  function () {
    it('renders default values', function () {
      this.render(hbs`
        {{frost-object-browser-action-bar}}
      `)

      expect(this.$()).to.have.length(1)

      expect(
        this.$('button').prop('disabled'),
        '"disabled" property has the correct value'
      ).to.be.true
    })

    it('removes disabled property when one item exists in selectedItems array', function () {
      selectedItems.addObject(itemObject)

      this.set('selectedItems', selectedItems)

      this.render(hbs`
        {{frost-object-browser-action-bar
          selectedItems=selectedItems
        }}
      `)

      expect(
        this.get('selectedItems.length'),
        '"selectedItems" property has the correct length'
      ).to.be.eql(1)

      expect(
        this.$('button').prop('disabled'),
        '"disabled" property has the correct value'
      ).to.be.false

      selectedItems.removeObject(itemObject)
    })

    it('disabled property set when no item exists in selectedItems array and "multiSelect=true"', function () {
      this.set('selectedItems', selectedItems)

      this.render(hbs`
        {{frost-object-browser-action-bar
          selectedItems=selectedItems
          multiSelect=true
        }}
      `)

      expect(
        this.get('selectedItems.length'),
        '"selectedItems" property has the correct length'
      ).to.be.eql(0)

      expect(
        this.$('button').prop('disabled'),
        '"disabled" property has the correct value'
      ).to.be.true
    })

    it('removes disabled property when one item exists in selectedItems array and "multiSelect=true"', function () {
      selectedItems.addObject(itemObject)

      this.set('selectedItems', selectedItems)

      this.render(hbs`
        {{frost-object-browser-action-bar
          selectedItems=selectedItems
          multiSelect=true
        }}
      `)

      expect(
        this.get('selectedItems.length'),
        '"selectedItems" property has the correct length'
      ).to.be.eql(1)

      expect(
        this.$('button').prop('disabled'),
        '"disabled" property has the correct value'
      ).to.be.false

      selectedItems.removeObject(itemObject)
    })

    it('calls test-action closure action with correct parameter', function () {
      selectedItems.addObject(itemObject)

      this.set('selectedItems', selectedItems)

      const spy = sinon.spy()

      this.on('test-action', spy)

      this.render(hbs`
        {{frost-object-browser-action-bar
          selectedItems=selectedItems
          text='Edit'
          onActionClick=(action 'test-action')
        }}
      `)

      this.$('button').click()

      expect(
        spy.called,
        'passed closure action was called'
      ).to.be.true

      expect(
        spy.calledWith(selectedItems),
        'passed closure action was called with the correct parameter'
      ).to.be.true

      selectedItems.removeObject(itemObject)
    })

    it('clears selectedItems array when "text=Delete"', function () {
      selectedItems.addObject(itemObject)

      this.set('selectedItems', selectedItems)

      this.on('test-action', function () {})

      this.render(hbs`
        {{frost-object-browser-action-bar
          selectedItems=selectedItems
          text='Delete'
          onActionClick=(action 'test-action')
        }}
      `)

      this.$('button').click()

      expect(
        this.get('selectedItems.length'),
        '"selectedItems" property has the correct length'
      ).to.be.eql(0)
    })

    it('selectedItems array is not cleared when "text=Edit"', function () {
      selectedItems.addObject(itemObject)

      this.set('selectedItems', selectedItems)

      this.on('test-action', function () {})

      this.render(hbs`
        {{frost-object-browser-action-bar
          selectedItems=selectedItems
          text='Edit'
          onActionClick=(action 'test-action')
        }}
      `)

      this.$('button').click()

      expect(
        this.get('selectedItems.length'),
        '"selectedItems" property has the correct length'
      ).to.be.eql(1)

      selectedItems.removeObject(itemObject)
    })
  }
)
