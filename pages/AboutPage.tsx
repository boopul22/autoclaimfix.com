import React from 'react';
import { ShieldCheck, Award, Users, Scale } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-brand-900 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About autoclaimfix.com</h1>
          <p className="text-lg text-slate-300">Helping UK residents reclaim what they're owed — trusted claims management since 2015.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Who We Are</h2>
            <p className="text-slate-600 leading-relaxed">
              autoclaimfix.com is a UK-based claims management service dedicated to helping individuals receive the compensation they deserve. We specialise in personal injury, housing disrepair, financial mis-selling, medical negligence, and data breach claims. Our team of experienced professionals works alongside regulated solicitors to ensure every claim is handled with the utmost care and professionalism.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              We believe that everyone should have access to justice, regardless of their financial situation. That's why we operate on a No Win, No Fee basis — you never pay upfront, and we only charge a fee if your claim is successful. Our mission is to make the claims process simple, transparent, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
            {[
              { icon: Users, label: '10,000+', desc: 'Claims Handled' },
              { icon: Award, label: '95%', desc: 'Success Rate' },
              { icon: ShieldCheck, label: 'ICO', desc: 'Registered' },
              { icon: Scale, label: '8+ Years', desc: 'Experience' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <item.icon className="h-8 w-8 text-brand-700 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-900">{item.label}</p>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Accreditations</h2>
            <p className="text-slate-600 leading-relaxed">
              autoclaimfix.com is operated by ML Holdings, registered in England & Wales (FCA Number: 834008, ICO Number: ZB963604), and adheres to the highest standards of data protection and professional conduct.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
