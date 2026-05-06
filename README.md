# BTC Cycle Compass

Eine schlanke, statische React/Vite-Web-App für ein öffentlich teilbares
Bitcoin-4-Jahres-Zyklus-Dashboard.

Aktueller Stand: Version 0.23.0. Die App startet mit lokalen Beispieldaten,
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

Zusätzliche Methodik-Hinweise in der App erklären, wie ATH, Drawdown, Weg
zurück zum ATH und Zyklusvergleich sachlich gelesen werden. Alle Aussagen
hängen vom aktuell geladenen Datensatz ab. Die Hinweise sind keine Prognose,
keine Anlageberatung und kein Kauf- oder Verkaufssignal.

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

Der lokale CSV-Import benötigt mindestens die Spalten `date` und `close`.
Groß-/Kleinschreibung, Leerzeichen um Headernamen und die Spaltenreihenfolge
sind egal. Zusätzliche Spalten dürfen vorhanden sein und werden ignoriert.
Das Datum muss im Format `YYYY-MM-DD` vorliegen. `close` muss eine positive
Zahl sein; Dezimalpunkte sind möglich, Dezimalkommas werden nicht unterstützt.
CSV-Daten werden nur lokal im Browser verarbeitet, nicht hochgeladen und nicht
gespeichert. Es gibt weiterhin keine API und keine Live-Datenquelle.

## Optionale historische BTC-Daten

Für längere historische Analysen können Nutzer externe BTC-Datensätze selbst
exportieren und lokal importieren. Eine mögliche externe Quelle ist
CoinCheckup Bitcoin Historical Data. BTC Cycle Compass verteilt keine
vollständigen externen Fremd-CSV-Dateien im öffentlichen Repository.

Der Import benötigt weiterhin nur dieses Format:

```csv
date,close
2013-04-28,134.21
2013-04-29,144.54
```

Dabei gilt:

- Nutzer exportieren externe CSV-Dateien selbst beim jeweiligen Anbieter
- Benötigte Spalten für BTC Cycle Compass: `date` und `close`
- Header dürfen z. B. `date,close`, `Date,Close` oder `Close,Date` lauten
- Zusätzliche Spalten werden ignoriert
- `date` im Format `YYYY-MM-DD`
- `close` als positive Zahl mit Dezimalpunkt
- CSV-Dateien werden lokal im Browser verarbeitet
- Kein Upload
- Keine Speicherung
- Kein Serverkontakt
- Externe Datenquellen unterliegen den Nutzungsbedingungen des jeweiligen
  Anbieters
- Vollständige externe Datensätze werden nicht im öffentlichen Repo verteilt

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

- Header muss die Spalten `date` und `close` eindeutig enthalten
- Groß-/Kleinschreibung, Leerzeichen und Spaltenreihenfolge sind egal
- Zusätzliche Spalten werden ignoriert
- Datum im Format `YYYY-MM-DD`
- `close` als positive Zahl
- Dezimalpunkt erlaubt
- Dezimalkomma nicht unterstützt
- Leere Zeilen werden ignoriert
- Exakte doppelte Datumszeilen werden entfernt; der erste gültige Eintrag
  bleibt erhalten
- Doppelte Datumswerte mit unterschiedlichen Schlusskursen erzeugen einen
  Datenkonflikt und brechen den Import ab
- Ungültige Daten erzeugen eine Fehlermeldung

## Häufige CSV-Fehler

- Fehlende Pflichtspalte, z. B. `Date,Price`
- Mehrfach vorhandene Pflichtspalte, z. B. `date,date,close` oder
  `date,close,close`
- Deutsches Dezimalkomma, z. B. `7200,50`
- Fehlendes Datum
- Negativer oder leerer Close-Wert
- Falsches Datumsformat, z. B. `01.01.2020`

## Was beim CSV-Import geprüft wird

Beim lokalen CSV-Import erkennt die App die Pflichtspalten `date` und `close`
tolerant, prüft gültige Datumswerte im Format `YYYY-MM-DD`, positive endliche
Schlusskurse, leere oder fehlende Werte und doppelte Datumswerte. Exakte
Duplikate werden entfernt; bei demselben Datum mit unterschiedlichen
Schlusskursen bricht der Import mit einem Datenkonflikt ab. Die finalen Daten
werden aufsteigend nach Datum sortiert. Nach erfolgreichem Import zeigt die App
Dateiname, gelesene Datenzeilen, importierte Datenpunkte, ignorierte Leerzeilen,
entfernte Duplikate, Sortierhinweis, Zeitraum, letzten Schlusskurs, erkannte
Spaltenzuordnung und eine kleine Datenvorschau.

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
- Methodik-Hinweise erklären nur die Lesart bestehender Kennzahlen
- Große lokale CSV-Dateien bleiben aus Lizenzgründen ungetrackt
- Keine Prognosefunktion
- Keine Berücksichtigung von On-Chain-Daten, Makrodaten oder Liquiditätsdaten
- Chart dient aktuell der methodischen Visualisierung

## Nächste mögliche Ausbaustufen

- Weitere Datenquellen-Dokumentation
- Zyklusvergleich nach Halving
- Export/Share-Snapshot
- Weitere Hinweise zu extern exportierten historischen BTC-Tagesdaten
- Optional spätere API-Anbindung
