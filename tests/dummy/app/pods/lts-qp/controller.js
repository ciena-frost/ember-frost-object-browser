import Ember from 'ember'
import {
  ObjectBrowserSerializer,
  ObjectBrowserMixin
} from 'ember-frost-object-browser'

export default Ember.Controller.extend(ObjectBrowserMixin, {

  sortQueryParam: ['-alias'],

  filterQueryParam: [],

  pageQueryParam: [],

  // TODO when qp is initialized off a cp, a full path must be provided
  queryParams: ['filterQueryParam', 'sortQueryParam', 'pageQueryParam'],

  objectBrowserConfig: {
    listConfig: {
      items: 'model.resources',  // the data model which will pass to list. In this scenario, actual data set is located in model: {resources: data}
      component: 'lts-qp/user-list-item', // the custom component you want to render for each single list item.
      // sort setup based on ember frost-sort API
      sorting: {
        active: [{value: 'alias', direction: ':desc'}],
        properties: [
          {
            value: 'alias',
            label: 'Alias'
          },
          {
            value: 'id',
            label: 'Id'
          }
        ]
      }
    },
    // facets setup based on ember-frost-bunsen API
    facetsConfig: {
      bunsenModel: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          alias: {
            type: 'string'
          }
        }
      },
      bunsenView: {
        "cellDefinitions": {
          "main": {
            "children": [
              {"model": "id"},
              {"model": "alias"}
            ]
          }
        },
        "cells": [
          {
            "extends": "main"
          }
        ],
        "type": "form",
        "version": "2.0"
      },
      value: {
      }
    },


    controlsConfig: [
      {
        component: 'frost-button',
        action: 'actions.triggerDelete',  // method key related to this/context/controller
        text: 'Delete',
        disable: 'type1',
        multiSelect: true,
        priority: 'secondary',
        size: 'medium'
      },
      {
        component: 'frost-button',
        action: 'actions.triggerEdit',  // method key related to this/context/controller
        text: 'Edit',
        disable: 'type2',
        priority: 'secondary',
        size: 'medium'
      },
      {
        component: 'frost-button',
        action: 'actions.triggerDetail',  // method key related to this/context/controller
        text: 'Detail',
        disable: 'type2',
        priority: 'secondary',
        size: 'medium'
      }
    ],

    // Config the data layer to tell object-browser how to communicate with server
    serializerConfig: {
      // here is the place you can change the data layer. Currently there're two built in options, default(MCP) and json API.
      // data layer contains function
      // 1. serialize the component output to corresponding query params
      // 2. improved query() who's responsible for talking to server
      // 3. hooks that you can interact with the data layer
      // general object browser work flow
      // actions fired/sort/filter/page--> component output --> serialize output --> set query parmas --> trigger model re-render
      //  --> fire query with qp --> receive response --> update component attrs --> component re-render
      // if you need more customization, you can write your own data layer by simply extend the existing ones and overwrite these hooks.
      serializer: ObjectBrowserSerializer,

      // the name of the model to retrieve. In this scenario, Ember.store.query('resource') would be called
      model: 'resource',
      // configure sort behavior when talking to server,
      // client: true  ----- run a default sort build in object browser on the client side
      // client: <custom-function> --- run a custom sort function on the client side
      // client: false ---- sort will be handled on server
      sort: {
        client: true
      },
      // See explanation for sort.
      filter: {
        client: false
      }

      //page: {
      //  strategy: <factory>
      //}
    }
  },

  actions: {
    triggerAction () {
      this.notifications.addNotification({
        message: 'Action sent',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    triggerDelete (items) {
      this.notifications.addNotification({
        message: 'Delete Action fired',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    triggerEdit (items) {
      this.notifications.addNotification({
        message: 'Edit Action fired',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    triggerDetail (items) {
      this.notifications.addNotification({
        message: 'Detail Action fired',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})


