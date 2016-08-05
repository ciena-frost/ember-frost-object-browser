/* jshint expr:true */
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-object-browser',
  'Integration: FrostObjectBrowserComponent',
  {
    integration: true
  },
  function () {
    it('renders default values', function () {
      this.render(hbs`
        {{frost-object-browser}}
      `)

      expect(
        this.$('.frost-object-browser'),
        'Has class "frost-object-browser"'
      ).to.have.length(1)
    })

    it('it yields the "info-bar" slot', function () {
      this.render(hbs`
        {{#frost-object-browser}}
          {{#block-slot 'info-bar'}}
            Some yielded text
          {{/block-slot}}
        {{/frost-object-browser}}
      `)

      expect(
        this.$().text().trim(),
        'Text shows in the "info-bar" yielded slot'
      ).to.eql('Some yielded text')
    })

    it('it yields the "facets" slot', function () {
      this.render(hbs`
        {{#frost-object-browser}}
          {{#block-slot 'facets'}}
            Some yielded text
          {{/block-slot}}
        {{/frost-object-browser}}
      `)

      expect(
        this.$().text().trim(),
        'Text shows in the "facets" yielded slot'
      ).to.eql('Some yielded text')
    })

    it('it yields the "view" slot', function () {
      this.render(hbs`
        {{#frost-object-browser}}
          {{#block-slot 'view'}}
            Some yielded text
          {{/block-slot}}
        {{/frost-object-browser}}
      `)

      expect(
        this.$().text().trim(),
        'Text shows in the "view" yielded slot'
      ).to.eql('Some yielded text')
    })

    it('it yields the "actions" slot', function () {
      this.render(hbs`
        {{#frost-object-browser}}
          {{#block-slot 'actions'}}
            Some yielded text
          {{/block-slot}}
        {{/frost-object-browser}}
      `)
      expect(
        this.$().text().trim().replace(/ +/g, ' '),
        'Text shows in the "actions" yielded slot'
      ).to.eql('0 items selected\n Some yielded text')
    })

    it('it yields a button contextual component in the "actions" slot', function () {
      this.on('test-action', function () {})

      this.render(hbs`
        {{#frost-object-browser}}
          {{#block-slot 'actions' as |action|}}
            {{action.button onActionClick=(action 'test-action')}}
          {{/block-slot}}
        {{/frost-object-browser}}
      `)

      expect(this.$('button'),
        'button tag exists'
      ).to.have.length(1)
    })

    it('it yields a link button contextual component in the "actions" slot', function () {
      this.on('test-action', function () {})

      this.render(hbs`
        {{#frost-object-browser}}
          {{#block-slot 'actions' as |controls|}}
            {{#controls.link 'details'
              multiSelect=true
              priority='primary'
            }}
              Details
            {{/controls.link}}
          {{/block-slot}}
        {{/frost-object-browser}}
      `)

      expect(this.$('a'),
        'anchor tag exists'
      ).to.have.length(1)
    })
  }
)
