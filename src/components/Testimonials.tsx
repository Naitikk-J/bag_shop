import { useEffect, useState } from 'react'
import { supabase, type Testimonial } from '../lib/supabase'
import styles from './Testimonials.module.css'

const FALLBACK: Testimonial[] = [
  { id: '1', username: '@priya_styles', display_name: 'Priya S.', avatar_url: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg', rating: 5, content: "This bag is fire! Can't believe I got it for this price. Quality is actually insane for what I paid. #CheapBagHouse", product_name: 'Urban Street Backpack', created_at: '' },
  { id: '2', username: '@rahul_vibes', display_name: 'Rahul K.', avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', rating: 5, content: 'Bro the trolley bag I ordered is literally premium. My whole family thought I spent 5k. Paid 1.6k lmao 💀', product_name: 'Pro Trolley 24"', created_at: '' },
  { id: '3', username: '@sneha_drops', display_name: 'Sneha M.', avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', rating: 5, content: 'Ordered at night, received next day. The tote is so aesthetic!! Already getting compliments at college everyday fr', product_name: 'Slim College Tote', created_at: '' },
  { id: '4', username: '@arjun_hype', display_name: 'Arjun T.', avatar_url: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg', rating: 5, content: 'Skeptical at first ngl. But this crossbody is built different. Zippers smooth, material thick. W store fr', product_name: 'Everyday Crossbody', created_at: '' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? 'var(--gold)' : 'none'} stroke="var(--gold)" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK)

  useEffect(() => {
    supabase.from('testimonials').select('*').order('created_at').then(({ data }) => {
      if (data && data.length > 0) setTestimonials(data)
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>SQUAD GOALS</span>
          <h2 className={styles.title}>THE STREETS <span className={styles.titleAccent}>SPEAKING</span></h2>
          <p className={styles.sub}>Real customers. Real bags. Real savings.</p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={t.id} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.cardTop}>
                <div className={styles.platform}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent-crimson)">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="1.5"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="#fff"/>
                  </svg>
                  <span>Instagram</span>
                </div>
                <StarRating rating={t.rating} />
              </div>

              <p className={styles.content}>"{t.content}"</p>

              <div className={styles.cardBottom}>
                <img
                  src={`${t.avatar_url}?auto=compress&cs=tinysrgb&w=80`}
                  alt={t.display_name}
                  className={styles.avatar}
                />
                <div className={styles.userInfo}>
                  <span className={styles.displayName}>{t.display_name}</span>
                  <span className={styles.username}>{t.username}</span>
                </div>
                {t.product_name && (
                  <span className={styles.productTag}>{t.product_name}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
