'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';

interface Hit {
  url: string;
  referrer: string;
  userAgent: string;
  timestamp: string;
}

interface Analytics {
  topUrls: { [key: string]: number };
  topReferrers: { [key: string]: number };
  browserDistribution: { [key: string]: number };
  uniqueUrls: number;
  uniqueReferrers: number;
  directTraffic: number;
}

interface StatsResponse {
  totalHits: number;
  hits: Hit[];
  analytics?: Analytics;
}

interface HourlyData {
  hour: string;
  count: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats?grouped=true');
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getHourlyData = (): HourlyData[] => {
    if (!stats?.hits) return [];

    const hourCounts: { [key: string]: number } = {};
    const now = new Date();
    
    // Initialize last 24 hours
    for (let i = 23; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hourKey = hour.getHours().toString().padStart(2, '0');
      hourCounts[hourKey] = 0;
    }

    // Count hits per hour
    stats.hits.forEach(hit => {
      const hitDate = new Date(hit.timestamp);
      const hourKey = hitDate.getHours().toString().padStart(2, '0');
      hourCounts[hourKey] = (hourCounts[hourKey] || 0) + 1;
    });

    return Object.entries(hourCounts).map(([hour, count]) => ({
      hour: `${hour}:00`,
      count
    }));
  };

  const renderChart = () => {
    const hourlyData = getHourlyData();
    const maxCount = Math.max(...hourlyData.map(d => d.count), 1);

    return (
      <div className="space-y-2">
        <div className="flex items-end space-x-1 h-32">
          {hourlyData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="bg-blue-500 w-full min-h-[2px] rounded-t"
                style={{
                  height: `${(data.count / maxCount) * 100}%`,
                }}
                title={`${data.hour}: ${data.count} views`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>24h ago</span>
          <span>Now</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={fetchStats}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Pageviews</h3>
            <p className="text-3xl font-bold text-gray-900">{stats?.totalHits || 0}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Unique URLs</h3>
            <p className="text-3xl font-bold text-gray-900">{stats?.analytics?.uniqueUrls || 0}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Traffic Sources</h3>
            <p className="text-3xl font-bold text-gray-900">{stats?.analytics?.uniqueReferrers || 0}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Direct Traffic</h3>
            <p className="text-3xl font-bold text-gray-900">{stats?.analytics?.directTraffic || 0}</p>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pageviews Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Pageviews (Last 24 Hours)</h3>
              <div className="flex items-center text-sm text-gray-500">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                Visits
              </div>
            </div>
            {renderChart()}
          </div>

          {/* Browser Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Browser Distribution</h3>
            <div className="space-y-3">
              {stats?.analytics?.browserDistribution && Object.entries(stats.analytics.browserDistribution).map(([browser, count], index) => {
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500'];
                const bgColors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-orange-100', 'bg-red-100'];
                return (
                  <div key={browser} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>
                      <span className="text-sm text-gray-600">{browser}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${colors[index % colors.length]}`}
                          style={{
                            width: `${(count / (stats?.totalHits || 1)) * 100}%`
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                      <span className="text-xs text-gray-500 w-10">
                        {Math.round((count / (stats?.totalHits || 1)) * 100)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Additional Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Traffic Sources Donut */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Sources</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Direct</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{stats?.analytics?.directTraffic || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Referrals</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{stats?.analytics?.uniqueReferrers || 0}</span>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full flex">
                  <div 
                    className="bg-green-500" 
                    style={{ width: `${((stats?.analytics?.directTraffic || 0) / (stats?.totalHits || 1)) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-blue-500" 
                    style={{ width: `${(((stats?.totalHits || 0) - (stats?.analytics?.directTraffic || 0)) / (stats?.totalHits || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Pages Mini Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Page Performance</h3>
            <div className="space-y-3">
              {stats?.analytics?.topUrls && Object.entries(stats.analytics.topUrls).slice(0, 4).map(([url, count], index) => (
                <div key={url} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 truncate" title={url}>
                      {url.length > 20 ? url.substring(0, 20) + '...' : url}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                             <div
                         className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full"
                         style={{
                           width: `${(count / Math.max(...Object.values(stats?.analytics?.topUrls || {}))) * 100}%`
                         }}
                       />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {stats?.hits?.slice(-5).reverse().map((hit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-900 truncate" title={hit.url}>
                      {new URL(hit.url).pathname}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(hit.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {(!stats?.hits || stats.hits.length === 0) && (
                <div className="text-center text-gray-500 text-sm py-4">
                  No recent activity
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Top URLs */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Visited URLs</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">URL</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Views</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats?.analytics?.topUrls && Object.entries(stats.analytics.topUrls).slice(0, 10).map(([url, count]) => (
                    <tr key={url}>
                      <td className="py-2 text-sm text-gray-900 truncate max-w-xs" title={url}>
                        {url}
                      </td>
                      <td className="py-2 text-sm text-gray-900 text-right font-medium">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Referrers */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Referrers</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Referrer</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Views</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats?.analytics?.topReferrers && Object.entries(stats.analytics.topReferrers).slice(0, 10).map(([referrer, count]) => (
                    <tr key={referrer}>
                      <td className="py-2 text-sm text-gray-900 truncate max-w-xs" title={referrer}>
                        {referrer}
                      </td>
                      <td className="py-2 text-sm text-gray-900 text-right font-medium">{count}</td>
                    </tr>
                  ))}
                  {(!stats?.analytics?.topReferrers || Object.keys(stats.analytics.topReferrers).length === 0) && (
                    <tr>
                      <td colSpan={2} className="py-4 text-center text-gray-500 text-sm">
                        No referrer data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tracking Code Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tracking Code</h3>
          <p className="text-sm text-gray-600 mb-4">
            Add this script tag to any website you want to track. Place it in the &lt;head&gt; section or before the closing &lt;/body&gt; tag.
          </p>
          <div className="relative">
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <code className="text-gray-800">
                &lt;script src=&quot;/track.js&quot;&gt;&lt;/script&gt;
              </code>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText('<script src="/track.js"></script>');
                // Show a temporary success message
                const button = document.getElementById('copy-button');
                if (button) {
                  const originalText = button.textContent;
                  button.textContent = 'Copied!';
                  button.className = button.className.replace('bg-blue-600 hover:bg-blue-700', 'bg-green-600 hover:bg-green-700');
                  setTimeout(() => {
                    button.textContent = originalText;
                    button.className = button.className.replace('bg-green-600 hover:bg-green-700', 'bg-blue-600 hover:bg-blue-700');
                  }, 2000);
                }
              }}
              id="copy-button"
              className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Copy
            </button>
          </div>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">📝 Setup Instructions:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>1. Copy the script tag above</li>
              <li>2. Paste it into your website's HTML</li>
              <li>3. Deploy your changes</li>
              <li>4. Visit your website to test tracking</li>
              <li>5. Check this dashboard for new data</li>
            </ul>
          </div>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">🔧 Advanced Options:</h4>
            <p className="text-sm text-blue-700">
              The tracking script automatically captures pageviews, referrers, and browser data. 
              It uses <code className="bg-blue-100 px-1 rounded">keepalive</code> to ensure data is sent even when users navigate away quickly.
            </p>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={fetchStats}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
} 