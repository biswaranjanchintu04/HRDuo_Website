import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export function TestimonialsBento() {
  const reviews = [
    {
      name: "Rachel Simmons",
      role: "VP of People Operations",
      company: "Apex Technologies",
      quote: "Deploying facial attendance on our existing iPad reception stands took 15 minutes. We stopped buddy punching completely on day one, and payroll calculation time dropped by 80%.",
      stars: 5
    },
    {
      name: "David Vance",
      role: "Chief Operations Officer",
      company: "Logix Fulfillment",
      quote: "With 300+ warehouse employees working across three shifts, previous biometric fingerprint sensors constantly failed with dirty hands. HRDuo’s camera scan works under 200 milliseconds every single time.",
      stars: 5
    },
    {
      name: "Ananya Patel",
      role: "Head of HR",
      company: "Starlight Digital",
      quote: "The privacy architecture made our compliance team very happy. Knowing zero actual images are saved and only 128D mathematical vectors are stored gave our team total confidence.",
      stars: 5
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <Badge variant="yellow">Customer Stories</Badge>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
          Trusted by Leaders Nationwide
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-medium">
          See how teams streamline attendance, eliminate errors, and automate payroll.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="bg-white/95 backdrop-blur-sm rounded-3xl sm:rounded-[2rem] border border-[#F1E8D9] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 flex flex-col justify-between hover:shadow-xl transition-all"
          >
            <div>
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(rev.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                "{rev.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-amber-800 font-bold flex items-center justify-center text-xs">
                {rev.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm leading-tight">{rev.name}</h4>
                <p className="text-xs text-slate-500">{rev.role} · {rev.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
