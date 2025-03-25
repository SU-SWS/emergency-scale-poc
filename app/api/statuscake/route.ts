import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Log request headers
  console.log('Request Headers:', [...request.headers.entries()]);

  // Parse and log payload
  let payload;
  try {
    payload = await request.text();
    console.log('Request Payload:', payload);
  } catch (error) {
    console.error('Error parsing payload:', error);
  }

  try {
    payload = await request.json();
    console.log('Request JSON:', payload);
  } catch (error) {
    console.error('Error parsing payload:', error);
  }

  return NextResponse.json({ status: 'ok' });
}
