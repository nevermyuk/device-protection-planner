-- Drop the function if it already exists
DROP FUNCTION IF EXISTS app_data.add_device_operation;

-- Create the function in the app_data schema
CREATE OR REPLACE FUNCTION app_data.add_device_operation(
  user_id UUID,
  device_name TEXT,
  purchase_date DATE,
  device_model_id UUID,
  warranty_period TEXT,
  additional_info TEXT,
  plan_type_id UUID,
  coverage_details TEXT
)
RETURNS VOID AS $$
DECLARE
  device_id UUID;
  expiration_date DATE;
BEGIN
  -- Calculate the expiration date as one year from the current date
  expiration_date := CURRENT_DATE + INTERVAL '1 year';

  -- Insert into devices table
  INSERT INTO devices (user_id, name, purchase_date, device_model_id)
  VALUES (user_id, device_name, purchase_date, device_model_id)
  RETURNING id INTO device_id;

  -- Insert into device_details table
  INSERT INTO device_details (device_id, warranty_period, additional_info)
  VALUES (device_id, warranty_period, additional_info);

  -- Insert into protection_plans table
  INSERT INTO protection_plans (device_id, plan_type_id, coverage_details, expiration_date)
  VALUES (device_id, plan_type_id, coverage_details, expiration_date);

EXCEPTION
  WHEN OTHERS THEN
    -- Handle exceptions and roll back changes
    RAISE NOTICE 'Transaction failed, rolling back changes';
    RAISE;
END;
$$ LANGUAGE plpgsql;
