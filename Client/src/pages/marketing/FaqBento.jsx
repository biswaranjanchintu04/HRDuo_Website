import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export function FaqBento() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How does the AI face biometric system protect employee privacy?",
      a: "HRDuo never stores raw photos or video feeds. During enrollment, facial landmarks are converted into a non-reversible 128-dimensional mathematical floating-point vector. This vector is AES-256 encrypted and cannot be reconstructed back into a facial photo."
    },
    {
      q: "What hardware is needed to deploy the Face Attendance Kiosk?",
      a: "Zero proprietary hardware is required. Any standard Android tablet, iPad, laptop, or desktop with a basic webcam running modern Chrome, Safari, or Edge functions as an enterprise biometric station."
    },
    {
      q: "Can HRDuo handle complex overtime, night shifts, and custom deductions?",
      a: "Yes. HRDuo features a dynamic rules engine where administrators configure shift boundaries, grace periods, overtime multipliers, allowances, and tax deductions. Attendance logs feed directly into automated payroll calculations."
    },
    {
      q: "How fast is facial verification during peak morning rush hours?",
      a: "Face recognition occurs in under 200 milliseconds directly in the browser via edge-accelerated models. A single kiosk can process 30+ employee check-ins per minute without queues, complete with anti-spoofing checks."
    },
    {
      q: "Can attendance and payroll reports be exported to existing ERPs and Excel?",
      a: "Yes. All attendance timesheets, leave histories, and payroll summaries can be exported in one click to Excel and CSV. We also support automated scheduled email summaries and REST API webhooks."
    },
    {
      q: "What happens if our office internet connection drops temporarily?",
      a: "The attendance kiosk features resilient offline-first caching. Timestamped biometric punches are stored securely in local browser storage and automatically sync to the server the moment connectivity is restored."
    },
    {
      q: "Is there a limit to how many employees or kiosks we can register?",
      a: "No artificial limits. Depending on your subscription tier, you can configure unlimited front-desk kiosks across different office branches and scale seamlessly to thousands of employees."
    }
  ];

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <Badge variant="yellow">Frequently Asked Questions</Badge>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
          Got Questions? We Have Answers.
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-medium">
          Everything you need to know about HRDuo's biometric AI, compliance, and automated payroll.
        </p>
      </div>

      {/* Stack of Individual FAQ Cards matching user reference image */}
      <div className="space-y-4 sm:space-y-5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              initial={false}
              className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                isOpen 
                  ? 'border-slate-900 shadow-md ring-1 ring-slate-900/10' 
                  : 'border-slate-200/90 hover:border-slate-400 shadow-sm'
              }`}
              onClick={() => toggleIndex(idx)}
            >
              {/* Question Row */}
              <div className="p-5 sm:p-6 sm:px-8 flex items-center justify-between gap-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 text-left leading-snug">
                  {faq.q}
                </h3>

                {/* Circular Plus Button with Distinctive Shadow from Reference */}
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_0_#0F172A] transition-transform"
                >
                  <Plus className="w-5 h-5 text-slate-900 stroke-[2.5]" />
                </motion.div>
              </div>

              {/* Expandable Answer */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 sm:px-8 pb-6 pt-1 border-t border-slate-100 text-slate-600 text-sm sm:text-base leading-relaxed text-left">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Support Contact Prompt */}
      <div className="mt-14 text-center">
        <p className="text-sm font-semibold text-slate-600">
          Still have a question?{' '}
          <a
            href="mailto:support@hrduo.com"
            className="text-slate-950 font-bold underline decoration-[#FFC933] decoration-2 underline-offset-4 hover:text-[#008C75] transition-colors"
          >
            Chat with our engineering team
          </a>
        </p>
      </div>
    </section>
  );
}
