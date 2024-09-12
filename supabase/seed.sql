-- Insert predefined plan types
INSERT INTO "app_data"."plan_types" ("type_name", "description")
VALUES
    ('Basic', 'Basic coverage with essential features'),
    ('Standard', 'Standard coverage with additional benefits'),
    ('Premium', 'Premium coverage with comprehensive protection')
ON CONFLICT ("type_name") DO NOTHING;

-- Insert predefined manufacturers
INSERT INTO "app_data"."manufacturers" ("name", "description")
VALUES
    ('Apple', 'Manufacturer known for iPhones and other electronics'),
    ('Samsung', 'Manufacturer known for Galaxy series and other devices'),
    ('Google', 'Manufacturer known for Pixel series and other technology'),
    ('OnePlus', 'Manufacturer known for high-performance smartphones'),
    ('Xiaomi', 'Manufacturer known for a wide range of electronic products')
ON CONFLICT ("name") DO NOTHING;

-- Insert predefined phones
-- Insert predefined plan types
INSERT INTO "app_data"."plan_types" ("type_name", "description")
VALUES
    ('Basic', 'Basic coverage with essential features'),
    ('Standard', 'Standard coverage with additional benefits'),
    ('Premium', 'Premium coverage with comprehensive protection')
ON CONFLICT ("type_name") DO NOTHING;

-- Insert predefined manufacturers
INSERT INTO "app_data"."manufacturers" ("name", "description")
VALUES
    ('Apple', 'Manufacturer known for iPhones and other electronics'),
    ('Samsung', 'Manufacturer known for Galaxy series and other devices'),
    ('Google', 'Manufacturer known for Pixel series and other technology'),
    ('OnePlus', 'Manufacturer known for high-performance smartphones'),
    ('Xiaomi', 'Manufacturer known for a wide range of electronic products')
ON CONFLICT ("name") DO NOTHING;

-- Insert predefined phones
INSERT INTO "app_data"."device_models" ("model", "manufacturer_id", "release_date", "accepted")
VALUES
    -- Apple Phones
    ('iPhone 13', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Apple'), '2021-09-24', TRUE),
    ('iPhone 14', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Apple'), '2022-09-16', TRUE),
    ('iPhone 15', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Apple'), '2023-09-22', TRUE),
    ('iPhone 16', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Apple'), '2024-09-20', TRUE),
    
    -- Samsung Phones
    ('Galaxy S21', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Samsung'), '2021-01-29', TRUE),
    ('Galaxy S22', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Samsung'), '2022-02-25', TRUE),
    ('Galaxy S23', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Samsung'), '2023-02-17', TRUE),
    ('Galaxy S24', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Samsung'), '2024-02-20', TRUE),
    
    -- Google Phones
    ('Pixel 5', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Google'), '2020-10-15', TRUE),
    ('Pixel 6', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Google'), '2021-10-28', TRUE),
    ('Pixel 7', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Google'), '2022-10-06', TRUE),
    ('Pixel 8', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Google'), '2023-10-04', TRUE),
    
    -- OnePlus Phones
    ('OnePlus 8', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'OnePlus'), '2020-04-21', TRUE),
    ('OnePlus 9', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'OnePlus'), '2021-03-23', TRUE),
    ('OnePlus 10 Pro', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'OnePlus'), '2022-01-11', TRUE),
    ('OnePlus 11', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'OnePlus'), '2023-02-07', TRUE),
    
    -- Xiaomi Phones
    ('Mi 10', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Xiaomi'), '2020-03-27', TRUE),
    ('Mi 11', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Xiaomi'), '2021-01-01', TRUE),
    ('Mi 12', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Xiaomi'), '2022-03-15', TRUE),
    ('Mi 13', (SELECT id FROM "app_data"."manufacturers" WHERE name = 'Xiaomi'), '2023-12-31', TRUE)
ON CONFLICT ("model") DO NOTHING;
