import { ContactForm } from '../components/ContactForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '(555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@luxuryestates.com',
      href: 'mailto:info@luxuryestates.com',
    },
    {
      icon: MapPin,
      label: 'Office',
      value: '123 Market Street, Suite 500, San Francisco, CA 94105',
      href: '#',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Fri 9AM-6PM, Sat 10AM-4PM',
      href: '#',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-teal-100 text-lg">
            We're here to help you find your perfect property
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">{info.label}</p>
                      {info.label === 'Office' ? (
                        <p className="text-gray-900">{info.value}</p>
                      ) : (
                        <a
                          href={info.href}
                          className="text-gray-900 hover:text-teal-600 transition-colors"
                        >
                          {info.value}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-200 h-64 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">123 Market Street, Suite 500</p>
                  <p className="text-gray-400">San Francisco, CA 94105</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-6">
              <h3 className="font-semibold text-teal-900 mb-2">Need Immediate Assistance?</h3>
              <p className="text-teal-700 mb-4">
                Our agents are available to help you with urgent inquiries.
              </p>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium"
              >
                <Phone className="h-4 w-4" />
                Call Now: (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <details className="bg-gray-50 rounded-lg p-6 group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-semibold text-gray-900 pr-4">
                  What areas do you serve?
                </h3>
                <span className="text-teal-600 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                We primarily serve the West Coast, including California, Oregon, Washington, Arizona, and Nevada.
                Our network of partner agents also extends to major markets across the United States.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6 group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-semibold text-gray-900 pr-4">
                  How quickly can I expect a response?
                </h3>
                <span className="text-teal-600 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                We aim to respond to all inquiries within 24 hours during business days.
                For urgent matters, please call our direct line for immediate assistance.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6 group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-semibold text-gray-900 pr-4">
                  Do you work with first-time buyers?
                </h3>
                <span className="text-teal-600 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                Absolutely! We love helping first-time buyers navigate the process. Our agents provide
                comprehensive guidance from pre-approval to closing, ensuring you understand every step.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-6 group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-semibold text-gray-900 pr-4">
                  What should I prepare before contacting an agent?
                </h3>
                <span className="text-teal-600 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                Having a pre-approval letter from a lender helps us understand your budget.
                It's also helpful to have a list of your must-haves and nice-to-haves in a property.
                Don't worry if you're just starting - we can guide you through the preparation process!
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
