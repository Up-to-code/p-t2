import { useState, useMemo } from 'react'
import { useProperties, PropertyFilters } from '../hooks/useProperties'
import { PropertyCard, PropertyCardSkeleton } from '../components/PropertyCard'
import { Search, Filter, X } from 'lucide-react'

interface PropertiesPageProps {
  onSelectProperty: (id: string) => void
}

export function PropertiesPage({ onSelectProperty }: PropertiesPageProps) {
  const [filters, setFilters] = useState<PropertyFilters>({})
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const { properties, loading, error } = useProperties(filters)

  const filteredProperties = useMemo(() => {
    if (!searchTerm) return properties

    const term = searchTerm.toLowerCase()
    return properties.filter(prop =>
      prop.title.toLowerCase().includes(term) ||
      prop.city.toLowerCase().includes(term) ||
      prop.state.toLowerCase().includes(term) ||
      prop.address.toLowerCase().includes(term)
    )
  }, [properties, searchTerm])

  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      if (value === '' || value === undefined) {
        delete newFilters[key]
      } else {
        newFilters[key] = value
      }
      return newFilters
    })
  }

  const clearFilters = () => {
    setFilters({})
    setSearchTerm('')
  }

  const hasActiveFilters = Object.keys(filters).length > 0 || searchTerm

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-700 to-teal-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">Find Your Dream Property</h1>
          <p className="text-teal-100 text-lg">
            Browse our curated selection of premium properties
          </p>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by city, address, or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="h-5 w-5" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 bg-white text-teal-600 text-xs px-2 py-0.5 rounded-full">
                  {Object.keys(filters).length + (searchTerm ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Price
                  </label>
                  <select
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="100000">{formatPrice(100000)}</option>
                    <option value="250000">{formatPrice(250000)}</option>
                    <option value="500000">{formatPrice(500000)}</option>
                    <option value="750000">{formatPrice(750000)}</option>
                    <option value="1000000">{formatPrice(1000000)}</option>
                    <option value="2000000">{formatPrice(2000000)}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price
                  </label>
                  <select
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="250000">{formatPrice(250000)}</option>
                    <option value="500000">{formatPrice(500000)}</option>
                    <option value="750000">{formatPrice(750000)}</option>
                    <option value="1000000">{formatPrice(1000000)}</option>
                    <option value="2000000">{formatPrice(2000000)}</option>
                    <option value="5000000">{formatPrice(5000000)}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms
                  </label>
                  <select
                    value={filters.bedrooms || ''}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select
                    value={filters.propertyType || ''}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="land">Land</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {loading ? (
              'Loading properties...'
            ) : (
              <>
                <span className="font-semibold text-gray-900">{filteredProperties.length}</span>
                {' '}properties found
              </>
            )}
          </p>
        </div>

        {filteredProperties.length === 0 && !loading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
            <button
              onClick={clearFilters}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))
              : filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={() => onSelectProperty(property.id)}
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  )
}
