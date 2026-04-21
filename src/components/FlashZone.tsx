import { useEffect, useState } from 'react'
import styles from './FlashZone.module.css'

function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return { h, m, s }
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className={styles.digit}>
      <span className={styles.digitVal}>{String(value).padStart(2, '0')}</span>
      <span className={styles.digitLabel}>{label}</span>
    </div>
  )
}

const TICKER_ITEMS = [
  'FLASH DROP: ALL TROLLEY BAGS FLAT 60% OFF',
  'DON\'T MISS OUT',
  'LIMITED STOCK — ENDS SOON',
  'FREE SHIPPING ON ORDERS ABOVE ₹999',
  'USE CODE HYPE20 FOR EXTRA 20% OFF',
  'FLASH DROP: ALL TROLLEY BAGS FLAT 60% OFF',
  'DON\'T MISS OUT',
  'LIMITED STOCK — ENDS SOON',
  'FREE SHIPPING ON ORDERS ABOVE ₹999',
  'USE CODE HYPE20 FOR EXTRA 20% OFF',
]

export default function FlashZone() {
  const { h, m, s } = useCountdown(3 * 3600 + 45 * 60 + 12)

  return (
    <section className={styles.section}>
      <div className={styles.stripes} aria-hidden="true" />

      <div className={styles.ticker}>
        <div className={styles.tickerInner}>
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className={styles.tickerItem}>
              <span className={styles.tickerDot} />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.mainInner}>
          <div className={styles.left}>
            <span className={styles.badge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)" stroke="none">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              FLASH ZONE
            </span>
            <h2 className={styles.headline}>
              ALL TROLLEY BAGS<br />
              <span className={styles.headlineOff}>FLAT 60% OFF</span>
            </h2>
            <p className={styles.sub}>Biggest deal of the week. Use code <strong className={styles.code}>HYPE60</strong></p>
            <button className={styles.cta}>
              GRAB THE DEAL NOW
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <div className={styles.timer}>
            <span className={styles.timerLabel}>DEAL ENDS IN</span>
            <div className={styles.countdown}>
              <Digit value={h} label="HRS" />
              <span className={styles.colon}>:</span>
              <Digit value={m} label="MIN" />
              <span className={styles.colon}>:</span>
              <Digit value={s} label="SEC" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
