import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Define the structure of a hit
interface Hit {
  url: string;
  referrer: string;
  userAgent: string;
  timestamp: string;
}

// Define the analytics file path
const ANALYTICS_FILE = path.join(process.cwd(), 'data', 'analytics.json');

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON data
    const data = await request.json();
    
    // Extract the required fields
    const { url, referrer, userAgent, timestamp } = data;
    
    // Validate that all required fields are present
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing url' }, { status: 400 });
    }
    
    if (typeof referrer !== 'string') {
      return NextResponse.json({ error: 'Invalid referrer' }, { status: 400 });
    }
    
    if (!userAgent || typeof userAgent !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing userAgent' }, { status: 400 });
    }
    
    if (!timestamp || typeof timestamp !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing timestamp' }, { status: 400 });
    }
    
    // Create the hit object
    const hit: Hit = {
      url,
      referrer,
      userAgent,
      timestamp
    };
    
    // Ensure the data directory exists
    const dataDir = path.dirname(ANALYTICS_FILE);
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, continue
    }
    
    // Append the hit to the analytics file
    const hitLine = JSON.stringify(hit) + '\n';
    await fs.appendFile(ANALYTICS_FILE, hitLine, 'utf8');
    
    // Return success response
    return NextResponse.json({ success: true }, { status: 200 });
    
  } catch (error) {
    console.error('Error processing analytics hit:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 