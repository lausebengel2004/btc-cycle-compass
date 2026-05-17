# Datenquellen für historische BTC-Tagesdaten

BTC Cycle Compass arbeitet ohne Live-API. Die App erwartet, dass du historische Bitcoin-Tagesdaten als CSV lokal im Browser importierst.

## Erwartetes CSV-Format

Die App erwartet mindestens diese zwei Spalten:

```csv
date,close
2020-05-11,8756.43
2020-05-12,8815.66
```

Regeln:

- Spalte `date`: Datum im Format `YYYY-MM-DD`
- Spalte `close`: Schlusskurs als Zahl, am besten in USD
- Die Spaltennamen müssen in der Kopfzeile stehen
- Weitere Spalten sind unkritisch, solange `date` und `close` vorhanden sind
- Nutze Tagesdaten, keine Stunden- oder Minutendaten

## Mögliche Quellen

### CoinGecko

Geeignet für einfache historische Preisreihen.

1. Öffne CoinGecko und suche nach Bitcoin.
2. Gehe zum Bereich historische Daten oder exportiere die Kursdaten über die verfügbare Download-/Export-Funktion.
3. Wähle einen Tageszeitraum und möglichst USD als Währung.
4. Lade die CSV-Datei herunter.
5. Prüfe die Spaltennamen und benenne sie bei Bedarf in `date` und `close` um.

Hinweis: CoinGecko ändert seine Oberfläche gelegentlich. Entscheidend ist, dass die exportierte Datei Tagesdaten mit Datum und Schlusskurs enthält.

### Yahoo Finance

Geeignet für lange historische Tagesdaten.

1. Öffne Yahoo Finance und suche nach `BTC-USD`.
2. Gehe zu „Historical Data“ / „Historische Daten“.
3. Wähle den gewünschten Zeitraum.
4. Stelle die Frequenz auf „Daily“ / „Täglich“.
5. Klicke auf „Download“.
6. Verwende aus der Datei die Spalten `Date` und `Close` und benenne sie in `date` und `close` um.

### Kraken oder andere Börsen

Geeignet, wenn du Börsendaten einer konkreten Handelsplattform nutzen willst.

1. Suche im Kraken-Datenbereich oder bei einem seriösen Datenanbieter nach historischen BTC/USD-Tagesdaten.
2. Exportiere die Daten als CSV.
3. Achte darauf, dass es Tagesdaten sind.
4. Verwende den Schlusskurs des Tages als `close`.
5. Formatiere die CSV auf `date,close`.

## Lizenz- und Nutzungshinweise

- Für die lokale Analyse im Browser sind öffentlich exportierte Kursdaten in der Regel unproblematisch nutzbar.
- Prüfe trotzdem die Nutzungsbedingungen der jeweiligen Quelle, besonders bei kommerzieller Nutzung oder Weiterveröffentlichung.
- Lade keine fremden Rohdaten-Dateien ins öffentliche Repo hoch, wenn deren Lizenz das nicht erlaubt.
- Importierte CSV-Dateien bleiben lokal im Browser. Sie werden von der App nicht hochgeladen.
- Persönliche Portfolio-, Steuer- oder Kontodaten gehören nicht in dieses öffentliche Projekt.

## Import in BTC Cycle Compass

1. Lade eine CSV-Datei von einer Quelle deiner Wahl herunter.
2. Öffne die Datei in einer Tabellenkalkulation oder einem Texteditor.
3. Stelle sicher, dass die Datei mindestens diese Kopfzeile hat:

```csv
date,close
```

4. Prüfe das Datumsformat `YYYY-MM-DD`.
5. Speichere die Datei als CSV.
6. Öffne BTC Cycle Compass im Browser.
7. Importiere die CSV über den lokalen CSV-Import.
8. Prüfe, ob die Kennzahlen und der Chart aktualisiert werden.

## Mini-Beispiel

```csv
date,close
2024-04-19,63844.50
2024-04-20,64994.44
2024-04-21,64926.64
```
