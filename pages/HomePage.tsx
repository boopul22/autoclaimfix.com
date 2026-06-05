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

  // Web3Forms access key (free plan requires the submission to come from the
  // client, so the key lives here).
  const WEB3_FORM_API = '1e325f4f-7489-457f-9e7f-5309e6c249ec';

  // Resolve the visitor IP reliably:
  //  1) our own same-origin Pages Function (/api/ip) — fast, never ad-blocked,
  //     reads CF-Connecting-IP at the Cloudflare edge.
  //  2) external ipify as a fallback if (1) is ever unavailable.
  const resolveIp = async (): Promise<string> => {
    try {
      const r = await fetch('/api/ip', { cache: 'no-store' });
      if (r.ok) {
        const d = await r.json() as { ip?: string };
        if (d.ip && d.ip !== 'Unknown') return d.ip;
      }
    } catch { /* fall through */ }
    try {
      const r = await fetch('https://api.ipify.org?format=json');
      if (r.ok) {
        const d = await r.json() as { ip?: string };
        if (d.ip) return d.ip;
      }
    } catch { /* fall through */ }
    return 'Unknown';
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
      const userIp = await resolveIp();

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
          subject: `New Claim Enquiry - ${fullName}`,
          message: `New claim enquiry from ${fullName}. Phone: ${phone}. IP: ${userIp}`,
          'IP Address': userIp,
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
    <main className="flex-grow flex flex-col items-center justify-center bg-[#ece8e1] px-4 py-8 md:py-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 uppercase tracking-tight leading-tight mb-3">
          Check Your Car<br />Finance Claim
        </h1>
        <p className="text-lg text-slate-600">
          Find out if you're owed money in just 2 minutes
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
              className="text-rose-600 hover:text-rose-700 font-semibold transition-colors"
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
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
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
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
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
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
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
                  className="w-5 h-5 mt-0.5 text-rose-600 border-gray-300 rounded focus:ring-rose-500 cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-snug">
                  <span className="font-bold text-slate-800">I agree to the <Link to="/terms" className="underline hover:text-rose-600">Terms</Link> & <Link to="/privacy-policy" className="underline hover:text-rose-600">Privacy Policy</Link>.</span>{' '}
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
              className="w-full py-4 text-lg font-bold text-rose-600 border-[3px] border-rose-500 rounded-xl hover:bg-rose-50 active:bg-rose-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
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
