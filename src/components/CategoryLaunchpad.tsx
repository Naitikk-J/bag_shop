import { useEffect, useState } from 'react'
import { supabase, type Category } from '../lib/supabase'
import styles from './CategoryLaunchpad.module.css'

const FALLBACK: Category[] = [
  { id: '1', name: 'College Bags', slug: 'college-bags', starting_price: 299, image_url: 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg', created_at: '' },
  { id: '2', name: 'Trolley Bags', slug: 'trolley-bags', starting_price: 899, image_url: 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg', created_at: '' },
  { id: '3', name: 'Backpacks', slug: 'backpacks', starting_price: 399, image_url: 'https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg', created_at: '' },
  { id: '4', name: 'Tote Bags', slug: 'tote-bags', starting_price: 199, image_url: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg', created_at: '' },
  { id: '5', name: 'Handbags', slug: 'handbags', starting_price: 499, image_url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', created_at: '' },
]

export default function CategoryLaunchpad() {
  const [categories, setCategories] = useState<Category[]>(FALLBACK)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    supabase.from('categories').select('*').order('created_at').then(({ data }) => {
      if (data && data.length > 0) setCategories(data)
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>SHOP BY CATEGORY</span>
          <h2 className={styles.title}>FIND YOUR <span className={styles.titleAccent}>DROP</span></h2>
        </div>

        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              className={`${styles.card} ${hoveredId === cat.id ? styles.hovered : ''}`}
              onMouseEnter={() => setHoveredId(cat.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={styles.cardGlass}>
                <div className={styles.imgWrap}>
                  <img
                    src={`${cat.image_url}?auto=compress&cs=tinysrgb&w=400`}
                    alt={cat.name}
                    className={styles.img}
                  />
                </div>

                <div className={styles.cardContent}>
                  <span className={styles.cardName}>{cat.name.toUpperCase()}</span>
                  <span className={styles.cardPrice}>
                    Starting at <strong className={styles.priceVal}>₹{cat.starting_price}</strong>
                  </span>
                </div>

                <div className={styles.borderTrace} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
