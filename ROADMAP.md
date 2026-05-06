# BTC Cycle Compass - Roadmap

## Grundsatz

BTC Cycle Compass bleibt ein lokales, nüchternes Analyse-Tool für historische
Bitcoin-Zyklen. Das Projekt ist keine Prognosemaschine, kein Trading-Signal und
keine Anlageberatung.

## Aktueller Stand

Version `0.22.0` verbessert die lokale CSV-Datenprüfung. Der Import erkennt
Header toleranter, ignoriert Zusatzspalten, entfernt doppelte Datumswerte
kontrolliert, sortiert final chronologisch und zeigt eine ausführlichere
Import-Zusammenfassung mit kleiner Datenvorschau.

Die App ist aktuell:

- eine statische Vite/React-App für GitHub Pages
- standardmäßig auf lokale Beispieldaten eingestellt
- für lokalen CSV-Import per `FileReader` vorbereitet und nutzbar
- ohne API, ohne Live-Daten, ohne Upload und ohne Speicherung importierter CSVs

## Abgeschlossen

- MVP-Basis bis `0.10.0`
- Lokale Datenarchitektur mit Sample-Daten und Datenservice
- Datenvalidierung für `date,close`
- Lokaler CSV-Parser und CSV-Import im Browser
- README-Anleitung und kleine Beispiel-CSV
- SVG-Chart mit Halving-Markierungen und Halving-Kontextzonen
- Lineare/logarithmische Chart-Skalierung
- Import-Qualitätsanzeige
- Optimierte Chart-Darstellung für große CSV-Datensätze
- ATH-/Drawdown-KPIs im bestehenden KPI-Bereich
- Zentrale Preisformatierung für kleine historische BTC-Werte
- Lizenzhygiene für große lokale CSV-Dateien
- Lizenz-/Quellenklärung für externe historische BTC-CSV-Dateien: geklärt
  für lokale Nutzung durch Nutzerexport, keine Veröffentlichung vollständiger
  Fremd-CSV-Dateien im öffentlichen Repository
- Verbesserte CSV-Datenprüfung mit flexibler Header-Erkennung,
  Duplikatbereinigung, Sortierhinweis, Import-Metadaten und Datenvorschau

## Kurzfristig sinnvoll

- Datenquellen-Dokumentation für externe historische BTC-CSV-Exporte
- Kurze methodische Hinweise zu ATH, Drawdown und Zyklusvergleich
- Optional: Export- oder Notizfunktion für lokale Analyse-Snapshots

## Später möglich

- Vergleich mehrerer Halving-Zyklen
- Zyklusansicht nach Tagen seit Halving
- Geklärte historische BTC-Tagesdaten als kuratierte Datenbasis
- Optional spätere Live-Datenquelle oder API-Anbindung
- Optional lokale Persistenz, falls bewusst entschieden

## Bewusst nicht Teil des aktuellen MVP

- Live-API
- automatische Kursaktualisierung
- Kauf- oder Verkaufssignale
- Preisprognosen
- Speicherung importierter CSV-Dateien
- vollständige fremde CSV-Datensätze im öffentlichen Repository
