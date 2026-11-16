import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';

export function FaqBento() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How does the AI face biometric system protect employee privacy?",
      a: "The system never stores raw photos or video feeds. During enrollment, facial landmarks are converted into a non-reversible 128-dimensional mathematical vector. This vector is AES-256 encrypted and cannot be reconstructed back into a facial image."
    },
    {
      q: "What hardware is needed to deploy the Face Attendance Kiosk?",
      a: "Zero proprietary hardware is required. Any standard Android tablet, iPad, laptop, or desktop with a basic webcam running modern Chrome, Safari, or Edge functions as an enterprise biometric station."
    },
    {
      q: "Can the platform handle complex overtime, night shifts, and custom deductions?",
      a: "Yes. Administrators can configure custom shift boundaries, rotational rosters, grace periods, overtime multipliers, allowances, and tax deductions. Attendance logs feed directly into automated payroll calculations."
    },
    {
      q: "How fast is facial verification during peak morning rush hours?",
      a: "Face recognition occurs in under 400 milliseconds directly on the client device. A single kiosk can process 30+ employee check-ins per minute without queues, complete with anti-spoof liveness checks."
    },
    {
      q: "How does GPS Geofencing mobile attendance work?",
      a: "Administrators configure an office radius (e.g. 50 meters). When employees open the mobile app to clock in, the app queries high-precision device GPS with anti-mock location security to ensure they are physically on site."
    },
    {
      q: "What happens if our office internet connection drops temporarily?",
      a: "The attendance kiosk features resilient offline-first caching. Timestamped biometric punches are stored securely in local browser storage and automatically sync to the server the moment connectivity is restored."
    }
  ];

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#002D62] text-xs font-semibold border border-[#D9E2EC]">
          <Sparkles className="w-3.5 h-3.5 text-[#00A8A8]" />
          Frequently Asked Questions
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#002D62]">
          Got Questions? We Have Answers.
        </h2>
        <p className="text-base sm:text-lg text-[#334E68] font-normal">
          Everything you need to know about biometric AI, geofencing, compliance, and automated payroll.
        </p>
      </div>

      {/* Stack of Individual FAQ Cards */}
      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                isOpen 
                  ? 'border-[#002D62] shadow-md shadow-blue-900/10 ring-1 ring-[#002D62]/20' 
                  : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
              }`}
              onClick={() => toggleIndex(idx)}
            >
              {/* Question Row */}
              <div className="p-5 sm:p-6 sm:px-7 flex items-center justify-between gap-6">
                <h3 className="text-base sm:text-lg font-bold text-[#002D62] text-left leading-snug">
                  {faq.q}
                </h3>

                {/* Plus / Close Icon */}
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isOpen ? 'bg-[#002D62] text-white' : 'bg-[#EBF3FA] text-[#002D62]'
                  }`}
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </motion.div>
              </div>

              {/* Expandable Answer */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <div className="px-5 sm:px-7 pb-6 pt-1 border-t border-slate-100 text-[#334E68] text-sm sm:text-base leading-relaxed text-left font-normal">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
