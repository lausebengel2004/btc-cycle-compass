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

export function createChartPoints(data, bounds, scaleMode = 'linear') {
  if (!['linear', 'log'].includes(scaleMode)) {
    throw new Error(`Unsupported chart scale mode: ${scaleMode}.`)
  }

  const validData = data.filter(
    (item) => item.date && Number.isFinite(item.close),
  )

  if (validData.length === 0) {
    return []
  }

  const sortedData = [...validData].sort((a, b) => a.date.localeCompare(b.date))
  const closes = sortedData.map((item) => item.close)
  const scaledCloses = closes.map((close) => getYScaleValue(close, scaleMode))
  const { min, max } = getMinMax(closes)
  const { min: scaledMin, max: scaledMax } = getMinMax(scaledCloses)
  const firstDate = sortedData[0].date
  const lastDate = sortedData.at(-1).date
  const padding = (scaledMax - scaledMin || scaledMax || 1) * 0.08
  const yMin = scaledMin - padding
  const yMax = scaledMax + padding

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
