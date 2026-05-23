import { useState, useEffect } from 'react'
import { Home, Menu, X } from 'lucide-react'

interface HeaderProps {
  currentPage: 'home' | 'properties' | 'property-details' | 'contact'
  onNavigate: (page: 'home' | 'properties' | 'contact') => void
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', page: 'home' as const },
    { label: 'Properties', page: 'properties' as const },
    { label: 'Contact', page: 'contact' as const },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
          >
            <div className={`p-2 rounded-lg ${isScrolled ? 'bg-teal-600' : 'bg-white/20'}`}>
              <Home className={`h-6 w-6 ${isScrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                LuxuryEstates
              </h1>
              <p className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-white/80'}`}>
                Premium Real Estate
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`font-medium transition-colors ${
                  currentPage === item.page
                    ? isScrolled ? 'text-teal-600' : 'text-teal-300'
                    : isScrolled
                      ? 'text-gray-700 hover:text-teal-600'
                      : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                isScrolled
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-white text-teal-700 hover:bg-gray-100'
              }`}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-gray-900 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-lg mt-2 p-4 absolute left-4 right-4">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`text-left py-2 px-4 rounded-lg transition-colors ${
                    currentPage === item.page
                      ? 'bg-teal-50 text-teal-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate('contact')
                  setIsMobileMenuOpen(false)
                }}
                className="bg-teal-600 text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-teal-700 transition-colors"
              >
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
