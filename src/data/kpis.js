import { btcHistoricalSample } from './btcHistoricalSample.js'
import { createKpisFromHistoricalData } from '../utils/kpiCalculations.js'

export const kpis = createKpisFromHistoricalData(btcHistoricalSample)
