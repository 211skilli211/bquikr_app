-- ============================================
-- IBT Solutions Database Migrations
-- Run against Neon PostgreSQL database
-- ============================================

-- ============================================
-- Migration 001: Platform Columns
-- Adds platform identifier to existing tables
-- ============================================

-- Add platform column to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS platform VARCHAR(20) DEFAULT 'marketplace';

-- Add platform column to stores
ALTER TABLE stores ADD COLUMN IF NOT EXISTS platform VARCHAR(20) DEFAULT 'marketplace';

-- Add platform column to listings
ALTER TABLE listings ADD COLUMN IF NOT EXISTS platform VARCHAR(20) DEFAULT 'marketplace';

-- ============================================
-- Migration 002: IBT Subscriptions
-- API subscription and tier management
-- ============================================

CREATE TABLE IF NOT EXISTS ibt_subscriptions (
    subscription_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    platform VARCHAR(20) DEFAULT 'ibt_solutions',
    tier VARCHAR(20) DEFAULT 'free',
    api_key VARCHAR(64) UNIQUE,
    monthly_calls_limit INTEGER DEFAULT 1000,
    calls_used INTEGER DEFAULT 0,
    billing_status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);

-- ============================================
-- Migration 003: API Usage Tracking
-- ============================================

CREATE TABLE IF NOT EXISTS ibt_api_usage (
    usage_id SERIAL PRIMARY KEY,
    subscription_id INTEGER REFERENCES ibt_subscriptions(subscription_id),
    endpoint VARCHAR(100),
    tokens_used INTEGER DEFAULT 0,
    latency_ms INTEGER,
    cost DECIMAL(10, 6) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Migration 004: Geo Locations
-- Vendor/tourism locations for geospatial map
-- ============================================

CREATE TABLE IF NOT EXISTS ibt_locations (
    location_id SERIAL PRIMARY KEY,
    store_id INTEGER,
    platform VARCHAR(20) DEFAULT 'marketplace',
    name VARCHAR(255),
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    category VARCHAR(50),
    is_public BOOLEAN DEFAULT true,
    tier_required VARCHAR(20) DEFAULT 'free',
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Migration 005: Points of Interest
-- Tourism POIs (waterfalls, beaches, etc.)
-- ============================================

CREATE TABLE IF NOT EXISTS ibt_pois (
    poi_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    category VARCHAR(50),
    island VARCHAR(50),
    images JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Migration 006: Marine Conditions
-- Beach/water conditions data
-- ============================================

CREATE TABLE IF NOT EXISTS ibt_marine_conditions (
    id SERIAL PRIMARY KEY,
    location_id INTEGER REFERENCES ibt_locations(location_id),
    water_temp DECIMAL(5, 2),
    wave_height DECIMAL(5, 2),
    visibility DECIMAL(5, 2),
    wind_speed DECIMAL(5, 2),
    safety_flag VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Migration 007: Weather Cache
-- ============================================

CREATE TABLE IF NOT EXISTS ibt_weather_cache (
    id SERIAL PRIMARY KEY,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    forecast_data JSONB,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Migration 008: Indexes
-- Performance indexes for IBT tables
-- ============================================

CREATE INDEX IF NOT EXISTS idx_ibt_subscriptions_user ON ibt_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_ibt_subscriptions_tier ON ibt_subscriptions(tier);
CREATE INDEX IF NOT EXISTS idx_ibt_locations_platform ON ibt_locations(platform);
CREATE INDEX IF NOT EXISTS idx_ibt_locations_category ON ibt_locations(category);
CREATE INDEX IF NOT EXISTS idx_ibt_locations_public ON ibt_locations(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_ibt_pois_island ON ibt_pois(island);
CREATE INDEX IF NOT EXISTS idx_ibt_pois_category ON ibt_pois(category);
CREATE INDEX IF NOT EXISTS idx_ibt_marine_location ON ibt_marine_conditions(location_id);
CREATE INDEX IF NOT EXISTS idx_ibt_weather_coords ON ibt_weather_cache(lat, lng);

-- ============================================
-- Verification Query
-- ============================================

SELECT 
    'users platform column' as check_name,
    CASE WHEN column_exists('users', 'platform') THEN 'PASS' ELSE 'FAIL' END as status
UNION ALL
SELECT 
    'stores platform column' as check_name,
    CASE WHEN column_exists('stores', 'platform') THEN 'PASS' ELSE 'FAIL' END as status
UNION ALL
SELECT 
    'ibt_subscriptions table' as check_name,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'ibt_subscriptions') THEN 'PASS' ELSE 'FAIL' END
UNION ALL
SELECT 
    'ibt_locations table' as check_name,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'ibt_locations') THEN 'PASS' ELSE 'FAIL' END
UNION ALL
SELECT 
    'ibt_pois table' as check_name,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'ibt_pois') THEN 'PASS' ELSE 'FAIL' END;