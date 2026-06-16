import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-6 w-6 text-brand-500" />
              <span className="font-bold text-lg text-white">autoclaimfix.com</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Helping UK residents claim what they are owed with professional, transparent, and efficient legal assistance.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand-400 transition-colors">About Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-brand-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@autoclaimfix.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0800 123 4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-xs text-center text-slate-500 space-y-3">
          <p className="leading-relaxed max-w-3xl mx-auto">
            You are not required to use our services to file your claim. You can contact the responsible party directly at no cost. If your claim is unsuccessful, you may refer it to the Financial Ombudsman Service or the Financial Compensation Scheme free of charge.
          </p>
          <p>ML Holdings</p>
          <p>FCA: 834008 | ICO: ZB963604</p>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <Link to="/privacy-policy" className="hover:text-brand-400 transition-colors">Cookies Policy</Link>
            <span>|</span>
            <Link to="/privacy-policy" className="hover:text-brand-400 transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-brand-400 transition-colors">Terms &amp; Conditions</Link>
            <span>|</span>
            <Link to="/about" className="hover:text-brand-400 transition-colors">Contact</Link>
          </div>
          <p>&copy; 2026 autoclaimfix.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
