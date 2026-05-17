import { useMemo, useState } from 'react'
import { BtcCycleChart } from './components/BtcCycleChart.jsx'
import { ChartLegend } from './components/ChartLegend.jsx'
import { ChartScaleToggle } from './components/ChartScaleToggle.jsx'
import { CycleInterpretation } from './components/CycleInterpretation.jsx'
import { CsvImportPanel } from './components/CsvImportPanel.jsx'
import { DataSourceStatus } from './components/DataSourceStatus.jsx'
import { Disclaimer } from './components/Disclaimer.jsx'
import { Header } from './components/Header.jsx'
import { KpiGrid } from './components/KpiGrid.jsx'
import { Methodology } from './components/Methodology.jsx'
import { MethodologyNotes } from './components/MethodologyNotes.jsx'
import { createKpis } from './data/kpis.js'
import { halvingEvents } from './data/halvingEvents.js'
import {
  createBtcDataSourceStatus,
  getBtcDataSourceStatus,
  getBtcHistoricalData,
} from './services/btcDataService.js'

function daysBetween(startDate, endDate) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24

  return Math.round(
    (new Date(`${endDate}T00:00:00`) - new Date(`${startDate}T00:00:00`)) /
      millisecondsPerDay,
  )
}

function createCyclePosition(data) {
  const sortedData = [...data].sort((a, b) => a.date.localeCompare(b.date))
  const latest = sortedData.at(-1)

  if (!latest) {
    return null
  }

  const lastHalving = [...halvingEvents]
    .filter((event) => event.date <= latest.date)
    .sort((a, b) => a.date.localeCompare(b.date))
    .at(-1)

  return {
    latestDate: latest.date,
    latestClose: latest.close,
    lastHalving: lastHalving?.label ?? null,
    lastHalvingDate: lastHalving?.date ?? null,
    daysSinceLastHalving: lastHalving
      ? daysBetween(lastHalving.date, latest.date)
      : null,
  }
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export default function App() {
  const [activeBtcData, setActiveBtcData] = useState(() => getBtcHistoricalData())
  const [dataSourceStatus, setDataSourceStatus] = useState(() =>
    getBtcDataSourceStatus(),
  )
  const [chartScale, setChartScale] = useState('linear')
  const kpis = useMemo(() => createKpis(activeBtcData), [activeBtcData])
  const cyclePosition = useMemo(
    () => createCyclePosition(activeBtcData),
    [activeBtcData],
  )

  function handleCsvDataLoaded(data) {
    setActiveBtcData(data)
    setDataSourceStatus(
      createBtcDataSourceStatus(data, {
        sourceKey: 'csv',
        sourceLabel: 'Lokale CSV-Datei',
        isLive: false,
      }),
    )
  }

  function handleResetToSample() {
    const sampleData = getBtcHistoricalData()

    setActiveBtcData(sampleData)
    setDataSourceStatus(getBtcDataSourceStatus())
  }

  function handleSnapshotExport() {
    const snapshotDate = new Date().toISOString()
    const getKpi = (label) => kpis.find((item) => item.label === label) ?? null
    const snapshot = {
      app: 'BTC Cycle Compass',
      exportedAt: snapshotDate,
      dataSource: dataSourceStatus,
      kpis: {
        ath: getKpi('ATH / Cycle Max'),
        drawdownFromAth: getKpi('Drawdown vom ATH'),
        currentCyclePosition: cyclePosition,
      },
      note: 'Lokaler Snapshot. Keine Prognose, kein Trading-Signal.',
    }
    const datePart = snapshotDate.slice(0, 10)

    downloadJson(`btc-cycle-compass-snapshot-${datePart}.json`, snapshot)
  }

  return (
    <main className="app-shell">
      <Header />
      <KpiGrid items={kpis} />
      <DataSourceStatus status={dataSourceStatus} />
      <section className="snapshot-export" aria-label="Analyse speichern">
        <div>
          <h2>Analyse speichern</h2>
          <p>
            Speichert die aktuellen KPI-Werte lokal als JSON-Datei. Es wird
            nichts hochgeladen oder im Browser gespeichert.
          </p>
        </div>
        <button type="button" onClick={handleSnapshotExport}>
          Analyse speichern
        </button>
      </section>
      <CsvImportPanel
        onDataLoaded={handleCsvDataLoaded}
        onReset={handleResetToSample}
      />
      <ChartScaleToggle value={chartScale} onChange={setChartScale} />
      <BtcCycleChart data={activeBtcData} scaleMode={chartScale} />
      <CycleInterpretation />
      <MethodologyNotes />
      <ChartLegend />
      <Methodology />
      <Disclaimer />
    </main>
  )
}
