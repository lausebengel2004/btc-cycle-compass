# BTC Cycle Compass - Roadmap

## Grundsatz

BTC Cycle Compass bleibt ein lokales, nüchternes Analyse-Tool für historische
Bitcoin-Zyklen. Das Projekt ist keine Prognosemaschine, kein Trading-Signal und
keine Anlageberatung.

## Aktueller Stand

Version `0.20.0` ist ein Konsolidierungsrelease. Es wurden keine neuen
Funktionen ergänzt, sondern README, Roadmap, Changelog und Meta-Kontext auf den
aktuellen Projektstand gebracht.

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

## Kurzfristig sinnvoll

- Lizenz- und Quellenklärung für große historische BTC-CSV-Dateien
- Bessere CSV-Datenprüfung und verständlichere Import-Hilfen
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
- fremde große Datensätze im öffentlichen Repository ohne Lizenzklärung
