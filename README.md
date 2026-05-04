# BTC Cycle Compass

Eine schlanke, statische React/Vite-Web-App für ein öffentlich teilbares
Bitcoin-4-Jahres-Zyklus-Dashboard.

Version 0.11.0 bereitet einen späteren lokalen CSV-Import vor. Aktuell nutzt die App
weiterhin lokale Beispieldaten, keine Live-Datenquelle und validiert Daten vor
der Anzeige.

## Aktueller MVP-Status

- Öffentlich teilbare statische React/Vite-App
- Aktuell lokale Beispieldaten
- Keine Live-Kursdaten
- Keine Anlageberatung
- Vorbereitet für spätere Datenquellen
- GitHub Pages geeignet

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

## CSV-Datenvertrag

Ein späterer lokaler CSV-Import erwartet die Spalten `date,close`. Das Datum
muss im Format `YYYY-MM-DD` vorliegen. `close` muss eine positive Zahl sein;
Dezimalpunkte sind möglich, Dezimalkommas werden nicht unterstützt. CSV-Daten
werden lokal verarbeitet. Im MVP bleibt weiterhin keine Live-Datenquelle aktiv.

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

## Bekannte Grenzen

- Beispieldaten sind nicht vollständig historisch
- Keine automatische Aktualisierung
- Keine Prognosefunktion
- Keine Berücksichtigung von On-Chain-Daten, Makrodaten oder Liquiditätsdaten
- Chart dient aktuell der methodischen Visualisierung

## Nächste mögliche Ausbaustufen

- Vollständiger CSV-Import
- Echte historische BTC-Tagesdaten
- Logarithmische Chart-Skalierung
- Zyklusvergleich nach Halving
- Export/Share-Snapshot
- Optional spätere API-Anbindung
