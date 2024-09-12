-- Create a new schema for application data
CREATE SCHEMA IF NOT EXISTS "app_data";

-- Create manufacturers table
CREATE TABLE IF NOT EXISTS "app_data"."manufacturers" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create device_models table
CREATE TABLE IF NOT EXISTS "app_data"."device_models" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "model" TEXT NOT NULL UNIQUE,
    "manufacturer_id" UUID REFERENCES "app_data"."manufacturers"("id") ON DELETE SET NULL,
    "release_date" DATE,
    "accepted" BOOLEAN DEFAULT TRUE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create devices table
CREATE TABLE IF NOT EXISTS "app_data"."devices" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "user_id" UUID REFERENCES "next_auth"."users"("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "device_model_id" UUID REFERENCES "app_data"."device_models"("id") ON DELETE SET NULL,
    "purchase_date" DATE NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create device_details table
CREATE TABLE IF NOT EXISTS "app_data"."device_details" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "device_id" UUID REFERENCES "app_data"."devices"("id") ON DELETE CASCADE,
    "warranty_period" TEXT,
    "additional_info" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create plan_types table
CREATE TABLE IF NOT EXISTS "app_data"."plan_types" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "type_name" TEXT NOT NULL UNIQUE, -- e.g., Basic, Standard, Premium
    "description" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create protection_plans table with reference to plan_types
CREATE TABLE IF NOT EXISTS "app_data"."protection_plans" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "device_id" UUID REFERENCES "app_data"."devices"("id") ON DELETE CASCADE,
    "plan_type_id" UUID REFERENCES "app_data"."plan_types"("id") ON DELETE SET NULL,
    "coverage_details" TEXT,
    "expiration_date" DATE NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create device_types table
CREATE TABLE IF NOT EXISTS "app_data"."device_types" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "type_name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Grant permissions on all tables to the service_role
GRANT USAGE ON SCHEMA "app_data" TO "service_role";
GRANT USAGE ON SCHEMA "app_data" TO "anon";

GRANT ALL ON ALL TABLES IN SCHEMA "app_data" TO "service_role";
GRANT ALL ON ALL TABLES IN SCHEMA "app_data" TO "anon";

