export function isValidHistoricalData(data) {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(
      (item) =>
        item &&
        typeof item.date === 'string' &&
        item.date.length > 0 &&
        Number.isFinite(item.close),
    )
  )
}
