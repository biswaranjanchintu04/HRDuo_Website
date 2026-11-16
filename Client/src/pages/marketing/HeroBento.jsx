import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Building2, Play, Pause, Warehouse,
  Volume2, VolumeX, Maximize2, RotateCcw
} from 'lucide-react';

export function HeroBento() {
  const navigate = useNavigate();

  // Video State for HRDuo Promo
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(20);

  const handleStartPlay = () => {
    setHasStarted(true);
    setIsPlaying(true);
    setIsMuted(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        // Fallback if browser requires mute for initial play
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
        }
      });
    }
  };

  const togglePlay = () => {
    if (!hasStarted) {
      handleStartPlay();
      return;
    }
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current && duration) {
      videoRef.current.currentTime = Math.max(0, Math.min(pos * duration, duration));
    }
  };

  const handleFullscreen = (e) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="relative pt-6 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background radial gradient glow matching HRDuo navy and teal */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[420px] bg-gradient-to-tr from-[#002D62]/10 via-[#00A8A8]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Centered Hero Content */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

        {/* HRDuo Brand Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF3FA] border border-[#D9E2EC] text-[#002D62] text-xs sm:text-sm font-semibold mb-6 shadow-2xs"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#00A8A8] animate-pulse" />
          <span>Smart HR. Stronger Together.</span>
          <span className="text-slate-300">|</span>
          <span className="text-[#334E68] font-medium hidden sm:inline">Zero Hardware Lock-in</span>
        </motion.div>

        {/* Primary Headline Matching HRDuo Logo Colors (Navy + Teal) */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#002D62] leading-[1.12]"
        >
          Smart HRMS & Payroll for{' '}
          <span className="bg-gradient-to-r from-[#002D62] via-[#004B8D] to-[#00A8A8] bg-clip-text text-transparent">
            Modern Workforces
          </span>
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-[#334E68] max-w-2xl leading-relaxed font-normal"
        >
          One platform for every workforce. Powerful, industry-ready solutions to manage people, operations, shifts, and compliance with simplicity.
        </motion.p>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <button
            onClick={() => navigate('/contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#002D62] hover:bg-[#001D42] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-md shadow-[#002D62]/20 hover:shadow-lg hover:shadow-[#002D62]/30 transition-all cursor-pointer"
          >
            <span>Book a Live Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/solutions')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#002D62] border border-slate-200 px-6 py-3.5 rounded-full font-bold text-sm shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <span>Explore Solutions</span>
          </button>
        </motion.div>

        {/* Trust Badges Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-6 text-xs sm:text-sm text-[#486581]"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#00A8A8]" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#00A8A8]" />
            <span>5-Minute Onboarding</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#00A8A8]" />
            <span>Mobile App & Web Kiosk</span>
          </div>
        </motion.div>

      </div>

      {/* Hero Video Showcase Card: Clean Frame with Custom Thumbnail (Top Mock Bar Removed) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-12 sm:mt-16 max-w-5xl mx-auto"
      >
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-950 aspect-video group">
          {/* Native Video Element */}
          <video
            ref={videoRef}
            src="/HRDuo_Promo_20s_audio.mp4"
            poster="/hrduo_video_thumbnail.jpg"
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* ── THUMBNAIL OVERLAY (Shown before playback starts) ── */}
          {!hasStarted && (
            <div 
              onClick={handleStartPlay}
              className="absolute inset-0 z-20 cursor-pointer group/thumb flex items-center justify-center"
            >
              {/* Thumbnail Image */}
              <img 
                src="/hrduo_video_thumbnail.jpg" 
                alt="HRDuo - Manage People. Simplify Work." 
                className="w-full h-full object-cover"
              />

              {/* Gentle Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

              {/* Big Animated Center Play Button */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#00A8A8] hover:bg-[#008f8f] text-white flex items-center justify-center shadow-[0_0_50px_rgba(0,168,168,0.7)] group-hover/thumb:scale-110 transition-all duration-300">
                  <Play size={36} className="ml-1 text-white fill-white" />
                </div>
                <div className="bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-white text-xs font-bold shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Watch Overview (20s) · Click to Play</span>
                </div>
              </div>
            </div>
          )}

          {/* ── ACTIVE VIDEO CONTROLS & OVERLAYS (When started) ── */}
          {hasStarted && (
            <>
              {/* Big Center Play/Pause Overlay Indicator when paused or hovered */}
              <div 
                onClick={togglePlay}
                className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-200 cursor-pointer ${
                  !isPlaying ? 'opacity-100 bg-black/40' : 'opacity-0 group-hover:opacity-100 bg-black/10'
                }`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#002D62]/90 hover:bg-[#002D62] text-white flex items-center justify-center shadow-2xl backdrop-blur-md transform transition-transform group-hover:scale-105 border border-white/20">
                  {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1 text-teal-300 fill-teal-300" />}
                </div>
              </div>

              {/* Top Video Overlay Bar */}
              <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between z-10 pointer-events-none">
                <div className="flex items-center gap-2 pointer-events-auto">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-extrabold text-[10px] sm:text-xs border border-rose-500/40 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    LIVE PRODUCT SHOWCASE
                  </span>
                  <span className="font-mono text-xs text-white/90 font-bold hidden sm:inline">
                    HRDuo Platform Overview (20s)
                  </span>
                </div>

                {/* Sound Indicator Toggle Button */}
                <div className="flex items-center gap-2 pointer-events-auto">
                  <button
                    onClick={toggleMute}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer backdrop-blur-md shadow-md ${
                      isMuted 
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950' 
                        : 'bg-white/20 hover:bg-white/30 text-white border border-white/20'
                    }`}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-teal-300" />}
                    <span>{isMuted ? 'Muted' : 'Audio On'}</span>
                  </button>
                </div>
              </div>

              {/* Bottom Video Controls Floating Scrubber Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white z-10 opacity-95 group-hover:opacity-100 transition-opacity">
                {/* Timeline Scrubber */}
                <div 
                  onClick={handleSeek}
                  className="w-full h-1.5 hover:h-2.5 bg-white/20 hover:bg-white/30 rounded-full mb-3 cursor-pointer relative transition-all"
                >
                  <div 
                    className="h-full bg-gradient-to-r from-[#00A8A8] to-teal-300 rounded-full relative"
                    style={{ width: `${(currentTime / (duration || 20)) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md" />
                  </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>

                    <div className="font-mono text-[11px] text-slate-300">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-teal-300 font-semibold hidden sm:inline">
                      Smart Touchless Biometrics & Live Payroll
                    </span>

                    <button
                      onClick={handleFullscreen}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Industry Suites Strip: Corporate Office & Small Warehouse */}
      <div className="mt-16 sm:mt-24">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#002D62] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
            Tailored Industry Suites
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002D62] mt-3">
            Built Exclusively for Your Workplace
          </h2>
          <p className="text-sm sm:text-base text-[#486581] max-w-xl mx-auto mt-2">
            Purpose-built workforce management systems tailored specifically for modern corporate offices and fast-paced small warehouses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              suite: "Corporate Office",
              desc: "Engineered for headquarters and multi-branch enterprises. Streamline hybrid scheduling, desk allocation, mobile GPS clock-ins, statutory leave compliance, and multi-tier payroll.",
              badge: "Headquarters & Branch Offices",
              icon: Building2,
              color: "text-[#002D62]",
              bg: "bg-[#EBF3FA]",
              features: [
                "Geofenced mobile check-in with GPS & office WiFi verification",
                "Automated leave quotas, multi-level manager approvals & holidays",
                "Single-click monthly payroll ledger & direct deposit integration"
              ]
            },
            {
              suite: "Small Warehouse",
              desc: "Built for storage facilities, dispatch bays, and distribution points. Prevent buddy-punching with touchless facial recognition kiosks, track multi-shift rotations, and manage overtime.",
              badge: "Logistics & Fulfillment Bays",
              icon: Warehouse,
              color: "text-[#00A8A8]",
              bg: "bg-[#E6F8F8]",
              features: [
                "High-speed AI facial recognition kiosk (works offline in loading bays)",
                "Day/night rotating shift scheduling with automated overtime calculation",
                "Break monitoring, shift handover tracking & real-time floor attendance"
              ]
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#00A8A8]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-105 transition-transform shadow-2xs`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold text-[#627D98] bg-slate-50 px-3 py-1 rounded-full border border-slate-200 uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#002D62] mb-2.5">
                    {item.suite}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#486581] leading-relaxed font-normal mb-5">
                    {item.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 size={15} className="text-[#00A8A8] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/solutions')}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 hover:border-[#002D62] text-xs font-bold text-[#002D62] hover:bg-[#EBF3FA] transition-colors cursor-pointer"
                >
                  <span>Explore {item.suite} Suite</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
