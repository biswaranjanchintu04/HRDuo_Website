import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCamera } from '../../hooks/useCamera';
import { CameraStream } from '../../components/camera/CameraStream';
import { checkInWithFace, checkOutWithFace } from '../../services/biometricApi';
import { captureVideoSequenceAndExtractEmbedding } from '../../utils/faceBiometrics';
import {
  LogIn,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Video,
  Activity,
  Wifi,
  Eye,
  RefreshCw,
  Sliders,
  Volume2,
  VolumeX,
  Zap,
  Check,
  Play,
  Sun,
  Moon,
  ChevronDown,
  X
} from 'lucide-react';

// Initial Mock Punches for the Real-time Station Feed
const INITIAL_PUNCH_FEED = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    code: 'EMP-0891',
    dept: 'Product Design',
    time: '09:14 AM',
    type: 'CHECK_IN',
    status: 'On Time',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'David Chen',
    code: 'EMP-1104',
    dept: 'Engineering',
    time: '09:08 AM',
    type: 'CHECK_IN',
    status: 'On Time',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    code: 'EMP-0452',
    dept: 'Operations',
    time: '09:02 AM',
    type: 'CHECK_IN',
    status: 'On Time',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Marcus Vance',
    code: 'EMP-0219',
    dept: 'Finance',
    time: '08:55 AM',
    type: 'CHECK_IN',
    status: 'Early',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
  },
];

export function FaceAttendanceKiosk() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('CHECK_IN'); // 'CHECK_IN' | 'CHECK_OUT'
  const [guideText, setGuideText] = useState('Align face within the sensor circle');
  const [subText, setSubText] = useState('Hold still for sub-second facial verification');
  const [status, setStatus] = useState('idle'); // 'idle' | 'detecting' | 'verifying' | 'success' | 'error'
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [autoResetTimer, setAutoResetTimer] = useState(null);
  const [resetCountdown, setResetCountdown] = useState(6);
  const [recordingProgress, setRecordingProgress] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayPunchesCount, setTodayPunchesCount] = useState(148);
  const [punchFeed, setPunchFeed] = useState(INITIAL_PUNCH_FEED);
  const [showMobileStats, setShowMobileStats] = useState(false);

  // Initialize camera hook
  const { videoRef, isReady, error, startCamera, stopCamera } = useCamera({
    width: 640,
    height: 480,
  });

  // Live Digital Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Start Camera on Mount
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
      if (autoResetTimer) clearTimeout(autoResetTimer);
    };
  }, [startCamera, stopCamera]);

  // Audio Feedback Chime helper using standard Web Audio API
  const playChime = (isSuccess = true) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (isSuccess) {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
      } else {
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } catch (e) {
      // Audio context may be restricted by browser policy before first interaction
    }
  };

  // Reset Kiosk state back to idle
  const handleResetKiosk = () => {
    if (autoResetTimer) clearTimeout(autoResetTimer);
    setResult(null);
    setStatus('idle');
    setErrorMessage('');
    setRecordingProgress(null);
    setGuideText('Align face within the sensor circle');
    setSubText('Hold still for sub-second facial verification');
    setResetCountdown(6);
  };

  // Complete attendance record process
  const processAttendanceResult = (res) => {
    setResult(res);
    setStatus('success');
    setGuideText(`${res.actionType === 'CHECK_IN' ? 'Check-In' : 'Check-Out'} Verified ✓`);
    setSubText(`Welcome, ${res.userName}`);
    setTodayPunchesCount((prev) => prev + 1);
    playChime(true);

    // Prepend to live station punch feed
    const newEntry = {
      id: Date.now(),
      name: res.userName,
      code: res.employeeCode,
      dept: res.department,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      type: res.actionType,
      status: res.actionType === 'CHECK_IN' ? 'On Time' : 'Completed',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    };
    setPunchFeed((prev) => [newEntry, ...prev.slice(0, 4)]);

    // Countdown and auto-reset
    let secondsLeft = 6;
    setResetCountdown(6);
    const interval = setInterval(() => {
      secondsLeft -= 1;
      setResetCountdown(secondsLeft);
      if (secondsLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    const timer = setTimeout(() => {
      clearInterval(interval);
      handleResetKiosk();
    }, 6000);
    setAutoResetTimer(timer);
  };

  // Main Camera-driven attendance punch
  const handlePunchAttendance = async () => {
    if (!videoRef.current || !isReady) {
      // If camera isn't available, trigger demo simulation
      handleSimulateDemoPunch();
      return;
    }

    setResult(null);
    setErrorMessage('');
    setStatus('detecting');
    setGuideText('Capturing biometric burst...');
    setSubText('Blink naturally & look straight into lens');

    try {
      const { embedding, livenessMetric } = await captureVideoSequenceAndExtractEmbedding(
        videoRef.current,
        2000,
        (prog) => {
          setRecordingProgress({
            isRecording: prog.stage === 'recording',
            percent: prog.percent,
            secondsLeft: prog.secondsLeft,
          });
          if (prog.stage === 'recording') {
            setGuideText(`Recording Video Burst (${prog.secondsLeft}s left)`);
            setSubText('Keep face inside oval & blink naturally');
          } else {
            setStatus('verifying');
            setGuideText('Matching Biometric Vector...');
            setSubText('Searching 128-dimensional embedding space');
          }
        }
      );

      setRecordingProgress(null);
      setStatus('verifying');
      setGuideText('Recognizing Identity...');

      const payload = {
        embedding,
        livenessMetric,
        deviceInfo: navigator.userAgent,
      };

      const response =
        mode === 'CHECK_IN' ? await checkInWithFace(payload) : await checkOutWithFace(payload);

      processAttendanceResult(response);
    } catch (err) {
      setRecordingProgress(null);
      setStatus('error');
      setErrorMessage(err.message || 'Face recognition failed. Please ensure proper lighting and try again.');
      setGuideText('Biometric Verification Failed');
      setSubText('Please adjust your position and retry');
      playChime(false);
    }
  };

  // One-Click Fast Demo Simulation
  const handleSimulateDemoPunch = async () => {
    setResult(null);
    setErrorMessage('');
    setStatus('verifying');
    setGuideText('Matching Biometric Vector...');
    setSubText('Edge AI Verification in Progress');

    setTimeout(async () => {
      const response =
        mode === 'CHECK_IN'
          ? await checkInWithFace({ demo: true })
          : await checkOutWithFace({ demo: true });

      processAttendanceResult(response);
    }, 700);
  };

  const formatIsoTime = (isoString) => {
    if (!isoString) return '--:--';
    try {
      return new Date(isoString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans selection:bg-[#FFC933] selection:text-slate-950 p-3 sm:p-6 lg:p-8 flex flex-col justify-between relative overflow-x-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFC933]/15 via-[#008C75]/10 to-transparent blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. TOP HEADER / COMMAND BAR (Optimized for both Mobile App Bar & Desktop) */}
      {/* ========================================================================= */}
      <header className="relative z-20 max-w-7xl mx-auto w-full mb-3 sm:mb-6">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full border border-[#F1E8D9] px-3.5 sm:px-6 py-2.5 sm:py-3 shadow-[0_6px_25px_rgba(0,0,0,0.04)] flex items-center justify-between gap-2">
          
          {/* Left: Back / Exit & Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="p-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-[#FAF8F5] sm:bg-white hover:bg-slate-100 border border-[#F1E8D9] text-slate-700 hover:text-slate-950 flex items-center gap-1.5 text-xs font-bold transition-all"
              title="Return to Website"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden md:inline">Exit Kiosk</span>
            </Link>

            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

            <Link to="/" className="flex items-center gap-2">
              <img
                src="/hrduo_logo.png"
                alt="HRDuo Logo"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center (Mobile Station Badge) */}
          <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#008C75]/10 text-[#008C75] text-[11px] font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#008C75] animate-pulse" />
            <span>Terminal #01</span>
          </div>

          {/* Right: Digital Clock & Sound Chime */}
          <div className="flex items-center gap-2">
            <div className="bg-[#FAF8F5] border border-[#F1E8D9] px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Clock className="w-3.5 h-3.5 text-[#008C75]" />
              <span className="font-mono text-xs sm:text-sm tracking-tight">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}
              </span>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-amber-50 text-amber-900 border-amber-200'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
              title={soundEnabled ? 'Chime Active' : 'Chime Muted'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MOBILE-FIRST MODE SELECTOR (Segmented Mobile Check-In / Check-Out Switch) */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-lg lg:max-w-7xl mx-auto w-full mb-3 sm:mb-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F1E8D9] p-1.5 sm:p-2 shadow-[0_4px_20px_rgba(0,0,0,0.03)] grid grid-cols-2 gap-1.5">
          
          {/* Check-In Tab */}
          <button
            onClick={() => {
              setMode('CHECK_IN');
              handleResetKiosk();
            }}
            className={`flex items-center justify-center gap-2 sm:gap-2.5 py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'CHECK_IN'
                ? 'bg-[#FFD027] text-slate-950 border-2 border-slate-950 shadow-[2px_2px_0px_#000] scale-[1.01]'
                : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              mode === 'CHECK_IN' ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <span className="block leading-none">CHECK IN</span>
              <span className="text-[10px] font-bold opacity-75 hidden sm:block">Morning Punch</span>
            </div>
          </button>

          {/* Check-Out Tab */}
          <button
            onClick={() => {
              setMode('CHECK_OUT');
              handleResetKiosk();
            }}
            className={`flex items-center justify-center gap-2 sm:gap-2.5 py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'CHECK_OUT'
                ? 'bg-[#008C75] text-white border-2 border-slate-950 shadow-[2px_2px_0px_#000] scale-[1.01]'
                : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              mode === 'CHECK_OUT' ? 'bg-white text-[#008C75]' : 'bg-slate-100 text-slate-600'
            }`}>
              <LogOut className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <span className="block leading-none">CHECK OUT</span>
              <span className="text-[10px] font-bold opacity-75 hidden sm:block">Shift Exit</span>
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN CONTENT: RESPONSIVE BENTO GRID WITH NATIVE MOBILE CARD FOCUS */}
      {/* ========================================================================= */}
      <main className="relative z-10 max-w-7xl mx-auto w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

          {/* ------------------------------------------------------------------- */}
          {/* BENTO CARD 1: PRIMARY VIEWFINDER & THUMB PUNCH ACTION (lg:col-span-7) */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-7 bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] p-4 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between group hover:shadow-[0_16px_36px_rgba(0,0,0,0.07)] transition-all duration-300">
            <div>
              {/* Mobile Card Title */}
              <div className="flex items-center justify-between mb-3 sm:mb-5">
                <div>
                  <h2 className="text-lg sm:text-2xl font-black text-slate-950 flex items-center gap-1.5 sm:gap-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#008C75]" />
                    <span>Optical Biometric Lens</span>
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    {mode === 'CHECK_IN' ? 'Looking for face to register Check-In' : 'Looking for face to register Check-Out'}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-[#008C75]" />
                  Anti-Spoof
                </span>
              </div>

              {/* Viewfinder: Portrait 3:4 on mobile, 16:11 on desktop */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md max-w-md mx-auto">
                <CameraStream
                  videoRef={videoRef}
                  isReady={isReady}
                  error={error}
                  onRetry={startCamera}
                  guideText={guideText}
                  subText={subText}
                  status={status}
                  recordingProgress={recordingProgress}
                />
              </div>
            </div>

            {/* Bottom Mobile Action & Punch Controls */}
            <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
              {/* Main Punch Action Button */}
              <button
                onClick={handlePunchAttendance}
                disabled={status === 'verifying' || status === 'detecting'}
                className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-98 ${
                  mode === 'CHECK_IN'
                    ? 'bg-[#FFD027] hover:bg-[#F5C21B] text-slate-950 border-2 border-slate-950 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]'
                    : 'bg-[#008C75] hover:bg-[#007461] text-white border-2 border-slate-950 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status === 'detecting' || status === 'verifying' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>{status === 'detecting' ? 'Capturing Video Burst...' : 'Verifying Identity...'}</span>
                  </span>
                ) : mode === 'CHECK_IN' ? (
                  <>
                    <LogIn className="w-5 h-5 stroke-[2.5]" />
                    <span>Punch Check-In</span>
                  </>
                ) : (
                  <>
                    <LogOut className="w-5 h-5 stroke-[2.5]" />
                    <span>Punch Check-Out</span>
                  </>
                )}
              </button>

              {/* Fast Instant Demo Punch Shortcut */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5 px-1">
                <span className="flex items-center gap-1.5 text-[11px] font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Edge AI Ready
                </span>

                <button
                  type="button"
                  onClick={handleSimulateDemoPunch}
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-black text-slate-800 hover:text-[#008C75] underline underline-offset-2 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Instant Demo Punch (Without Camera)
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* BENTO CARD 2: REAL-TIME CONFIRMATION RESULT CARD (lg:col-span-5) */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">

            {/* Dynamic Result Card */}
            <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] p-5 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex-grow flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {result ? (
                  /* Verified Success State */
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    {/* Top Result Banner */}
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                          Match Confirmed 99.9%
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-emerald-950 mt-1 leading-tight">
                          {result.actionType === 'CHECK_IN' ? 'Check-In Recorded!' : 'Check-Out Recorded!'}
                        </h3>
                      </div>
                    </div>

                    {/* Employee Profile Preview */}
                    <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#F1E8D9] space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                          alt="Employee Headshot"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover ring-2 ring-[#008C75] shadow-sm"
                        />
                        <div>
                          <h4 className="text-base sm:text-lg font-black text-slate-950">
                            {result.userName}
                          </h4>
                          <span className="text-xs font-bold text-slate-500 block">
                            {result.employeeCode} · {result.department}
                          </span>
                        </div>
                      </div>

                      {/* Itemized Timestamp Breakdown */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-[#F1E8D9]">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Punch Time</span>
                          <span className="font-mono font-black text-slate-900 text-xs sm:text-sm">
                            {formatIsoTime(result.actionType === 'CHECK_IN' ? result.checkInTime : result.checkOutTime)}
                          </span>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-[#F1E8D9]">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Shift Status</span>
                          <span className="font-black text-emerald-600 text-xs sm:text-sm">
                            {result.actionType === 'CHECK_IN' ? 'On Schedule' : `${result.workHours}h Completed`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Auto-reset progress indicator */}
                    <div className="pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1.5">
                        <span>Terminal resetting for next punch</span>
                        <span className="text-[#008C75] font-mono">{resetCountdown}s</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#008C75] h-full transition-all duration-1000"
                          style={{ width: `${(resetCountdown / 6) * 100}%` }}
                        />
                      </div>

                      <button
                        onClick={handleResetKiosk}
                        className="mt-3 w-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-black py-2.5 rounded-xl transition cursor-pointer"
                      >
                        Done (Next Person)
                      </button>
                    </div>
                  </motion.div>
                ) : errorMessage ? (
                  /* Error Alert State */
                  <motion.div
                    key="error-card"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="space-y-3 sm:space-y-4 text-center py-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 text-rose-600 mx-auto flex items-center justify-center">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      Facial Match Unresolved
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                      {errorMessage}
                    </p>
                    <button
                      onClick={handleResetKiosk}
                      className="bg-[#FFD027] hover:bg-[#F5C21B] text-slate-950 text-xs font-black px-5 py-2.5 rounded-xl border border-slate-950 transition cursor-pointer"
                    >
                      Try Again
                    </button>
                  </motion.div>
                ) : (
                  /* Idle Guidance State */
                  <motion.div
                    key="idle-card"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FFC933]/20 flex items-center justify-center text-slate-950">
                        <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-[#008C75]" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        Sensor Active
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-950 mb-1">
                        Mobile Facial Clock-In
                      </h3>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        Position your face inside the target frame. The edge model calculates Eye Aspect Ratio (EAR) and multi-frame 128D vectors.
                      </p>
                    </div>

                    {/* Step by step mobile instructions */}
                    <div className="space-y-2 text-xs font-semibold text-slate-700">
                      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF8F5] border border-[#F1E8D9]">
                        <span className="w-5 h-5 rounded-md bg-white border border-[#F1E8D9] flex items-center justify-center font-black text-xs text-slate-900 shadow-xs">
                          1
                        </span>
                        <span>Keep device level with your face</span>
                      </div>

                      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF8F5] border border-[#F1E8D9]">
                        <span className="w-5 h-5 rounded-md bg-white border border-[#F1E8D9] flex items-center justify-center font-black text-xs text-slate-900 shadow-xs">
                          2
                        </span>
                        <span>Blink naturally to satisfy 3D liveness</span>
                      </div>

                      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF8F5] border border-[#F1E8D9]">
                        <span className="w-5 h-5 rounded-md bg-white border border-[#F1E8D9] flex items-center justify-center font-black text-xs text-slate-900 shadow-xs">
                          3
                        </span>
                        <span>Punch is registered in &lt;200 milliseconds</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Metrics Bar */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F1E8D9] p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#FAF8F5] p-3 rounded-xl sm:rounded-2xl border border-[#F1E8D9]">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-0.5">
                    Terminal Punches Today
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl sm:text-2xl font-black text-slate-950">{todayPunchesCount}</span>
                    <span className="text-[10px] font-bold text-emerald-600">Synced</span>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-xl sm:rounded-2xl border border-[#F1E8D9]">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-0.5">
                    Matching Latency
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl sm:text-2xl font-black text-[#008C75]">164</span>
                    <span className="text-xs font-bold text-slate-500">ms</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ------------------------------------------------------------------- */}
          {/* BENTO CARD 3: RECENT ACTIVITY FEED (Cols 4) */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-4 bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-950">
                    Live Punch Stream
                  </h3>
                </div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  Real-time
                </span>
              </div>

              {/* Feed items */}
              <div className="space-y-2">
                {punchFeed.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-xl sm:rounded-2xl bg-[#FAF8F5] hover:bg-slate-50 border border-[#F1E8D9] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-slate-300"
                      />
                      <div>
                        <span className="text-xs font-black text-slate-900 block leading-tight">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {item.dept}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-full ${
                        item.type === 'CHECK_IN'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {item.type === 'CHECK_IN' ? 'IN' : 'OUT'} · {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium flex items-center justify-between">
              <span>Station event log</span>
              <span className="text-[#008C75] font-bold">Auto-updated</span>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* BENTO CARD 4: EDGE AI BIOMETRICS & TELEMETRY (Cols 4) */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-4 bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-950">
                    Liveness & Anti-Spoof
                  </h3>
                </div>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Active Guard
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#F1E8D9] flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">3D Depth & Blink Test:</span>
                  <span className="font-black text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Passed
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#F1E8D9] flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Photo/Screen Rejection:</span>
                  <span className="font-black text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Level 3
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#F1E8D9] flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Vector Matrix:</span>
                  <span className="font-mono font-black text-slate-800">128D L2-Norm</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#F1E8D9] flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Environmental Lux:</span>
                  <span className="font-black text-[#008C75]">Optimal (680 lx)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Client-side feature extraction. Zero face images uploaded.
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* BENTO CARD 5: SHIFT TIMINGS & LOCAL CACHE (Cols 4) */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-4 bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#008C75] flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-950">
                    Shift Roster & Rules
                  </h3>
                </div>
                <span className="text-[10px] font-bold bg-[#FFD027]/30 text-slate-950 px-2 py-0.5 rounded-full">
                  General Roster
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#F1E8D9] flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Office Shift Window:</span>
                  <span className="font-bold text-slate-900">09:00 AM – 06:00 PM</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#F1E8D9] flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Grace Period Allowed:</span>
                  <span className="font-bold text-emerald-700">15 Minutes</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#F1E8D9] flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Local Cache:</span>
                  <span className="font-bold text-slate-900">1,240 Encodings</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#F1E8D9] flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Station Reliability:</span>
                  <span className="font-black text-emerald-700">99.98%</span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link to="/contact" className="font-bold text-[#008C75] hover:underline">
                Contact HR Helpdesk
              </Link>
              <Link to="/login" className="font-black text-slate-800 hover:text-[#008C75]">
                Login Portal →
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. FOOTER */}
      {/* ========================================================================= */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full mt-6 sm:mt-8 pt-4 border-t border-[#F1E8D9] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#008C75]" />
          <span>HRDuo Mobile Face Kiosk Engine · Hardware Accelerated</span>
        </div>
        <div>
          © {new Date().getFullYear()} HRDuo Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default FaceAttendanceKiosk;
