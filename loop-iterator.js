;(function(glob) {

  function LoopIterator(array, history) {
    var t = this,
        _currentIndex = 0;

    if (typeof history === 'number' && history > 0){
        history = new Array(history);
    }

    function updateHistory(){
      if (history){
        history.shift();
        history.push({element:t.current(), index:_currentIndex});
      }
    }

    t.nextIndex = function(){
      t.currentIndex((_currentIndex+1 >= array.length) ? 0 : _currentIndex+1);
      return _currentIndex;
    }

    t.prevIndex  = function(){
      t.currentIndex((_currentIndex-1 < 0) ? array.length-1 : _currentIndex-1);
      return _currentIndex;
    }

    t.currentIndex = function(index){
      if (index !== undefined && index != _currentIndex) {
        updateHistory();
        _currentIndex = index;
      }

      return _currentIndex;
    }

    t.next = function(){ return array[t.nextIndex()]; }
    t.prev = function(){ return array[t.prevIndex()]; }
    t.current = function(){ return array[_currentIndex]; }

    t.history = function(level, returnIndex){
      if (!history) return null;
      var maxLevel = history.length;
      if (level === undefined) level = 1;
      if (level === 0) return (returnIndex ? _currentIndex : t.current());
      if (level > maxLevel) return undefined;

      var historyElement = history[maxLevel - level];
      return (returnIndex ? historyElement.index : historyElement.element);
    }

    t.historyIndex = function(level){
      return t.history(level, true)
    }

    return t;
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
