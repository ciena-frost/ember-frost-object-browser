# ember-frost-object-browser

[![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]

* [Installation](#installation)
* [API](#api)
* [Examples](#examples)
* [Contributing](#contributing)

## Installation

```bash
ember install ember-frost-object-browser
```

## API

### `actions` slot
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `multiSelect` | `Boolean`  | `false` | Optional whether this button be used if more than one item is selected in the view |
| `onActionClick` | `Function` | `<action-name>` and `<buttonId>` | Callback for when the button is clicked |
| `priority` | `String` | `secondary` | Optional button priority [more info](https://github.com/ciena-frost/ember-frost-core/blob/master/frost-button.md) |
| `size` | `String` | `large` | Optional button size [more info](https://github.com/ciena-frost/ember-frost-core/blob/master/frost-button.md) |
| `text` | `String` | | Required text to display on the button [more info](https://github.com/ciena-frost/ember-frost-core/blob/master/frost-button.md) |

## Examples

### Template

The object browser now supports named block slots.

The slots names are: `info-bar` `filters` `view` `actions`

Slots that are not set will not show up.

```handlebars
{{#frost-object-browser as |slot|}}
  {{#block-slot slot 'info-bar'}}
    {{#frost-info-bar as |slot|}}
      …
    {{/frost-info-bar}}
  {{/block-slot}}
  {{#block-slot slot 'filters'}}
    {{frost-bunsen-form bunsenModel=formModel onChange=(action 'onChange')}}
  {{/block-slot}}
  {{#block-slot slot 'view' as |selections onSelect|}}
   {{display-component-with-controls selections=selections.selectedItems onSelect=(action onSelect)}}
  {{/block-slot}}
  {{#block-slot slot 'actions' as |action|}}
    {{action.button
      onActionClick=(action 'onActionClick' 'details')
      multiSelect=true
      text='Details'
    }}
    {{action.button
      onActionClick=(action 'onActionClick' 'delete')
      multiSelect=true
      text='Delete'
    }}
    {{action.button
      onActionClick=(action 'onActionClick' 'edit')
      text='Edit'
    }}
  {{/block-slot}}
{{/frost-object-browser}}
```

### Controller

```js
  viewSchema: {
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
    }
  }
```

Your controller will also need to implement the following callbacks:

`onCreate () {…}`
`onDetailChange (level) {…}`
`onActionClick (buttonId, selectedItems) {…}`

You can also check out the demo app bundled with this addon to see an example of using this addon.

###Using the `info-bar` slot

This slot will yield what is put inside the block.

```handlebars
{{#block-slot slot 'info-bar'}}
  …
{{/block-slot}}
```

###Using the `filters` slot

This slot will yield what is put inside the block.

We recommend using a bunsen-form component with the onChange hook implemented [more info](https://github.com/ciena-frost/ember-frost-bunsen#form-view)

```handlebars
{{#block-slot slot 'filters'}}
  {{frost-bunsen-form bunsenModel=formModel onChange=(action 'onChange')}}
{{/block-slot}}
```

###Using the `view` slot

This slot will yield back `selectedItems` (an Ember Array of objects) and `onSelect()` which manages
adding/removing the items in the `selectedItems` array.

```handlebars
{{#block-slot slot 'view' as |selections onSelect|}}
 {{display-component-with-controls selections=selections.selectedItems onSelect=(action onSelect)}}
{{/block-slot}}
```

The display component that is passed into the `view` slot needs to be a component with controls that manage
itself (ex. pagination, sort, detail level).

###Using the `actions` slot

This slot will yield back a contextual component `button`. Any number of action.button components can be created.
Each button will need to implement:

* A callback `onActionClick` with the buttonId that correlates to the intended result when the button is clicked
* A unique text name `text='Delete'`. The `text='Delete'` is important in that it has additional functionality
implemented for clearing the selectedItems array when a "Delete" button event is clicked. The word "delete" needs
to be used somewhere in the button text. Capitalization is ignored so you can use "DELETE", "Delete" or "delete item"
just so long as the word "delete" is included in the button text.

Optional button attributes:

* `multiSelect=true` will allow this button to stay enabled if more than one item is selected in the `view` slot (in the selectedItems array)
* priority [more info](https://github.com/ciena-frost/ember-frost-core/blob/master/frost-button.md)
* size [more info](https://github.com/ciena-frost/ember-frost-core/blob/master/frost-button.md)

```handlebars
{{#block-slot slot 'actions' as |action|}}
  {{action.button
    onActionClick=(action 'onActionClick' 'details')
    multiSelect=true
    text='Details'
  }}
  {{action.button
    onActionClick=(action 'onActionClick' 'delete')
    multiSelect=true
    text='Delete'
  }}
  {{action.button
    onActionClick=(action 'onActionClick' 'edit')
    text='Edit'
  }}
{{/block-slot}}
```

## Development

### Setup

```bash
git clone git@github.com:ciena-frost/ember-frost-object-browser.git
cd ember-frost-object-browser
npm install && bower install
```

### Development Server

A dummy application for development is available under `ember-frost-object-browser/tests/dummy`.
To run the server run `ember server` (or `npm start`) from the root of the repository and
visit the app at http://localhost:4200.

### Testing

Run `npm test` from the root of the project to run linting checks as well as execute the test suite
and output code coverage.

[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-object-browser.svg "CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-object-browser

[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-frost-object-browser.svg "Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-object-browser

[npm-img]: https://img.shields.io/npm/v/ember-frost-object-browser.svg "Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-object-browser
