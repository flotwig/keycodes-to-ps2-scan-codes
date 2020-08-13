keycodes-to-ps2-scan-codes
===

Convert Web API `keyCode`s to PS/2 keyboard scan codes (set 2).

Referenced from http://www.vetra.com/scancodes.html

# Exports

## `getMakeBytes(keyCode: string): number[]`

* Returns: a byte array to "make" the keypress for the specified `keyCode`. Throws if the `keyCode` is not mapped.
* Example:
    ```js
    const { getMakeBytes } = require('keycodes-to-ps2-scan-codes')
    getMakeBytes('KeyA') // [ 0x1C ]
    getMakeBytes('End') // [ 0xE0, 0x69 ]
    getMakeBytes('IntlRo') // throws - IntlRo is a valid `keyCode`, but it is not mappable to PS/2
    ```

## `getBreakBytes(keyCode: string): number[]`

* Returns: a byte array to "break" the keypress for the specified `keyCode`. Throws if the `keyCode` is not mapped.
* Example:
    ```js
    const { getBreakBytes } = require('keycodes-to-ps2-scan-codes')
    getBreakBytes('KeyA') // [ 0xF0, 0x1C ]
    getBreakBytes('End') // [ 0xE0, 0xF0, 0x69 ]
    getBreakBytes('IntlRo') // throws - IntlRo is a valid `keyCode`, but it is not mappable to PS/2
    ```

## `keysToScanCodes: { [scanCode: string]: [number[], number[]] }`

* Maps keyCodes to pairs of byte arrays, corresponding to the respective "make" and "break" commands.
* Example:
    ```js
    const { keysToScanCodes } = require('keycodes-to-ps2-scan-codes')
    keysToScanCodes['KeyA'] // [ [ 0x1C ], [ 0xF0, 0x1C ] ]
    ```
