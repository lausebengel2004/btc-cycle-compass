import { getBtcDataSourceStatus } from '../services/btcDataService.js'

function formatUsd(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function DataSourceStatus({ status = getBtcDataSourceStatus() }) {

  return (
    <section className="data-source-status" aria-label="Datenquellenstatus">
      <div className="data-source-status__item">
        <span>Datenquelle</span>
        <strong>{status.sourceLabel}</strong>
      </div>
      <div className="data-source-status__item">
        <span>Status</span>
        <strong>{status.isValidated ? 'validiert' : 'nicht validiert'}</strong>
      </div>
      <div className="data-source-status__item">
        <span>Datenpunkte</span>
        <strong>{status.dataPointCount}</strong>
      </div>
      <div className="data-source-status__item">
        <span>Letzter Wert</span>
        <strong>
          {status.latestPoint.date} · {formatUsd(status.latestPoint.close)}
        </strong>
      </div>
      <div className="data-source-status__item">
        <span>Live-Daten</span>
        <strong>{status.isLive ? 'ja' : 'nein'}</strong>
      </div>
    </section>
  )
}
