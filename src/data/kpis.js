import { getBtcHistoricalData } from '../services/btcDataService.js'
import { createKpisFromHistoricalData } from '../utils/kpiCalculations.js'

export const kpis = createKpisFromHistoricalData(getBtcHistoricalData())
