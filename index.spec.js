var lib = require('./index')
var assert = require('assert').strict

function stringifyByte (b) {
  return b.toString(16).toUpperCase()
}

describe('keysToScanCodes', function () {
  var keysToScanCodes = lib.keysToScanCodes

  it('consists of pairs of byte arrays', function () {
    function assertByteArray(name, ba) {
      assert(Array.isArray(ba), name + ' is an array')
      assert(ba.length > 0, name + ' has at least 1 entry')
      ba.map(function (b) {
        assert(typeof b === 'number', name + ' all bytes are a number')
        assert(b <= 0xFF, name + ' is byte-sized')
      })
    }

    for(var k in keysToScanCodes) {
      assert(typeof k === 'string', 'key is a string')
      var v = keysToScanCodes[k]
      var makeB = v[0], breakB = v[1]

      assertByteArray(k + ' make codes', makeB)
      assertByteArray(k + ' break codes', breakB)
    }
  })
})

describe('getMakeBytes', function () {
  var getMakeBytes = lib.getMakeBytes

  it('works as expected with PrintScreen', function () {
    assert.deepEqual(
      getMakeBytes('PrintScreen').map(stringifyByte),
      ['E0', '12', 'E0', '7C']
    )
  })

  it('works as expected with F1', function () {
    assert.deepEqual(
      getMakeBytes('F1').map(stringifyByte),
      ['5']
    )
  })
})

describe('getBreakBytes', function () {
  var getBreakBytes = lib.getBreakBytes

  it('works as expected with PrintScreen', function () {
    assert.deepEqual(
      getBreakBytes('PrintScreen').map(stringifyByte),
      ['E0', 'F0', '7C', 'E0', 'F0', '12']
    )
  })

  it('works as expected with F1', function () {
    assert.deepEqual(
      getBreakBytes('F1').map(stringifyByte),
      ['F0', '5']
    )
  })
})
