// /pages/api/device-recommendations.ts

import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store this in .env.local
});

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { model_name, purchase_date, warranty_period } = await req.json();

    // Create the prompt for the AI model
    const prompt = `
  I have a ${model_name} purchased on ${purchase_date}. The warranty period is ${warranty_period}.
  Based on this information:
  1. Should I consider upgrading to a newer model? Please provide a brief recommendation.
  2. Provide tips for maintaining my device.
  
  Please format your response as a JSON object with the following fields:
  - "recommendation": A brief recommendation on upgrading.
  - "maintenance_tips": An array of tips for maintaining the device.
  `;

    // Fetch AI-generated recommendations
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4-turbo', // Use the GPT-4 model with JSON mode,
      response_format: { type: 'json_object' },
    });

    // Extract the recommendations from the response
    const content = chatCompletion.choices[0].message.content.trim();

    // Return recommendations in the response
    return new Response(content, {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate recommendations' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
}
