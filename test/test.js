
var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('1 equal 1', () => assert.equal(1,1));
    it('2 equal 2', () => assert.equal(2,2));
    });
  
  describe('Basic Knowledge', () => {
    it('async', () => {
      a = [1]
      async function test(){
        await a.push(2)
      }
      test()
      assert.equal([1,2].length, a.length)
    });

    it('assert should')
  })
  });

