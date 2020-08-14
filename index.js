var keysToScanCodes = {
  Backquote: 0x0E,
  Digit1: 0x16,
  Digit2: 0x1E,
  Digit3: 0x26,
  Digit4: 0x25,
  Digit5: 0x2E,
  Digit6: 0x36,
  Digit7: 0x3D,
  Digit8: 0x3E,
  Digit9: 0x46,
  Digit0: 0x45,
  Minus: 0x4E,
  Equal: 0x55,
  KeyA: 0x1C,
  KeyB: 0x32,
  KeyC: 0x21,
  KeyD: 0x23,
  KeyE: 0x24,
  KeyF: 0x2B,
  KeyG: 0x34,
  KeyH: 0x33,
  KeyI: 0x43,
  KeyJ: 0x3B,
  KeyK: 0x42,
  KeyL: 0x4B,
  KeyM: 0x3A,
  KeyN: 0x31,
  KeyO: 0x44,
  KeyP: 0x4D,
  KeyQ: 0x15,
  KeyR: 0x2D,
  KeyS: 0x1B,
  KeyT: 0x2C,
  KeyU: 0x3C,
  KeyV: 0x2A,
  KeyW: 0x1D,
  KeyX: 0x22,
  KeyY: 0x35,
  KeyZ: 0x1A,
  BracketLeft: 0x54,
  BracketRight: 0x5B,
  Backslash: 0x5D,
  Semicolon: 0x4C,
  Quote: 0x52,
  Enter: 0x5A,
  Comma: 0x41,
  Period: 0x49,
  Slash: 0x4A,
  Backspace: 0x66,
  Tab: 0x0D,
  CapsLock: 0x58,
  ShiftLeft: 0x12,
  ControlLeft: 0x14,
  AltLeft: 0x11,
  Space: 0x29,
  AltRight: [0xE011, 0xE0F011],
  ControlRight: [0xE014, 0xE0F014],
  ShiftRight: 0x59,
  Alt: 0x11,
  Delete: [0xE071, 0xE0F071],
  End: [0xE069, 0xE0F069],
  Home: [0xE06C, 0xE0F06C],
  Insert: [0xE070, 0xE0F070],
  PageDown: [0xE07A, 0xE0F07A],
  PageUp: [0xE07D, 0xE0F07D],
  ArrowDown: [0xE072, 0xE0F072],
  ArrowLeft: [0xE06B, 0xE0F06B],
  ArrowRight: [0xE074, 0xE0F074],
  ArrowUp: [0xE075, 0xE0F075],
  NumLock: 0x77,
  Numpad0: 0x70,
  Numpad1: 0x69,
  Numpad2: 0x72,
  Numpad3: 0x7A,
  Numpad4: 0x6B,
  Numpad5: 0x73,
  Numpad6: 0x74,
  Numpad7: 0x6C,
  Numpad8: 0x75,
  Numpad9: 0x7D,
  NumpadAdd: 0x79,
  NumpadDecimal: 0x71,
  NumpadComma: 0x71,
  NumpadDivide: [0xE04A, 0xE0F04A],
  NumpadEnter: [0xE05A, 0xE0F05A],
  NumpadMultiply: 0x7C,
  NumpadStar: 0x7C,
  NumpadSubtract: 0x7B,
  Escape: 0x76,
  F1: 0x05,
  F2: 0x06,
  F3: 0x04,
  F4: 0x0C,
  F5: 0x03,
  F6: 0x0B,
  F7: 0x83,
  F8: 0x0A,
  F9: 0x01,
  F10: 0x09,
  F11: 0x78,
  F12: 0x07,
  PrintScreen: [0xE012E07C, 0xE0F07CE0F012],
  ScrollLock: 0x7E,
  Pause: [0xE11477E1, 0xF014F077],
  Power: [0xE037, 0xE0F037],
  Sleep: [0xE03F, 0xE0F03F],
  WakeUp: [0xE05E, 0xE0F05E]
}

var MAX_BITWISE = 0xFFFFFFFF
var LS_BYTE_MASK = 0x000000FF

function makeByteArray(bs) {
  var lsbs = bs >>> 0,
    msbs = Math.floor(bs / MAX_BITWISE),
    ba = []

  ;[msbs, lsbs].map(function (sbs) {
    while (sbs) {
      var b = (sbs >>> 24) & LS_BYTE_MASK
      if (b) ba.push(b)
      sbs <<= 8
    }
  })

  return ba
}

for (var k in keysToScanCodes) {
  var v = keysToScanCodes[k]
  if (!Array.isArray(v)) keysToScanCodes[k] = [v, 0xF000 | v]
  keysToScanCodes[k] = keysToScanCodes[k].map(makeByteArray)
}

function BytesGetter(makeBreakI) {
  return function bytesGetter (keyCode) {
    var makeBreak = keysToScanCodes[keyCode]

    if (!makeBreak) {
      throw new Error('unrecognized keyCode: ' + String(keyCode))
    }

    return makeBreak[makeBreakI]
  }
}

var getMakeBytes = BytesGetter(0)
var getBreakBytes = BytesGetter(1)

module.exports = {
  keysToScanCodes: keysToScanCodes,
  getMakeBytes: getMakeBytes,
  getBreakBytes: getBreakBytes
}
