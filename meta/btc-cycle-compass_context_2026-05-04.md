---
tags: [projekt, bitcoin, analyse, tool, kontext, codex, claude]
status: aktiv
erstellt: 2026-05-04
aktualisiert: 2026-05-04
projekt: "BTC Cycle Compass"
workspace: "C:/Users/User/Projekte/btc-cycle-compass"
repository: "lausebengel2004/btc-cycle-compass"
github_pages: "https://lausebengel2004.github.io/btc-cycle-compass/"
aktuelle_version: "0.20.0"
---

# BTC Cycle Compass - Kontextübergabe 2026-05-04

## Zweck

Diese Datei ist die kompakte Übergabe für neue ChatGPT-Gespräche, Codex,
Claude, Obsidian oder spätere Projektfortsetzungen.

## Projektziel

BTC Cycle Compass ist eine statische, öffentlich teilbare Vite/React-App zur
nüchternen Visualisierung historischer Bitcoin-Zyklen. Die App zeigt lokale
BTC-Schlusskurse, KPI-Kennzahlen, Halving-Markierungen und methodische Hinweise.
Sie ist kein Prognosewerkzeug und keine Anlageberatung.

## Aktueller Versionsstand

Aktuelle Version: `0.20.0`

`0.20.0` ist ein reines Konsolidierungsrelease. Es wurden keine Funktionen,
keine UI-Flächen, keine Dependencies und keine Datenquellen ergänzt. README,
ROADMAP, CHANGELOG und diese Kontextdatei wurden auf den aktuellen Stand nach
`0.19.0` gebracht.

## Technischer Status

| Bereich | Stand |
|---|---|
| Frontend | Vite + React |
| Hosting | GitHub Pages vorbereitet |
| Standarddaten | lokale Beispieldaten |
| CSV-Import | lokal im Browser per `FileReader` |
| Chart | eigener SVG-Chart |
| Skalen | linear und logarithmisch |
| KPIs | CAGR, Cycle Min, ATH/Cycle Max, Drawdown, Weg zurück zum ATH |
| Datenstatus | sichtbare Datenquellen- und Validierungsinformationen |
| API | nicht aktiv |
| Netzwerkzugriffe im `src`-Code | keine |
| Neue Dependencies | keine |
| Speicherung importierter CSVs | keine |

## Abgeschlossene Releases

- `0.1.0`: Vite/React-Grundstruktur, Startseite, KPI- und Chart-Platzhalter.
- `0.2.0`: KPI-Berechnung aus lokalen BTC-Beispieldaten.
- `0.3.0`: Lokaler SVG-Linienchart ohne Chart-Bibliothek.
- `0.4.0`: Halving-Events, vertikale Linien und dezente Kontextzonen.
- `0.5.0`: Chart-Legende und Datenhinweis.
- `0.6.0`: Zentrale Datenquellen-Konfiguration und Datenservice.
- `0.7.0`: Datenvertrag und Validierung für historische BTC-Daten.
- `0.8.0`: Sichtbarer Datenquellenstatus im UI.
- `0.9.0`: Interpretationskarte ohne Prognose- oder Anlageaussage.
- `0.10.0`: Technischer MVP-Basisabschluss mit Changelog und README-Struktur.
- `0.11.0`: Lokaler CSV-Parser als Vorbereitung für Importdaten.
- `0.12.0`: Lokaler CSV-Import im Browser, temporärer Datenwechsel und Reset.
- `0.13.0`: Beispiel-CSV und README-Anleitung für CSV-Import.
- `0.14.0`: Umschaltung zwischen linearer und logarithmischer Chart-Skala.
- `0.15.0`: Verbesserte Y-Achsen-Ticks und Import-Qualitätsanzeige.
- `0.16.0`: Große historische Excel-Tabelle lokal in saubere CSV umgewandelt.
- `0.16.1`: Große CSV aus Lizenzgründen aus dem Git-Tracking ausgeschlossen.
- `0.17.0`: Chart-Lesbarkeit für große CSV-Datensätze verbessert.
- `0.18.0`: ATH-/Drawdown-KPIs in den bestehenden KPI-Bereich integriert.
- `0.19.0`: Zentrale Preisformatierung für sehr kleine historische BTC-Werte.
- `0.20.0`: Dokumentations-, Roadmap- und Meta-Kontext-Konsolidierung.

## Wichtige Dateien

```text
src/App.jsx
src/components/BtcCycleChart.jsx
src/components/ChartLegend.jsx
src/components/ChartScaleToggle.jsx
src/components/CsvImportPanel.jsx
src/components/CycleInterpretation.jsx
src/components/DataSourceStatus.jsx
src/config/dataSource.js
src/data/btcHistoricalSample.js
src/data/halvingEvents.js
src/data/kpis.js
src/services/btcDataService.js
src/utils/chartUtils.js
src/utils/csvParser.js
src/utils/dataValidation.js
src/utils/formatters.js
examples/btc-example.csv
README.md
ROADMAP.md
CHANGELOG.md
```

## Daten und CSV-Import

Die App startet weiterhin mit lokalen Sample-Daten. Nutzer können eine CSV-Datei
im Format `date,close` auswählen. Die Datei wird nur lokal im Browser gelesen,
validiert und temporär im React-State verwendet. Es gibt keinen Upload, keine
Speicherung und keinen Serverkontakt.

Die kleine Datei `examples/btc-example.csv` bleibt als harmlose Beispiel-CSV im
Repository.

Die größere Datei `examples/btc-daily-clean.csv` wurde lokal aus einer größeren
historischen Tabelle abgeleitet, bleibt aber wegen ungeklärter Lizenz- und
Nutzungsrechte lokal und wird per `.gitignore` nicht getrackt.

## Bewusste Grenzen

- keine Live-Daten
- keine API-Anbindung
- keine aktiven Netzwerk-Requests
- keine Speicherung importierter CSV-Dateien
- keine Kauf- oder Verkaufssignale
- keine Preisprognosen
- keine fremden großen Datensätze im öffentlichen Repository ohne Lizenzklärung
- keine Berücksichtigung von On-Chain-, Makro- oder Liquiditätsdaten

Diese Grenzen sind Teil des MVP-Designs und keine offenen Bugs.

## Nächste sinnvolle Schritte

Kurzfristig sinnvoll:

- Lizenz- und Quellenklärung für große historische BTC-CSV-Dateien
- bessere CSV-Datenprüfung und verständlichere Import-Hilfen
- kurze methodische Hinweise zu ATH, Drawdown und Zyklusvergleich
- optional Export- oder Notizfunktion für lokale Analyse-Snapshots

Später möglich:

- Vergleich mehrerer Halving-Zyklen
- Zyklusansicht nach Tagen seit Halving
- kuratierte historische BTC-Tagesdaten aus geklärter Quelle
- optionale API-Anbindung nach bewusster Architekturentscheidung

Nicht Teil des aktuellen MVP:

- Live-API
- automatische Kursaktualisierung
- Preisprognosen
- Trading-Signale
- automatische Speicherung importierter CSVs

## Arbeitsregel für Folgeversionen

Bei jeder neuen Version:

1. bestehende Struktur prüfen
2. minimal implementieren
3. README und CHANGELOG aktualisieren
4. Version in `package.json` und `package-lock.json` erhöhen
5. `npm run build` ausführen
6. im `src`-Code auf aktive Netzwerkzugriffe prüfen:
   `fetch`, `XMLHttpRequest`, `axios`, `WebSocket`, `http://`, `https://`

## Kurzbriefing für neue Chats

```text
Du unterstützt mich beim Projekt BTC Cycle Compass.

Aktueller Stand: v0.20.0. Die App ist eine statische Vite/React-App für GitHub
Pages. Sie startet mit lokalen Beispieldaten, unterstützt lokalen CSV-Import per
FileReader, zeigt KPIs inklusive ATH/Drawdown, einen SVG-Chart mit linearer und
logarithmischer Skala, Halving-Markierungen, Datenquellenstatus, Legende und
Interpretationskarte.

Wichtig: keine API, keine Netzwerkrequests, keine neue Dependency, keine
Speicherung importierter CSVs. Die große Datei examples/btc-daily-clean.csv
bleibt lokal und wird nicht getrackt. Öffentliche Beispieldatei ist
examples/btc-example.csv.
```
