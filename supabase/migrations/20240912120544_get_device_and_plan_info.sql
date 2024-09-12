-- Drop the function if it already exists
DROP FUNCTION IF EXISTS app_data.get_device_and_plan_info;

-- Create or replace the function in the app_data schema
CREATE OR REPLACE FUNCTION app_data.get_device_and_plan_info(
  input_user_id UUID
)
RETURNS TABLE (
  device_id UUID,
  device_name TEXT,
  purchase_date DATE,
  device_model_id UUID,
  device_model_name TEXT, 
  warranty_period TEXT,
  additional_info TEXT,
  plan_type_id UUID,
  plan_type_name TEXT,
  coverage_details TEXT,
  expiration_date DATE
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id AS device_id,
    d.name AS device_name,
    d.purchase_date,
    d.device_model_id,
    dm.model AS device_model_name,  
    dd.warranty_period,
    dd.additional_info,
    pp.plan_type_id,
    pt.type_name AS plan_type_name,
    pp.coverage_details,
    pp.expiration_date
  FROM
    app_data.devices d
  LEFT JOIN
    app_data.device_details dd ON d.id = dd.device_id
  LEFT JOIN
    app_data.protection_plans pp ON d.id = pp.device_id
  LEFT JOIN
    app_data.plan_types pt ON pp.plan_type_id = pt.id
  LEFT JOIN
    app_data.device_models dm ON d.device_model_id = dm.id
  WHERE
    d.user_id = input_user_id;
END;
$$ LANGUAGE plpgsql;
