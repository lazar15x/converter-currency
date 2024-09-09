export function roundedValue(value) {
  const valueToNum = value % 1 === 0 ? value : value.toFixed(2)
  return Number(valueToNum)
}
