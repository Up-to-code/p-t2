export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          bedrooms: number
          bathrooms: number
          square_feet: number
          address: string
          city: string
          state: string
          zip_code: string
          property_type: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land'
          status: 'available' | 'pending' | 'sold' | 'rented'
          featured: boolean
          year_built: number | null
          lot_size: number | null
          garage_spaces: number
          amenities: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          price: number
          bedrooms?: number
          bathrooms?: number
          square_feet?: number
          address: string
          city: string
          state: string
          zip_code: string
          property_type?: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land'
          status?: 'available' | 'pending' | 'sold' | 'rented'
          featured?: boolean
          year_built?: number | null
          lot_size?: number | null
          garage_spaces?: number
          amenities?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          bedrooms?: number
          bathrooms?: number
          square_feet?: number
          address?: string
          city?: string
          state?: string
          zip_code?: string
          property_type?: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land'
          status?: 'available' | 'pending' | 'sold' | 'rented'
          featured?: boolean
          year_built?: number | null
          lot_size?: number | null
          garage_spaces?: number
          amenities?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          image_url: string
          is_primary: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          image_url: string
          is_primary?: boolean
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          image_url?: string
          is_primary?: boolean
          display_order?: number
          created_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          message: string
          property_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string
          message: string
          property_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          message?: string
          property_id?: string | null
          created_at?: string
        }
      }
    }
  }
}

export type Property = Database['public']['Tables']['properties']['Row']
export type PropertyInsert = Database['public']['Tables']['properties']['Insert']
export type PropertyUpdate = Database['public']['Tables']['properties']['Update']

export type PropertyImage = Database['public']['Tables']['property_images']['Row']
export type PropertyImageInsert = Database['public']['Tables']['property_images']['Insert']

export type Contact = Database['public']['Tables']['contacts']['Row']
export type ContactInsert = Database['public']['Tables']['contacts']['Insert']

export type PropertyWithImages = Property & {
  images: PropertyImage[]
}

export type PropertyWithPrimaryImage = Property & {
  primary_image: PropertyImage | null
}
