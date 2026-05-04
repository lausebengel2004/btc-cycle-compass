import { ACTIVE_DATA_SOURCE, DATA_SOURCES } from '../config/dataSource.js'
import { btcHistoricalSample } from '../data/btcHistoricalSample.js'
import { normalizeBtcHistoricalData } from '../utils/dataValidation.js'

function getSampleData() {
  return normalizeBtcHistoricalData(btcHistoricalSample)
}

function resolveActiveDataSource() {
  const source = DATA_SOURCES[ACTIVE_DATA_SOURCE]

  if (!source || !source.enabled) {
    return {
      sourceKey: 'sample',
      source: DATA_SOURCES.sample,
    }
  }

  return {
    sourceKey: ACTIVE_DATA_SOURCE,
    source,
  }
}

export function getBtcHistoricalData() {
  const { sourceKey } = resolveActiveDataSource()

  switch (sourceKey) {
    case 'sample':
      return getSampleData()
    default:
      return getSampleData()
  }
}

export function getBtcDataSourceStatus() {
  const data = getBtcHistoricalData()
  const { sourceKey, source } = resolveActiveDataSource()

  return {
    sourceKey,
    sourceLabel: source.label,
    isLive: source.isLive,
    isValidated: true,
    dataPointCount: data.length,
    latestPoint: data.at(-1),
  }
}
