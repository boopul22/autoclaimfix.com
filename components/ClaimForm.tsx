import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Loader2, AlertCircle, Lock } from 'lucide-react';
interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  claimType: string;
  description: string;
  optIn: boolean;
}

const initialFormState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  claimType: 'housing',
  description: '',
  optIn: false,
};

const ClaimForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, optIn: e.target.checked }));
    if (e.target.checked) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.optIn) {
      setError("Please tick the box to agree to the terms and proceed.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.WEB3_FORM_API || '1e325f4f-7489-457f-9e7f-5309e6c249ec',
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          subject: `New Claim: ${formData.claimType} - ${formData.firstName} ${formData.lastName}`,
          claim_type: formData.claimType,
          message: formData.description,
        }),
      });

      const data = await response.json() as { success: boolean; message: string };
      if (data.success) {
        setSubmissionResult(true);
      } else {
        setError(data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionResult) {
    return (
      <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10 text-center border border-green-100 animate-in fade-in zoom-in duration-300">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Submission Successful</h3>
        <p className="text-slate-600 mb-6">Thank you! We have received your claim and will be in touch shortly.</p>
        <button
          onClick={() => {
            setSubmissionResult(false);
            setFormData(initialFormState);
          }}
          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-brand-700 bg-brand-50 hover:bg-brand-100 transition-all"
        >
          Start New Assessment
        </button>
      </div>
    );
  }

  return (
    <div id="claim-form" className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200/60">
      <div className="bg-brand-800 px-6 py-5 border-b border-brand-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Check Eligibility
        </h2>
        <p className="text-brand-200 text-sm mt-0.5">Instant AI assessment. Confidential.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wide">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wide">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wide">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              placeholder="name@email.com"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wide">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              placeholder="07700 900000"
            />
          </div>
        </div>

        <div>
          <label htmlFor="claimType" className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wide">Claim Category</label>
          <div className="relative">
            <select
              id="claimType"
              name="claimType"
              value={formData.claimType}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all appearance-none text-slate-900"
            >
              <option value="housing">Housing Disrepair</option>
              <option value="injury">Personal Injury</option>
              <option value="financial">Financial Mis-selling</option>
              <option value="medical">Medical Negligence</option>
              <option value="other">Other Enquiry</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wide">What Happened?</label>
          <textarea
            id="description"
            name="description"
            rows={2}
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none text-slate-900 placeholder:text-slate-400"
            placeholder="Briefly describe your issue..."
          />
        </div>

        {/* Opt-in Section - Emphasized */}
        <div className={`p-4 rounded-lg border transition-colors duration-200 ${error && !formData.optIn ? 'bg-red-50 border-red-200' : 'bg-brand-50/50 border-brand-100 hover:bg-brand-50'}`}>
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="flex items-center h-5 mt-0.5">
              <input
                type="checkbox"
                name="optIn"
                checked={formData.optIn}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-brand-600 border-gray-300 rounded focus:ring-brand-500 cursor-pointer"
              />
            </div>
            <div className="text-xs text-slate-600 leading-snug group-hover:text-slate-800 transition-colors">
              <span className="font-bold text-slate-900">I Agree to the <Link to="/terms" className="underline hover:text-brand-800">Terms</Link> & <Link to="/privacy-policy" className="underline hover:text-brand-800">Privacy Policy</Link></span>
              <p className="mt-1">
                I consent to my personal details being shared with FCA-authorised claims management companies so that they can contact me by telephone, email, and SMS to discuss a potential claim relating to mis-sold or overcharged vehicle finance, including Discretionary Commission Arrangement (DCA) claims.
              </p>
            </div>
          </label>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 animate-in slide-in-from-top-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-cta-600 hover:bg-cta-700 active:bg-cta-800 text-white text-lg font-bold py-3.5 px-6 rounded-lg shadow-lg shadow-cta-600/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Get My Free Assessment <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
          <Lock className="h-3 w-3" /> Secure SSL Encrypted Submission
        </div>
      </form>
    </div>
  );
};

export default ClaimForm;
