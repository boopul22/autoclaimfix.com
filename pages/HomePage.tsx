import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [optIn, setOptIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Web3Forms access key. Web3Forms only accepts submissions from the client
  // (server-side needs a whitelisted static IP, which Cloudflare's edge cannot
  // provide), so the key lives here and the form posts directly.
  const WEB3_FORM_API = '1e325f4f-7489-457f-9e7f-5309e6c249ec';

  // Resolve fetch within a timeout so a slow lookup never blocks submission.
  const fetchJson = async (url: string, ms = 4000): Promise<any | null> => {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), ms);
      const r = await fetch(url, { cache: 'no-store', signal: ctrl.signal });
      clearTimeout(t);
      if (r.ok) return await r.json();
    } catch { /* ignore */ }
    return null;
  };

  // Build a friendly "Browser on OS (Mobile/Desktop)" label from the UA string.
  const describeDevice = (ua: string): string => {
    if (!ua) return 'Unknown';
    let os = 'Unknown OS';
    if (/Windows NT 10/.test(ua)) os = 'Windows 10/11';
    else if (/Windows/.test(ua)) os = 'Windows';
    else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';
    else if (/Android/.test(ua)) os = 'Android';
    else if (/Mac OS X/.test(ua)) os = 'macOS';
    else if (/CrOS/.test(ua)) os = 'ChromeOS';
    else if (/Linux/.test(ua)) os = 'Linux';
    let br = 'Unknown Browser';
    if (/Edg\//.test(ua)) br = 'Edge';
    else if (/OPR\/|Opera/.test(ua)) br = 'Opera';
    else if (/SamsungBrowser/.test(ua)) br = 'Samsung Internet';
    else if (/Firefox\//.test(ua)) br = 'Firefox';
    else if (/Chrome\//.test(ua)) br = 'Chrome';
    else if (/Safari\//.test(ua) && /Version\//.test(ua)) br = 'Safari';
    const form = /Mobile|Android|iPhone|iPad/.test(ua) ? 'Mobile' : 'Desktop';
    return `${br} on ${os} (${form})`;
  };

  // Gather everything we can about the visitor: real IP (v4 + v6), geolocation,
  // ISP, device/browser, timezone, language, referrer, etc. Never throws.
  const collectVisitor = async () => {
    const v: Record<string, string> = {};

    // Browser-side signals (synchronous, always available)
    try {
      const ua = navigator.userAgent || '';
      v.userAgent = ua;
      v.device = describeDevice(ua);
      v.language = (navigator.languages && navigator.languages.join(', ')) || navigator.language || '';
      v.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      v.screen = `${window.screen.width}x${window.screen.height} @${window.devicePixelRatio || 1}x`;
      v.viewport = `${window.innerWidth}x${window.innerHeight}`;
      v.referrer = document.referrer || 'Direct';
      v.landingPage = window.location.href || '';
      v.website = window.location.hostname || '';
      const anyNav = navigator as any;
      if (anyNav.hardwareConcurrency) v.cpuCores = String(anyNav.hardwareConcurrency);
      if (anyNav.deviceMemory) v.deviceMemory = `${anyNav.deviceMemory} GB`;
      if (anyNav.connection && anyNav.connection.effectiveType) v.connection = String(anyNav.connection.effectiveType);
    } catch { /* ignore */ }

    // Edge data (our Pages Function) + an IPv4-only lookup, in parallel.
    const [edge, ipv4] = await Promise.all([
      fetchJson('/api/ip'),
      fetchJson('https://api.ipify.org?format=json'),
    ]);

    if (edge) {
      v.ip = edge.ip && edge.ip !== 'Unknown' ? edge.ip : '';
      v.country = edge.country || '';
      v.region = edge.region || '';
      v.city = edge.city || '';
      v.postcode = edge.postalCode || '';
      v.isp = edge.isp || '';
      v.asn = edge.asn ? `AS${edge.asn}` : '';
      v.coordinates = edge.latitude && edge.longitude ? `${edge.latitude}, ${edge.longitude}` : '';
      v.edgeTimezone = edge.timezone || '';
      v.cfDatacenter = edge.colo || '';
      v.protocol = [edge.httpProtocol, edge.tlsVersion].filter(Boolean).join(' / ');
    }
    v.ipv4 = (ipv4 && ipv4.ip) || '';
    // Primary IP: prefer the edge IP (real, v4 or v6); fall back to the IPv4 lookup.
    if (!v.ip) v.ip = v.ipv4 || 'Unknown';

    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!optIn) {
      setError('Please agree to the terms to proceed.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const v = await collectVisitor();
      const location = [v.city, v.region, v.postcode, v.country].filter(Boolean).join(', ');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3_FORM_API,
          name: fullName,
          email: email,
          phone: phone,
          subject: `New Claim Enquiry - ${fullName} (${v.website || 'website'})`,
          message: `New claim enquiry from ${fullName}. Phone: ${phone}. IP: ${v.ip}`
            + `\nWebsite: ${v.website || 'Unknown'} | Location: ${location || 'Unknown'} | ISP: ${v.isp || 'Unknown'} | Device: ${v.device || 'Unknown'}`,
          'Website': v.website || 'Unknown',
          'IP Address': v.ip || 'Unknown',
          'IPv4 Address': v.ipv4 || 'Unknown',
          'Location': location || 'Unknown',
          'City': v.city || 'Unknown',
          'Region': v.region || 'Unknown',
          'Postcode': v.postcode || 'Unknown',
          'Country': v.country || 'Unknown',
          'Coordinates': v.coordinates || 'Unknown',
          'ISP / Network': [v.isp, v.asn].filter(Boolean).join(' ') || 'Unknown',
          'Timezone': v.timezone || v.edgeTimezone || 'Unknown',
          'Browser / Device': v.device || 'Unknown',
          'Language': v.language || 'Unknown',
          'Screen': v.screen || 'Unknown',
          'Viewport': v.viewport || 'Unknown',
          'Connection': v.connection || 'Unknown',
          'CPU Cores': v.cpuCores || 'Unknown',
          'Device Memory': v.deviceMemory || 'Unknown',
          'Referrer': v.referrer || 'Direct',
          'Landing Page': v.landingPage || 'Unknown',
          'CF Datacenter': v.cfDatacenter || 'Unknown',
          'Protocol': v.protocol || 'Unknown',
          'User Agent': v.userAgent || 'Unknown',
          'Consent': 'User agreed to Terms & Privacy Policy and consented to contact',
        }),
      });

      const data = await response.json() as { success: boolean; message: string };

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center bg-slate-50 px-4 py-8 md:py-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 uppercase tracking-tight leading-tight mb-3">
          Check Your Car<br />Finance Claim
        </h1>
        <p className="text-lg text-slate-600">
          See if you're owed compensation — it takes under 2 minutes.
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {submitted ? (
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-5">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
            <p className="text-slate-600 mb-6">We've received your details and will be in touch shortly.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFullName('');
                setEmail('');
                setPhone('');
                setOptIn(false);
              }}
              className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
            >
              Submit another enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-bold text-slate-800 mb-1.5">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-800 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-slate-800 mb-1.5">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div className={`p-3 rounded-lg border transition-colors ${error && !optIn ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={optIn}
                  onChange={(e) => {
                    setOptIn(e.target.checked);
                    if (e.target.checked) setError(null);
                  }}
                  className="w-5 h-5 mt-0.5 text-brand-600 border-gray-300 rounded focus:ring-brand-500 cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-snug">
                  <span className="font-bold text-slate-800">I agree to the <Link to="/terms" className="underline hover:text-brand-600">Terms</Link> & <Link to="/privacy-policy" className="underline hover:text-brand-600">Privacy Policy</Link>.</span>{' '}
                  I consent to my personal details being shared with FCA-authorised claims management companies so that they can contact me by telephone, email, and SMS to discuss a potential claim relating to mis-sold or overcharged vehicle finance, including Discretionary Commission Arrangement (DCA) claims.
                </span>
              </label>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-lg font-bold text-white bg-cta-600 hover:bg-cta-700 active:bg-cta-800 rounded-xl shadow-lg shadow-cta-600/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </span>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        )}
      </div>

      <p className="text-slate-500 text-xs mt-8 text-center max-w-md">
        *Subject to insurance costs and exclusions. Fee payable if case is successful.
      </p>
    </main>
  );
};

export default HomePage;
