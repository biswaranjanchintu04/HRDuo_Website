import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Star, Lightbulb, Users, Shield
} from 'lucide-react';

function WhatsAppIcon({ className = "w-5 h-5 text-[#25D366]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export function HeroBento() {
  const navigate = useNavigate();

  const avatars = [
    {
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      alt: "Professional 1"
    },
    {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      alt: "Professional 2"
    },
    {
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      alt: "Professional 3"
    },
    {
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      alt: "Professional 4"
    },
    {
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      alt: "Professional 5"
    }
  ];

  const handleBookConsultation = () => {
    navigate('/contact');
  };

  const handleChatWithUs = () => {
    window.open('https://wa.me/?text=Hello!%20I%20would%20like%20to%20learn%20more%20about%20HRDuo.', '_blank');
  };

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      
      {/* Decorative subtle floating warm accents */}
      <div className="absolute top-10 -left-6 w-12 h-12 rounded-2xl bg-[#FFD027]/20 -rotate-12 pointer-events-none" />
      <div className="absolute top-28 -right-6 w-14 h-14 rounded-2xl bg-[#FFD027]/15 rotate-12 pointer-events-none" />

      {/* Main Centered Hero Content replicating reference layout with HRDuo content */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

        {/* Big Centered Headline: Your People. Our Priority. */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1 sm:space-y-2 select-none"
        >
          {/* Top Line: Your People. */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight text-slate-950 leading-[1.12]">
            <span className="inline-flex items-center justify-center flex-wrap gap-x-3">
              <span>Your People.</span>
              {/* Stylized Yellow Circle with Friendly Brand Smile Emblem */}
              <span className="inline-flex items-center justify-center align-middle mx-1 -mt-1 w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-[#FFD027] border-2 sm:border-[3.5px] border-slate-950 shadow-[2px_2px_0px_#000] relative">
                <svg 
                  className="w-6 h-6 sm:w-9 sm:h-9 text-slate-950" 
                  viewBox="0 0 32 32" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11.5" r="2.2" fill="currentColor" />
                  <path 
                    d="M9 18.5C11.5 22.5 19.5 22.5 22.5 17.5" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                  />
                </svg>
              </span>
            </span>
          </h1>

          {/* Bottom Line: Our Priority. */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight text-slate-950 leading-[1.12]">
            <span>Our </span>
            <span className="text-[#FFC727] font-black relative inline-block drop-shadow-[0_2.5px_0px_rgba(0,0,0,0.95)]">
              Priority.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base sm:text-lg text-slate-600 font-medium max-w-xl mx-auto leading-relaxed pt-5 sm:pt-6"
        >
          We help businesses build stronger teams, streamline HR processes, and create better workplaces — all in one simple, powerful platform.
        </motion.p>

        {/* Action Buttons Row with Neo-Brutalist styling from reference */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-row items-center justify-center gap-3.5 sm:gap-5 pt-8 sm:pt-9"
        >
          {/* Primary CTA: Book a Consultation */}
          <button
            onClick={handleBookConsultation}
            className="bg-[#FFD027] hover:bg-[#F5C21B] text-slate-950 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-black text-sm sm:text-base flex items-center gap-2 border-2 border-slate-950 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>

          {/* Secondary CTA: Chat with Us */}
          <button
            onClick={handleChatWithUs}
            className="bg-white hover:bg-slate-50 text-slate-950 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-black text-sm sm:text-base flex items-center gap-2.5 border-2 border-slate-950 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            <span>Chat with Us</span>
          </button>
        </motion.div>

        {/* Social Proof Strip: Avatars + 4.5 Stars + Counter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5 pt-8 sm:pt-10"
        >
          {/* Overlapping circular avatar headshots */}
          <div className="flex -space-x-2.5 overflow-hidden">
            {avatars.map((avatar, idx) => (
              <img
                key={idx}
                src={avatar.url}
                alt={avatar.alt}
                className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover shadow-xs"
              />
            ))}
          </div>

          {/* Star Rating Group */}
          <div className="flex items-center text-[#FFB800] gap-0.5 ml-1">
            <Star className="w-4 h-4 fill-[#FFB800]" />
            <Star className="w-4 h-4 fill-[#FFB800]" />
            <Star className="w-4 h-4 fill-[#FFB800]" />
            <Star className="w-4 h-4 fill-[#FFB800]" />
            <div className="relative w-4 h-4">
              <Star className="w-4 h-4 text-slate-300" />
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
              </div>
            </div>
          </div>

          {/* Rating Score Number */}
          <span className="font-extrabold text-sm sm:text-base text-slate-900 ml-0.5">
            4.5
          </span>

          {/* Subtle Vertical Divider */}
          <div className="h-4 w-[1px] bg-slate-400/60 mx-1 sm:mx-2 hidden sm:block" />

          {/* Social Proof Tagline */}
          <span className="text-xs sm:text-sm font-semibold italic text-slate-700">
            4500+ Professionals already transformed
          </span>
        </motion.div>

      </div>

      {/* 3-Column Feature Cards Strip below hero */}
      <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 01: Innovation */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-[#F1E8D9] shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-start gap-4 hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] flex items-center justify-center text-amber-600 flex-shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-1">01</span>
            <h3 className="text-lg font-black text-slate-900 mb-1.5">Innovation</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Modern workforce solutions designed for a smarter tomorrow.
            </p>
          </div>
        </div>

        {/* Card 02: Smart Solutions */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-[#F1E8D9] shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-start gap-4 hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] flex items-center justify-center text-[#008C75] flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-1">02</span>
            <h3 className="text-lg font-black text-slate-900 mb-1.5">Smart Solutions</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Streamline processes and boost productivity across teams.
            </p>
          </div>
        </div>

        {/* Card 03: Reliable Service */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-[#F1E8D9] shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-start gap-4 hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] flex items-center justify-center text-amber-600 flex-shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-1">03</span>
            <h3 className="text-lg font-black text-slate-900 mb-1.5">Reliable Service</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Dedicated enterprise support whenever you need us.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
