import {expect} from 'chai'
import {applicableControls} from 'ember-frost-object-browser/utils/controls'
import {beforeEach, describe, it} from 'mocha'

describe('Unit | Utility | controls', function () {
  describe('applicableControls()', function () {
    describe('when there is one common control among all types', function () {
      let typesWithControlNames

      beforeEach(function () {
        typesWithControlNames = {
          a: ['action1', 'action2'],
          b: ['action2', 'action3']
        }
      })

      it('should return a list containing one control name', function () {
        expect(applicableControls(typesWithControlNames)).to.be.eql(['action2'])
      })
    })

    describe('when there are two common controls among types', function () {
      let typesWithControlNames

      beforeEach(function () {
        typesWithControlNames = {
          a: ['action1', 'action2', 'action3'],
          b: ['action2', 'action3', 'action4']
        }
      })

      it('should return a list containing two control names', function () {
        expect(applicableControls(typesWithControlNames)).to.be.eql(['action2', 'action3'])
      })
    })

    describe('when there are no common controls among types', function () {
      let typesWithControlNames

      beforeEach(function () {
        typesWithControlNames = {
          a: ['action1', 'action2'],
          b: ['action3', 'action4']
        }
      })

      it('should return an empty list', function () {
        expect(applicableControls(typesWithControlNames)).to.be.eql([])
      })
    })
  })
})
