import { useFeaturedProperties } from '../hooks/useProperties'
import { PropertyCard, PropertyCardSkeleton } from '../components/PropertyCard'
import {
  Search,
  Home as HomeIcon,
  Users,
  Award,
  TrendingUp,
  MapPin,
  ChevronRight,
  Star,
} from 'lucide-react'

interface HomePageProps {
  onBrowseProperties: () => void
  onSelectProperty: (id: string) => void
  onContact: () => void
}

export function HomePage({ onBrowseProperties, onSelectProperty, onContact }: HomePageProps) {
  const { properties: featuredProperties, loading } = useFeaturedProperties()

  const stats = [
    { value: '500+', label: 'Properties Sold', icon: HomeIcon },
    { value: '2,500+', label: 'Happy Clients', icon: Users },
    { value: '15+', label: 'Years Experience', icon: Award },
    { value: '98%', label: 'Client Satisfaction', icon: TrendingUp },
  ]

  const features = [
    {
      title: 'Expert Local Knowledge',
      description: 'Our team has deep roots in the community and unparalleled understanding of local market trends.',
      icon: MapPin,
    },
    {
      title: 'Premium Property Portfolio',
      description: 'Access exclusive listings not available on public platforms, including luxury estates and hidden gems.',
      icon: Award,
    },
    {
      title: 'Personalized Service',
      description: 'Dedicated agents who take time to understand your unique needs and preferences.',
      icon: Users,
    },
    {
      title: 'Market Insights',
      description: 'Data-driven advice on pricing, timing, and negotiation strategies to maximize your investment.',
      icon: TrendingUp,
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Beverly Hills, CA',
      text: 'Working with LuxuryEstates was an incredible experience. They found us our dream home within our budget and made the entire process seamless.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      location: 'San Francisco, CA',
      text: 'Professional, knowledgeable, and truly client-focused. Their market expertise saved us thousands and helped us find the perfect property.',
      rating: 5,
    },
    {
      name: 'Emily Roberts',
      location: 'Austin, TX',
      text: 'From start to finish, the team was exceptional. They went above and beyond to ensure we understood every step of the buying process.',
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <br />
            <span className="text-teal-400">Dream Home</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Discover exceptional properties in prime locations.
            Your journey to the perfect home starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBrowseProperties}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              Browse Properties
            </button>
            <button
              onClick={onContact}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all border border-white/30"
            >
              Contact Us
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-teal-400" />
                </div>
                <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-8 w-8 text-white rotate-90" />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked luxury residences and exceptional estates
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : featuredProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={() => onSelectProperty(property.id)}
                  />
                ))}
              </div>

              <div className="text-center mt-10">
                <button
                  onClick={onBrowseProperties}
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all hover:scale-105"
                >
                  View All Properties
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No featured properties at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience, expertise, and exceptional service make us the top choice for discerning buyers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-gray-50 hover:bg-teal-50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-100 rounded-lg mb-4 group-hover:bg-teal-600 transition-colors">
                  <feature.icon className="h-7 w-7 text-teal-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Trusted Real Estate Partner
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                For over 15 years, LuxuryEstates has been helping families and investors find
                their perfect properties. Our commitment to excellence, deep market knowledge,
                and personalized approach set us apart in the industry.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                We believe that finding a home should be an exciting journey, not a stressful
                ordeal. That's why we've assembled a team of dedicated professionals who are
                passionate about matching people with properties they'll love for years to come.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <div>
                  <p className="text-4xl font-bold text-teal-400">500+</p>
                  <p className="text-gray-400">Properties Sold</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-teal-400">$2B+</p>
                  <p className="text-gray-400">Total Sales Volume</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-teal-400">50+</p>
                  <p className="text-gray-400">Expert Agents</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Luxury Property"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-teal-600 text-white p-6 rounded-lg shadow-xl">
                <p className="text-sm font-medium">Trusted by</p>
                <p className="text-3xl font-bold">2,500+</p>
                <p className="text-sm">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from satisfied homeowners and investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-700 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Let our expert team guide you through the process.
            Get started today with a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onContact}
              className="bg-white text-teal-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-lg transition-all"
            >
              Schedule a Consultation
            </button>
            <button
              onClick={onBrowseProperties}
              className="bg-teal-800 hover:bg-teal-900 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all border border-white/30"
            >
              Browse Properties
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
