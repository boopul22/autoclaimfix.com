import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms and Conditions</h1>

        <div className="prose pbrand-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Introduction</h2>
            <p>These Terms and Conditions govern your access to and use of the autoclaimfix.com website and services.</p>
            <p className="mt-2">By using our Site and services, you agree to these Terms. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Services Offered</h2>
            <p>autoclaimfix.com assists individuals in filing and managing car accident claims. We are not an insurance company. Our platform helps facilitate the claims process by collecting relevant information and submitting it to insurers or legal partners.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Eligibility</h2>
            <p>You must be at least 18 years old and capable of entering a legally binding agreement to use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Not misuse our platform for unlawful purposes</li>
              <li>Maintain confidentiality of any login credentials (if applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Intellectual Property</h2>
            <p>All content on our Site, including text, logos, images, and software, is the property of autoclaimfix.com or its licensors and is protected by copyright laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Disclaimer</h2>
            <p>We do not guarantee the outcome of any claim. Results may vary based on the information provided, the nature of the incident, and third-party decisions (e.g., insurance companies).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Limitation of Liability</h2>
            <p>autoclaimfix.com shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Termination</h2>
            <p>We reserve the right to suspend or terminate your access to the Site if you violate these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Governing Law</h2>
            <p>These Terms shall be governed by the laws of England and Wales, without regard to conflict of law principles.</p>
          </section>

          <section className="mt-8 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Call us for a free consultation</h2>
            <p className="text-2xl font-bold text-brand-600">0800 123 4567</p>
            <p className="text-slate-500 mt-2">Need help after a car accident? We're here for you 24/7.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
