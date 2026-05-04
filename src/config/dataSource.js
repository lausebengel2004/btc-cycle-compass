export const ACTIVE_DATA_SOURCE = 'sample'

export const DATA_SOURCES = {
  sample: {
    label: 'Lokale Beispieldaten',
    enabled: true,
    isLive: false,
  },
  api: {
    label: 'External API',
    enabled: false,
    isLive: true,
  },
  csv: {
    label: 'CSV import',
    enabled: false,
    isLive: false,
  },
}
