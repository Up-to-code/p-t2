import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { PropertyWithPrimaryImage, PropertyWithImages } from '../types/database'

export interface PropertyFilters {
  city?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  propertyType?: string
  status?: string
}

export function useProperties(filters?: PropertyFilters) {
  const [properties, setProperties] = useState<PropertyWithPrimaryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProperties()
  }, [filters])

  async function fetchProperties() {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('properties')
        .select(`
          *,
          primary_image:property_images!inner(
            id,
            property_id,
            image_url,
            is_primary,
            display_order,
            created_at
          )
        `)
        .eq('property_images.is_primary', true)
        .order('created_at', { ascending: false })

      if (filters?.city) {
        query = query.ilike('city', `%${filters.city}%`)
      }
      if (filters?.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice)
      }
      if (filters?.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice)
      }
      if (filters?.bedrooms !== undefined) {
        query = query.gte('bedrooms', filters.bedrooms)
      }
      if (filters?.propertyType) {
        query = query.eq('property_type', filters.propertyType)
      }
      if (filters?.status) {
        query = query.eq('status', filters.status)
      } else {
        query = query.eq('status', 'available')
      }

      const { data, error: supabaseError } = await query

      if (supabaseError) throw supabaseError

      const propertiesWithImages: PropertyWithPrimaryImage[] = (data || []).map((item: any) => ({
        ...item,
        primary_image: item.primary_image && Array.isArray(item.primary_image) && item.primary_image.length > 0
          ? item.primary_image[0]
          : item.primary_image || null
      }))

      setProperties(propertiesWithImages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties')
      console.error('Error fetching properties:', err)
    } finally {
      setLoading(false)
    }
  }

  return { properties, loading, error, refetch: fetchProperties }
}

export function useFeaturedProperties() {
  const [properties, setProperties] = useState<PropertyWithPrimaryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFeaturedProperties()
  }, [])

  async function fetchFeaturedProperties() {
    try {
      setLoading(true)
      setError(null)

      const { data: rawProperties, error: propError } = await supabase
        .from('properties')
        .select('*')
        .eq('featured', true)
        .eq('status', 'available')
        .order('created_at', { ascending: false })
        .limit(6)

      if (propError) throw propError

      if (!rawProperties || rawProperties.length === 0) {
        setProperties([])
        return
      }

      const propertyIds = rawProperties.map((p: any) => p.id)

      const { data: images, error: imgError } = await supabase
        .from('property_images')
        .select('*')
        .in('property_id', propertyIds)
        .eq('is_primary', true)
        .order('display_order', { ascending: true })

      if (imgError) throw imgError

      const imageMap = new Map(
        (images || []).map((img: any) => [img.property_id, img])
      )

      const propertiesWithImages: PropertyWithPrimaryImage[] = rawProperties.map((prop: any) => ({
        ...prop,
        primary_image: imageMap.get(prop.id) || null
      }))

      setProperties(propertiesWithImages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch featured properties')
      console.error('Error fetching featured properties:', err)
    } finally {
      setLoading(false)
    }
  }

  return { properties, loading, error, refetch: fetchFeaturedProperties }
}

export function useProperty(id: string) {
  const [property, setProperty] = useState<PropertyWithImages | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchProperty()
    }
  }, [id])

  async function fetchProperty() {
    try {
      setLoading(true)
      setError(null)

      const { data: propData, error: propError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (propError) throw propError
      if (!propData) {
        setProperty(null)
        return
      }

      const { data: images, error: imgError } = await supabase
        .from('property_images')
        .select('*')
        .eq('property_id', id)
        .order('display_order', { ascending: true })

      if (imgError) throw imgError

      setProperty({
        ...(propData as any),
        images: images || []
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch property')
      console.error('Error fetching property:', err)
    } finally {
      setLoading(false)
    }
  }

  return { property, loading, error, refetch: fetchProperty }
}

export function useSimilarProperties(propertyId: string, limit: number = 3) {
  const [properties, setProperties] = useState<PropertyWithPrimaryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (propertyId) {
      fetchSimilarProperties()
    }
  }, [propertyId])

  async function fetchSimilarProperties() {
    try {
      setLoading(true)
      setError(null)

      const { data: currentProp, error: currentError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .maybeSingle()

      if (currentError) throw currentError
      if (!currentProp) {
        setProperties([])
        return
      }

      const minPrice = (currentProp as any).price * 0.8
      const maxPrice = (currentProp as any).price * 1.2

      const { data: rawProperties, error: simError } = await supabase
        .from('properties')
        .select('*')
        .neq('id', propertyId)
        .eq('status', 'available')
        .gte('price', minPrice)
        .lte('price', maxPrice)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (simError) throw simError

      if (!rawProperties || rawProperties.length === 0) {
        setProperties([])
        return
      }

      const similarIds = rawProperties.map((p: any) => p.id)

      const { data: images, error: imgError } = await supabase
        .from('property_images')
        .select('*')
        .in('property_id', similarIds)
        .eq('is_primary', true)
        .order('display_order', { ascending: true })

      if (imgError) throw imgError

      const imageMap = new Map(
        (images || []).map((img: any) => [img.property_id, img])
      )

      const propertiesWithImages: PropertyWithPrimaryImage[] = rawProperties.map((prop: any) => ({
        ...prop,
        primary_image: imageMap.get(prop.id) || null
      }))

      setProperties(propertiesWithImages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch similar properties')
      console.error('Error fetching similar properties:', err)
    } finally {
      setLoading(false)
    }
  }

  return { properties, loading, error, refetch: fetchSimilarProperties }
}
