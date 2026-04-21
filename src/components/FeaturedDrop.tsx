import { useEffect, useState } from 'react'
import { supabase, type Product } from '../lib/supabase'
import styles from './FeaturedDrop.module.css'

const FALLBACK: Product[] = [
  { id: '1', name: 'Urban Street Backpack', category_id: '', original_price: 1499, sale_price: 749, image_url: 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg', badge_discount: '50% OFF', badge_new: false, in_stock: true, created_at: '' },
  { id: '2', name: 'Slim College Tote', category_id: '', original_price: 999, sale_price: 449, image_url: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg', badge_discount: '55% OFF', badge_new: true, in_stock: true, created_at: '' },
  { id: '3', name: 'Pro Trolley 24"', category_id: '', original_price: 3999, sale_price: 1599, image_url: 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg', badge_discount: '60% OFF', badge_new: false, in_stock: true, created_at: '' },
  { id: '4', name: 'Everyday Crossbody', category_id: '', original_price: 799, sale_price: 349, image_url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', badge_discount: '56% OFF', badge_new: true, in_stock: true, created_at: '' },
  { id: '5', name: 'Campus Rolltop', category_id: '', original_price: 1299, sale_price: 599, image_url: 'https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg', badge_discount: '54% OFF', badge_new: false, in_stock: true, created_at: '' },
  { id: '6', name: 'Weekend Duffel', category_id: '', original_price: 1799, sale_price: 799, image_url: 'https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg', badge_discount: '55% OFF', badge_new: true, in_stock: true, created_at: '' },
  { id: '7', name: 'Minimalist Messenger', category_id: '', original_price: 1199, sale_price: 499, image_url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', badge_discount: '58% OFF', badge_new: false, in_stock: true, created_at: '' },
  { id: '8', name: 'Explorer Hardcase', category_id: '', original_price: 4999, sale_price: 1999, image_url: 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg', badge_discount: '60% OFF', badge_new: true, in_stock: true, created_at: '' },
]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false)
  const savings = product.original_price - product.sale_price
  const discountPct = Math.round((savings / product.original_price) * 100)

  return (
    <div
      className={`${styles.card} ${hovered ? styles.hovered : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className={styles.imgWrap}>
        <img
          src={`${product.image_url}?auto=compress&cs=tinysrgb&w=500`}
          alt={product.name}
          className={styles.img}
        />

        <div className={styles.badges}>
          {product.badge_discount && (
            <span className={styles.badgeOff}>{product.badge_discount}</span>
          )}
          {product.badge_new && (
            <span className={styles.badgeNew}>NEW</span>
          )}
        </div>

        <div className={styles.overlay}>
          <button className={styles.quickAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            QUICK ADD TO CART
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <span className={styles.name}>{product.name}</span>
        <div className={styles.pricing}>
          <span className={styles.original}>₹{product.original_price.toLocaleString('en-IN')}</span>
          <span className={styles.sale}>₹{product.sale_price.toLocaleString('en-IN')}</span>
        </div>
        <span className={styles.save}>SAVE ₹{savings.toLocaleString('en-IN')} ({discountPct}%)</span>
      </div>
    </div>
  )
}

export default function FeaturedDrop() {
  const [products, setProducts] = useState<Product[]>(FALLBACK)

  useEffect(() => {
    supabase.from('products').select('*').order('created_at').then(({ data }) => {
      if (data && data.length > 0) setProducts(data)
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>LIMITED TIME DEALS</span>
            <h2 className={styles.title}>
              FEATURED <span className={styles.titleAccent}>DROP</span>
            </h2>
          </div>
          <button className={styles.viewAll}>
            VIEW ALL DEALS
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className={styles.grid}>
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
