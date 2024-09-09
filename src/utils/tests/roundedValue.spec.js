import { roundedValue } from '../roundedValue'

describe('roundedValue', () => {
  it('должен корректно обрабатывать разные значения', () => {
    expect(roundedValue(5)).toBe(5)
    expect(roundedValue(0)).toBe(0)
    expect(roundedValue(1.1)).toBeCloseTo(1.1)
    expect(roundedValue(0.0000001)).toBeCloseTo(0.0)
    expect(roundedValue(66.3345)).toBeCloseTo(66.33)
    expect(roundedValue(-66.3345)).toBeCloseTo(-66.33)
  })
})
