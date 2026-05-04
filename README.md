# BTC Cycle Compass

Eine schlanke, statische React/Vite-Web-App für ein öffentlich teilbares
Bitcoin-4-Jahres-Zyklus-Dashboard.

Version 0.6.0 bereitet die Datenquellen technisch zentral vor. Aktuell nutzt
die App weiterhin lokale Beispieldaten und keine Live-Marktdaten.

## Data Source Architecture

Aktuell nutzt die App lokale Beispieldaten. Die aktive Datenquelle ist zentral
über `src/config/dataSource.js` vorbereitet. Eine echte API- oder CSV-Anbindung
ist für spätere Versionen vorgesehen.

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
