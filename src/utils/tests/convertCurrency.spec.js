import { convertCurrency } from '../convertCurrency'
import { roundedValue } from '../roundedValue'

describe('convertCurrency', () => {
  const rates = {
    USD: {
      Value: 89.7044,
      Nominal: 1
    },
    VND: {
      Value: 37.0343,
      Nominal: 10000
    }
  }

  it('должен возвращать правильное значение при корректных курсах валют', () => {
    const amount = 100
    const fromCurrency = 'USD'
    const toCurrency = 'VND'

    const result = convertCurrency(amount, fromCurrency, toCurrency, rates)
    const expectedResult = amount * (rates.USD.Value / rates.VND.Value) * rates.VND.Nominal
    const roundedResult = roundedValue(expectedResult)

    expect(result).toBeCloseTo(roundedResult)
  })

  it('должен вернуть входное значение если валюта не найдена и выкинуть предупреждение', () => {
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const amount = 100
    const fromCurrency = 'USD'
    const toCurrency = 'NO CURRENCY'

    const result = convertCurrency(amount, fromCurrency, toCurrency, rates)
    expect(result).toBe(amount)
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'Данные для валют еще не загружены или отсутствуют.',
      rates
    )
    consoleWarnMock.mockRestore()
  })
})
