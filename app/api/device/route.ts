import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

// GET request to fetch devices from the database
export async function GET() {
  try {
    const supabase = createClient();
    // Fetch devices from Supabase
    const { data, error } = await supabase.from('devices').select('*');

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching devices:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch devices' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const body = await req.json();
    const {
      deviceName,
      purchaseDate,
      deviceModel,
      warrantyPeriod,
      additionalInfo,
      planType,
      session,
    } = body;
    // Call the PostgreSQL function via Supabase RPC
    const { error } = await supabase.rpc('add_device_operation', {
      user_id: session.userId,
      device_name: deviceName,
      purchase_date: purchaseDate,
      device_model_id: deviceModel,
      warranty_period: warrantyPeriod,
      additional_info: additionalInfo,
      plan_type_id: planType,
      coverage_details: 'Cover most stuff',
    });

    if (error) {
      console.error('Error executing function:', error.message);
      return NextResponse.json(
        { success: false, error: 'Failed to add device' },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Unhandled error:', error.message);
    }
    return NextResponse.json(
      { success: false, error: 'Failed to add device' },
      { status: 400 },
    );
  }
}
