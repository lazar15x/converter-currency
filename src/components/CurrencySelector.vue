<template>
  <div class="select">
    <select :value="localSelectedCurrency" @change="handleSelectedCurrency($event.target.value)">
      <option v-if="withChooseOption" value="none" disabled>Выберите валюту</option>
      <option v-for="(value, key) in currencies" :key="key" :value="key">
        {{ key }} - {{ value.Name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  selectedCurrency: String,
  currencies: Object,
  withChooseOption: Boolean
})

const emit = defineEmits(['update:selectedCurrency'])
const localSelectedCurrency = ref(props.selectedCurrency)

watch(
  () => props.selectedCurrency,
  (newVal) => {
    localSelectedCurrency.value = newVal
  }
)

function handleSelectedCurrency(value) {
  emit('update:selectedCurrency', value)
}
</script>

<style scoped>
.select {
  position: relative;
}

.select select {
  appearance: none;
  margin-bottom: 10px;
  cursor: pointer;
}

.select::before,
.select::after {
  --size: 0.3rem;
  content: '';
  position: absolute;
  right: 1rem;
  pointer-events: none;
}

.select::before {
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
  border-bottom: var(--size) solid black;
  top: 35%;
}

.select::after {
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
  border-top: var(--size) solid black;
  top: 50%;
}

select {
  border: 1px solid #e0e1e5;
  padding: 15px 0;
  padding-left: 15px;
  border-radius: 4px;
  font-size: 18px;
  width: 100%;
  outline: 0;
}
</style>
