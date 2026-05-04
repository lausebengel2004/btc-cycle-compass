import { useRef, useState } from 'react'
import { parseBtcCsv } from '../utils/csvParser.js'

export function CsvImportPanel({ onDataLoaded, onReset }) {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
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

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      try {
        const parsedData = parseBtcCsv(String(reader.result || ''))
        onDataLoaded(parsedData, file.name)
        setMessage(`${file.name} wurde lokal geladen und validiert.`)
      } catch (csvError) {
        setError(csvError.message)
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
      {error ? <p className="csv-import-panel__error">{error}</p> : null}
    </section>
  )
}
