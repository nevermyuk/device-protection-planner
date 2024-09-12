import { createClient } from '@/utils/supabase/client';

export async function fetchDeviceModels(
  selectedManufacturerId: string,
): Promise<string[]> {
  const supabase = createClient();

  // Fetch device models from the "device_models" table, filtering by manufacturer ID
  const { data, error } = await supabase
    .from('device_models') // Ensure this matches your table name
    .select('model')
    .eq('manufacturer_id', selectedManufacturerId); // Filter by manufacturer ID

  if (error) {
    console.error('Error fetching device models:', error);
    return [];
  }

  // Return the list of device models
  return data?.map((item: { model: string }) => item.model) || [];
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
