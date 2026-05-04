import { halvingEvents } from '../data/halvingEvents.js'
import {
  createChartPoints,
  createSvgPath,
  createYAxisTicks,
  dateToX,
} from '../utils/chartUtils.js'

const chartBounds = {
  left: 64,
  right: 680,
  top: 34,
  bottom: 276,
}

const markerVisibilityLimit = 120

function formatCompactUsd(value) {
  if (value < 1) {
    return `$${value.toFixed(1)}`
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: value >= 10000 ? 0 : 1,
  }).format(value)
}

function formatYear(date) {
  return new Date(`${date}T00:00:00`).getFullYear()
}

function addDays(date, days) {
  const nextDate = new Date(`${date}T00:00:00`)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate.toISOString().slice(0, 10)
}

export function BtcCycleChart({ data, scaleMode = 'linear' }) {
  const points = createChartPoints(data, chartBounds, scaleMode)
  const scaleLabel = scaleMode === 'log' ? 'logarithmisch' : 'linear'

  if (points.length === 0) {
    return (
      <section className="chart-panel" aria-label="BTC Verlauf">
        <div className="chart-frame">
          <p>Keine Chart-Daten verfügbar.</p>
        </div>
      </section>
    )
  }

  const path = createSvgPath(points)
  const yAxisTicks = createYAxisTicks(points, chartBounds, scaleMode)
  const showPointMarkers = points.length <= markerVisibilityLimit
  const lineClassName = showPointMarkers
    ? 'btc-chart__line'
    : 'btc-chart__line btc-chart__line--dense'
  const firstPoint = points[0]
  const lastPoint = points.at(-1)
  const visibleHalvings = halvingEvents
    .filter(
      (event) =>
        event.type === 'halving' &&
        event.date >= firstPoint.date &&
        event.date <= lastPoint.date,
    )
    .map((event) => ({
      ...event,
      x: dateToX(event.date, firstPoint.date, lastPoint.date, chartBounds),
      zoneStartX: dateToX(
        addDays(event.date, -45),
        firstPoint.date,
        lastPoint.date,
        chartBounds,
      ),
      zoneEndX: dateToX(
        addDays(event.date, 45),
        firstPoint.date,
        lastPoint.date,
        chartBounds,
      ),
    }))

  return (
    <section className="chart-panel" aria-label="BTC Verlauf">
      <div className="chart-frame chart-frame--data">
        <svg
          className="btc-chart"
          viewBox="0 0 720 320"
          role="img"
          aria-labelledby="btc-chart-title btc-chart-description"
        >
          <title id="btc-chart-title">BTC Verlauf aus lokalen Daten</title>
          <desc id="btc-chart-description">
            Linienchart mit lokalen Bitcoin-Schlusskursen von{' '}
            {formatYear(firstPoint.date)} bis {formatYear(lastPoint.date)}.
          </desc>
          <text className="btc-chart__scale-label" x="560" y="24">
            Skala: {scaleLabel}
          </text>

          <line
            className="btc-chart__axis"
            x1={chartBounds.left}
            y1={chartBounds.top}
            x2={chartBounds.left}
            y2={chartBounds.bottom}
          />
          <line
            className="btc-chart__axis"
            x1={chartBounds.left}
            y1={chartBounds.bottom}
            x2={chartBounds.right}
            y2={chartBounds.bottom}
          />

          {yAxisTicks.map((tick) => (
            <g key={tick.value}>
              <line
                className="btc-chart__grid-line"
                x1={chartBounds.left}
                y1={tick.y}
                x2={chartBounds.right}
                y2={tick.y}
              />
              <text className="btc-chart__label" x="18" y={tick.y + 4}>
                {formatCompactUsd(tick.value)}
              </text>
            </g>
          ))}

          {visibleHalvings.map((event) => (
            <rect
              key={`${event.date}-zone`}
              className="btc-chart__halving-zone"
              x={event.zoneStartX}
              y={chartBounds.top}
              width={event.zoneEndX - event.zoneStartX}
              height={chartBounds.bottom - chartBounds.top}
            />
          ))}

          {visibleHalvings.map((event) => (
            <g key={event.date} className="btc-chart__halving">
              <line
                className="btc-chart__halving-line"
                x1={event.x}
                y1={chartBounds.top}
                x2={event.x}
                y2={chartBounds.bottom}
              />
              <text
                className="btc-chart__halving-label"
                x={event.x + 7}
                y={chartBounds.top + 16}
              >
                {event.label}
              </text>
            </g>
          ))}

          <path className={lineClassName} d={path} />

          {showPointMarkers
            ? points.map((point) => (
                <circle
                  key={point.date}
                  className="btc-chart__point"
                  cx={point.x}
                  cy={point.y}
                  r="4"
                />
              ))
            : null}

          <text
            className="btc-chart__label"
            x={chartBounds.left}
            y={chartBounds.bottom + 28}
          >
            {formatYear(firstPoint.date)}
          </text>
          <text
            className="btc-chart__label"
            x={chartBounds.right}
            y={chartBounds.bottom + 28}
            textAnchor="end"
          >
            {formatYear(lastPoint.date)}
          </text>
        </svg>
      </div>
    </section>
  )
}
