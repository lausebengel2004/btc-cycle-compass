import { btcHistoricalSample } from '../data/btcHistoricalSample.js'
import { createChartPoints, createSvgPath, getMinMax } from '../utils/chartUtils.js'

const chartBounds = {
  left: 64,
  right: 680,
  top: 34,
  bottom: 276,
}

function formatCompactUsd(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

function formatYear(date) {
  return new Date(`${date}T00:00:00`).getFullYear()
}

export function BtcCycleChart() {
  const points = createChartPoints(btcHistoricalSample, chartBounds)

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
  const closes = points.map((point) => point.close)
  const { min, max } = getMinMax(closes)
  const firstPoint = points[0]
  const lastPoint = points.at(-1)

  return (
    <section className="chart-panel" aria-label="BTC Verlauf">
      <div className="chart-frame chart-frame--data">
        <svg
          className="btc-chart"
          viewBox="0 0 720 320"
          role="img"
          aria-labelledby="btc-chart-title btc-chart-description"
        >
          <title id="btc-chart-title">BTC Verlauf aus Beispieldaten</title>
          <desc id="btc-chart-description">
            Linienchart mit lokalen Bitcoin-Schlusskursen von{' '}
            {formatYear(firstPoint.date)} bis {formatYear(lastPoint.date)}.
          </desc>

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

          {[0.25, 0.5, 0.75].map((ratio) => {
            const y =
              chartBounds.top + (chartBounds.bottom - chartBounds.top) * ratio

            return (
              <line
                key={ratio}
                className="btc-chart__grid-line"
                x1={chartBounds.left}
                y1={y}
                x2={chartBounds.right}
                y2={y}
              />
            )
          })}

          <path className="btc-chart__line" d={path} />

          {points.map((point) => (
            <circle
              key={point.date}
              className="btc-chart__point"
              cx={point.x}
              cy={point.y}
              r="4"
            />
          ))}

          <text className="btc-chart__label" x="18" y={chartBounds.top + 6}>
            {formatCompactUsd(max)}
          </text>
          <text className="btc-chart__label" x="18" y={chartBounds.bottom + 4}>
            {formatCompactUsd(min)}
          </text>
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
