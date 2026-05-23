import { PropertyWithPrimaryImage } from '../types/database'
import { Bed, Bath, Square, MapPin, ChevronRight } from 'lucide-react'

interface PropertyCardProps {
  property: PropertyWithPrimaryImage
  onClick?: () => void
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
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

  const propertyTypeLabel = property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.primary_image?.image_url || 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-teal-600 text-white text-sm font-medium rounded">
            {propertyTypeLabel}
          </span>
          {property.featured && (
            <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded">
              Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="text-3xl font-bold text-white drop-shadow-lg">
            {formatPrice(property.price)}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-teal-600 transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
          <span className="text-sm">{property.city}, {property.state}</span>
        </div>

        <div className="flex items-center gap-4 text-gray-600 mb-4">
          {property.bedrooms > 0 && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 text-gray-400" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-gray-400" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
          )}
          {property.square_feet > 0 && (
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1 text-gray-400" />
              <span className="text-sm">{formatNumber(property.square_feet)} sqft</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {property.address}
          </span>
          <ChevronRight className="h-5 w-5 text-teal-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  )
}

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-300" />
      <div className="p-5">
        <div className="h-6 bg-gray-300 rounded mb-3 w-3/4" />
        <div className="h-4 bg-gray-300 rounded mb-3 w-1/2" />
        <div className="flex gap-4 mb-4">
          <div className="h-4 bg-gray-300 rounded w-16" />
          <div className="h-4 bg-gray-300 rounded w-16" />
          <div className="h-4 bg-gray-300 rounded w-20" />
        </div>
        <div className="h-3 bg-gray-300 rounded w-full" />
      </div>
    </div>
  )
}
