const scaleOptions = [
  { value: 'linear', label: 'Linear' },
  { value: 'log', label: 'Logarithmisch' },
]

export function ChartScaleToggle({ value, onChange }) {
  return (
    <section className="chart-scale-toggle" aria-label="Chart-Skalierung">
      <div className="chart-scale-toggle__control">
        {scaleOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={value === option.value ? 'is-active' : ''}
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p>
        Log-Skala zeigt prozentuale Veränderungen über große Preisbereiche
        besser; bei langen BTC-Historien ist sie oft lesbarer.
      </p>
    </section>
  )
}
