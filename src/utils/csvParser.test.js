import assert from 'node:assert/strict'
import { parseBtcCsv } from './csvParser.js'

function runTest(name, testFn) {
  try {
    testFn()
    console.log(`PASS ${name}`)
  } catch (error) {
    console.error(`FAIL ${name}`)
    throw error
  }
}

runTest('accepts flexible headers and ignores extra columns', () => {
  const result = parseBtcCsv(`Date, Price, Close
2020-01-01,ignore,7200
2020-01-02,ignore,7300`)

  assert.deepEqual(result.data, [
    { date: '2020-01-01', close: 7200 },
    { date: '2020-01-02', close: 7300 },
  ])
  assert.equal(result.summary.readDataRowCount, 2)
  assert.deepEqual(result.summary.columnMapping, [
    { original: 'Date', normalized: 'date' },
    { original: 'Close', normalized: 'close' },
  ])
})

runTest('reports missing required columns with found headers', () => {
  assert.throws(
    () => parseBtcCsv(`Date, Price
2020-01-01,7200`),
    /CSV-Spalte `close` fehlt\. Gefunden wurden: Date, Price\. Erwartet werden mindestens: date und close\./,
  )
})

runTest('rejects duplicate dates with conflicting close values', () => {
  assert.throws(
    () =>
      parseBtcCsv(`date,close
2020-01-01,7200
2020-01-01,7300
2020-01-02,7400`),
    /CSV data conflict for 2020-01-01/,
  )
})

runTest('removes exact duplicate rows and reports removed dates', () => {
  const result = parseBtcCsv(`date,close
2020-01-01,7200
2020-01-01,7200
2020-01-02,7400`)

  assert.deepEqual(result.data, [
    { date: '2020-01-01', close: 7200 },
    { date: '2020-01-02', close: 7400 },
  ])
  assert.equal(result.summary.duplicateRemovedCount, 1)
  assert.deepEqual(result.summary.duplicateDates, ['2020-01-01'])
})

runTest('sorts data chronologically and reports when sorting was needed', () => {
  const result = parseBtcCsv(`close,date
7400,2020-01-02
7200,2020-01-01`)

  assert.deepEqual(result.data, [
    { date: '2020-01-01', close: 7200 },
    { date: '2020-01-02', close: 7400 },
  ])
  assert.equal(result.summary.wasSorted, true)
})

runTest('counts ignored empty rows', () => {
  const result = parseBtcCsv(`date,close

2020-01-01,7200

2020-01-02,7300
`)

  assert.equal(result.summary.ignoredEmptyLineCount, 3)
  assert.equal(result.summary.readDataRowCount, 2)
})
