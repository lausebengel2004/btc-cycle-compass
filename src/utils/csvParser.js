import { normalizeBtcHistoricalData } from './dataValidation.js'

const expectedHeader = 'date,close'

function parseCsvLine(line, lineNumber) {
  const columns = line.split(',')

  if (columns.length !== 2) {
    throw new Error(`CSV line ${lineNumber} must contain exactly date and close.`)
  }

  const [date, closeText] = columns.map((value) => value.trim())

  if (closeText.includes(',')) {
    throw new Error(`CSV line ${lineNumber} uses an unsupported decimal comma.`)
  }

  if (closeText === '') {
    throw new Error(`CSV line ${lineNumber} is missing a close value.`)
  }

  const close = Number(closeText)

  if (!Number.isFinite(close) || close <= 0) {
    throw new Error(
      `CSV line ${lineNumber} has an invalid close value. Expected a positive finite number with decimal point if needed.`,
    )
  }

  return { date, close }
}

export function parseBtcCsv(csvText) {
  if (typeof csvText !== 'string') {
    throw new Error('BTC CSV input must be a string.')
  }

  const lines = csvText
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  if (lines.length < 2) {
    throw new Error('BTC CSV must contain a header and at least one data row.')
  }

  if (lines[0] !== expectedHeader) {
    throw new Error('BTC CSV header must be exactly: date,close.')
  }

  const parsedData = lines
    .slice(1)
    .map((line, index) => parseCsvLine(line, index + 2))

  return normalizeBtcHistoricalData(parsedData)
}
