import React from 'react';
import { Camera, AlertCircle, RefreshCw, Sparkles, CheckCircle2, ShieldCheck, Eye } from 'lucide-react';

export const CameraStream = ({
  videoRef,
  isReady,
  error,
  onRetry,
  guideText = 'Position your face inside the frame',
  subText = '',
  status = 'idle', // 'idle' | 'detecting' | 'verifying' | 'success' | 'error'
  recordingProgress = null, // { isRecording: boolean, percent: number, secondsLeft: string }
  className = '',
}) => {
  const getBorderColor = () => {
    if (recordingProgress?.isRecording) {
      return 'border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.5)] ring-4 ring-rose-500/30';
    }
    switch (status) {
      case 'success':
        return 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)] ring-4 ring-emerald-500/20';
      case 'error':
        return 'border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.5)] ring-4 ring-rose-500/20';
      case 'verifying':
        return 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.5)] animate-pulse ring-4 ring-amber-400/20';
      case 'detecting':
        return 'border-[#008C75] shadow-[0_0_30px_rgba(0,140,117,0.5)] ring-4 ring-[#008C75]/20';
      default:
        return 'border-slate-600/60 hover:border-slate-400';
    }
  };

  const getGuideBg = () => {
    if (recordingProgress?.isRecording) {
      return 'bg-rose-600 text-white shadow-rose-600/40';
    }
    switch (status) {
      case 'success':
        return 'bg-emerald-600 text-white shadow-emerald-600/30';
      case 'error':
        return 'bg-rose-600 text-white shadow-rose-600/30';
      case 'verifying':
        return 'bg-amber-500 text-slate-950 font-black shadow-amber-500/30';
      case 'detecting':
        return 'bg-[#008C75] text-white shadow-[#008C75]/30';
      default:
        return 'bg-slate-900/90 text-white border border-white/10';
    }
  };

  return (
    <div className={`relative w-full aspect-[3/4] sm:aspect-[16/11] rounded-[2rem] sm:rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl transition-all duration-300 flex items-center justify-center select-none ${className}`}>
      {/* Live Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transform -scale-x-100 transition-opacity duration-300 ${
          !isReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Futuristic Corner HUD Brackets */}
      <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-[#FFC933] rounded-tl-lg pointer-events-none z-10 opacity-80" />
      <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-[#FFC933] rounded-tr-lg pointer-events-none z-10 opacity-80" />
      <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-[#FFC933] rounded-bl-lg pointer-events-none z-10 opacity-80" />
      <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-[#FFC933] rounded-br-lg pointer-events-none z-10 opacity-80" />

      {/* Starting State */}
      {!isReady && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400 p-6 text-center bg-slate-950">
          <div className="w-16 h-16 rounded-2xl bg-[#008C75]/10 border border-[#008C75]/30 flex items-center justify-center">
            <Camera className="w-8 h-8 animate-pulse text-[#008C75]" />
          </div>
          <p className="text-sm font-bold text-white">Initializing Optical Biometric Sensor...</p>
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
            Please allow browser camera permissions for touchless facial recognition
          </p>
        </div>
      )}

      {/* Camera Error State */}
      {error && (
        <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center z-20">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-3">
            <AlertCircle className="w-7 h-7 text-rose-400" />
          </div>
          <h4 className="text-white font-bold text-base mb-1">Camera Feed Offline</h4>
          <p className="text-slate-400 text-xs mb-4 max-w-xs leading-relaxed">{error}</p>
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FFC933] hover:bg-[#F5C21B] active:scale-95 text-slate-950 text-xs font-black rounded-xl transition shadow-lg cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Camera Access
          </button>
        </div>
      )}

      {/* Biometric Scanning Overlay */}
      {isReady && !error && (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-3.5 sm:p-5 z-10">
          {/* Top HUD */}
          <div className="w-full flex justify-between items-center text-[11px] text-white/90 bg-slate-950/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
            {recordingProgress?.isRecording ? (
              <span className="flex items-center gap-2 font-bold text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                REC [{recordingProgress.secondsLeft || '0.0'}s]
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-semibold text-xs">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status === 'detecting' || status === 'verifying'
                      ? 'bg-emerald-400 animate-ping'
                      : 'bg-emerald-400'
                  }`}
                />
                Live Biometric
              </span>
            )}
            <span className="font-mono text-[10px] tracking-wider text-amber-300 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              ANTI-SPOOF 3D
            </span>
          </div>

          {/* Biometric Target Face Oval (Tailored for mobile portrait & desktop) */}
          <div
            className={`relative w-44 sm:w-48 h-60 sm:h-60 border-2 border-dashed rounded-[50%] transition-all duration-300 ${getBorderColor()} shadow-2xl flex items-center justify-center`}
          >
            {/* Horizontal Laser Scanning Line */}
            {(status === 'verifying' || status === 'detecting') && !recordingProgress?.isRecording && (
              <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent blur-[1px] shadow-[0_0_20px_#f59e0b] animate-bounce top-1/2 -translate-y-1/2" />
            )}

            {/* Video Recording Live Scan Line */}
            {recordingProgress?.isRecording && (
              <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent blur-[1px] shadow-[0_0_20px_#f43f5e] animate-pulse top-1/2 -translate-y-1/2" />
            )}

            {status === 'success' && (
              <div className="w-16 h-16 rounded-full bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-9 h-9 text-emerald-400 animate-scale-up" />
              </div>
            )}

            {/* Eye region guidance markers */}
            <div className="absolute top-[34%] w-24 flex justify-between px-2 opacity-30 text-white">
              <Eye className="w-4 h-4" />
              <Eye className="w-4 h-4" />
            </div>
          </div>

          {/* Bottom Guidance Pill & Progress Bar */}
          <div className="w-full flex flex-col items-center gap-2">
            {recordingProgress?.isRecording && (
              <div className="w-48 sm:w-52 bg-slate-900/90 rounded-full h-2 overflow-hidden border border-white/20 shadow-inner">
                <div
                  className="bg-gradient-to-r from-rose-500 to-amber-500 h-full transition-all duration-150"
                  style={{ width: `${recordingProgress.percent}%` }}
                />
              </div>
            )}

            <div
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-black tracking-wide shadow-xl backdrop-blur-md transition-all duration-300 text-center ${getGuideBg()}`}
            >
              {guideText}
            </div>
            {subText && (
              <span className="text-[10px] text-white/80 bg-slate-950/60 backdrop-blur-sm px-3 py-0.5 rounded-full border border-white/5">
                {subText}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraStream;
