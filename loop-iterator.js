;(function(glob) {
  function LoopIterator(array, history) {
    if (!(this instanceof LoopIterator)) { return new LoopIterator(array, history); }

    this._currentIndex = 0
    this._array = array

    if (typeof history === 'number' && history > 0){
        this._history = new Array(history);
    }
  }

  var p = LoopIterator.prototype;
  p.updateHistory = function(){
    var t = this;
    if (t._history){
      t._history.shift();
      t._history.push({element:t.current(), index:t._currentIndex});
    }
  }

  p.nextIndex = function(){
    var t = this;
    return t.currentIndex((t._currentIndex+1 >= t._array.length) ? 0 : t._currentIndex+1);
  }

  p.prevIndex  = function(){
    var t = this;
    return t.currentIndex((t._currentIndex-1 < 0) ? t._array.length-1 : t._currentIndex-1);
  }

  p.currentIndex = function(index){
    var t = this;
    if (index !== undefined && index != t._currentIndex) {
      t.updateHistory();
      t._currentIndex = index;
    }

    return t._currentIndex;
  }

  p.next = function(){ return this._array[this.nextIndex()]; }
  p.prev = function(){ return this._array[this.prevIndex()]; }
  p.current = function(){ return this._array[this._currentIndex]; }

  p.history = function(level, returnIndex){
    var t = this;
    if (!t._history) return null;
    var maxLevel = t._history.length;
    if (level === undefined) level = 1;
    if (level === 0) return (returnIndex ? t._currentIndex : t.current());
    if (level > maxLevel) return undefined;

    var historyElement = t._history[maxLevel - level];
    return (returnIndex ? historyElement.index : historyElement.element);
  }

  p.historyIndex = function(level){
    return this.history(level, true)
  }

  // Export for node and browserify
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoopIterator;
  }
  // Export for usage in script tags
  else {
    glob.LoopIterator = LoopIterator;
  }

})(this);
