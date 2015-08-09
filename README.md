LoopIterator
=========

Let's you run through an array and go back to the beginning when you run too far. You can also iterate backwards and keep a history.

## Installation

	npm install loop-iterator --save


## Usage
```js
var LoopIterator = require('loop-iterator');

var iterator = new LoopIterator(['Ina', 'Sebastian', 'Henner']);
console.log(iterator.current()); // 'Ina'
console.log(iterator.next()); // 'Sebastian'
console.log(iterator.next()); // 'Henner'
console.log(iterator.next()); // 'Ina'
console.log(iterator.prev()); // 'Henner'
```

If you want to use the history add a second parameter with the depth to the constructor.
```js
var LoopIterator = require('loop-iterator');

var iterator = new LoopIterator(['Ina', 'Sebastian', 'Henner'], 2);
console.log(iterator.next()); // 'Sebastian'
console.log(iterator.next()); // 'Henner'
console.log(iterator.next()); // 'Ina'
console.log(iterator.history(1)); // 'Henner', you can also write history() instead
console.log(iterator.history(2)); // 'Sebastian'
console.log(iterator.history(3)); // undefined, history not long enough
```



Instead of `require` you can also just use a good old `script` tag.  
```js
<script src="loop-iterator.js"/>
```

## Documentation
### Constructor:
  `LoopIterator(array [, history])`
  - `array` - The array you want to iterate over.
  - `history` - Optional. The number of elements you want to keep in the history.

### Methods:
  - `current()` : Returns the current element.
  - `next()` : Iterates to the next element and returns it.
  - `prev()` : Iterates to the previous element and returns it.
  - `currentIndex([index])` : Returns or sets the current index.
  - `nextIndex()` : Iterates to the next element and returns the index.
  - `prevIndex()` : Iterates to the previous element and returns the index.
  - `history(level)` : Returns the n'th element in history. `level` defaults to 1.
  - `historyIndex(level)` : Returns the n'th index in history. `level` defaults to 1.


## Release History

* 0.1.0 Initial release

## License
Copyright 2015 Henner Wöhler. Licensed under the MIT license.
