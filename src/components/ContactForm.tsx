import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { ContactInsert } from '../types/database'
import { Send } from 'lucide-react'

interface ContactFormProps {
  propertyId?: string
  propertyTitle?: string
  onSuccess?: () => void
  showCancelButton?: boolean
}

export function ContactForm({ propertyId, propertyTitle, onSuccess, showCancelButton = false }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactInsert>({
    name: '',
    email: '',
    phone: '',
    message: propertyTitle ? `I'm interested in "${propertyTitle}". Please contact me with more details.` : '',
    property_id: propertyId || null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const insertData: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        message: formData.message,
        property_id: formData.property_id,
      }

      const { error: supabaseError } = await supabase
        .from('contacts')
        .insert(insertData)

      if (supabaseError) throw supabaseError

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        property_id: propertyId || null,
      })

      setTimeout(() => {
        onSuccess?.()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (success) {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-3">
          <div className="bg-teal-100 rounded-full p-3">
            <Send className="h-6 w-6 text-teal-600" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-teal-900 mb-2">Message Sent!</h3>
        <p className="text-teal-700">We'll get back to you as soon as possible.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
          placeholder="I'm interested in learning more about this property..."
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-md font-medium hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        {showCancelButton && (
          <button
            type="button"
            onClick={onSuccess}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
