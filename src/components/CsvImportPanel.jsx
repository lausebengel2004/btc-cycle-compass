import { useRef, useState } from 'react'
import { parseBtcCsv } from '../utils/csvParser.js'
import { formatUsd } from '../utils/formatters.js'

function createPreviewRows(data) {
  if (data.length <= 5) {
    return data
  }

  return [...data.slice(0, 3), ...data.slice(-2)]
}

export function CsvImportPanel({ onDataLoaded, onReset }) {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [importSummary, setImportSummary] = useState(null)
  const fileInputRef = useRef(null)

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
        const importResult = parseBtcCsv(String(reader.result || ''))
        const { data: parsedData, summary } = importResult
        const firstPoint = parsedData[0]
        const latestPoint = parsedData.at(-1)

        onDataLoaded(parsedData, file.name)
        setMessage(`${file.name} wurde lokal geladen und validiert.`)
        setImportSummary({
          fileName: file.name,
          readDataRowCount: summary.readDataRowCount,
          importedDataPointCount: summary.importedDataPointCount,
          ignoredEmptyLineCount: summary.ignoredEmptyLineCount,
          duplicateRemovedCount: summary.duplicateRemovedCount,
          duplicateDates: summary.duplicateDates,
          wasSorted: summary.wasSorted,
          columnMapping: summary.columnMapping,
          firstDate: firstPoint.date,
          lastDate: latestPoint.date,
          latestPoint,
          previewRows: createPreviewRows(parsedData),
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
          Benötigt werden date und close. Groß-/Kleinschreibung, Leerzeichen
          und Reihenfolge sind egal; Zusatzspalten werden ignoriert.
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
          <span>Dateiname: {importSummary.fileName}</span>
          <span>Status: validiert</span>
          <span>Gelesene Datenzeilen: {importSummary.readDataRowCount}</span>
          <span>Importierte Datenpunkte: {importSummary.importedDataPointCount}</span>
          <span>Ignorierte leere Zeilen: {importSummary.ignoredEmptyLineCount}</span>
          <span>Entfernte Duplikate: {importSummary.duplicateRemovedCount}</span>
          {importSummary.duplicateDates.length > 0 ? (
            <span>Duplikat-Daten: {importSummary.duplicateDates.join(', ')}</span>
          ) : null}
          <span>
            Sortierung:{' '}
            {importSummary.wasSorted
              ? 'Daten wurden chronologisch sortiert.'
              : 'bereits chronologisch'}
          </span>
          <span>
            Zeitraum: {importSummary.firstDate} bis {importSummary.lastDate}
          </span>
          <span>
            Letzter Schlusskurs: {importSummary.latestPoint.date} ·{' '}
            {formatUsd(importSummary.latestPoint.close)}
          </span>
          <span>
            Spalten:{' '}
            {importSummary.columnMapping
              .map((mapping) => `${mapping.original} → ${mapping.normalized}`)
              .join(', ')}
          </span>
          <div className="csv-import-panel__preview" aria-label="CSV-Datenvorschau">
            <strong>Datenvorschau</strong>
            <table>
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Schlusskurs</th>
                </tr>
              </thead>
              <tbody>
                {importSummary.previewRows.map((point) => (
                  <tr key={point.date}>
                    <td>{point.date}</td>
                    <td>{formatUsd(point.close)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
      {error ? <p className="csv-import-panel__error">{error}</p> : null}
    </section>
  )
}
