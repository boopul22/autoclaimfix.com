import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <ShieldCheck className="h-8 w-8 text-brand-800" />
              <span className="font-bold text-xl text-slate-900 tracking-tight">autoclaimfix.com</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/about" className="text-sm text-slate-600 hover:text-brand-700 font-medium transition-colors">About</Link>
            <Link to="/" className="text-brand-700 font-medium text-sm hover:underline">Start Claim</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-100">
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-700 hover:bg-slate-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-700 hover:bg-brand-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Claim
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
