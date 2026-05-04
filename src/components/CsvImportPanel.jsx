import { useRef, useState } from 'react'
import { parseBtcCsv } from '../utils/csvParser.js'

export function CsvImportPanel({ onDataLoaded, onReset }) {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [importSummary, setImportSummary] = useState(null)
  const fileInputRef = useRef(null)

  function formatUsd(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value)
  }

  function resetInput() {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0]

    setError('')
    setMessage('')
    setImportSummary(null)

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      try {
        const parsedData = parseBtcCsv(String(reader.result || ''))
        const firstPoint = parsedData[0]
        const latestPoint = parsedData.at(-1)

        onDataLoaded(parsedData, file.name)
        setMessage(`${file.name} wurde lokal geladen und validiert.`)
        setImportSummary({
          dataPointCount: parsedData.length,
          firstDate: firstPoint.date,
          lastDate: latestPoint.date,
          latestPoint,
        })
      } catch (csvError) {
        setError(csvError.message)
        setImportSummary(null)
        resetInput()
      }
    }

    reader.onerror = () => {
      setError('Die CSV-Datei konnte nicht lokal gelesen werden.')
      resetInput()
    }

    reader.readAsText(file)
  }

  function handleReset() {
    setError('')
    setMessage('')
    setImportSummary(null)
    resetInput()
    onReset()
  }

  return (
    <section className="csv-import-panel" aria-label="Lokaler CSV-Import">
      <div>
        <h2>CSV-Import</h2>
        <p>Die Datei wird nur lokal im Browser verarbeitet und nicht hochgeladen.</p>
        <p className="csv-import-panel__hint">
          Erwartetes Format: date,close mit Datum im Format YYYY-MM-DD. Eine
          Beispiel-Datei liegt unter examples/btc-example.csv.
        </p>
      </div>
      <div className="csv-import-panel__controls">
        <label className="csv-import-panel__file">
          <span>CSV-Datei auswählen</span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileChange}
          />
        </label>
        <button type="button" onClick={handleReset}>
          Zurück zu Beispieldaten
        </button>
      </div>
      {message ? <p className="csv-import-panel__message">{message}</p> : null}
      {importSummary ? (
        <div className="csv-import-panel__summary" aria-label="Import-Zusammenfassung">
          <span>Datenquelle: CSV-Datei</span>
          <span>Status: validiert</span>
          <span>Datenpunkte: {importSummary.dataPointCount}</span>
          <span>
            Zeitraum: {importSummary.firstDate} bis {importSummary.lastDate}
          </span>
          <span>
            Letzter Wert: {importSummary.latestPoint.date} ·{' '}
            {formatUsd(importSummary.latestPoint.close)}
          </span>
        </div>
      ) : null}
      {error ? <p className="csv-import-panel__error">{error}</p> : null}
    </section>
  )
}
