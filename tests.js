var expect = require('expect.js');
var LoopIterator = require('./loop-iterator');

describe('LoopIterator', function() {

  var iterator = new LoopIterator([1,2,3], 3);

  it('should be the first element in the beginning', function() {
    expect(iterator.current()).to.be.equal(1);
    expect(iterator.currentIndex()).to.be.equal(0);
  });

  it('should loop', function() {
    expect(iterator.next()).to.be.equal(2);
    expect(iterator.next()).to.be.equal(3);
    expect(iterator.next()).to.be.equal(1);
    expect(iterator.prev()).to.be.equal(3);
  });

  it('should keep a history', function() {
    expect(iterator.history()).to.be.equal(1);
    expect(iterator.history(0)).to.be.equal(3);
    expect(iterator.history(1)).to.be.equal(1);
    expect(iterator.history(2)).to.be.equal(3);
    expect(iterator.history(3)).to.be.equal(2);
  });

  it('should not keep a history of not specified', function() {
    var noHistoryIterator = new LoopIterator([1,2,3]);
    expect(noHistoryIterator.history()).to.be(null);
  });

  it('should work with more than one instance', function() {
    var iterator1 = new LoopIterator([1,2,3]);
    var iterator2 = new LoopIterator([4,5,6]);
    expect(iterator1.next()).to.be.equal(2);
    expect(iterator2.next()).to.be.equal(5);
  });

  it('should work with complex objects', function() {
    var iterator1 = new LoopIterator([{name:'ina'}, {name:'sebastian'}, {name:'michael'}]);
    var iterator2 = new LoopIterator([{name:'patrick'}, {name:'katja'}, {name:'christian'}]);
    expect(iterator1.next().name).to.be.equal('sebastian');
    expect(iterator2.next().name).to.be.equal('katja');
  });

});
