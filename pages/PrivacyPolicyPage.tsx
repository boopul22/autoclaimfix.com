import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last Updated: April 24, 2026</p>

        <div className="prose pbrand-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Introduction and Scope</h2>
            <p>
              autoclaimfix.com (“Company,” “we,” “our,” or “us”) is a marketing and technology platform operating in the United Kingdom. This Privacy Policy explains how we collect, use, store, share and protect your personal data when you: (a) visit our website (the “Site”); (b) use our claim-enquiry tools; or (c) contact us via our telephone lines or request to be contacted by our third-party marketing partners, including but not limited to C3Claims, Claim3000, Mis-Sold Finance, FCA-authorised claims management companies and solicitors’ firms (collectively, “Marketing Partners”).
            </p>
            <p className="mt-2">
              This Policy is issued in accordance with the UK General Data Protection Regulation (“UK GDPR”), the Data Protection Act 2018 (“DPA 2018”) and the Privacy and Electronic Communications Regulations 2003 (“PECR”). Our services are intended for residents of the United Kingdom only.
            </p>
            <p className="mt-2">
              <span className="font-bold">Data Controller:</span> ML Holdings is the data controller responsible for your personal data. FCA: 834008 | ICO: ZB963604
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Not a Law Firm or Insurance Provider</h2>
            <p><span className="font-bold">Important Disclosure:</span> autoclaimfix.com is not a law firm, a solicitors’ referral service, or an insurance company. We do not provide legal advice or regulated claims management services directly.</p>
            <p className="mt-2"><span className="font-bold">No Solicitor-Client Relationship:</span> Your use of the Site, or any communication with our representatives, does not create a solicitor-client relationship between you and the Company or any Marketing Partner. A solicitor-client relationship is only formed if you sign a formal engagement letter directly with a regulated law firm or FCA-authorised claims management company.</p>
            <p className="mt-2"><span className="font-bold">You do not have to use a claims management company.</span> You can pursue a claim yourself for free by contacting the responsible lender directly, and if you are not satisfied with the outcome you can refer the matter to the Financial Ombudsman Service (<a href="https://www.financial-ombudsman.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">financial-ombudsman.org.uk</a>) or the Financial Services Compensation Scheme (<a href="https://www.fscs.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">fscs.org.uk</a>) free of charge.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Personal Data We Collect</h2>
            <p>We collect the following categories of personal data when you complete our enquiry forms or speak with us on the phone:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><span className="font-bold">Identifiers:</span> full name, email address, postcode and telephone number.</li>
              <li><span className="font-bold">Claim Data:</span> details of your finance agreement, vehicle, lender, dates, and other information relevant to assessing a potential claim.</li>
              <li><span className="font-bold">Special Category Data:</span> where relevant to a claim, we may collect information about your health or financial vulnerability. We will only process such data with your explicit consent or where otherwise permitted by UK GDPR Article 9.</li>
              <li><span className="font-bold">Call Recordings:</span> we may record inbound and outbound calls for quality assurance, training, regulatory compliance and claim verification. You will be informed at the start of any call if it is being recorded.</li>
              <li><span className="font-bold">Technical Data:</span> IP address, browser type, device information, and pages visited, collected via cookies and similar technologies (see Section 8).</li>
            </ul>
            <p className="mt-3"><span className="font-bold">Sources of personal data:</span> we collect data directly from you (via our website forms or phone calls) and, where applicable, from publicly available sources or partners such as marketing agencies that you have previously consented to share your data with. We do not knowingly collect data from any source you have not authorised.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Lawful Basis for Processing</h2>
            <p>Under UK GDPR Article 6, we rely on the following lawful bases to process your personal data:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><span className="font-bold">Consent (Art. 6(1)(a)):</span> where you have ticked a consent box (for example, agreeing to be contacted by our Marketing Partners about a potential claim). You may withdraw consent at any time.</li>
              <li><span className="font-bold">Contract (Art. 6(1)(b)):</span> where processing is necessary to respond to your enquiry and provide the service you have requested.</li>
              <li><span className="font-bold">Legal Obligation (Art. 6(1)(c)):</span> to comply with our regulatory, anti-fraud and record-keeping obligations.</li>
              <li><span className="font-bold">Legitimate Interests (Art. 6(1)(f)):</span> to operate, improve and secure our Site, prevent fraud, and carry out business analytics. We balance these interests against your rights and freedoms.</li>
            </ul>
            <p className="mt-2">For special category data (e.g. health information), we rely on your <span className="font-bold">explicit consent</span> under UK GDPR Article 9(2)(a), or on Article 9(2)(f) where processing is necessary for the establishment, exercise or defence of legal claims.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. How We Share Your Data</h2>
            <p>We share your personal data with the following categories of recipients:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><span className="font-bold">FCA-authorised claims management companies and solicitors:</span> including C3Claims, Claim3000 and Mis-Sold Finance, for the purpose of assessing whether you may have a claim relating to mis-sold or overcharged motor finance, including Discretionary Commission Arrangement (DCA) claims. These companies may contact you by telephone, email or SMS to discuss your potential claim. A full list of the companies we work with is available on request.</li>
              <li><span className="font-bold">Service providers:</span> hosting, analytics, CRM, telephony and email providers who process data on our behalf as processors under a written contract.</li>
              <li><span className="font-bold">Regulators and authorities:</span> the Financial Conduct Authority (FCA), Information Commissioner’s Office (ICO), courts, and law enforcement where we are legally required to do so.</li>
            </ul>
            <p className="mt-2">
              <span className="font-bold">How we are paid:</span> our Marketing Partners pay us an administrative or marketing fee for qualified enquiries passed to them. We do not receive a percentage of any compensation recovered on your behalf. You are not charged for using our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Marketing Communications (PECR)</h2>
            <p>Where you have provided your consent (for example, by ticking the consent box on our enquiry form), we and our Marketing Partners may contact you by telephone, SMS or email to discuss your potential claim, in accordance with PECR.</p>
            <p className="mt-2"><span className="font-bold">Soft opt-in:</span> where you have previously enquired with us about a similar service, we may also contact you by email or SMS about related services, on the basis of the “soft opt-in” permitted by Regulation 22(3) of PECR. Every such message will include a clear and free way to opt out.</p>
            <p className="mt-2">You have the right to withdraw your consent at any time. You can:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>email us at <a href="mailto:info@autoclaimfix.com" className="text-brand-600 hover:underline">info@autoclaimfix.com</a> with the subject line “Unsubscribe”;</li>
              <li>follow the unsubscribe link in any marketing email we send;</li>
              <li>reply STOP to any marketing SMS;</li>
              <li>tell any caller you do not wish to be contacted further; and</li>
              <li>register with the Telephone Preference Service (TPS) at <a href="https://www.tpsonline.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">tpsonline.org.uk</a> to opt out of unsolicited live marketing calls.</li>
            </ul>
            <p className="mt-2">Withdrawing consent will not affect the lawfulness of processing carried out before withdrawal, and may mean we are unable to progress your claim enquiry.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Your Rights Under UK GDPR</h2>
            <p>You have the following rights in relation to your personal data:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><span className="font-bold">Right of access</span> – to request a copy of the personal data we hold about you.</li>
              <li><span className="font-bold">Right to rectification</span> – to have inaccurate or incomplete data corrected.</li>
              <li><span className="font-bold">Right to erasure (“right to be forgotten”)</span> – to request deletion of your data in certain circumstances.</li>
              <li><span className="font-bold">Right to restrict processing</span> – to ask us to limit how we use your data.</li>
              <li><span className="font-bold">Right to data portability</span> – to receive your data in a structured, commonly used, machine-readable format.</li>
              <li><span className="font-bold">Right to object</span> – to object to processing based on legitimate interests or direct marketing.</li>
              <li><span className="font-bold">Right to withdraw consent</span> – at any time, where consent is the lawful basis.</li>
              <li><span className="font-bold">Rights relating to automated decision-making</span> – we do not carry out solely automated decision-making with legal or similarly significant effects.</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, email <a href="mailto:info@autoclaimfix.com" className="text-brand-600 hover:underline">info@autoclaimfix.com</a>. We will respond within one month. We do not charge a fee for reasonable requests.</p>
            <p className="mt-2">
              <span className="font-bold">Right to complain to the ICO:</span> if you are unhappy with how we have handled your personal data, you can lodge a complaint with the Information Commissioner’s Office at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">ico.org.uk</a> or by calling 0303 123 1113.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Cookies and Tracking</h2>
            <p>We use cookies, pixels and similar technologies to operate the Site, analyse traffic and, where you have consented, deliver advertising. You can manage your cookie preferences via the cookie banner on the Site, or by adjusting your browser settings. Non-essential cookies are only set with your consent, in line with PECR and the ICO’s guidance.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Data Retention</h2>
            <p>We retain personal data only for as long as is necessary for the purposes for which it was collected, including to meet legal, regulatory, accounting or reporting requirements. Enquiry and claim data is typically retained for up to six (6) years from your last interaction with us, in line with UK limitation periods. Call recordings are usually retained for twelve (12) months unless required for longer for regulatory or claim-verification purposes. Data is securely deleted or anonymised once no longer required.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">10. International Transfers</h2>
            <p>Your personal data is primarily stored and processed within the United Kingdom and the European Economic Area (EEA). Where any transfer outside the UK is necessary (for example, to a service provider’s cloud infrastructure), we ensure appropriate safeguards are in place, such as the UK International Data Transfer Agreement, UK Addendum to the EU Standard Contractual Clauses, or transfers to countries covered by UK adequacy regulations.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">11. Security</h2>
            <p>We use appropriate technical and organisational measures to protect your personal data, including TLS encryption in transit, access controls, and staff confidentiality obligations. No transmission over the internet or telephone network is completely secure, but we take all reasonable steps to protect your information from unauthorised access, loss, misuse or alteration.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">12. Children</h2>
            <p>Our services are not intended for, or directed at, individuals under the age of eighteen (18), and we do not knowingly collect personal data from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">13. Changes to this Policy</h2>
            <p>We may update this Privacy Policy from time to time. The “Last Updated” date at the top of this page will reflect the most recent changes. We encourage you to review this Policy periodically.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">14. Contact Us</h2>
            <p>To exercise your rights, withdraw consent or ask any question about this Policy, please contact:</p>
            <p className="mt-2">
              <span className="font-bold">Data Controller:</span> ML Holdings
            </p>
            <p>
              <span className="font-bold">Email:</span> <a href="mailto:info@autoclaimfix.com" className="text-brand-600 hover:underline">info@autoclaimfix.com</a>
            </p>
            <p>
              <span className="font-bold">FCA Number:</span> 834008
            </p>
            <p>
              <span className="font-bold">ICO Registration:</span> ZB963604
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
