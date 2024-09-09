<template>
  <input :value="convertedAmount" class="result" type="text" readonly />
</template>

<script setup>
defineProps({
  convertedAmount: String
})
</script>

<style scoped></style>
