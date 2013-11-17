var dom = require('dom');
var Emitter = require('emitter');
var events = require('events');
var EmitterManager = require('emitter-manager');
var inherit = require('inherit');
var reactive = require('reactive');

module.exports = View;

/**
 * Opinionated View. Somewhat like Backbone, but using reactive
 * templates instead.
 * @param {Element} el 
 */

function View(el){
  if (!(this instanceof View)) return inherit(el, View);
  this.el = dom(el);
  this._bound = {};
  this.events = events(this.el.get(), this);
}

Emitter(View.prototype);
EmitterManager(View.prototype);

View.prototype.remove = function(){
  this.el.remove();
};

View.prototype.react = function(model){
  this.reactive = reactive(this.el.get(), model || this, this);
};

View.prototype.find = function(sel){
  return this.el.find(sel);
};

View.prototype.bind = function(str, method){
  this.events.bind(str, method);
  return this;
};

View.prototype.unbind = function(str, method){
  this.events.unbind(str, method);
  return this;
};

View.prototype.bound = function(method){
  if (!this._bound[method]){
    this._bound[method] = this[method].bind(this);
  }
  return this._bound[method];
};

