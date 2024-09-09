<template>
  <input v-model="localAmount" type="text" placeholder="Введите сумму..." inputmode="numeric" />
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  amount: String
})

const emit = defineEmits(['update:amount'])
const localAmount = ref(props.amount)

watch(
  () => props.amount,
  (newVal) => {
    localAmount.value = newVal
  }
)

watch(localAmount, (newValue) => {
  if (newValue === '-' || !isNaN(Number(newValue))) {
    localAmount.value = newValue
    emit('update:amount', newValue || 0)
  } else {
    localAmount.value = props.amount
  }
})
</script>

<style scoped>
/* Для Chrome, Safari, Edge, Opera */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Для Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
