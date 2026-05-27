import { halvingEvents } from '../data/halvingEvents.js'
import { formatUsd } from './formatters.js'

const millisecondsPerDay = 24 * 60 * 60 * 1000

function formatPercent(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(value)
}

function formatSignedPercent(value) {
  const prefix = value > 0 ? '+' : ''

  return `${prefix}${value.toFixed(1)}%`
}

function getUtcTimestamp(date) {
  const [year, month, day] = date.split('-').map(Number)

  return Date.UTC(year, month - 1, day)
}

function calculateDaysSinceLastHalving(latestDate) {
  const lastHalving = halvingEvents
    .filter((event) => event.type === 'halving' && event.date <= latestDate)
    .sort((a, b) => a.date.localeCompare(b.date))
    .at(-1)

  if (!lastHalving) {
    return null
  }

  return {
    days: Math.round(
      (getUtcTimestamp(latestDate) - getUtcTimestamp(lastHalving.date)) /
        millisecondsPerDay,
    ),
    date: lastHalving.date,
  }
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

  if (sortedData.length === 0) {
    throw new Error('Cannot create KPIs from an empty BTC data set.')
  }

  const latest = sortedData.at(-1)
  const fourYearsAgo = sortedData.at(-5)
  const closes = sortedData.map((item) => item.close)
  const athPoint = sortedData.reduce(
    (currentAth, item) => (item.close > currentAth.close ? item : currentAth),
    sortedData[0],
  )
  const currentClose = latest.close
  const athClose = athPoint.close
  const drawdownFromAthPercent = ((currentClose - athClose) / athClose) * 100
  const gainToAthPercent = ((athClose - currentClose) / currentClose) * 100
  const isAtAth = currentClose === athClose
  const daysSinceLastHalving = calculateDaysSinceLastHalving(latest.date)

  const fourYearCagr = calculateCagr(latest?.close, fourYearsAgo?.close, 4)
  const fourYearCagrs = sortedData
    .slice(4)
    .map((item, index) => calculateCagr(item.close, sortedData[index].close, 4))
  const oneYearCagrs = sortedData
    .slice(1)
    .map((item, index) => calculateCagr(item.close, sortedData[index].close, 1))
  const fourYearAverageCagr = average(fourYearCagrs)
  const oneYearAverageCagr = average(oneYearCagrs)

  return [
    { label: 'BTC Close', value: formatUsd(latest.close) },
    {
      label: '4-Year CAGR',
      value: fourYearCagr === null ? '-' : formatPercent(fourYearCagr),
    },
    {
      label: '4-Year Average CAGR',
      value:
        fourYearAverageCagr === null ? '-' : formatPercent(fourYearAverageCagr),
    },
    {
      label: '1-Year Average CAGR',
      value:
        oneYearAverageCagr === null ? '-' : formatPercent(oneYearAverageCagr),
    },
    { label: 'Cycle Min', value: formatUsd(Math.min(...closes)) },
    {
      label: 'ATH / Cycle Max',
      value: formatUsd(athClose),
      detail: isAtAth ? `am ATH seit ${athPoint.date}` : `am ${athPoint.date}`,
    },
    {
      label: 'Drawdown vom ATH',
      value: formatSignedPercent(drawdownFromAthPercent),
    },
    {
      label: 'Weg zurück zum ATH',
      value: isAtAth ? '0.0%' : formatSignedPercent(gainToAthPercent),
    },
    {
      label: 'Tage seit letztem Halving',
      value:
        daysSinceLastHalving === null
          ? '-'
          : daysSinceLastHalving.days.toLocaleString('de-DE'),
      detail:
        daysSinceLastHalving === null
          ? 'kein Halving im Datensatz'
          : `seit ${daysSinceLastHalving.date}`,
    },
  ]
}
