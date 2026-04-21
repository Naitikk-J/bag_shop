import styles from './TrustSection.module.css'

const PILLARS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    label: 'HYPE-APPROVED QUALITY',
    desc: 'Rigorously Tested. Durability, Guaranteed.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    label: 'UNBEATABLE VALUE',
    desc: 'We Kill the Middleman to Give You These Prices.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    label: 'TRENDING DESIGNS',
    desc: 'Fresh Style Drops Every Week.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    label: 'FAST DELIVERY',
    desc: 'Pan-India Shipping in 2–4 Business Days.',
  },
]

export default function TrustSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>WHY CHOOSE US</span>
          <h2 className={styles.title}>THE <span className={styles.titleAccent}>CHEAP</span>BAGHOUSE DIFFERENCE</h2>
        </div>

        <div className={styles.grid}>
          {PILLARS.map((p, i) => (
            <div key={i} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.iconWrap}>
                {p.icon}
              </div>
              <div className={styles.text}>
                <span className={styles.label}>{p.label}</span>
                <p className={styles.desc}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
