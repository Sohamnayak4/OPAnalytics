import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">OP</span>Analytics
              <br />
              <span className="text-2xl md:text-3xl text-gray-600 font-normal">Simple Web Analytics</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Track your website visitors with privacy-focused, lightweight analytics. 
              No cookies, no tracking, just essential insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                View Dashboard →
              </Link>
              <Link
                href="/docs"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors duration-200 font-semibold text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to understand your audience
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get insights into your website traffic without compromising your visitors&apos; privacy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Analytics</h3>
              <p className="text-gray-600">
                Monitor your website traffic in real-time. See pageviews, top pages, and visitor sources as they happen.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy First</h3>
              <p className="text-gray-600">
                No cookies, no personal data collection. Track essential metrics while respecting user privacy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightweight</h3>
              <p className="text-gray-600">
                Tiny JavaScript snippet that won&apos;t slow down your website. Less than 2KB and loads instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Setup Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white text-center -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Add one line of code to start tracking your website visitors.
            </p>
            <div className="bg-black/20 rounded-lg p-6 font-mono text-left max-w-2xl mx-auto mb-8">
              <code className="text-blue-100">
                &lt;script src=&quot;/track.js&quot;&gt;&lt;/script&gt;
              </code>
            </div>
            <Link
              href="/dashboard"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-semibold text-lg shadow-lg"
            >
              View Your Dashboard
            </Link>
          </div>
        </div>

        {/* Stats Preview */}
        <div className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Beautiful insights at a glance
            </h2>
            <p className="text-gray-600">
              Get the metrics that matter most to your business.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">2,451</div>
              <div className="text-sm text-gray-600">Total Pageviews</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">1,847</div>
              <div className="text-sm text-gray-600">Unique Visitors</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
              <div className="text-sm text-gray-600">Top Pages</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
              <div className="text-sm text-gray-600">Traffic Sources</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OP</span>
            </div>
            <span className="text-xl font-bold">OPAnalytics</span>
          </div>
          <p className="text-gray-400 mb-6">
            OPAnalytics - Privacy-focused web analytics for modern websites
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
              Documentation
            </Link>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
