import { CURRENCY_SS_KEY, CURRENCY_RATES_LINK } from '../const'
export async function getCurrencies() {
  const sessionCurrencies = sessionStorage.getItem(CURRENCY_SS_KEY)

  // Если данные есть, пытаемся их разобрать
  let obj = null
  if (sessionCurrencies) {
    try {
      obj = JSON.parse(sessionCurrencies)
    } catch (error) {
      console.error('Ошибка разбора данных из localStorage:', error)
    }
  }

  // Если данные существуют и актуальны
  if (obj) {
    const currentTime = Date.now()
    const timeDiff = currentTime - new Date(obj.timestamp).getTime()
    const timeDiffHours = timeDiff / (1000 * 60)

    if (timeDiffHours < 30) {
      return obj
    }
  }

  // Если данных нет или они устарели, делаем запрос
  try {
    console.log('Данные устарели, делаю новый запрос!')
    const res = await fetch(CURRENCY_RATES_LINK)
    const currencies = await res.json()

    const newCurrencies = {
      timestamp: Date.now(),
      rates: currencies
    }

    sessionStorage.setItem(CURRENCY_SS_KEY, JSON.stringify(newCurrencies))

    return newCurrencies
  } catch (error) {
    console.error('Ошибка при запросе курсов валют:', error)
  }
}
