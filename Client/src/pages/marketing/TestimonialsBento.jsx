import React from 'react';
import { Star, Sparkles } from 'lucide-react';

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
      quote: "With 300+ warehouse employees working across three shifts, previous fingerprint sensors constantly failed with dirty hands. The face kiosk works under sub-second speed every single time.",
      stars: 5
    },
    {
      name: "Ananya Patel",
      role: "Head of HR",
      company: "Starlight Digital",
      quote: "The privacy architecture made our compliance team very happy. Knowing zero raw photos are saved and only irreversible mathematical vectors are stored gave our team total confidence.",
      stars: 5
    }
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#002D62] text-xs font-semibold border border-[#D9E2EC]">
          <Sparkles className="w-3.5 h-3.5 text-[#00A8A8]" />
          Customer Stories
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#002D62]">
          Trusted by Leaders Nationwide
        </h2>
        <p className="text-base sm:text-lg text-[#334E68] font-normal">
          See how teams streamline attendance, eliminate buddy punching, and automate payroll.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-7 sm:p-8 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(rev.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-[#334E68] text-sm leading-relaxed mb-6 font-normal">
                "{rev.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EBF3FA] text-[#002D62] font-bold flex items-center justify-center text-xs border border-[#D9E2EC]">
                {rev.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-bold text-[#002D62] text-sm leading-tight">{rev.name}</h4>
                <p className="text-xs text-[#627D98] font-normal">{rev.role} · {rev.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
