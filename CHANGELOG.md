# Changelog

Alle nennenswerten Änderungen am BTC Cycle Compass werden in dieser Datei
dokumentiert.

## [0.19.0] - 2026-05-04

### Changed

- Zentrale USD-Formatierung für KPI-, Status-, Import- und Chart-Anzeigen.
- Positive historische Kleinstwerte werden nicht mehr als `$0` dargestellt.
- Preisformatierung betrifft nur die Anzeige, nicht die Berechnungslogik.

## [0.18.0] - 2026-05-04

### Added

- ATH-/Cycle-Max-KPI mit Datum des ersten ATH-Vorkommens.
- KPI für Drawdown vom ATH.
- KPI für den prozentualen Weg zurück zum ATH.

### Changed

- KPI-Grid für acht Karten dezent auf Desktop angepasst.

## [0.17.0] - 2026-05-04

### Changed

- Punktmarker werden bei großen Datensätzen automatisch ausgeblendet.
- Kurslinie wird bei dichten CSV-Datensätzen dünner gerendert.
- Logarithmische Y-Achse vermeidet fachlich falsche `$0`-Labels.
- Skalenhinweis für lange BTC-Historien leicht präzisiert.

## [0.16.1] - 2026-05-04

### Changed

- Große lokale CSV-Extrakte mit ungeklärter Weiterverteilung werden per
  `.gitignore` vom öffentlichen Repository ausgeschlossen.
- README-Hinweis zu lokalen Großdateien, CSV-Import und Lizenzklärung ergänzt.
- Kleine Beispiel-CSV `examples/btc-example.csv` bleibt versioniert.

## [0.16.0] - 2026-05-04

### Added

- Bereinigte lokale CSV `examples/btc-daily-clean.csv`, abgeleitet aus einer
  größeren historischen Tabelle.
- README-Hinweis zum Test der Datei über das bestehende CSV-Import-Panel.
- Hinweis, dass Datenquelle und Lizenz vor öffentlicher Repository-Nutzung
  geprüft werden müssen.

## [0.15.0] - 2026-05-04

### Added

- Mehrere datenbasierte Y-Achsen-Ticks im BTC-Chart.
- Lesbare kompakte Preislabels für lineare und logarithmische Skala.
- Import-Qualitätszusammenfassung nach erfolgreichem CSV-Import.
- Klarere CSV-Fehlermeldungen für lokale Importfehler.

## [0.14.0] - 2026-05-04

### Added

- Optionale lineare/logarithmische Y-Skalierung für den BTC-Chart.
- Dezenter Scale-Toggle in der Nähe des Charts.
- Weiterhin keine API, keine Netzwerk-Requests und keine neue Dependency.

## [0.13.0] - 2026-05-04

### Added

- Beispiel-CSV unter `examples/btc-example.csv`.
- README-Anleitung für den lokalen CSV-Import.
- Dokumentation häufiger CSV-Fehler.
- Kurzer Format-Hinweis im Import-Panel.

## [0.12.0] - 2026-05-04

### Added

- Lokaler CSV-Import im Browser mit `FileReader`.
- Temporärer Wechsel von Sample-Daten auf validierte CSV-Daten für KPIs, Chart
  und Datenquellenstatus.
- Reset zurück zu lokalen Beispieldaten.
- Weiterhin keine API, keine Netzwerk-Requests, kein Upload und keine neue
  Dependency.

## [0.11.0] - 2026-05-04

### Added

- Lokaler CSV-Parser als Vorbereitung für einen späteren CSV-Import.
- CSV-Datenvertrag für `date,close` mit anschließender bestehender
  Datenvalidierung.
- Weiterhin keine aktive API, keine Netzwerk-Requests und keine neue
  Dependency.

## [0.10.0] - 2026-05-04

### Added

- MVP-Basisabschluss mit Changelog.
- README-Abschnitte zu aktuellem MVP-Status, bekannten Grenzen und möglichen
  Ausbaustufen.
- Dokumentation, dass keine aktive API und keine Netzwerk-Requests im
  Anwendungscode vorhanden sind.

## [0.9.0] - 2026-05-04

### Added

- Minimale Interpretationskarte unterhalb des Charts.
- Sachlicher Hinweis zu lokalen Beispieldaten, historischen
  Halving-Orientierungspunkten und fehlender Prognose- oder Anlageempfehlung.

## [0.8.0] - 2026-05-04

### Added

- Sichtbarer Datenquellenstatus im UI.
- Anzeige der aktiven Datenquelle, Validierung, Datenpunktzahl, letztem
  Datenpunkt und Live-Daten-Status.

## [0.7.0] - 2026-05-04

### Added

- Datenvertrag für historische BTC-Daten.
- Validierung für ISO-Datum, positive endliche Schlusskurse, Sortierung und
  doppelte Datumswerte.

## [0.6.0] - 2026-05-04

### Added

- Zentrale Datenquellen-Konfiguration.
- BTC-Daten-Service als Vorbereitung für spätere API- oder CSV-Datenquellen.
- Weiterhin ausschließlich lokale Beispieldaten als aktive Datenquelle.

## [0.5.0] - 2026-05-04

### Added

- Chart-Legende.
- Datenhinweis zu lokalen Beispieldaten und fehlender Live-Kursquelle.

## [0.4.0] - 2026-05-04

### Added

- Halving-Markierungen im lokalen SVG-Chart.
- Dezente Halving-Kontextzonen.

## [0.3.0] - 2026-05-04

### Added

- Lokaler SVG-Linienchart aus Beispieldaten.
- Datums- und Preisskalierung ohne Chart-Bibliothek.

## [0.2.0] - 2026-05-04

### Added

- KPI-Berechnung aus lokalen BTC-Beispieldaten.
- Berechnung von BTC Close, 4-Year CAGR, Average CAGR sowie Cycle Min und Max.

## [0.1.0] - 2026-05-04

### Added

- Erste statische Vite/React-App.
- Grundstruktur für GitHub Pages.
- Startseite, KPI-Platzhalter, Chart-Platzhalter, Methodik und Disclaimer.
