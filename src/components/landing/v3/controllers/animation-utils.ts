export const clamp01 = (value: number) => Math.max(0, Math.min(1, value))

export const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

export const cubicBez = (p: number, a: number, b: number, c: number, d: number) =>
  (1 - p) * (1 - p) * (1 - p) * a +
  3 * (1 - p) * (1 - p) * p * b +
  3 * (1 - p) * p * p * c +
  p * p * p * d

export type Point = {
  x: number
  y: number
}

