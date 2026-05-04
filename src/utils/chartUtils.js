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

export function createSvgPath(points) {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')
}

export function createChartPoints(data, bounds) {
  const validData = data.filter(
    (item) => item.date && Number.isFinite(item.close),
  )

  if (validData.length === 0) {
    return []
  }

  const sortedData = [...validData].sort((a, b) => a.date.localeCompare(b.date))
  const closes = sortedData.map((item) => item.close)
  const { min, max } = getMinMax(closes)
  const padding = (max - min || max || 1) * 0.08
  const yMin = min - padding
  const yMax = max + padding

  return sortedData.map((item, index) => ({
    date: item.date,
    close: item.close,
    x: scaleLinear(index, 0, sortedData.length - 1, bounds.left, bounds.right),
    y: scaleLinear(item.close, yMin, yMax, bounds.bottom, bounds.top),
  }))
}
