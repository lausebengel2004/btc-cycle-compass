import { ACTIVE_DATA_SOURCE, DATA_SOURCES } from '../config/dataSource.js'
import { btcHistoricalSample } from '../data/btcHistoricalSample.js'
import { normalizeBtcHistoricalData } from '../utils/dataValidation.js'

function getSampleData() {
  return normalizeBtcHistoricalData(btcHistoricalSample)
}

export function getBtcHistoricalData() {
  const dataSource = DATA_SOURCES[ACTIVE_DATA_SOURCE]

  if (!dataSource || !dataSource.enabled) {
    return getSampleData()
  }

  switch (ACTIVE_DATA_SOURCE) {
    case 'sample':
      return getSampleData()
    default:
      return getSampleData()
  }
}
