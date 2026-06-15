import React, { useState } from 'react';

const ActivatePage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleActivate = async () => {
    setStatus('loading');
    try {
      const formData = new FormData();
      formData.append('name', 'Activation Test');
      formData.append('email', 'info@autoclaimfix.com');
      formData.append('message', 'This is an activation request to verify the email endpoint.');
      formData.append('_subject', 'FormSubmit Activation - autoclaimfix.com');
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      const res = await fetch('https://formsubmit.co/ajax/immaculatemedia2018@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Activate Email Notifications</h1>

        <div className="text-left text-slate-600 mb-8 space-y-2">
          <p className="font-semibold text-slate-700">Follow these 3 simple steps:</p>
          <p>1. Click the <span className="font-semibold">Activate</span> button below.</p>
          <p>2. Open your inbox at <span className="font-semibold text-brand-700">immaculatemedia2018@gmail.com</span>.</p>
          <p>3. Click the confirmation link in the email from FormSubmit.</p>
          <p className="text-sm text-slate-500 pt-2">That's it! You'll start receiving form notifications after confirming.</p>
        </div>

        {status === 'idle' && (
          <button
            onClick={handleActivate}
            className="w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Activate
          </button>
        )}

        {status === 'loading' && (
          <div className="flex items-center justify-center gap-3 text-brand-700 font-semibold py-3">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending activation request...
          </div>
        )}

        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-semibold mb-1">Activation request sent!</p>
            <p className="text-green-700 text-sm">
              Check your inbox at <span className="font-semibold">immaculatemedia2018@gmail.com</span> and click the confirmation link from FormSubmit.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-semibold mb-1">Something went wrong.</p>
            <p className="text-red-700 text-sm mb-3">Please try again.</p>
            <button
              onClick={handleActivate}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivatePage;
