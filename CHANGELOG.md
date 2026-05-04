# Changelog

Alle nennenswerten Änderungen am BTC Cycle Compass werden in dieser Datei
dokumentiert.

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
