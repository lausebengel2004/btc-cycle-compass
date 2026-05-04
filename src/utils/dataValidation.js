const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/

export function isValidIsoDateString(value) {
  if (typeof value !== 'string' || !isoDatePattern.test(value)) {
    return false
  }

  const date = new Date(`${value}T00:00:00Z`)

  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export function validateBtcDataPoint(point, index = 0) {
  if (!point || typeof point !== 'object') {
    throw new Error(`BTC data point at index ${index} must be an object.`)
  }

  if (!isValidIsoDateString(point.date)) {
    throw new Error(
      `BTC data point at index ${index} has an invalid date. Expected YYYY-MM-DD.`,
    )
  }

  if (!Number.isFinite(point.close) || point.close <= 0) {
    throw new Error(
      `BTC data point at index ${index} has an invalid close value. Expected a positive finite number.`,
    )
  }

  return {
    date: point.date,
    close: point.close,
  }
}

export function normalizeBtcHistoricalData(data) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('BTC historical data must be a non-empty array.')
  }

  const normalizedData = data
    .map((point, index) => validateBtcDataPoint(point, index))
    .sort((a, b) => a.date.localeCompare(b.date))
  const seenDates = new Set()

  for (const point of normalizedData) {
    if (seenDates.has(point.date)) {
      throw new Error(`BTC historical data contains a duplicate date: ${point.date}.`)
    }

    seenDates.add(point.date)
  }

  return normalizedData
}

export function validateBtcHistoricalData(data) {
  normalizeBtcHistoricalData(data)
  return true
}

export function isValidHistoricalData(data) {
  try {
    validateBtcHistoricalData(data)
    return true
  } catch {
    return false
  }
}
