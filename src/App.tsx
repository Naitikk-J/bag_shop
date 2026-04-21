import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryLaunchpad from './components/CategoryLaunchpad'
import FeaturedDrop from './components/FeaturedDrop'
import TrustSection from './components/TrustSection'
import FlashZone from './components/FlashZone'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryLaunchpad />
        <FeaturedDrop />
        <TrustSection />
        <FlashZone />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
