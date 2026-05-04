---
tags: [projekt, bitcoin, analyse, tool, kontext, codex, claude]
status: aktiv
erstellt: 2026-05-04
aktualisiert: 2026-05-04
projekt: "BTC Cycle Compass"
workspace: "C:/Users/User/Projekte/btc-cycle-compass"
repository: "lausebengel2004/btc-cycle-compass"
github_pages: "https://lausebengel2004.github.io/btc-cycle-compass/"
aktuelle_version: "0.17.0"
---

# BTC Cycle Compass – Kontextübergabe 2026-05-04

## 1. Zweck dieser Datei

Diese Datei ist die kompakte Kontextübergabe für:

- mein Zweites Gehirn / Obsidian
- neue ChatGPT-Chats
- Claude in VS Code
- Codex
- spätere Projektfortsetzung

Sie beschreibt den aktuellen Projektstand, die wichtigsten technischen Entscheidungen, die bisher umgesetzten Versionen und den nächsten sinnvollen Entwicklungsschritt.

---

## 2. Projektziel

**BTC Cycle Compass** ist ein lokales, statisches Analyse-Tool für Bitcoin-Marktzyklen.

Ziel ist es, Bitcoin im Kontext historischer 4-Jahres-Zyklen visuell verständlich zu machen:

- BTC-Schlusskurse darstellen
- Halving-Ereignisse sichtbar machen
- wichtige Kennzahlen berechnen
- Datenquellen transparent anzeigen
- lokale CSV-Daten testweise importieren
- ohne Hype, ohne Prognoseversprechen, ohne Anlageempfehlung

Die Grundhaltung des Tools ist nüchtern, methodisch und erklärend.

---

## 3. Aktueller Status

| Bereich | Stand |
|---|---|
| Aktuelle Version | `0.17.0` |
| MVP-Basis | abgeschlossen seit `0.10.0` |
| CSV-Import | lokal im Browser aktiv |
| Große historische CSV | lokal nutzbar, aber nicht im Git-Tracking |
| Chart | SVG, eigene Implementierung |
| Skalen | linear und logarithmisch |
| Datenquelle Standard | lokale Beispieldaten |
| Live-Daten | nicht aktiv |
| API | nicht aktiv |
| Netzwerkzugriffe im `src`-Code | keine |
| Neue Dependencies | keine |
| Deployment | GitHub Pages |
| Commit + Push | bis `0.17.0` erfolgt |

---

## 4. Technische Leitentscheidung

Das Tool bleibt im MVP bewusst lokal, statisch und nachvollziehbar.

### Gilt weiterhin:

- keine API-Anbindung
- keine aktiven Netzwerk-Requests
- kein `fetch`
- kein `XMLHttpRequest`
- kein `axios`
- kein `WebSocket`
- keine HTTP-/HTTPS-URLs im `src`-Code
- keine neuen Dependencies
- keine Speicherung importierter CSV-Daten
- kein Upload
- kein Serverkontakt
- CSV-Dateien werden nur lokal im Browser verarbeitet

Diese Begrenzung ist **Absicht, nicht Lücke**.

Der CSV-Import dient als sauberer Zwischenschritt, bevor später optional über echte Datenquellen, APIs oder automatisierte Datenpflege entschieden wird.

---

## 5. Stack und Architektur

| Komponente | Umsetzung |
|---|---|
| Frontend | Vite + React |
| Chart | SVG, eigene Implementierung |
| Styling | zentrale `styles.css` |
| Daten | lokale Sample-Daten + optionaler lokaler CSV-Import |
| Validierung | eigener Datenvertrag |
| Hosting | GitHub Pages |
| Versionierung | Git / GitHub |
| Package-Version | über `package.json` und `package-lock.json` |

---

## 6. Aktive Datenarchitektur

### Standarddaten

Die App startet mit lokalen Beispieldaten.

Wichtige Datei:

```text
src/data/btcHistoricalSample.js
```

Diese wird nicht direkt überall importiert, sondern über den zentralen Datenservice bereitgestellt.

### Datenservice

```text
src/services/btcDataService.js
```

Der Datenservice stellt bereit:

- historische Sample-Daten
- Datenquellenstatus
- Status für importierte CSV-Daten

### Datenquellen-Konfiguration

```text
src/config/dataSource.js
```

Aktuell aktiv:

```text
sample
```

Vorbereitet, aber nicht aktiv:

```text
api
csv
```

### Datenvalidierung

```text
src/utils/dataValidation.js
```

Der Datenvertrag verlangt:

- ISO-Datum im Format `YYYY-MM-DD`
- positiver, endlicher `close`-Wert
- sortierte Daten
- keine doppelten Datumswerte
- klare Fehler bei ungültigen Daten

---

## 7. CSV-Import

Der CSV-Import ist seit `0.12.0` funktional.

### Dateien

```text
src/utils/csvParser.js
src/components/CsvImportPanel.jsx
```

### Erwartetes CSV-Format

```csv
date,close
2020-01-01,7200
2021-01-01,29300
```

### Verhalten

- Datei wird lokal per `FileReader` gelesen
- keine Datei wird hochgeladen
- keine Datei wird gespeichert
- Daten werden geparst
- Daten laufen durch die bestehende Validierung
- bei Erfolg ersetzen sie temporär die aktiven Daten im React-State
- KPIs, Chart und Datenstatus nutzen danach die importierten Daten
- Reset setzt zurück auf die lokalen Beispieldaten

### Beispiel-Datei im Repository

```text
examples/btc-example.csv
```

Diese Datei bleibt öffentlich getrackt.

---

## 8. Große historische CSV / Excel-Daten

Die ursprüngliche große Datentabelle stammte aus einer Excel-Datei:

```text
BTC Daily.xlsx
```

Quelle laut Projektverlauf:

```text
RichLife Nino
https://docs.google.com/spreadsheets/d/1I9fySCqzIMFXCvJvvspUUzXYDKRJnj8r1Dh6GdJ0SuE/edit?gid=0#gid=0
```

Codex hat daraus lokal eine saubere CSV erzeugt:

```text
examples/btc-daily-clean.csv
```

### Ergebnis der Aufbereitung

| Kennzahl | Wert |
|---|---|
| Übernommene Datenpunkte | `5.765` |
| Zeitraum | `2010-07-17` bis `2026-04-28` |
| Ungültige Zeilen | `0` |
| Doppelte Datumswerte | `3`, wurden nicht erneut übernommen |
| Datumsspalte | `Start` |
| Kursspalte | `Close` |

### Wichtige Entscheidung

Die Datei `examples/btc-daily-clean.csv` bleibt **lokal** und wird **nicht getrackt**.

Grund:

- Datenquelle/Lizenz noch nicht abschließend geprüft
- keine fremden großen Datenbestände öffentlich ins Repository legen
- öffentlich bleibt nur die kleine Beispiel-CSV

Dafür wurde `.gitignore` angepasst.

---

## 9. UI-Stand

Aktuell sichtbar im Tool:

- großer Titel „BTC Cycle Compass"
- Untertitel zur historischen 4-Jahres-Zyklus-Betrachtung
- KPI-Karten
- CSV-Import-Panel
- Datenquellenstatus
- Skalenumschalter `Linear / Logarithmisch`
- BTC-Cycle-Chart
- Halving-Linien
- Halving-Zonen
- Interpretationskarte
- Legende / Datenhinweis
- Methodikbereich

### Bestehender KPI-Bereich

Der KPI-Bereich existiert bereits und soll für weitere Marktkennzahlen erweitert werden.

Aktuell relevante KPIs:

- BTC Close
- 4-Year CAGR
- 4-Year Average CAGR
- 1-Year Average CAGR
- Cycle Min
- Cycle Max

---

## 10. Chart-Stand

### Umgesetzt

- SVG-Cycle-Chart
- datumsbasierte X-Skalierung
- lineare Y-Skalierung
- logarithmische Y-Skalierung
- 5 datenbasierte Y-Achsen-Ticks
- kompakte Tick-Labels, z. B. `$7.2K`, `$44K`, `$102K`
- Halving-Markierungen 2020 und 2024
- dezente Halving-Hintergrundzonen
- Skalenhinweis
- bei kleinen Datensätzen Punktmarker
- bei großen Datensätzen nur Kurslinie

### Performance-/Darstellungsentscheidung aus `0.17.0`

- bis `120` Datenpunkte: Punktmarker bleiben sichtbar
- über `120` Datenpunkte: nur Kurslinie
- bei großen Datensätzen: dünnere Linienvariante
- Log-Ticks bleiben strikt positiv, damit keine fachlich falschen `$0`-Labels entstehen

---

## 11. Bisherige Versionshistorie

### `0.1.0` bis `0.3.x`

Grundaufbau des Vite-/React-Projekts, erste App-Struktur, lokale Beispieldaten, KPI-Grundlogik und erste Chart-Visualisierung.

### `0.4.0`

Halving-Events ergänzt.

Wichtige Dateien:

```text
src/data/halvingEvents.js
src/utils/chartUtils.js
src/components/BtcCycleChart.jsx
src/styles.css
```

Umgesetzt:

- Halving-Linien
- Labels
- dezente Halving-Zonen
- README-Hinweis

### `0.5.0`

Legende/Datenhinweis und kleinere UI-Ergänzungen.

### `0.6.0`

Datenquellenarchitektur eingeführt.

Wichtige Dateien:

```text
src/config/dataSource.js
src/services/btcDataService.js
src/utils/dataValidation.js
```

Entscheidung:

- Sample-Daten bleiben aktiv
- API und CSV sind vorbereitet, aber nicht aktiv

### `0.7.0`

Datenvertrag verschärft.

Umgesetzt:

- ISO-Datum
- positive endliche `close`-Zahl
- Sortierung
- Duplikat-Prüfung
- Sample-Daten werden validiert/normalisiert

### `0.8.0`

Datenquellenstatus im UI ergänzt.

Neue Komponente:

```text
src/components/DataSourceStatus.jsx
```

Zeigt u. a.:

- Datenquelle
- Status
- Datenpunkte
- letzter Wert
- Live-Daten ja/nein

### `0.9.0`

Interpretationskarte ergänzt.

Neue Komponente:

```text
src/components/CycleInterpretation.jsx
```

Inhalt:

- nüchterne Erklärung der Ansicht
- Halving-Markierungen als historische Orientierungspunkte
- keine Prognose
- keine Anlageempfehlung

### `0.10.0`

Technischer MVP-Basisabschluss.

Erstellt/geändert:

```text
CHANGELOG.md
README.md
package.json
package-lock.json
```

Dokumentiert:

- MVP-Status
- bekannte Grenzen
- nächste mögliche Ausbaustufen

### `0.11.0`

Lokaler CSV-Parser ergänzt.

Neue Datei:

```text
src/utils/csvParser.js
```

Funktion:

```text
parseBtcCsv(csvText)
```

Nutzt bestehende Datenvalidierung.

### `0.12.0`

CSV-Import im UI umgesetzt.

Neue/geänderte Dateien:

```text
src/components/CsvImportPanel.jsx
src/App.jsx
src/components/BtcCycleChart.jsx
src/components/DataSourceStatus.jsx
src/data/kpis.js
src/services/btcDataService.js
src/styles.css
```

Umgesetzt:

- lokaler Import per `FileReader`
- `activeBtcData` im App-State
- CSV/Sample-Wechsel
- Reset zu Beispieldaten
- KPIs und Chart reagieren auf importierte Daten

### `0.13.0`

Import-Anleitung und Beispiel-CSV ergänzt.

Neue Datei:

```text
examples/btc-example.csv
```

README erweitert um:

- Import-Anleitung
- CSV-Formatregeln
- häufige CSV-Fehler

### `0.14.0`

Linear-/Logarithmisch-Umschalter ergänzt.

Neue Datei:

```text
src/components/ChartScaleToggle.jsx
```

Geändert:

```text
src/App.jsx
src/components/BtcCycleChart.jsx
src/utils/chartUtils.js
src/styles.css
```

Umgesetzt:

- `chartScale` State
- Standard `linear`
- Log-Skalierung über `Math.log10`
- Skaleninfo im Chart
- CSV-Daten funktionieren unabhängig vom Skalenmodus

### `0.15.0`

Chart-Qualität und CSV-Import-Qualität verbessert.

Umgesetzt:

- 5 datenbasierte Y-Achsen-Ticks
- Ticks für linear und log über denselben Skalenpfad
- kompakte Labels
- CSV-Import-Zusammenfassung:
  - Quelle
  - Status
  - Datenpunkte
  - Zeitraum
  - letzter Wert
- klarere CSV-Fehler ohne App-Crash

### `0.16.0`

Große Excel-Tabelle lokal in saubere CSV umgewandelt.

Ergebnis:

- `examples/btc-daily-clean.csv`
- 5.765 Datenpunkte
- Zeitraum 2010-07-17 bis 2026-04-28
- technisch sauber importierbar

Wichtiger Hinweis:

- Lizenz/Datenquelle vor öffentlichem Verbleib prüfen

### `0.16.1`

Große CSV bewusst vom Git-Tracking ausgeschlossen.

Umgesetzt:

- `.gitignore` angepasst
- `examples/btc-daily-clean.csv` bleibt lokal
- `examples/btc-example.csv` bleibt getrackt
- README-Hinweis zu lokalen großen CSV-Dateien und Lizenzklärung ergänzt

### `0.17.0`

Chart-Darstellung für große Datensätze verbessert.

Umgesetzt:

- Punktmarker nur bis 120 Datenpunkte
- über 120 Datenpunkte nur Kurslinie
- dünnere Stroke-Variante für große Datenmengen
- Log-Ticks strikt positiv
- Skalenhinweis präzisiert

---

## 12. Aktuelle wichtige Dateien

```text
src/App.jsx
src/components/BtcCycleChart.jsx
src/components/ChartScaleToggle.jsx
src/components/CsvImportPanel.jsx
src/components/CycleInterpretation.jsx
src/components/DataSourceStatus.jsx
src/data/btcHistoricalSample.js
src/data/halvingEvents.js
src/data/kpis.js
src/services/btcDataService.js
src/config/dataSource.js
src/utils/chartUtils.js
src/utils/csvParser.js
src/utils/dataValidation.js
src/styles.css
examples/btc-example.csv
README.md
CHANGELOG.md
package.json
package-lock.json
.gitignore
```

---

## 13. Wichtige Architekturregel

Wenn neue Funktionen ergänzt werden, sollen bestehende Strukturen weiterverwendet werden.

### Besonders wichtig:

- KPIs gehören in den bestehenden KPI-Bereich.
- Neue Datenkennzahlen sollen über bestehende Datenlogik laufen.
- Keine neue Datenquelle heimlich aktivieren.
- Keine API ohne bewusste Entscheidung.
- Keine neue Dependency ohne klaren Grund.
- README und CHANGELOG bei jeder Version aktualisieren.
- Version in `package.json` und `package-lock.json` hochziehen.
- Nach jeder Änderung `npm run build`.
- Danach Netzwerkprüfung im `src`-Code:
  - `fetch`
  - `XMLHttpRequest`
  - `axios`
  - `WebSocket`
  - `http://`
  - `https://`

---

## 14. Nächster sinnvoller Schritt: `0.18.0`

Der nächste fachlich passende Ausbau ist die Ergänzung von Drawdown-/ATH-Kennzahlen im bestehenden KPI-Bereich.

### Ziel

Im bestehenden KPI-Bereich sollen zusätzliche Kennzahlen angezeigt werden:

- aktuelles All-Time-High
- Datum des All-Time-High
- aktueller Drawdown vom ATH in Prozent
- Abstand zum ATH in USD
- optional: Abstand zum ATH in Prozent

### Warum das sinnvoll ist

Diese Kennzahlen passen sehr gut zum BTC Cycle Compass, weil sie keine Prognose darstellen, sondern den aktuellen Marktstand historisch einordnen.

Sie beantworten nüchtern:

- Wie weit ist der aktuelle Kurs vom bisherigen Hoch entfernt?
- Befindet sich BTC nahe am Hoch oder deutlich darunter?
- Wie groß ist der aktuelle Rückgang vom ATH?

Das ergänzt die Zyklusbetrachtung deutlich besser als eine Prognose.

---

## 15. Vorschlag für `0.18.0` – Auftrag an Codex

```text
Bitte setze Version 0.18.0 um.

Ziel:
Erweitere den bestehenden KPI-Bereich des BTC Cycle Compass um ATH- und Drawdown-Kennzahlen. Die neuen Kennzahlen sollen im bestehenden KPI-Grid erscheinen und keine neue große UI-Sektion eröffnen.

Fachliche Anforderungen:
- Berechne das All-Time-High aus den aktuell aktiven BTC-Daten.
- Zeige den ATH-Wert als USD-Kennzahl.
- Zeige das ATH-Datum.
- Berechne den aktuellen Drawdown vom ATH:
  Formel: ((aktueller Schlusskurs - ATH) / ATH) * 100
- Zeige den Drawdown als Prozentwert, z. B. -18.4 %.
- Berechne optional den Abstand zum ATH in USD:
  Formel: ATH - aktueller Schlusskurs
- Optional zusätzlich: Abstand zum ATH in Prozent als positiver Wert.
- Die Berechnung muss sowohl mit Sample-Daten als auch nach CSV-Import funktionieren.
- Es darf keine Prognose, keine Bewertung und keine Anlageempfehlung daraus entstehen.

Technische Anforderungen:
- Nutze die bestehende KPI-Struktur.
- Prüfe, ob die Berechnung sinnvoll in `src/utils/kpiCalculations.js` gehört.
- `src/data/kpis.js` soll weiterhin KPIs aus den aktiven Daten liefern können.
- `src/App.jsx` soll keine unnötige Berechnungslogik enthalten.
- Bestehende Komponenten nicht unnötig aufsplitten.
- Keine API.
- Kein Netzwerk-Request.
- Keine neue Dependency.
- CSV-Import darf nicht beschädigt werden.
- Lineare/logarithmische Chart-Skala bleibt unabhängig davon erhalten.
- Große lokale CSV bleibt ignoriert und darf nicht ins Git-Tracking aufgenommen werden.

Dokumentation:
- README.md um die neuen ATH-/Drawdown-KPIs ergänzen.
- CHANGELOG.md um Version 0.18.0 ergänzen.
- package.json und package-lock.json auf 0.18.0 setzen.

Qualitätssicherung:
- `npm run build` ausführen.
- Im `src`-Code erneut prüfen auf:
  - fetch
  - XMLHttpRequest
  - axios
  - WebSocket
  - http://
  - https://
- Ergebnis kurz zusammenfassen:
  - geänderte Dateien
  - neue KPIs
  - Build-Ergebnis
  - Netzwerkprüfung
  - Hinweis, dass keine neue Dependency ergänzt wurde.
```

---

## 16. Git-/Release-Regel

Nach jeder Version:

1. lokal prüfen
2. `npm run build`
3. committen
4. pushen
5. optional deployen
6. GitHub Release erstellen, wenn die Version als sauberer Meilenstein gilt

Bisheriger Arbeitsrhythmus:

- Codex setzt Version um
- Thomas prüft lokal
- wenn sichtbar/funktional korrekt: Commit + Push
- danach nächster Versionsschritt

---

## 17. GitHub-Release-Hinweis

Bis `0.15.0` wurde ein sauberer Release-Abschluss besprochen.

Für `0.16.0`, `0.16.1` und `0.17.0` gilt:

- technische Umsetzung erfolgt
- Commit + Push wurde für `0.17.0` erledigt
- bei Bedarf können Releases nachgezogen werden

Empfehlung:

- `0.17.0` als aktuellen stabilen Stand markieren
- `0.18.0` erst nach ATH-/Drawdown-KPI als nächsten fachlichen Ausbau releasen

---

## 18. Projektprinzipien

### Nüchtern vor spektakulär

Das Tool soll nicht nach Trading-Hype aussehen, sondern nach methodischer Orientierung.

### Datenklarheit vor Automatisierung

Erst lokale Daten sauber beherrschen, dann über externe Datenquellen nachdenken.

### Architektur vor Featureflut

Jede neue Funktion soll in die bestehende Struktur passen.

### Keine Prognosemaschine

BTC Cycle Compass ist kein Kursvorhersage-Tool.

### Kein Anlageberater

Das Tool zeigt historische Daten und Kennzahlen. Es gibt keine Kauf-/Verkaufsempfehlungen.

---

## 19. Kurzbriefing für neue Chats

Wenn diese Datei in einen neuen Chat geladen wird, gilt:

```text
Du unterstützt mich beim Projekt BTC Cycle Compass.

Bitte nutze diese Kontextdatei als aktuellen Projektstand. Wichtig ist:
- aktuelle Version: 0.17.0
- lokaler CSV-Import funktioniert
- große historische CSV bleibt lokal und ignoriert
- keine API, keine Netzwerkrequests, keine neue Dependency
- Chart kann linear/logarithmisch
- große Datensätze werden performanter dargestellt
- nächster sinnvoller Schritt: 0.18.0 mit ATH-/Drawdown-KPIs im bestehenden KPI-Bereich

Bitte arbeite strukturiert, dateipfadgenau und mit klaren Codex-/Claude-Aufträgen.
```

---

## 20. Offene Punkte

- [ ] `0.18.0`: ATH-/Drawdown-KPIs im bestehenden KPI-Bereich
- [ ] Entscheidung, ob `0.17.0` als offizieller GitHub Release markiert wird
- [ ] Lizenz-/Quellenklärung für die große historische Datentabelle
- [ ] später: bessere öffentliche Datenbasis oder kuratierte freie Datenquelle
- [ ] später: optional CSV-Persistenz lokal im Browser
- [ ] später: optional mehr Halving-Zyklen / frühere Halving-Events
- [ ] später: Export/Screenshot-Funktion
- [ ] später: methodische Notizen zur Interpretation von Drawdowns und Zyklen

---

## 21. Persönlicher Arbeitsstand

Das Projekt wurde am 2026-05-04 in einem kompakten Arbeitsblock stark ausgebaut.

Ausgangspunkt war ein einfaches lokales Chart-/KPI-Tool. Am Ende stand ein funktionaler, dokumentierter MVP mit:

- lokaler Datenarchitektur
- CSV-Import
- Datenvalidierung
- GitHub Pages
- Chart-Skalierung
- Halving-Kontext
- Interpretationslogik
- großen CSV-Daten lokal testbar
- sauberer Abgrenzung gegen API- und Lizenzrisiken

Das Projekt ist damit nicht nur ein Tool, sondern auch ein sauberer kleiner Proof-of-Concept für datenbewusste, lokale Finanzvisualisierung.
