const notes = [
  {
    title: 'ATH richtig lesen',
    text:
      'Das ATH ist der höchste Schlusskurs im aktuell geladenen Datensatz. ' +
      'Es ist ein historischer Vergleichspunkt, kein Zielwert und keine Aussage über die Zukunft.',
  },
  {
    title: 'Drawdown richtig einordnen',
    text:
      'Der Drawdown zeigt, wie weit der letzte Schlusskurs prozentual unter dem ATH liegt. ' +
      'Er beschreibt den Abstand zum bisherigen Hoch innerhalb der geladenen Daten.',
  },
  {
    title: 'Weg zurück zum ATH verstehen',
    text:
      'Der Weg zurück zum ATH zeigt den nötigen prozentualen Anstieg vom letzten Schlusskurs bis zum ATH. ' +
      'Dieser Wert ist meist größer als der Drawdown, weil er von einem niedrigeren Ausgangspunkt startet.',
  },
  {
    title: 'Zyklusvergleich ohne Prognose',
    text:
      'Zyklusvergleiche helfen, historische Phasen einzuordnen. Sie sind keine Prognose, kein Kauf- oder Verkaufssignal und keine Anlageberatung.',
  },
]

export function MethodologyNotes() {
  return (
    <section className="content-section methodology-notes" aria-label="Methodik-Hinweise">
      <h2>Methodik-Hinweise</h2>
      <p>
        Alle Kennzahlen hängen vom aktuell geladenen Datensatz ab. Wechselst du
        von Beispieldaten zu einer lokalen CSV, können sich Zeitraum, ATH,
        Drawdown und Zyklusvergleich ändern.
      </p>
      <div className="methodology-notes__grid">
        {notes.map((note) => (
          <article className="methodology-notes__card" key={note.title}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
