declare module 'keycodes-to-ps2-scan-codes' {
  export function getMakeBytes(keyCode: string): number[]
  export function getBreakBytes(keyCode: string): number[]
  export const keysToScanCodes: { [scanCode: string]: [number[], number[]] }
}
