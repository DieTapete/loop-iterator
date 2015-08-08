var expect = require('expect.js');
var LoopIterator = require('./loop-iterator');

describe('LoopIterator', function() {

  var iterator = LoopIterator([1,2,3], 3);

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
    var noHistoryIterator = LoopIterator([1,2,3]);
    expect(noHistoryIterator.history()).to.be(null);
  });

});
