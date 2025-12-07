import Amenities from '@/shared/components/Amenities'
import Events from '@/shared/components/Events'
import Footer from '@/shared/components/Footer'
import Header from '@/shared/components/Header'
import Hero from '@/shared/components/Hero'
import Location from '@/shared/components/Location'
import Promotions from '@/shared/components/Promotions'
import Restaurant from '@/shared/components/Restaurant'
import Rooms from '@/shared/components/Rooms'
import Testimonials from '@/shared/components/Testimonials'
import Welcome from '@/shared/components/Welcome'
import { Contact } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Welcome />
        <Rooms />
        <Amenities />
        <Promotions />
        <Restaurant />
        <Events />
        <Location />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
