import _ from 'lodash'
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import dummyData from './dummyInput'
import { initialize } from 'ember-block-slots/initializers/component-block-slots'

const viewSchema = {
  low: {
    'version': '1.0',
    'type': 'form',
    'rootContainers': [
      {'label': 'Main', 'container': 'main'}
    ],
    'containers': [
      {
        'id': 'main',
        'className': 'flex-row',
        'rows': [
          [
            {'model': 'alias', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
          ],
          [
            {
              'model': 'updatedAt',
              'label': 'Last Updated',
              'labelClassName': 'ob-label',
              'inputClassName': 'ob-input'
            }
          ]
        ]
      }
    ]
  },
  medium: {
    'version': '1.0',
    'type': 'form',
    'rootContainers': [
      {'label': 'Main', 'container': 'main'}
    ],
    'containers': [
      {
        'id': 'main',
        'className': 'flex-row',
        'rows': [
          [
            {'model': 'alias', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'},
            {'model': 'value', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
          ],
          [
            {
              'model': 'updatedAt',
              'label': 'Last Updated',
              'labelClassName': 'ob-label',
              'inputClassName': 'ob-input'
            }
          ]
        ]
      }
    ]
  },
  high: {
    'version': '1.0',
    'type': 'form',
    'rootContainers': [
      {'label': 'Main', 'container': 'main'}
    ],
    'containers': [
      {
        'id': 'main',
        'className': 'flex-row',
        'rows': [
          [
            {'model': 'alias', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'},
            {'model': 'value', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
          ],
          [
            {
              'model': 'updatedAt',
              'label': 'Last Updated',
              'labelClassName': 'ob-label',
              'inputClassName': 'ob-input'
            },
            {'model': 'id', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
          ]
        ]
      }
    ]
  }
}

const resources = _.map(dummyData.resources, (resource) => {
  return Ember.Object.create(resource)
})

const model = {resources: Ember.A(resources), model: dummyData.model}

describeComponent(
  'frost-object-browser',
  'Integration | Component | frost object browser',
  {
    integration: true
  },
  function () {
    let container, application

    beforeEach(function () {
      Ember.run(() => {
        application = Ember.Application.create()
        container = application.__container__
        application.deferReadiness()
        this.setProperties({
          model,
          viewSchema
        })
      })
      initialize(container, application)
    })

    it('renders', function () {
      this.timeout(8000)
      this.render(hbs`{{frost-object-browser
        values=model.resources
        model=model.model
      }}`)
      expect(this.$()).to.have.length(1)
    })

    it('it changes page when we click to next change button', function () {
      this.timeout(8000)

      this.render(hbs`
        {{#frost-object-browser
          itemsPerPage=6
          values=model.resources
          model=model.model
         as |slot|}}
          {{#block-slot slot 'content' as | content onPageChanged onDetailChange onSelect|}}
            {{#frost-object-browser-content
              content=content
              onPageChanged=(action onPageChanged)
              onDetailChange=(action onDetailChange)
              onSelect=(action onSelect)
            as |slot|}}
              {{#block-slot slot 'controls' as |control onPageChanged onDetailChange|}}
                {{control.pagination
                  onPageChanged=(action onPageChanged)
                }}
              {{/block-slot}}
            {{/frost-object-browser-content}}
          {{/block-slot}}
        {{/frost-object-browser}}
      `)

      this.$().find('.pagination .button-bar.right button').eq(0).click()

      return wait()
        .then(() => {
          expect(this.$().find('.pagination').text().trim()).to.equal('7 to 12 of 20')
        })
    })
  }
)
