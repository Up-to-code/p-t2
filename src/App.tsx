import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { PropertiesPage } from './pages/PropertiesPage'
import { PropertyDetailsPage } from './pages/PropertyDetailsPage'
import { ContactPage } from './pages/ContactPage'

type Page = 'home' | 'properties' | 'property-details' | 'contact'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const handleNavigate = (page: 'home' | 'properties' | 'contact') => {
    setCurrentPage(page)
    setSelectedPropertyId(null)
  }

  const handleSelectProperty = (propertyId: string) => {
    setSelectedPropertyId(propertyId)
    setCurrentPage('property-details')
  }

  const handleBackFromDetails = () => {
    setSelectedPropertyId(null)
    setCurrentPage('properties')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onBrowseProperties={() => handleNavigate('properties')}
            onSelectProperty={handleSelectProperty}
            onContact={() => handleNavigate('contact')}
          />
        )
      case 'properties':
        return (
          <div className="pt-20">
            <PropertiesPage onSelectProperty={handleSelectProperty} />
          </div>
        )
      case 'property-details':
        return selectedPropertyId ? (
          <div className="pt-20">
            <PropertyDetailsPage
              propertyId={selectedPropertyId}
              onBack={handleBackFromDetails}
              onSelectProperty={handleSelectProperty}
            />
          </div>
        ) : (
          <PropertiesPage onSelectProperty={handleSelectProperty} />
        )
      case 'contact':
        return (
          <div className="pt-20">
            <ContactPage />
          </div>
        )
      default:
        return <HomePage
          onBrowseProperties={() => handleNavigate('properties')}
          onSelectProperty={handleSelectProperty}
          onContact={() => handleNavigate('contact')}
        />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            name: 'LuxuryEstates',
            description: 'Premium Real Estate Agency specializing in luxury properties',
            url: 'https://luxuryestates.com',
            telephone: '+1-555-123-4567',
            email: 'info@luxuryestates.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '123 Market Street, Suite 500',
              addressLocality: 'San Francisco',
              addressRegion: 'CA',
              postalCode: '94105',
              addressCountry: 'US',
            },
            openingHours: 'Mo-Fr 09:00-18:00, Sa 10:00-16:00',
            priceRange: '$$$',
          }),
        }}
      />
    </div>
  )
}

export default App
