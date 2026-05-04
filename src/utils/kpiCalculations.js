function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatPercent(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(value)
}

function calculateCagr(currentValue, previousValue, years) {
  if (!currentValue || !previousValue || years <= 0) {
    return null
  }

  return (currentValue / previousValue) ** (1 / years) - 1
}

function average(values) {
  const validValues = values.filter((value) => value !== null)

  if (validValues.length === 0) {
    return null
  }

  return validValues.reduce((sum, value) => sum + value, 0) / validValues.length
}

export function createKpisFromHistoricalData(data) {
  const sortedData = [...data].sort((a, b) => a.date.localeCompare(b.date))
  const latest = sortedData.at(-1)
  const fourYearsAgo = sortedData.at(-5)
  const closes = sortedData.map((item) => item.close)

  const fourYearCagr = calculateCagr(latest?.close, fourYearsAgo?.close, 4)
  const fourYearCagrs = sortedData
    .slice(4)
    .map((item, index) => calculateCagr(item.close, sortedData[index].close, 4))
  const oneYearCagrs = sortedData
    .slice(1)
    .map((item, index) => calculateCagr(item.close, sortedData[index].close, 1))

  return [
    { label: 'BTC Close', value: formatCurrency(latest.close) },
    {
      label: '4-Year CAGR',
      value: fourYearCagr === null ? '-' : formatPercent(fourYearCagr),
    },
    {
      label: '4-Year Average CAGR',
      value: formatPercent(average(fourYearCagrs)),
    },
    {
      label: '1-Year Average CAGR',
      value: formatPercent(average(oneYearCagrs)),
    },
    { label: 'Cycle Min', value: formatCurrency(Math.min(...closes)) },
    { label: 'Cycle Max', value: formatCurrency(Math.max(...closes)) },
  ]
}
