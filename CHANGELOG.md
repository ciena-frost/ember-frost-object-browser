# 25.0.3 (2018-08-24)

* Fix excess controls not being put under more button when there are passed in more actions

# 25.0.2 (2018-07-20)

* Don't show the more button in `frost-action-bar` when there is only one control that would be shown in it


# 25.0.1 (2018-07-20)

* **Fixed** Travis API key.


# 25.0.0 (2018-06-13)
* **Updated** `ember-frost-bunsen` to version ^22.0.0`
* **Added** `ember-cli-svgsore`


# 24.0.2 (2018-05-29)
* **Updated** `travis.yml` to set node version to `8.6.0`


# 24.0.1 (2018-05-29)

* [#180](Fix broken demo app)

# 24.0.0 (2018-05-15)

* Update `ember-frost-popover` _dependency_ to `^11.0.0`
* Update `ember-frost-bunsen` _dev dependency_ to `^21.0.0`

# 23.0.0 (2018-04-17)

* Upgraded `ember-frost-bunsen` to `^20.0.0`
* Upgraded `ember-frost-list` to `^11.0.0`
* Upgraded `ember-frost-sort` to `^13.0.0`
* Upgraded `ember-frost-core` to `^8.0.0`
* Upgraded `ember-frost-popover` to `^10.0.0`
* Installed `ember-cli-svgstore`
* Updated `frost-icon` functionality to work with new version of `ember-frost-core`

# 22.0.1 (2018-04-05)
* moved dropdown outside the button because interactive elements inside interactive elements is not html5 compliant

# 22.0.0 (2018-03-23)
* **Updated** pull request template
* **Added** issue template
* **Updated** to `pr-bumper` version `3`
* **Updated** to node 8
* **Added** slack integration
* **Updated** `ember-frost-test` to `^4.0.1`
* **Updated** `ember-test-utils` to `^8.1.1`
* **Updated** `ember-cli-frost-blueprints` to `^5.0.2`
* **Updated** `ember-frost-bunsen` to `^19.0.1`
* **Updated** `ember-frost-list` to `^10.0.0`
* **Updated** `ember-frost-sort` to `^12.0.0`
* **Updated** `pr-bumper` to `^3.7.0`
* **Updated** `ember-prop-types` to `^7.0.1`
* **Updated** `ember-frost-core` to `^7.0.0`
* **Updated** `ember-frost-popover` to `^9.0.0`
* **Removed** ignoring of `package-lock.json` file
* **Added** `package-lock.json` file
* **Updated** Travis CI scripts to allow non-exact node version

# 21.0.0 (2018-01-30)
* **Added** ignore the linting of the `CHANGELOG.md`
* **Added** ignoring of `package-lock` until we are ready to move to node 8
* **Added** ignoring of `.DS_Store`
* **Removed** `.DS_Store` that was accidentally committed
* **Removed** useLintTree ember-cli-mocha configuration from `ember-cli-build.js`
* **Removed** `.remarkrc` file since it is now provided by `ember-test-utils`
* **Removed** the blueprint file since packages are now included via dependencies
* **Removed** leftover blanket code coverage files
* **Updated** `ember-frost-test` to `^4.0.0`
* **Updated** `ember-cli-chai` to `0.4.3`
* **Updated** `ember-cli-mocha` to `0.14.4`
* **Updated** `ember-sinon` to `^0.7.0`
* **Updated** `ember-test-utils` to `^8.1.0`
* **Updated** `sinon-chai` to `^2.14.0`
* **Added** `ember-browserify` @ `^1.2.0`
* **Updated** `ember-cli-code-coverage` to `0.3.12`
* **Added** `ember-cli-frost-blueprints` @ `^5.0.1`
* **Updated** `ember-cli-notifications` to `^4.2.1`
* **Removed** unused `ember-ajax` package
* **Removed** unused `ember-async-image` package
* **Removed** unused `ember-cli-autoprefixer` package
* **Removed** deprecated `ember-cli-import-polyfill` package
* **Removed** unused `ember-cli-moment-shim` package
* **Removed** unused `ember-cli-sri` package
* **Updated** `ember-computed-decorators` to `0.3.0` and moved to a dependency instead of a devDependency
* **Removed** unused `ember-concurrency` package
* **Removed** unused `ember-elsewhere` package
* **Updated** `ember-frost-bunsen` to `^17.0.0`
* **Removed** unused `ember-frost-fields` package
* **Removed** unused `ember-frost-info-bar` package
* **Updated** `ember-frost-list` to `^9.0.0`
* **Updated** `ember-frost-popover` to `^8.0.0` and moved to a dependency instead of a devDependency
* **Updated** `ember-frost-sort` to `^10.0.0`
* **Removed** unused `ember-frost-tabs` package
* **Updated** `ember-hook` to `1.4.2` and moved to a dependency instead of a devDependency
* **Removed** unused `ember-math-helpers` package
* **Removed** unused `ember-one-way-controls` package
* **Updated** `ember-prop-types` to `^6.0.1` and moved to a dependency instead of a devDependency
* **Removed** unused `ember-run-raf` package
* **Removed** unused `ember-sortable` package
* **Removed** unused `ember-spread` package
* **Removed** unused `smoke-and-mirrors` package
* **Updated** `ember-cli-sass` to `7.1.1`
* **Updated** `ember-frost-core` to `^5.1.1`
* **Removed** unused `e2e/` testing directory
* **Removed** unused `animation-frame` bower package
* **Removed** unused `jquery` bower package
* **Removed** unneeded `mocha` bower package
* **Removed** unused `perfect-scrollbar` bower package
* **Removed** unused `clockpicker-seconds` bower package
* **Updated** `Faker` and `jquery-mockjax` bower packages to be devDependencies


# 20.0.2 (2018-01-23)
* improved css to handle hidden items in the moreActions popover


# 20.0.1 (2018-01-23)
* fixed styling of action bar
* removed ember version specific code
* started using passed in components to allow natural state handling of properties


# 20.0.0 (2018-01-12)
* **Removed** `string-pluralize` again as MAJOR


# 19.0.3 (2018-01-12)
* re-added string-pluralize helper for deprecation in MAJOR release


# 19.0.2 (2018-01-12)
* BPSO-51234 fixed isVisible check
* updated readme to be nominally less confusing
* scheduled removal of string-pluralize per #122

# 19.0.1 (2018-01-11)
- fixed #163 improved documentation for frost-action-bar
- added handling for visibility of components passed to moreActions


# 19.0.0 (2018-01-10)

* Added "More..." button
  * Added default behavior that collapses extra buttons when more than 4
  * Added ability to override default
  * Added docs for "More..." button
  * Added ability to change text of "More..." button
* Added `alwaysVisible` flag to `frost-action-bar`

# 18.2.5 (2018-01-02)
* Closes #159 - Refactor for removal of usage of lodash

# 18.2.4 (2017-12-05)
* Fixes #157, drop shadow on the `clear` buttons in filter facets was being cutoff, gave it 2px of margin to show

# 18.2.3 (2017-11-30)
* **Fixed** bug that action bar is rendered outside viewport when selecting an item in Firefox.

# 18.2.2 (2017-11-29)
* **Removed** unneeded `ember-symbol-observable` and `symbol-observable` that were brought in via `ember-frost-bunsen` via the blueprints of `ember-redux-shim`

# 18.2.1 (2017-11-29)
* **Added** `symbol-observable` at version `1.0.4` to avoid changes being received due to the float: https://github.com/mike-north/ember-symbol-observable/blob/6c6bd65a161b20a9f0f308395ad0553086ca6968/package.json#L50

# 18.2.0 (2017-11-22)

* Added support for displaying a loading animation in the action bar


# 18.1.0 (2017-11-20)

* Added support for displaying a loading animation in the action bar


# 18.0.0 (2017-11-15)
This changeset resets ember-frost addons to Ember CLI 2.12.3 versions
* **Updated** version of `ember-frost-core` 
* **Updated** version of `ember-frost-fields`
* **Updated** version of `ember-frost-info-bar`
* **Updated** version of `ember-frost-list`
* **Updated** version of `ember-frost-popover`
* **Updated** version of `ember-frost-sort`
* **Updated** version of `ember-frost-tabs` 
* **Updated** version of `ember-prop-types`
* **Updated** version of `ember-spread`

# 17.3.3 (2017-11-14)
* **Updated** version of `ember-frost-bunsen`
* **Removed** `ember-frost-date-picker` as it is now provided via `ember-frost-bunsen` dependencies
* **Removed** `ember-pikaday-shim` as it is now provided via `ember-frost-date-picker` dependencies
* **Removed** `pikaday` as it is now provided via `ember-pikaday-shim` dependencies


# 17.3.2 (2017-11-14)
* Remove unused `ember-simple-uuid` dependency

# 17.3.1 (2017-11-14)
* #139 - Bind context to call of this._super.included() in index.js

# 17.3.0 (2017-10-26)
* **Updated** the style for filter header section.
* **Added** new interface `isFilterHiddenOnLoad`. When it sets to true, filter section will be hidden on load.
* **Added** new interface `onFilterDisplay`. If consumer subscribes to the event, callback will be called when expanding the filter section.
* **Added** new interface `onFilterHide`. If consumer subscribes to the event, callback will be called when collapsing the filter section.
* **Added**  `filter.svg` and `filter-arrow` under `frost-object-browser` icon pack.

# 17.2.0 (2017-10-23)
* **Added** ability for object browser to render list list items with different types
* **Added** ability for action bar to show certain controls based on list item type

# 17.1.3 (2017-08-11)
* **Updated** ember-cli 2.12.3 inter-dependencies
* **Updated** pin `ember-cli-htmlbars-inline-precompile` per issue: https://github.com/ciena-frost/ember-frost-core/issues/488
* **Updated** dummy app with required `hook` property

# 17.1.2 (2017-07-13)
* Upgrade to `ember-cli` `2.12.3`

# 17.1.1 (2017-06-06)
* **Fixed** `config/environment.js` to no longer affect consumer's environment (resolves [#24](https://github.com/ciena-frost/ember-frost-object-browser/issues/124))

# 17.1.0 (2017-06-02)
 * **Fixed** prop type warning caused by not setting `hook` on `frost-scroll`
 * **Enabled** prop types to throw errors instead of warnings, so errors like the above don't happen again
 * **Added** an optional `refineByLabel` to `frost-object-browser` to better support `i18n`, allowing consumers to pass in a translated label (nested under an `i18n` property).
 * **Added** an optional `getSelectedItemsLabel` callback to `frost-action-bar` to better support `i18n`, allowing consumers to provide a callback that will generate a translated label based on the number of selected items (nested under an `i18n` property).
 * **Deprecated** the `string-pluralize` helper as it's no longer needed by this addon and should be removed in the next major version. 


# 17.0.15 (2017-05-23)
* Fixes https://github.com/ciena-frost/ember-frost-object-browser/issues/117
  * Fix misaligned action bar buttons on Firefox

# 17.0.14 (2017-05-10)
* **Updated** the secure auth tokens in `.travis.yml`


# 17.0.13 (2017-04-21)
* **Added** blueprint check


# 17.0.12 (2017-04-10)
Put back the Ember assign usage


# 17.0.11 (2017-04-06)

- upgrade ember to 2.11
- fix for issue #68


# 17.0.10 (2017-04-05)
demo page updates + package updates

# 17.0.9 (2017-04-03)
* **Added** integration tests
* **Added** test coverage configuration file
* **Removed** exports for disableHelper and logicOr that no longer exist in codebase.
* **Updated** tests to run in Firefox and Chrome and renamed file to `testem.js`
* **Updated** version of ember-computed-decorators to `0.3.0`
* **Updated** export of stringPluralize was incorrectly named

# 17.0.8
* **Updated** the travis scripts used for bumping and publishing

# 17.0.7
- Removed classNameBindings, and propTypes for unused selectedItems
- Change action-bar from absolute positioning to flex layout

# 17.0.6
* **Fixed** build by disable dependency snapshot which is causing build to fail and not publish.

<!-- Reviewable:start -->
---
This change is [<img src="https://reviewable.io/review_button.svg" height="34" align="absmiddle" alt="Reviewable"/>](https://reviewable.io/reviews/ciena-frost/ember-frost-object-browser/104)
<!-- Reviewable:end -->


# 17.0.5
- actions-visible classNameBinding to fix action bar spacing

# 17.0.4

* **Fixed** `frost-object-browser` component to only show facets DOM when the `filters` property is present.


# 17.0.3
* Added frost-list to the blueprint install (the expected choice for the content component)
* Fixed the look of the scroll gutter for pagination
* Fixed the spacing for the last item in the list when the action bar would cover it

# 17.0.2

* **Fixed** consumption in apps by removing file with bad reference.


# 17.0.1
**added** action bar styles


# 17.0.0

* Coming soon...unblocking upgrades

# 16.0.4

* **Added** configuration option to turn off prototype extensions for Date.


# 16.0.3
* Updated blueprint

# 16.0.2

* **Updated** `ember-data` dependency to float on the minor instead of the major.
* **Updated** Cleaned up the `CHANGELOG.md`

# 16.0.1

* **Updated** `ember-frost-info-bar` dependency in blueprint to latest version.
* **Updated** usage of sinon-chai to include the development environment.
* **Removed** `ember-hook` devDependency since it is not being used.

# 16.0.0

- Removed `onSelect` from the block parameters for the `view` slot
- Added `selections` to the `frost-object-browser` interface
- Updated the README to reflect block-slots 1.0 syntax
- The `actions` slot is no longer visible when no items are selected
- Added a show/hide transition animation for the `actions` slot

# 15.0.0
- Block-slots upgrade to >1.0.0

# 14.2.2
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 14.2.1
* Remove css counters. Replace with selections.length

# 14.2.0
* Added `onSortChange` and `sortData` attributes to `frost-object-browser-inline`

# 14.1.4
* Updated action bar positioning
* Updated margin between each action button

# 14.1.3
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 14.1.2
* Floating action bar
* Add selected item count
* Set facets font size to medium


# 14.1.1
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 14.1.0

## Non-Breaking

* **Added** unit and integration tests for frost-object-browser component
* **Added** unit and integration tests for selection-action-button component
* **Added** unit and integration tests for selection-action-link component
* **Added** docBlock headers for frost-object-browser component
* **Added** docBlock headers for selection-action-button component
* **Added** docBlock headers for selection-action-link component

# 14.0.0

Modified the interface of the object browser to minimize coupling between the presentation and logic layers.

See https://github.com/ciena-frost/ember-frost-object-browser#api for the new interface specification.

A new `frost-object-browser-inline` component has also been introduced that implements the `
frost-object-browser` component according to the previously stable 5.x interface and marked the usage
of this component as deprecated for removal in the next major release (15.x).  This allows users of
the legacy format a smoother transition path to the new slots based implementation.

See https://github.com/ciena-frost/ember-frost-object-browser#inline-api for the legacy inline specification.

# 13.0.1
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 13.0.0

## Breaking

* **Upgraded** `ember-frost-bunsen` to version `6.0.0`.

  > `model` became `bunsenModel` and `view` became `bunsenView`.

* **Upgraded** `ember-prop-types` to version `2.0.0`.

  > `oneOf` changed to `oneOfType` to better align with the React `propTypes` API.

# 12.0.0

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 11.0.0

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 11.0

## Breaking

* **Removed** support for pagination being built into the object-browser

* **Added** support for pagination as a named block slot
  This was done to increase the flexibilty of the object browser.
  The new usage allows for pagination to be passed into the component's block
  section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'pagination' as |paginator onPageChanged|}}
      {{paginator.control
        onPageChanged=(action onPageChanged)
      }}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```


# 10.0

## Breaking

* **Removed** support for the frost-list being built into the object-browser (what is showing the
object data in list view)

* **Added** support for the object data as a named block slot
  This was done to increase the flexibilty of what can be set to handle the object data.
  The new usage allows for this object data to be passed into the component's block
  section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'objects' as |object onSelect|}}
      {{#frost-list onSelect=(action onSelect) selections=object.selectedItems records=object.computedValues as |record|}}
        {{#frost-object-browser-list-item model=record as |value|}}
          {{frost-bunsen-detail
            model=object.model
            renderers=object.renderers
            value=value
            view=object.computedViewLevel
          }}
        {{/frost-object-browser-list-item}}
      {{/frost-list}}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

# 9.0

## Breaking

* **Removed** support for application level actions (create at the app level)

* **Added** support for application level actions as a named block slot
  This was done to increase the flexibilty of what can be set as the `app-actions`.
  The new usage allows for these actions to be passed into the component's block
  section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'app-actions' as |onCreate|}}
      {{frost-button
        icon='frost/infobar-create'
        onClick=(action onCreate)
        priority='tertiary'
        size='medium'
        text='Create'
        vertical=true
      }}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

# 8.0

## Breaking

* **Removed** support for the button bar (level of detail controls)

* **Added** support for the button bar level of detail controls as a named block slot
  This was done to increase the flexibilty of what can be used as the level of detail
  controls. The new usage allows for these controls to be passed into the component's
  block section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'view-controls' as |viewControl viewLevel onDetailChange|}}
      <div class="button-bar {{ viewControl.detailLevel }}">
      {{#if viewLevel.low}}
        {{frost-button
          disabled=(eq viewControl.detailLevel 'low')
          onClick=(action onDetailChange 'low')
          priority='tertiary'
          size='small'
          icon='frost/list-small'
        }}
      {{/if}}
      {{#if viewLevel.medium}}
        {{frost-button
          disabled=(eq viewControl.detailLevel 'medium')
          onClick=(action onDetailChange 'medium')
          priority='tertiary'
          size='small'
          icon='frost/list-medium'
        }}
      {{/if}}
      {{#if viewLevel.high}}
        {{frost-button
          disabled=(eq viewControl.detailLevel 'high')
          onClick=(action onDetailChange 'high')
          priority='tertiary'
          size='small'
          icon='frost/list-large'
        }}
      {{/if}}
      </div>
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

# 7.0

## Breaking

* **Removed** support for the info bar content (title and subtitle information)

* **Added** support for the info bar content as a named block slot
  This was done to increase the flexibilty of what can be used as the info bar
  content. The new usage allows for these content to be passed into
  the component's block section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'info-bar' as |infoBar|}}
      <div class="primary-title">
        {{infoBar.title}}
      </div>
      <div class="sub-title">
        {{infoBar.summary}}
      </div>
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

# 6.0

## Breaking

* **Removed** support for the filter pane content (filters)

* **Added** support for the filter pane content as a named block slot
  This was done to increase the flexibilty of what can be used as the filter pane
  content. The new usage allows for these content to be passed into
  the component's block section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'filters' as |filters onFilter|}}
      {{frost-object-browser-filter filters=filters onFilter=onFilter}}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

#5.1.1

* **Fixed** Added `ember-prop-types` to catch a bug where multiple instances were sharing memory

#5.1.0

* **Added** Created a property to allow for showing/not showing the counts in the subtitle of the `info-bar` section.

# 5.0

## Breaking

* **Removed** support for the row actions content (actions on records: edit, delete, details)

* **Added** support for the row actions content as a named block slot
  This was done to increase the flexibilty of what can be used as the row actions
  content. The new usage allows for these content to be passed into
  the component's block section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'actions'}}
      {{#each actionBarItems as |actionBarItem|}}
        {{#frost-button
          disabled=(not actionBarItem.enabled)
          onClick=(action 'onActionClick' actionBarItem.id)
          priority='secondary'
          size='large'
        }}
          <div class="text">{{actionBarItem.label}}</div>
        {{/frost-button}}
      {{/each}}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```
