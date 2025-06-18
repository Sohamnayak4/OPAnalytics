import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS preflight request
export async function OPTIONS() {
  return new NextResponse(null, { 
    status: 200, 
    headers: corsHeaders 
  });
}

// Define the structure of a hit
interface Hit {
  url: string;
  referrer: string;
  userAgent: string;
  timestamp: string;
}

// Define the analytics file path
const ANALYTICS_FILE = path.join(process.cwd(), 'data', 'analytics.json');

// For production, we'll use a simple in-memory store as fallback
// In a real production app, you'd use a database
declare global {
  var memoryStore: Hit[] | undefined;
}

export async function POST(request: NextRequest) {
  try {
    console.log('Received analytics request');
    
    // Parse the incoming JSON data
    const data = await request.json();
    console.log('Parsed data:', data);
    
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
    console.log('Creating data directory:', dataDir);
    try {
      await fs.mkdir(dataDir, { recursive: true });
      console.log('Data directory created/verified');
    } catch {
      // Directory might already exist, continue
      console.log('Data directory already exists');
    }

    // Try to write to file, fallback to memory store if it fails
    try {
      const hitLine = JSON.stringify(hit) + '\n';
      console.log('Writing to file:', ANALYTICS_FILE);
      await fs.appendFile(ANALYTICS_FILE, hitLine, 'utf8');
      console.log('Data written to file successfully');
    } catch (fileError) {
      console.log('File write failed, using memory store:', fileError);
      if (!globalThis.memoryStore) {
        globalThis.memoryStore = [];
      }
      globalThis.memoryStore.push(hit);
      console.log('Data stored in memory, total hits:', globalThis.memoryStore.length);
    }
    
    // Return success response with CORS headers
    return NextResponse.json({ success: true }, { 
      status: 200,
      headers: corsHeaders 
    });
    
  } catch (err) {
    console.error('Error processing analytics hit:', err);
    return NextResponse.json({ error: 'Internal server error' }, { 
      status: 500,
      headers: corsHeaders 
    });
  }
} 