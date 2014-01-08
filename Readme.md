
# view

  Simple, opinionated views using `component/dom`, `component/reactive`, 'component/emitter'.

## Installation

  Install with [component(1)](http://component.io):

    $ component install bmcmahen/view

## Example

```javascript
var View = require('view');
var template = require('./template.html');

function MyView(model){
  View.call(this, template);
  this.react(model);
  this.bind('click .bacon', 'eat');
  this.$bacon = this.$el.find('.bacon');
  this.listenTo(model, 'change', this.onchange);
}

View(MyView);

MyView.prototype.eat = function(e){
  console.log('you ate some bacon!');
};

MyView.prototype.onchange = function(key, val){
  console.log('We can listen to models');
};

var myview = new MyView(model);
dom('#app').append(myview.$el);

setTimeout(function(){
  myview.remove();
}, 5000);
```


## License

  MIT
