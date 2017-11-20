import config from './config/environment'
import Ember from 'ember'
const {Router: EmberRouter} = Ember

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('overview', {path: '/'})
  this.route('helpers')
  this.route('client')
  this.route('client-code')
  this.route('client-typed')
  this.route('client-typed-code')
  this.route('server')
  this.route('server-code')
})

export default Router
