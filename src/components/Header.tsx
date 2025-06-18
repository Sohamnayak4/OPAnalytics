'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">OP</span>
              </div>
              <span className="text-xl font-bold text-gray-900">OPAnalytics</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className={`transition-colors ${
                  pathname === "/" 
                    ? "text-blue-600 font-medium" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Home
              </Link>
              <Link 
                href="/dashboard" 
                className={`transition-colors ${
                  pathname === "/dashboard" 
                    ? "text-blue-600 font-medium" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/docs" 
                className={`transition-colors ${
                  pathname === "/docs" 
                    ? "text-blue-600 font-medium" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Documentation
              </Link>
            </nav>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
} 