/*
  # CheapBagHouse Schema

  ## Tables
  - `categories`: Bag categories (College, Trolley, Backpack, Tote, Handbag)
  - `products`: Product listings with pricing, badges, and category links
  - `testimonials`: Customer reviews with social-style format

  ## Security
  - RLS enabled on all tables
  - Public read access for all (storefront data)
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  starting_price integer NOT NULL DEFAULT 299,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category_id uuid REFERENCES categories(id),
  original_price integer NOT NULL,
  sale_price integer NOT NULL,
  image_url text NOT NULL,
  badge_discount text,
  badge_new boolean DEFAULT false,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  display_name text NOT NULL,
  avatar_url text,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  content text NOT NULL,
  product_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed categories
INSERT INTO categories (name, slug, starting_price, image_url) VALUES
  ('College Bags', 'college-bags', 299, 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg'),
  ('Trolley Bags', 'trolley-bags', 899, 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg'),
  ('Backpacks', 'backpacks', 399, 'https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg'),
  ('Tote Bags', 'tote-bags', 199, 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg'),
  ('Handbags', 'handbags', 499, 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg')
ON CONFLICT (slug) DO NOTHING;

-- Seed products
INSERT INTO products (name, original_price, sale_price, image_url, badge_discount, badge_new) VALUES
  ('Urban Street Backpack', 1499, 749, 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg', '50% OFF', false),
  ('Slim College Tote', 999, 449, 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg', '55% OFF', true),
  ('Pro Trolley 24"', 3999, 1599, 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg', '60% OFF', false),
  ('Everyday Crossbody', 799, 349, 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', '56% OFF', true),
  ('Campus Rolltop', 1299, 599, 'https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg', '54% OFF', false),
  ('Weekend Duffel', 1799, 799, 'https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg', '55% OFF', true),
  ('Minimalist Messenger', 1199, 499, 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', '58% OFF', false),
  ('Explorer Hardcase', 4999, 1999, 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg', '60% OFF', true)
ON CONFLICT DO NOTHING;

-- Seed testimonials
INSERT INTO testimonials (username, display_name, avatar_url, rating, content, product_name) VALUES
  ('@priya_styles', 'Priya S.', 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg', 5, 'This bag is fire! Can''t believe I got it for this price. Quality is actually insane for what I paid. #CheapBagHouse', 'Urban Street Backpack'),
  ('@rahul_vibes', 'Rahul K.', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', 5, 'Bro the trolley bag I ordered is literally premium. My whole family thought I spent 5k. Paid 1.6k lmao 💀', 'Pro Trolley 24"'),
  ('@sneha_drops', 'Sneha M.', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', 5, 'Ordered at night, received next day. The tote is so aesthetic!! Already getting compliments at college everyday fr', 'Slim College Tote'),
  ('@arjun_hype', 'Arjun T.', 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg', 5, 'Skeptical at first ngl. But this crossbody is built different. Zippers smooth, material thick. W store fr', 'Everyday Crossbody')
ON CONFLICT DO NOTHING;
