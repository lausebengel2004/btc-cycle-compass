import { ChartPlaceholder } from './components/ChartPlaceholder.jsx'
import { Disclaimer } from './components/Disclaimer.jsx'
import { Header } from './components/Header.jsx'
import { KpiGrid } from './components/KpiGrid.jsx'
import { Methodology } from './components/Methodology.jsx'
import { kpis } from './data/kpis.js'

export default function App() {
  return (
    <main className="app-shell">
      <Header />
      <KpiGrid items={kpis} />
      <ChartPlaceholder />
      <Methodology />
      <Disclaimer />
    </main>
  )
}
