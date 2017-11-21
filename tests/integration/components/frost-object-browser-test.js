import {expect} from 'chai'
import Ember from 'ember'
import {$hook, initialize as initializeHook} from 'ember-hook'
import {registerMockComponent, unregisterMockComponent} from 'ember-test-utils/test-support/mock-component'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = integration('frost-object-browser')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initializeHook()
    registerMockComponent(this, 'mock-content')
    registerMockComponent(this, 'mock-controls')
    registerMockComponent(this, 'mock-filters')
    this.setProperties({
      myHook: 'myObjectBrowser'
    })
  })

  afterEach(function () {
    unregisterMockComponent(this, 'mock-content')
    unregisterMockComponent(this, 'mock-controls')
    unregisterMockComponent(this, 'mock-filters')
  })

  describe('after render', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-object-browser
          hook=myHook
          hookQualifiers=(hash)
          content=(component 'mock-content' class='mock-content')
          controls=(component 'mock-controls' class='mock-controls')
          filters=(component 'mock-filters' class='mock-filters')
        }}
      `)
    })

    it('should render a component passed into the "content" property', function () {
      expect(this.$('.mock-content')).to.have.length(1)
    })

    it('should render a component passed into the "controls" property', function () {
      expect(this.$('.mock-controls')).to.have.length(1)
    })

    it('should render a component passed into the "filters" property', function () {
      expect(this.$('.mock-filters')).to.have.length(1)
    })

    it('should render the refine by label in the facets', function () {
      expect(this.$('.frost-object-browser-facets-header')).to.have.text('Refine by')
    })

    it('should display facets-expanded-view without isFilterHiddenOnLoad', function () {
      expect($hook('myObjectBrowser-facets-expanded-view').is(':visible')).to.eql(true)
    })

    it('should hide facets-collapsed-view without isFilterHiddenOnLoad', function () {
      expect($hook('myObjectBrowser-facets-collapsed-view').is(':visible')).to.eql(false)
    })
  })

  describe('after render, when given a new refineByLabel', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-object-browser
          hook=myHook
          hookQualifiers=(hash)
          content=(component 'mock-content' class='mock-content')
          controls=(component 'mock-controls' class='mock-controls')
          filters=(component 'mock-filters' class='mock-filters')
          i18n=(hash
            refineByLabel='Filtrar por'
          )
        }}
      `)
    })

    it('should render a component passed into the "content" property', function () {
      expect(this.$('.mock-content')).to.have.length(1)
    })

    it('should render a component passed into the "controls" property', function () {
      expect(this.$('.mock-controls')).to.have.length(1)
    })

    it('should render a component passed into the "filters" property', function () {
      expect(this.$('.mock-filters')).to.have.length(1)
    })

    it('should render the refine by label in the facets', function () {
      expect(this.$('.frost-object-browser-facets-header')).to.have.text('Filtrar por')
    })
  })

  describe('when rendering with isFilterHiddenOnLoad=false', function () {
    beforeEach(function () {
      this.set('isFilterHiddenOnLoad', false)

      this.render(hbs`
        {{frost-object-browser
          hook=myHook
          hookQualifiers=(hash)
          content=(component 'mock-content' class='mock-content')
          controls=(component 'mock-controls' class='mock-controls')
          filters=(component 'mock-filters' class='mock-filters')
          isFilterHiddenOnLoad=isFilterHiddenOnLoad
        }}
      `)
    })

    it('should display facets-expanded-view', function () {
      expect($hook('myObjectBrowser-facets-expanded-view').is(':visible')).to.eql(true)
    })

    it('should hide facets-collapsed-view', function () {
      expect($hook('myObjectBrowser-facets-collapsed-view').is(':visible')).to.eql(false)
    })

    describe('when click filter collapse icon', function () {
      beforeEach(function () {
        return $hook('myObjectBrowser-facets-collapse-control').click()
      })

      it('should hide facets-expanded-view', function () {
        expect($hook('myObjectBrowser-facets-expanded-view').is(':visible')).to.eql(false)
      })

      it('should display facets-collapsed-view', function () {
        expect($hook('myObjectBrowser-facets-collapsed-view').is(':visible')).to.eql(true)
      })
    })
  })

  describe('when rendering with isFilterHiddenOnLoad=true', function () {
    beforeEach(function () {
      this.set('isFilterHiddenOnLoad', true)

      return this.render(hbs`
        {{frost-object-browser
          hook=myHook
          hookQualifiers=(hash)
          content=(component 'mock-content' class='mock-content')
          controls=(component 'mock-controls' class='mock-controls')
          filters=(component 'mock-filters' class='mock-filters')
          isFilterHiddenOnLoad=isFilterHiddenOnLoad
        }}
      `)
    })

    it('should hide facets-expanded-view', function () {
      expect($hook('myObjectBrowser-facets-expanded-view').is(':visible')).to.eql(false)
    })

    it('should display facets-collapsed-view', function () {
      expect($hook('myObjectBrowser-facets-collapsed-view').is(':visible')).to.eql(true)
    })

    describe('when click filter expand icon', function () {
      beforeEach(function () {
        return $hook('myObjectBrowser-facets-expand-control').click()
      })

      it('should display facets-expanded-view', function () {
        expect($hook('myObjectBrowser-facets-expanded-view').is(':visible')).to.eql(true)
      })

      it('should hide facets-collapsed-view', function () {
        expect($hook('myObjectBrowser-facets-collapsed-view').is(':visible')).to.eql(false)
      })
    })
  })

  describe('when user subscribe to onFilterHide event', function () {
    let hideFilter
    beforeEach(function () {
      hideFilter = sinon.spy()

      this.set('isFilterHiddenOnLoad', false)
      this.set('hideFilter', hideFilter)

      return this.render(hbs`
        {{frost-object-browser
          hook=myHook
          hookQualifiers=(hash)
          content=(component 'mock-content' class='mock-content')
          controls=(component 'mock-controls' class='mock-controls')
          filters=(component 'mock-filters' class='mock-filters')
          isFilterHiddenOnLoad=isFilterHiddenOnLoad
          onFilterHide=(action hideFilter)
        }}
      `)
    })

    it('should call the handler hideFilter', function () {
      $hook('myObjectBrowser-facets-collapse-control').click()

      expect(hideFilter).to.have.callCount(1)
    })
  })

  describe('when user subscribe to onFilterDisplay event', function () {
    let displayFilter
    beforeEach(function () {
      displayFilter = sinon.spy()

      this.set('isFilterHiddenOnLoad', false)
      this.set('displayFilter', displayFilter)

      return this.render(hbs`
        {{frost-object-browser
          hook=myHook
          hookQualifiers=(hash)
          content=(component 'mock-content' class='mock-content')
          controls=(component 'mock-controls' class='mock-controls')
          filters=(component 'mock-filters' class='mock-filters')
          isFilterHiddenOnLoad=isFilterHiddenOnLoad
          onFilterDisplay=(action displayFilter)
        }}
      `)
    })

    it('should call the handler displayFilter', function () {
      $hook('myObjectBrowser-facets-expand-control').click()

      expect(displayFilter).to.have.callCount(1)
    })
  })

  describe('when user mouse enters/exists the facets area', function () {
    const myHook = 'myHook'
    const filterHook = 'filterHook'

    beforeEach(function () {
      this.set('myHook', myHook)
      this.set('filterHook', filterHook)

      return this.render(hbs`
        {{frost-object-browser
          hook=myHook
          content=(component 'mock-content' class='mock-content')
          controls=(component 'mock-controls' class='mock-controls')
          filters=(component 'mock-filters' class='mock-filters' hook=filterHook)
        }}
      `)
    })

    it('should call the handler displayFilter', function () {
      $hook(filterHook).css('padding-left', '10px')
      $hook(filterHook).css('padding-bottom', '1500px')

      $hook(myHook + '-scroll').trigger('mouseenter')
      expect($hook(myHook + '-scroll').find('.ps-scrollbar-y').height()).to.be.at.least(1)
    })
  })
})
