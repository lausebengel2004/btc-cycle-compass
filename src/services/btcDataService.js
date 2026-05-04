import { ACTIVE_DATA_SOURCE, DATA_SOURCES } from '../config/dataSource.js'
import { btcHistoricalSample } from '../data/btcHistoricalSample.js'
import { isValidHistoricalData } from '../utils/dataValidation.js'

function getSampleData() {
  if (!isValidHistoricalData(btcHistoricalSample)) {
    throw new Error('Local BTC sample data is invalid.')
  }

  return btcHistoricalSample
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
