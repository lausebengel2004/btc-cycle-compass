import {
  isValidIsoDateString,
  normalizeBtcHistoricalData,
  validateBtcDataPoint,
} from './dataValidation.js'

const requiredColumns = ['date', 'close']

function splitCsvLine(line) {
  return line.split(',').map((value) => value.trim())
}

function formatFoundColumns(headerColumns) {
  return headerColumns.map((column) => column || '(leer)').join(', ')
}

function normalizeHeaderName(value) {
  return value.trim().toLowerCase()
}

function createColumnMapping(headerLine) {
  const headerColumns = splitCsvLine(headerLine)
  const normalizedHeaders = headerColumns.map(normalizeHeaderName)
  const foundColumns = formatFoundColumns(headerColumns)
  const mapping = {}

  for (const requiredColumn of requiredColumns) {
    const matchingIndexes = normalizedHeaders
      .map((columnName, index) => (columnName === requiredColumn ? index : -1))
      .filter((index) => index !== -1)

    if (matchingIndexes.length === 0) {
      throw new Error(
        `CSV-Spalte \`${requiredColumn}\` fehlt. Gefunden wurden: ${foundColumns}. Erwartet werden mindestens: date und close.`,
      )
    }

    if (matchingIndexes.length > 1) {
      throw new Error(
        `CSV-Spalte \`${requiredColumn}\` wurde mehrfach gefunden. Bitte jede Pflichtspalte nur einmal verwenden.`,
      )
    }

    const index = matchingIndexes[0]
    mapping[requiredColumn] = {
      index,
      original: headerColumns[index],
      normalized: requiredColumn,
    }
  }

  return {
    dateIndex: mapping.date.index,
    closeIndex: mapping.close.index,
    columnMapping: [
      { original: mapping.date.original, normalized: mapping.date.normalized },
      { original: mapping.close.original, normalized: mapping.close.normalized },
    ],
    headerColumnCount: headerColumns.length,
  }
}

function parseCsvLine(line, lineNumber, columnInfo) {
  const columns = line.split(',')
  const requiredColumnIndex = Math.max(columnInfo.dateIndex, columnInfo.closeIndex)

  if (columns.length > columnInfo.headerColumnCount) {
    throw new Error(
      `CSV line ${lineNumber} has too many columns. Decimal commas such as 7200,50 are not supported.`,
    )
  }

  if (columns.length <= requiredColumnIndex) {
    throw new Error(`CSV line ${lineNumber} is missing date or close columns.`)
  }

  const date = columns[columnInfo.dateIndex].trim()
  const closeText = columns[columnInfo.closeIndex].trim()

  if (date === '') {
    throw new Error(`CSV line ${lineNumber} is missing a date value.`)
  }

  if (!isValidIsoDateString(date)) {
    throw new Error(
      `CSV line ${lineNumber} has an invalid date. Expected YYYY-MM-DD.`,
    )
  }

  if (closeText === '') {
    throw new Error(`CSV line ${lineNumber} is missing a close value.`)
  }

  if (closeText.includes(',')) {
    throw new Error(
      `CSV line ${lineNumber} has an invalid close value. Decimal commas are not supported.`,
    )
  }

  const close = Number(closeText)

  if (!Number.isFinite(close) || close <= 0) {
    throw new Error(
      `CSV line ${lineNumber} has an invalid close value. Expected a positive finite number with decimal point if needed.`,
    )
  }

  return validateBtcDataPoint({ date, close }, lineNumber)
}

function removeDuplicateDates(data) {
  const seenDates = new Set()
  const duplicateDates = []
  const dedupedData = []

  // Beim Import bleibt bewusst der erste gültige Eintrag pro Datum erhalten.
  for (const point of data) {
    if (seenDates.has(point.date)) {
      const existingPoint = dedupedData.find(
        (dedupedPoint) => dedupedPoint.date === point.date,
      )

      if (existingPoint.close !== point.close) {
        throw new Error(
          `CSV data conflict for ${point.date}: duplicate rows contain different close values (${existingPoint.close} and ${point.close}).`,
        )
      }

      if (!duplicateDates.includes(point.date)) {
        duplicateDates.push(point.date)
      }

      continue
    }

    seenDates.add(point.date)
    dedupedData.push(point)
  }

  return {
    data: dedupedData,
    duplicateRemovedCount: data.length - dedupedData.length,
    duplicateDates: duplicateDates.slice(0, 5),
  }
}

function isChronologicallySorted(data) {
  return data.every((point, index) => {
    if (index === 0) {
      return true
    }

    return data[index - 1].date.localeCompare(point.date) <= 0
  })
}

export function parseBtcCsv(csvText) {
  if (typeof csvText !== 'string') {
    throw new Error('BTC CSV input must be a string.')
  }

  const rawLines = csvText.replace(/^\uFEFF/, '').split(/\r?\n/)
  const headerLineIndex = rawLines.findIndex((line) => line.trim().length > 0)

  if (headerLineIndex === -1) {
    throw new Error('BTC CSV must contain a header and at least one data row.')
  }

  const columnInfo = createColumnMapping(rawLines[headerLineIndex])
  const dataLines = rawLines.slice(headerLineIndex + 1)
  const ignoredEmptyLineCount = dataLines.filter(
    (line) => line.trim().length === 0,
  ).length
  const nonEmptyDataLines = dataLines
    .map((line, index) => ({
      line: line.trim(),
      lineNumber: headerLineIndex + index + 2,
    }))
    .filter((entry) => entry.line.length > 0)

  if (nonEmptyDataLines.length === 0) {
    throw new Error('BTC CSV must contain a header and at least one data row.')
  }

  const parsedData = nonEmptyDataLines.map(({ line, lineNumber }) =>
    parseCsvLine(line, lineNumber, columnInfo),
  )
  const dedupedResult = removeDuplicateDates(parsedData)
  const wasSorted = !isChronologicallySorted(dedupedResult.data)

  try {
    const normalizedData = normalizeBtcHistoricalData(dedupedResult.data)

    return {
      data: normalizedData,
      summary: {
        readDataRowCount: parsedData.length,
        importedDataPointCount: normalizedData.length,
        ignoredEmptyLineCount,
        duplicateRemovedCount: dedupedResult.duplicateRemovedCount,
        duplicateDates: dedupedResult.duplicateDates,
        wasSorted,
        columnMapping: columnInfo.columnMapping,
      },
    }
  } catch (error) {
    throw new Error(`CSV validation failed: ${error.message}`)
  }
}
