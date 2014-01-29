var dom = require('dom');
var Emitter = require('emitter');
var inherit = require('inherit');
var reactive = require('reactive');
var events = require('events');
var EmitterManager = require('emitter-manager');

module.exports = View;

/**
 * View Constructor
 * 
 * @param {Element} el 
 */

function View(el){
  if (!(this instanceof View)) return inherit(el, View);
  this.$el = dom(el);
  this.el = this.$el[0];
  this.events = this.events(el);
  this._bound = {};
}

Emitter(View.prototype);
EmitterManager(View.prototype);


/**
 * Remove el from DOM and cleanup listeners
 * 
 * @return {View}
 */

View.prototype.remove = function(){
  this.$el.remove();
  this.events.unbind();
  this.stopListening();
  this.emit('remove');
  return this;
};


/**
 * Enable reactivity with a model or view.
 * 
 * @param  {Emitter} model 
 * @return {View}      
 */

View.prototype.react = function(model){
  this.reactive = reactive(this.el, model || this, this);
  return this;
};


/**
 * Delegate events to View Element. Note: This won't 
 * work for focus, blur, change, submit, reset.
 *  
 * @param  {String} str    event & selector
 * @param  {String} fnName 
 * @return {View} 
 */

View.prototype.bind = function(str, fnName){
  this.events.bind(str, fnName);
  return this;
};

/**
 * Unbind bound events
 * 
 * @param  {String} str    
 * @param  {String} fnName 
 * @return {View}        
 */

View.prototype.unbind = function(str, fnName){
  this.events.unbind(str, fnName);
  return this;
};

/**
 * Create/Retrieve a bound function.
 * 
 * @param  {String} fnName 
 * @return {Function}      
 */

View.prototype.bound = function(fnName){
  if (!this._bound[fnName]) {
    this._bound[fnName] = bind(this, this[fnName]);
  }
  return this._bound[fnName];
};


