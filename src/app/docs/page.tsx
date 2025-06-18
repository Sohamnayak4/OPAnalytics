import Link from "next/link";
import Header from "../../components/Header";

export default function Docs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <nav className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Getting Started</h3>
                  <ul className="mt-4 space-y-2">
                    <li><a href="#installation" className="text-gray-600 hover:text-blue-600">Installation</a></li>
                    <li><a href="#quick-start" className="text-gray-600 hover:text-blue-600">Quick Start</a></li>
                    <li><a href="#configuration" className="text-gray-600 hover:text-blue-600">Configuration</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">API Reference</h3>
                  <ul className="mt-4 space-y-2">
                    <li><a href="#collect-endpoint" className="text-gray-600 hover:text-blue-600">Collect Endpoint</a></li>
                    <li><a href="#stats-endpoint" className="text-gray-600 hover:text-blue-600">Stats Endpoint</a></li>
                    <li><a href="#tracking-script" className="text-gray-600 hover:text-blue-600">Tracking Script</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Advanced</h3>
                  <ul className="mt-4 space-y-2">
                    <li><a href="#custom-events" className="text-gray-600 hover:text-blue-600">Custom Events</a></li>
                    <li><a href="#privacy" className="text-gray-600 hover:text-blue-600">Privacy & GDPR</a></li>
                    <li><a href="#deployment" className="text-gray-600 hover:text-blue-600">Deployment</a></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-8">
            <div className="max-w-4xl">
              {/* Hero */}
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
                <p className="text-xl text-gray-600">
                  Everything you need to know about implementing and using OPAnalytics.
                </p>
              </div>

              {/* Installation */}
              <section id="installation" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Installation</h2>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Add the Tracking Script</h3>
                  <p className="text-gray-600 mb-4">
                    Add this script tag to any website you want to track. Place it in the head section or before the closing body tag.
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <code className="text-green-400 text-sm">
                      &lt;script src=&quot;https://your-opanalytics-domain.com/track.js&quot;&gt;&lt;/script&gt;
                    </code>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
                  <p className="text-blue-800">
                    The tracking script is only 2KB and loads asynchronously, so it won&apos;t slow down your website.
                  </p>
                </div>
              </section>

              {/* Quick Start */}
              <section id="quick-start" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Start</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Static HTML</h3>
                    <div className="bg-gray-900 rounded p-3 text-sm overflow-x-auto">
                      <pre className="text-gray-300">
{`<!DOCTYPE html>
<html>
<head>
  <title>My Site</title>
  <script src="/track.js"></script>
</head>
<body>
  <!-- Your content -->
</body>
</html>`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">React/Next.js</h3>
                    <div className="bg-gray-900 rounded p-3 text-sm overflow-x-auto">
                      <pre className="text-gray-300">
{`// In your layout.tsx
export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <script src="/track.js"></script>
      </body>
    </html>
  );
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* API Reference */}
              <section id="collect-endpoint" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">API Reference</h2>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">POST /api/collect</h3>
                  <p className="text-gray-600 mb-4">Collects analytics data from websites.</p>
                  
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Request Body</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                    <pre className="text-gray-300 text-sm">
{`{
  "url": "https://example.com/page",
  "referrer": "https://google.com",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}`}
                    </pre>
                  </div>

                  <h4 className="text-lg font-medium text-gray-900 mb-3">Response</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-300 text-sm">
{`{
  "success": true
}`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" id="stats-endpoint">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">GET /api/stats</h3>
                  <p className="text-gray-600 mb-4">Retrieves analytics data and statistics.</p>
                  
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Query Parameters</h4>
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parameter</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">grouped</td>
                          <td className="px-6 py-4 text-sm text-gray-500">boolean</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Include grouped analytics data</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="text-lg font-medium text-gray-900 mb-3">Example Response</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-300 text-sm">
{`{
  "totalHits": 1247,
  "hits": [...],
  "analytics": {
    "topUrls": {
      "/": 45,
      "/about": 23
    },
    "topReferrers": {
      "https://google.com": 12
    },
    "browserDistribution": {
      "Chrome": 67,
      "Firefox": 23
    },
    "uniqueUrls": 8,
    "uniqueReferrers": 5,
    "directTraffic": 34
  }
}`}
                    </pre>
                  </div>
                </div>
              </section>

              {/* Privacy */}
              <section id="privacy" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy & GDPR</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">🔒 Privacy-First Approach</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• No cookies are set or read</li>
                    <li>• No personal data is collected</li>
                    <li>• No cross-site tracking</li>
                    <li>• IP addresses are not stored</li>
                    <li>• No fingerprinting techniques</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Collect</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">✅ We Do Collect</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Page URLs visited</li>
                        <li>• Referrer information</li>
                        <li>• Browser type (user agent)</li>
                        <li>• Visit timestamps</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">❌ We Don&apos;t Collect</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• IP addresses</li>
                        <li>• Personal information</li>
                        <li>• Location data</li>
                        <li>• Device fingerprints</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Deployment */}
              <section id="deployment" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Deployment</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">🚀 Vercel</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-900 rounded p-3 text-sm">
                        <code className="text-gray-300">
                          git push origin main
                        </code>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Connect your GitHub repo to Vercel for automatic deployments.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">🌐 Self-Hosted</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-900 rounded p-3 text-sm">
                        <pre className="text-gray-300">
{`npm run build
npm start`}
                        </pre>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Build and run on your own server with Node.js.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Support */}
              <section className="mb-12">
                <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
                  <p className="text-blue-100 mb-6">
                    Check out our dashboard for real-time analytics or reach out if you need assistance.
                  </p>
                  <Link
                    href="/dashboard"
                    className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold"
                  >
                    View Dashboard
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 