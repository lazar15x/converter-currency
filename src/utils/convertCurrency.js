import { roundedValue } from './roundedValue'

// Функция для конвертации
export function convertCurrency(amount, fromCurrency, toCurrency, rates) {
  if (!(fromCurrency in rates && toCurrency in rates)) {
    console.warn('Данные для валют еще не загружены или отсутствуют.', rates)
    return amount
  }

  const { [fromCurrency]: from, [toCurrency]: to } = rates
  const fromRate = from.Value / from.Nominal
  const toRate = to.Value / to.Nominal
  const result = amount * (fromRate / toRate)

  return roundedValue(result)
}
