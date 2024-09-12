import { createClient } from '@/utils/supabase/client';

export async function fetchDeviceModels(
  selectedManufacturerId: string,
): Promise<{ id: string; model: string }[]> {
  const supabase = createClient();

  // Fetch device models from the "device_models" table, filtering by manufacturer ID
  const { data, error } = await supabase
    .from('device_models')
    .select('id, model')
    .eq('manufacturer_id', selectedManufacturerId); // Filter by manufacturer ID

  if (error) {
    console.error('Error fetching device models:', error);
    return [];
  }

  // Return the list of device models
  return data || [];
}

export async function fetchManufacturers(): Promise<
  { name: string; id: string }[]
> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('manufacturers')
    .select('id, name');

  if (error) {
    console.error('Error fetching manufacturers:', error);
    return [];
  }

  // Return the list of manufacturers with name and id
  return data.map((item: { id: string; name: string }) => ({
    id: item.id,
    name: item.name,
  }));
}

export async function fetchPlanTypes(): Promise<
  { id: string; type_name: string }[]
> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('plan_types') // Ensure this matches your table name
    .select('id, type_name'); // Select the columns you need

  if (error) {
    console.error('Error fetching plan types:', error);
    return [];
  }

  return data || [];
}

export async function getDeviceAndPlanInfo(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('get_device_and_plan_info', {
    user_id: userId,
  });

  if (error) {
    console.error('Error fetching device and plan info:', error.message);
    return null;
  }

  return data;
}
