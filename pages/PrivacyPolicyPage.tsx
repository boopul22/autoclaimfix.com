import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last Updated: January 26, 2026</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. INTRODUCTION AND SCOPE</h2>
            <p>
              ukclaims.org (“Company,” “we,” “our,” or “us”) is a marketing and technology platform. This Privacy Policy governs the personal information we collect when you: (a) visit our website (the “Site”); (b) utilize our claim-facilitation tools; or (c) contact us via our dedicated telephone lines or request to be contacted by our third-party marketing partners, including but not limited to, C3Claims, Claim3000, Mis-Sold Finance, law firms, intake specialists, and legal advocates (collectively, “Marketing Partners”).
            </p>
            <p className="font-bold mt-2">IF YOU DO NOT AGREE TO THIS PRIVACY POLICY IN ITS ENTIRETY, YOU MAY NOT ACCESS THE SITE OR UTILIZE OUR SERVICES.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. NOT A LAW FIRM OR INSURANCE PROVIDER</h2>
            <p><span className="font-bold">Important Disclosure:</span> ukclaims.org is not a law firm, a lawyer referral service, or an insurance company. We do not provide legal advice, mediation, or insurance adjusting services.</p>
            <p className="mt-2"><span className="font-bold">No Attorney-Client Relationship:</span> Your use of the Site, or any communication with our representatives via telephone, does not create an attorney-client relationship between you and the Company or any Marketing Partner. An attorney-client relationship is only formed if you sign a formal engagement agreement directly with a law firm.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. INFORMATION COLLECTED (WEB & TELEPHONE)</h2>
            <p>We collect information that identifies you (“Personal Information”) when you complete our inquiry forms or call our dedicated phone lines:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><span className="font-bold">Identifiers:</span> Full name, email address, zip code, and telephone number.</li>
              <li><span className="font-bold">Claim Data:</span> Date of accident, description of property damage, and insurance status.</li>
              <li><span className="font-bold">Sensitive/Health Data:</span> Details regarding your physical injuries and medical treatments.</li>
              <li><span className="font-bold">Audio Recordings:</span> We record and/or monitor all inbound and outbound calls. By calling our number or providing your number to us, you expressly consent to the recording and retention of the audio and data provided during such calls for quality assurance, training, and claim verification.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. CALIFORNIA & COLORADO NOTICE: “DO NOT SELL OR SHARE MY PERSONAL INFORMATION”</h2>
            <p>Under the California Consumer Privacy Act (CCPA/CPRA) and the Colorado Privacy Act (CPA), residents have the right to opt-out of the “sale” or “sharing” of their personal information.</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><span className="font-bold">Notice of Sale/Sharing:</span> ukclaims.org is a marketing platform. We share the personal information you provide (including name, contact details, and accident information) with our Marketing Partners in exchange for an administrative or marketing fee. Under certain state laws, this transfer is classified as a “sale” or “sharing” of information.</li>
              <li><span className="font-bold">Right to Opt-Out:</span> You have the right to direct us not to sell or share your information. Please Note: If you exercise this right, we will be unable to process your claim inquiry or connect you with a Marketing Partner, as our service relies on this data transfer.</li>
              <li><span className="font-bold">How to Opt-Out:</span> To exercise this right, please visit our Your Privacy Choices page or email us at <a href="mailto:support@ukclaims.org" className="text-blue-600 hover:underline">support@ukclaims.org</a> with the subject line “Opt-Out Request.”</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. USE AND SHARING OF DATA (MARKETING MODEL)</h2>
            <p>We share your information with our Third-Party Marketing Partners.</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><span className="font-bold">Administrative Fees:</span> These partners pay us an administrative, marketing, or technology fee to receive inquiries. We do not receive a percentage of any legal recovery or insurance payout.</li>
              <li><span className="font-bold">Transfer of Data:</span> We may transfer audio recordings, transcripts, or form data to our Partners to assist them in evaluating your potential claim.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. TCPA CONSENT & TELEMARKETING DISCLOSURE</h2>
            <p>By providing your telephone number on our Site and/or initiating a call to our phone lines, you provide “prior express written consent” to be contacted by ukclaims.org and our designated Marketing Partners via live calls, artificial/synthesized voice, pre-recorded messages, and/or SMS text messages delivered via automated technology. You provide this consent even if your number is listed on any State or Federal Do-Not-Call list.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">7. COOKIES AND BEHAVIORAL TRACKING</h2>
            <p>We use Cookies, pixels, and tracking technology to analyze Site traffic and target advertisements to you across various devices (mobile, desktop, tablet).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">8. SECURITY AND RETENTION</h2>
            <p>We utilize industry-standard TLS encryption for data in transit. No transmission over the internet or via telephone is 100% secure; you provide data at your own risk.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">9. MINORS</h2>
            <p>Our services are not intended for individuals under the age of eighteen (18).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">10. CONTACT US</h2>
            <p>To exercise your privacy rights or opt-out, please contact:</p>
            <p className="mt-2">
              <span className="font-bold">Email:</span> <a href="mailto:support@ukclaims.org" className="text-blue-600 hover:underline">support@ukclaims.org</a>
            </p>
            <p>
              <span className="font-bold">Address:</span> United Kingdom
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
