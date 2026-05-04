import { useMemo, useState } from 'react'
import { BtcCycleChart } from './components/BtcCycleChart.jsx'
import { ChartLegend } from './components/ChartLegend.jsx'
import { CycleInterpretation } from './components/CycleInterpretation.jsx'
import { CsvImportPanel } from './components/CsvImportPanel.jsx'
import { DataSourceStatus } from './components/DataSourceStatus.jsx'
import { Disclaimer } from './components/Disclaimer.jsx'
import { Header } from './components/Header.jsx'
import { KpiGrid } from './components/KpiGrid.jsx'
import { Methodology } from './components/Methodology.jsx'
import { createKpis } from './data/kpis.js'
import {
  createBtcDataSourceStatus,
  getBtcDataSourceStatus,
  getBtcHistoricalData,
} from './services/btcDataService.js'

export default function App() {
  const [activeBtcData, setActiveBtcData] = useState(() => getBtcHistoricalData())
  const [dataSourceStatus, setDataSourceStatus] = useState(() =>
    getBtcDataSourceStatus(),
  )
  const kpis = useMemo(() => createKpis(activeBtcData), [activeBtcData])

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

  return (
    <main className="app-shell">
      <Header />
      <KpiGrid items={kpis} />
      <DataSourceStatus status={dataSourceStatus} />
      <CsvImportPanel
        onDataLoaded={handleCsvDataLoaded}
        onReset={handleResetToSample}
      />
      <BtcCycleChart data={activeBtcData} />
      <CycleInterpretation />
      <ChartLegend />
      <Methodology />
      <Disclaimer />
    </main>
  )
}
