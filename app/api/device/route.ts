import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

// Define the GET handler
export async function GET(req: Request) {
  try {
    const supabase = createClient();

    // Extract userId from query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Invalid userId' },
        { status: 400 },
      );
    }

    // Call the PostgreSQL function via Supabase RPC
    const { data, error } = await supabase.rpc('get_device_and_plan_info', {
      input_user_id: userId,
    });
    if (error) {
      console.error('Error executing function:', error.message);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch device info' },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Unhandled error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
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
