import { IPAPI_LINK, DEFAULT_CURRENCY } from '../const'

//Получение базовой валюты из локали, локаль определяется через IP адрес
export async function getCurrencyByLocale() {
  try {
    const res = await fetch(IPAPI_LINK)
    const currencyByLocale = await res.text()

    if (!res.ok) console.warn('Ошибка при запросе локальной валюты')

    return currencyByLocale || DEFAULT_CURRENCY
  } catch (error) {
    console.error('Ошибка при получении локальной валюты: ', error)
  }
}
