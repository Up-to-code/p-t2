import { useProperty, useSimilarProperties } from '../hooks/useProperties'
import { ImageCarousel } from '../components/ImageCarousel'
import { ContactForm } from '../components/ContactForm'
import { PropertyCard, PropertyCardSkeleton } from '../components/PropertyCard'
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Home,
  Car,
  Trees,
  ChevronLeft,
  Phone,
  Mail,
} from 'lucide-react'

interface PropertyDetailsPageProps {
  propertyId: string
  onBack?: () => void
  onSelectProperty: (id: string) => void
}

export function PropertyDetailsPage({ propertyId, onBack, onSelectProperty }: PropertyDetailsPageProps) {
  const { property, loading, error } = useProperty(propertyId)
  const { properties: similarProperties, loading: loadingSimilar } = useSimilarProperties(propertyId, 3)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const propertyTypeLabel = property?.property_type
    ? property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)
    : ''

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 rounded-lg mb-8" />
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-4 bg-gray-300 rounded" />
                <div className="h-4 bg-gray-300 rounded" />
                <div className="h-4 bg-gray-300 rounded w-3/4" />
              </div>
              <div className="h-96 bg-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={onBack}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Go back to listings
          </button>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-4">This property may no longer be available.</p>
          <button
            onClick={onBack}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Browse all properties
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Listings
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ImageCarousel images={property.images} title={property.title} />

        <div className="mt-8 flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded">
                {propertyTypeLabel}
              </span>
              {property.featured && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-1" />
              <span>{property.address}, {property.city}, {property.state} {property.zip_code}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-teal-600">{formatPrice(property.price)}</p>
            <p className="text-gray-500 text-sm mt-1">Listed: {formatDate(property.created_at)}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-6 py-4 border-y border-gray-200">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-4">
              <div className="bg-teal-50 p-3 rounded-lg">
                <Bed className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                <p className="text-sm text-gray-500">Bedrooms</p>
              </div>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-4">
              <div className="bg-teal-50 p-3 rounded-lg">
                <Bath className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                <p className="text-sm text-gray-500">Bathrooms</p>
              </div>
            </div>
          )}
          {property.square_feet > 0 && (
            <div className="flex items-center gap-4">
              <div className="bg-teal-50 p-3 rounded-lg">
                <Square className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(property.square_feet)}</p>
                <p className="text-sm text-gray-500">Square Feet</p>
              </div>
            </div>
          )}
          {property.year_built && (
            <div className="flex items-center gap-4">
              <div className="bg-teal-50 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{property.year_built}</p>
                <p className="text-sm text-gray-500">Year Built</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Home className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-medium text-gray-900">{propertyTypeLabel}</p>
                  </div>
                </div>
                {property.lot_size && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Trees className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Lot Size</p>
                      <p className="font-medium text-gray-900">{formatNumber(property.lot_size)} acres</p>
                    </div>
                  </div>
                )}
                {property.garage_spaces > 0 && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Car className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Garage</p>
                      <p className="font-medium text-gray-900">{property.garage_spaces} Car Garage</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities & Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-teal-50 border border-teal-100 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-teal-600 rounded-full" />
                      <span className="text-gray-700 font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">
                  {property.address}, {property.city}, {property.state}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Interested in this property?</h3>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
                <ContactForm
                  propertyId={property.id}
                  propertyTitle={property.title}
                />
              </div>

              <div className="mt-4 bg-teal-600 rounded-lg p-6 text-white">
                <h3 className="font-bold mb-3">Contact Agent Directly</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+15551234567"
                    className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                  >
                    <Phone className="h-5 w-5" />
                    <span>(555) 123-4567</span>
                  </a>
                  <a
                    href="mailto:info@luxuryestates.com"
                    className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                  >
                    <Mail className="h-5 w-5" />
                    <span>info@luxuryestates.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {similarProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loadingSimilar
                ? Array.from({ length: 3 }).map((_, i) => <PropertyCardSkeleton key={i} />)
                : similarProperties.map((prop) => (
                    <PropertyCard
                      key={prop.id}
                      property={prop}
                      onClick={() => onSelectProperty(prop.id)}
                    />
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
