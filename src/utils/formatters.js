function isInvalidNumber(value) {
  return !Number.isFinite(value)
}

function getSmallPriceFractionDigits(value) {
  if (value >= 1) {
    return value % 1 === 0 ? 0 : 2
  }

  if (value >= 0.01) {
    return value >= 0.1 ? 2 : 3
  }

  return 4
}

export function formatUsd(value) {
  if (isInvalidNumber(value)) {
    return '-'
  }

  if (value === 0) {
    return '$0'
  }

  const absoluteValue = Math.abs(value)

  if (absoluteValue < 1) {
    return `$${value.toFixed(getSmallPriceFractionDigits(absoluteValue))}`
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: absoluteValue >= 1000 || value % 1 === 0 ? 0 : 2,
  }).format(value)
}

export function formatCompactUsd(value) {
  if (isInvalidNumber(value)) {
    return '-'
  }

  if (value === 0) {
    return '$0'
  }

  const absoluteValue = Math.abs(value)

  if (absoluteValue < 1) {
    return `$${value.toFixed(getSmallPriceFractionDigits(absoluteValue))}`
  }

  if (absoluteValue < 1000) {
    return formatUsd(value)
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}
