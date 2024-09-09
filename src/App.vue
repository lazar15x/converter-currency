<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCurrencyByLocale } from './services/getCurrencyByLocale'
import { convertCurrency } from './utils/convertCurrency'
import { getCurrencies } from './services/getCurrencies'
import { BASE_CURRENCY_FROM_API } from './const'
import CurrencySelect from './components/CurrencySelector.vue'
import CurrencyResult from './components/CurrencyResult.vue'
import CurrencyInput from './components/CurrencyInput.vue'

const rates = ref(null) // Список всех валют
const currentAmount = ref('1') // Сумма для конвертации
const fromCurrency = ref('USD') // Базовая валюта
const toCurrency = ref('none') // Целевая валюта

const convertedAmount = computed(() => {
  return convertCurrency(currentAmount.value, fromCurrency.value, toCurrency.value, rates.value)
})

onMounted(async () => {
  try {
    const [baseCurrency, currencies] = await Promise.all([getCurrencyByLocale(), getCurrencies()])
    fromCurrency.value = baseCurrency
    rates.value = {
      ...currencies.rates.Valute,
      ...BASE_CURRENCY_FROM_API
    }
  } catch (error) {
    console.error('Ошибка получения данных:', error)
  }
})
</script>

<template>
  <main>
    <div class="container" v-if="rates">
      <h1>Конвертер валют</h1>
      <div class="wrapper">
        <div class="currency-wrapper">
          <CurrencySelect
            v-model:selectedCurrency="fromCurrency"
            :currencies="rates"
            :withChooseOption="false"
          />
          <CurrencyInput v-model:amount="currentAmount" />
        </div>

        <div class="currency-wrapper">
          <CurrencySelect
            v-model:selectedCurrency="toCurrency"
            :currencies="rates"
            :withChooseOption="true"
          />
          <CurrencyResult :convertedAmount="convertedAmount" />
        </div>
      </div>
    </div>
    <p v-else>Загрузка...</p>
    <a href="https://www.cbr-xml-daily.ru/">Курсы валют, API</a>
  </main>
</template>

<style scoped>
p {
  font-size: 21px;
  text-align: center;
  margin-top: 50px;
}

main a {
  text-align: center;
  display: inline-block;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
}

input {
  background-color: #f7f7f7;
}

input,
select {
  border: 1px solid #e0e1e5;
  padding: 15px 0;
  padding-left: 15px;
  border-radius: 4px;
  font-size: 18px;
  width: 100%;
  outline: 0;
}

.wrapper {
  display: flex;
  gap: 0 10px;
}

@media (max-width: 768px) {
  .wrapper {
    display: block;
  }

  .currency-wrapper {
    margin-bottom: 10px;
  }
}

.container {
  box-shadow: 0px 0px 7px -2px #cbcbcb;
  padding: 50px 25px;
  height: 400px;
  border-radius: 4px;
}
</style>
