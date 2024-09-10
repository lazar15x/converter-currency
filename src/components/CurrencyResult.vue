<template>
  <input :value="convertedAmount" class="result" type="text" readonly />
</template>

<script setup>
defineProps({
  convertedAmount: [String, Number]
})
</script>

<style scoped></style>
