## Proposed block syntax

```handlebars
{{#frost-object-browser as |slot|}}
  {{#block-slot slot 'info-bar'}}
    {{#frost-info-bar as |slot|}}
      {{#block-slot slot 'title'}}
        ...
      {{/block-slot}}
      {{#block-slot slot 'summary'}}
        ...
      {{/block-slot}}
      {{#block-slot slot 'actions' as |action|}}
        {{action.button}}
      {{/block-slot}}
    {{/frost-info-bar}}
  {{/block-slot}}
  {{#block-slot slot 'filters'}}
    ...bunsen...
  {{/block-slot}}
  {{#block-slot slot 'content' as |slot|}}
    {{#block-slot slot 'controls' as |control|}}
      {{control.sorting}}
      {{control.pagination}}
      {{control.expansion}}
    {{/block-slot}}
    {{#block-slot slot 'view'}}
      {{frost-list}}/{{frost-table}}/{{frost-geomap}}/etc.
    {{/block-slot}}
    {{#block-slot slot 'selection-actions' as |action|}}
      {{action.button}}
    {{/block-slot}}
  {{/block-slot}}
{{/frost-object-browser}}
```
