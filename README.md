# BTC Cycle Compass

Eine schlanke, statische React/Vite-Web-App für ein öffentlich teilbares
Bitcoin-4-Jahres-Zyklus-Dashboard.

Version 0.13.0 ergänzt eine Beispiel-CSV und eine klarere Anleitung für den
lokalen CSV-Import. Aktuell startet die App weiterhin mit lokalen
Beispieldaten, nutzt keine Live-Datenquelle und validiert Daten vor der Anzeige.

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

Der lokale CSV-Import erwartet die Spalten `date,close`. Das Datum muss im
Format `YYYY-MM-DD` vorliegen. `close` muss eine positive Zahl sein;
Dezimalpunkte sind möglich, Dezimalkommas werden nicht unterstützt. CSV-Daten
werden nur lokal im Browser verarbeitet, nicht hochgeladen und nicht
gespeichert. Es gibt weiterhin keine API und keine Live-Datenquelle.

## Lokaler CSV-Import

Die App startet standardmäßig mit lokalen Beispieldaten. Nutzer können im
Browser eine eigene CSV-Datei auswählen. Die Datei wird nur lokal im Browser
verarbeitet: Es findet kein Upload statt, es gibt keine Speicherung und keinen
Serverkontakt. CSV-Daten gelten nur für die aktuelle Sitzung. Mit „Zurück zu
Beispieldaten“ kann wieder auf die Standarddaten gewechselt werden.

Eine Beispiel-Datei liegt unter `examples/btc-example.csv`.

Erwartetes Format:

```csv
date,close
2020-01-01,7200
2021-01-01,29300
```

Regeln:

- Header muss exakt `date,close` lauten
- Datum im Format `YYYY-MM-DD`
- `close` als positive Zahl
- Dezimalpunkt erlaubt
- Dezimalkomma nicht unterstützt
- Leere Zeilen werden ignoriert
- Doppelte Datumswerte sind nicht erlaubt
- Ungültige Daten erzeugen eine Fehlermeldung

## Häufige CSV-Fehler

- Falscher Header, z. B. `Date,Close`
- Deutsches Dezimalkomma, z. B. `7200,50`
- Fehlendes Datum
- Negativer oder leerer Close-Wert
- Doppelte Datumswerte
- Falsches Datumsformat, z. B. `01.01.2020`

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
