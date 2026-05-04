export function getMinMax(values) {
  if (values.length === 0) {
    return { min: 0, max: 0 }
  }

  return {
    min: Math.min(...values),
    max: Math.max(...values),
  }
}

export function scaleLinear(value, inputMin, inputMax, outputMin, outputMax) {
  if (inputMax === inputMin) {
    return (outputMin + outputMax) / 2
  }

  const ratio = (value - inputMin) / (inputMax - inputMin)
  return outputMin + ratio * (outputMax - outputMin)
}

export function dateToValue(date) {
  return new Date(`${date}T00:00:00`).getTime()
}

export function dateToX(date, dateMin, dateMax, bounds) {
  return scaleLinear(
    dateToValue(date),
    dateToValue(dateMin),
    dateToValue(dateMax),
    bounds.left,
    bounds.right,
  )
}

export function createSvgPath(points) {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')
}

function getYScaleValue(value, scaleMode) {
  if (scaleMode === 'log') {
    if (value <= 0) {
      throw new Error('Logarithmic chart scale requires positive close values.')
    }

    return Math.log10(value)
  }

  return value
}

function validateScaleMode(scaleMode) {
  if (!['linear', 'log'].includes(scaleMode)) {
    throw new Error(`Unsupported chart scale mode: ${scaleMode}.`)
  }
}

function getYScaleDomain(closes, scaleMode) {
  const scaledCloses = closes.map((close) => getYScaleValue(close, scaleMode))
  const { min: scaledMin, max: scaledMax } = getMinMax(scaledCloses)
  const padding = (scaledMax - scaledMin || scaledMax || 1) * 0.08

  return {
    yMin: scaledMin - padding,
    yMax: scaledMax + padding,
  }
}

export function createYAxisTicks(data, bounds, scaleMode = 'linear', count = 5) {
  validateScaleMode(scaleMode)

  const closes = data.map((item) => item.close)
  const { min, max } = getMinMax(closes)
  const { yMin, yMax } = getYScaleDomain(closes, scaleMode)
  const tickCount = Math.max(2, count)
  const logMin = scaleMode === 'log' ? Math.log10(min) : null
  const logMax = scaleMode === 'log' ? Math.log10(max) : null

  return Array.from({ length: tickCount }, (_, index) => {
    const ratio = index / (tickCount - 1)
    const value =
      scaleMode === 'log'
        ? 10 ** scaleLinear(ratio, 0, 1, logMin, logMax)
        : scaleLinear(ratio, 0, 1, min, max)
    const y = scaleLinear(
      getYScaleValue(value, scaleMode),
      yMin,
      yMax,
      bounds.bottom,
      bounds.top,
    )

    return { value, y }
  }).filter((tick) => scaleMode !== 'log' || tick.value > 0)
}

export function createChartPoints(data, bounds, scaleMode = 'linear') {
  validateScaleMode(scaleMode)

  const validData = data.filter(
    (item) => item.date && Number.isFinite(item.close),
  )

  if (validData.length === 0) {
    return []
  }

  const sortedData = [...validData].sort((a, b) => a.date.localeCompare(b.date))
  const closes = sortedData.map((item) => item.close)
  const firstDate = sortedData[0].date
  const lastDate = sortedData.at(-1).date
  const { yMin, yMax } = getYScaleDomain(closes, scaleMode)

  return sortedData.map((item) => ({
    date: item.date,
    close: item.close,
    x: dateToX(item.date, firstDate, lastDate, bounds),
    y: scaleLinear(
      getYScaleValue(item.close, scaleMode),
      yMin,
      yMax,
      bounds.bottom,
      bounds.top,
    ),
  }))
}
