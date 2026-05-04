# BTC Cycle Compass

Eine schlanke, statische React/Vite-Web-App für ein öffentlich teilbares
Bitcoin-4-Jahres-Zyklus-Dashboard.

Version 0.7.0 sichert den Datenvertrag für historische BTC-Daten ab. Aktuell
nutzt die App weiterhin lokale Beispieldaten und keine Live-Marktdaten.

## Data Source Architecture

Aktuell nutzt die App lokale Beispieldaten. Die aktive Datenquelle ist zentral
über `src/config/dataSource.js` vorbereitet. Eine echte API- oder CSV-Anbindung
ist für spätere Versionen vorgesehen.

## Datenvertrag

Historische BTC-Daten werden als Array von Datensätzen erwartet:

```js
{ date: 'YYYY-MM-DD', close: number }
```

`date` muss ein gültiger ISO-Date-String im Format `YYYY-MM-DD` sein. `close`
muss eine positive endliche Zahl sein. Die Validierung normalisiert Datensätze
aufsteigend nach Datum und verhindert doppelte Datumswerte, damit spätere API-
oder CSV-Importe dieselbe Struktur liefern. Aktuell bleibt `sample` die aktive
Datenquelle.

## Lokal starten

```bash
npm install
npm run dev
```

## Build und GitHub Pages

```bash
npm run build
npm run deploy
```

Die Vite-Basis ist für ein GitHub-Pages-Projekt unter `/btc-cycle-compass/`
vorbereitet.
