# BTC Cycle Compass

Eine schlanke, statische React/Vite-Web-App für ein öffentlich teilbares
Bitcoin-4-Jahres-Zyklus-Dashboard.

Aktueller Stand: Version 0.20.0. Die App startet mit lokalen Beispieldaten,
unterstützt temporären lokalen CSV-Import im Browser, nutzt keine
Live-Datenquelle und validiert Daten vor der Anzeige.

## Aktueller MVP-Status

- Öffentlich teilbare statische React/Vite-App
- Lokale Beispieldaten als Standard
- Lokaler CSV-Import per `FileReader`
- KPI-Bereich mit CAGR-, Zyklus-, ATH- und Drawdown-Kennzahlen
- SVG-Chart mit linearer und logarithmischer Skala
- Datenquellenstatus, Interpretationskarte, Legende und Methodikbereich
- Keine Live-Kursdaten
- Keine API-Anbindung
- Keine Speicherung importierter CSV-Dateien
- Keine Anlageberatung
- Vorbereitet für spätere Datenquellen
- GitHub Pages geeignet

## Data Source Architecture

Aktuell nutzt die App beim Start lokale Beispieldaten. Zusätzlich können
Nutzer CSV-Dateien temporär im Browser importieren; diese Daten ersetzen die
aktive Ansicht nur für die laufende Sitzung. Die Datenquelle ist zentral über
`src/config/dataSource.js` vorbereitet. Eine echte API-Anbindung ist für
spätere Versionen vorgesehen, aber nicht aktiv.

## KPI-Kennzahlen

Der KPI-Bereich enthält neben Zyklus- und CAGR-Werten auch ATH-/Drawdown-Werte.
`ATH / Cycle Max` ist der höchste Schlusskurs im aktiven Datensatz. `Drawdown
vom ATH` zeigt den prozentualen Abstand vom ATH aus gesehen. `Weg zurück zum
ATH` zeigt den notwendigen prozentualen Anstieg vom aktuellen Wert zurück zum
ATH.

Kleine historische BTC-Preise werden in der Anzeige mit ausreichend
Nachkommastellen formatiert, damit positive Werte nicht als `$0` erscheinen.
Diese Formatierung betrifft nur die Darstellung, nicht die Berechnung.

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
Größere CSV-Dateien können lokal über das bestehende CSV-Import-Panel getestet
werden. Fremde Datensätze sollten nur mit geklärter Lizenz oder
Nutzungsfreigabe in ein öffentliches Repository aufgenommen werden. Der Import
benötigt weiterhin nur die Spalten `date,close`.

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

## Was beim CSV-Import geprüft wird

Beim lokalen CSV-Import prüft die App den exakten Header `date,close`, gültige
Datumswerte im Format `YYYY-MM-DD`, positive endliche Schlusskurse, leere oder
fehlende Werte und doppelte Datumswerte. Nach erfolgreichem Import zeigt die App
eine kurze Zusammenfassung mit Datenquelle, Validierungsstatus, Datenpunktzahl,
Zeitraum und letztem Wert.

## Chart-Skalierung

Der Chart startet standardmäßig mit linearer Skala. Die lineare Skala zeigt
absolute Preisbewegungen. Optional kann auf logarithmische Skala gewechselt
werden; sie macht prozentuale Preisbewegungen über große Preisbereiche besser
vergleichbar. Die Y-Achse zeigt mehrere aus dem aktuellen Datenbereich
berechnete Preisstufen. Bei großen CSV-Dateien reduziert der Chart automatisch
Punktmarker und zeigt eine ruhigere Linie. In der Log-Skala werden ungültige
Nullwerte auf der Y-Achse vermieden.

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
- Keine Live-Daten und keine API
- Keine Speicherung importierter CSV-Dateien
- Große lokale CSV-Dateien bleiben aus Lizenzgründen ungetrackt
- Keine Prognosefunktion
- Keine Berücksichtigung von On-Chain-Daten, Makrodaten oder Liquiditätsdaten
- Chart dient aktuell der methodischen Visualisierung

## Nächste mögliche Ausbaustufen

- Lizenz-/Quellenklärung für große BTC-CSV-Dateien
- Bessere CSV-Datenprüfung und Import-Hilfen
- Zyklusvergleich nach Halving
- Export/Share-Snapshot
- Echte historische BTC-Tagesdaten aus geklärter Quelle
- Optional spätere API-Anbindung
