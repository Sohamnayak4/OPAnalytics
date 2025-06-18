import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Define the structure of a hit (matching the collect endpoint)
interface Hit {
  url: string;
  referrer: string;
  userAgent: string;
  timestamp: string;
}

// Define the structure for grouped data
interface GroupedData {
  [key: string]: number;
}

// Define the analytics file path
const ANALYTICS_FILE = path.join(process.cwd(), 'data', 'analytics.json');

// Function to read hits from file
async function readHitsFromFile(): Promise<Hit[]> {
  try {
    const fileContent = await fs.readFile(ANALYTICS_FILE, 'utf8');
    const lines = fileContent.trim().split('\n').filter(line => line.length > 0);
    return lines.map(line => JSON.parse(line) as Hit);
  } catch {
    // File doesn't exist or is empty, return empty array
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const hits = await readHitsFromFile();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const includeGrouped = searchParams.get('grouped') === 'true';
    
    // Base response with all hits
    const response: {
      totalHits: number;
      hits: Hit[];
      analytics?: {
        topUrls: GroupedData;
        topReferrers: GroupedData;
        browserDistribution: GroupedData;
        uniqueUrls: number;
        uniqueReferrers: number;
        directTraffic: number;
      };
    } = {
      totalHits: hits.length,
      hits: hits
    };
    
    // If grouped data is requested, add analytics
    if (includeGrouped && hits.length > 0) {
      // Group by URLs
      const urlCounts: GroupedData = {};
      hits.forEach(hit => {
        urlCounts[hit.url] = (urlCounts[hit.url] || 0) + 1;
      });
      
      // Group by referrers (exclude empty referrers for cleaner data)
      const referrerCounts: GroupedData = {};
      hits.forEach(hit => {
        if (hit.referrer && hit.referrer.trim() !== '') {
          referrerCounts[hit.referrer] = (referrerCounts[hit.referrer] || 0) + 1;
        }
      });
      
      // Group by user agents (simplified - just browser families)
      const userAgentCounts: GroupedData = {};
      hits.forEach(hit => {
        // Simple user agent parsing for common browsers
        let browser = 'Unknown';
        const ua = hit.userAgent.toLowerCase();
        
        if (ua.includes('chrome') && !ua.includes('edg')) {
          browser = 'Chrome';
        } else if (ua.includes('firefox')) {
          browser = 'Firefox';
        } else if (ua.includes('safari') && !ua.includes('chrome')) {
          browser = 'Safari';
        } else if (ua.includes('edg')) {
          browser = 'Edge';
        } else if (ua.includes('opera') || ua.includes('opr')) {
          browser = 'Opera';
        }
        
        userAgentCounts[browser] = (userAgentCounts[browser] || 0) + 1;
      });
      
      // Sort and get top entries
      const sortByCount = (obj: GroupedData) => 
        Object.entries(obj)
          .sort(([,a], [,b]) => b - a)
          .reduce((result, [key, value]) => {
            result[key] = value;
            return result;
          }, {} as GroupedData);
      
      // Add grouped data to response
      response.analytics = {
        topUrls: sortByCount(urlCounts),
        topReferrers: sortByCount(referrerCounts),
        browserDistribution: sortByCount(userAgentCounts),
        uniqueUrls: Object.keys(urlCounts).length,
        uniqueReferrers: Object.keys(referrerCounts).length,
        directTraffic: hits.filter(hit => !hit.referrer || hit.referrer.trim() === '').length
      };
    }
    
    return NextResponse.json(response, { status: 200 });
    
  } catch (err) {
    console.error('Error retrieving analytics stats:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 