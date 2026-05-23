/*
  # Real Estate Database Schema

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text, NOT NULL)
      - `description` (text)
      - `price` (decimal, NOT NULL)
      - `bedrooms` (integer)
      - `bathrooms` (decimal)
      - `square_feet` (integer)
      - `address` (text, NOT NULL)
      - `city` (text, NOT NULL)
      - `state` (text, NOT NULL)
      - `zip_code` (text, NOT NULL)
      - `property_type` (text, NOT NULL) - 'house', 'apartment', 'condo', 'townhouse', 'land'
      - `status` (text, NOT NULL) - 'available', 'pending', 'sold', 'rented'
      - `featured` (boolean, default false)
      - `year_built` (integer)
      - `lot_size` (decimal)
      - `garage_spaces` (integer)
      - `amenities` (text array)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `property_images`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `image_url` (text, NOT NULL)
      - `is_primary` (boolean, default false)
      - `display_order` (integer, default 0)
      - `created_at` (timestamptz, default now())
    
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text, NOT NULL)
      - `email` (text, NOT NULL)
      - `phone` (text)
      - `message` (text, NOT NULL)
      - `property_id` (uuid, foreign key to properties, nullable)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on all tables
    - Public read access on properties and images
    - Public insert access on contacts (for form submissions)
    - No update/delete policies for public users

  3. Notes
    - Property images use stock photos from Pexels (https://images.pexels.com/photos/...)
    - Amenities stored as text array for flexibility
    - All timestamps use timestamptz for proper timezone handling
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  price decimal(12, 2) NOT NULL,
  bedrooms integer DEFAULT 0,
  bathrooms decimal(3, 1) DEFAULT 0,
  square_feet integer DEFAULT 0,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  property_type text NOT NULL DEFAULT 'house',
  status text NOT NULL DEFAULT 'available',
  featured boolean DEFAULT false,
  year_built integer,
  lot_size decimal(10, 2),
  garage_spaces integer DEFAULT 0,
  amenities text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_property_type CHECK (property_type IN ('house', 'apartment', 'condo', 'townhouse', 'land')),
  CONSTRAINT valid_status CHECK (status IN ('available', 'pending', 'sold', 'rented'))
);

-- Create property_images table
CREATE TABLE IF NOT EXISTS property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  is_primary boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  message text NOT NULL,
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for properties (public read)
CREATE POLICY "Public can view available properties"
  ON properties FOR SELECT
  TO public
  USING (status = 'available');

-- Create policies for property_images (public read)
CREATE POLICY "Public can view property images"
  ON property_images FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_images.property_id
      AND properties.status = 'available'
    )
  );

-- Create policies for contacts (public insert)
CREATE POLICY "Public can submit contact inquiries"
  ON contacts FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for search functionality
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_state ON properties(state);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id);

-- Create index for contacts email lookups
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_property_id ON contacts(property_id);