import { Home, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

interface FooterProps {
  onNavigate: (page: 'home' | 'properties' | 'contact') => void
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', page: 'home' as const },
    { label: 'Properties', page: 'properties' as const },
    { label: 'Contact', page: 'contact' as const },
  ]

  const propertyTypes = [
    'Houses',
    'Apartments',
    'Condos',
    'Townhouses',
    'Land',
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-teal-600 p-2 rounded-lg">
                <Home className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">LuxuryEstates</h3>
                <p className="text-xs text-gray-400">Premium Real Estate</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted partner in finding exceptional properties. We combine expertise,
              technology, and personalized service to help you find your dream home.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Property Types</h4>
            <ul className="space-y-2">
              {propertyTypes.map((type) => (
                <li key={type}>
                  <button
                    onClick={() => onNavigate('properties')}
                    className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+15551234567"
                  className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
                >
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@luxuryestates.com"
                  className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
                >
                  info@luxuryestates.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Market Street, Suite 500
                  <br />
                  San Francisco, CA 94105
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400 text-sm">
                Stay updated with the latest properties and market trends.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                // Handle newsletter subscription
              }}
              className="flex gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>
            &copy; {currentYear} LuxuryEstates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
