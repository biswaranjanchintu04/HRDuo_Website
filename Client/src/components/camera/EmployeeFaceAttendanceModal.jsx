import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCamera } from '../../hooks/useCamera';
import { CameraStream } from './CameraStream';
import { checkInWithFace, checkOutWithFace } from '../../services/biometricApi';
import { captureVideoSequenceAndExtractEmbedding } from '../../utils/faceBiometrics';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  LogIn,
  LogOut,
  Sparkles,
  Camera,
  RefreshCw,
} from 'lucide-react';

export const EmployeeFaceAttendanceModal = ({
  isOpen,
  onClose,
  type = 'Check In', // 'Check In' | 'Check Out'
  onSuccess,
}) => {
  const isCheckIn = type === 'Check In' || type === 'CHECK_IN';
  const employeeName = localStorage.getItem('name') || 'Employee';

  const [status, setStatus] = useState('idle'); // 'idle' | 'detecting' | 'verifying' | 'success' | 'error'
  const [guideText, setGuideText] = useState('Position your face inside the oval');
  const [subText, setSubText] = useState('Hold still and look directly into the camera');
  const [errorMessage, setErrorMessage] = useState('');
  const [recordingProgress, setRecordingProgress] = useState(null);

  const { videoRef, isReady, error, startCamera, stopCamera } = useCamera({
    width: 640,
    height: 480,
  });

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMessage('');
      setRecordingProgress(null);
      setGuideText('Position your face inside the oval');
      setSubText('Look directly into the camera to verify identity');
      startCamera();
    } else {
      stopCamera();
    }
  }, [isOpen, startCamera, stopCamera]);

  const handleVerifyAndPunch = async () => {
    if (!videoRef.current || !isReady) return;

    setStatus('detecting');
    setErrorMessage('');
    setGuideText('Recording live biometric video...');
    setSubText('Hold still & blink naturally');

    try {
      // 1. Capture a 1.8-second live video burst for multi-frame analysis & anti-spoofing
      const { embedding, livenessMetric } = await captureVideoSequenceAndExtractEmbedding(
        videoRef.current,
        1800,
        (prog) => {
          setRecordingProgress({
            isRecording: prog.stage === 'recording',
            percent: prog.percent,
            secondsLeft: prog.secondsLeft,
          });
          if (prog.stage === 'recording') {
            setGuideText(`Recording Video Burst (${prog.secondsLeft}s)...`);
            setSubText('Keep face centered inside oval');
          } else {
            setStatus('verifying');
            setGuideText('Matching Biometric Face Data...');
            setSubText('Comparing against registered profile');
          }
        }
      );

      setRecordingProgress(null);
      setStatus('verifying');
      setGuideText('Verifying Identity in Database...');

      const storedUserId = localStorage.getItem('userId') || localStorage.getItem('id');
      const payload = {
        userId: storedUserId ? Number(storedUserId) : undefined,
        embedding: embedding,
        livenessMetric: livenessMetric,
        deviceInfo: navigator.userAgent,
      };

      const response = isCheckIn
        ? await checkInWithFace(payload)
        : await checkOutWithFace(payload);

      setStatus('success');
      setGuideText(`Face Verified! ${isCheckIn ? 'Check-In' : 'Check-Out'} Recorded ✓`);
      setSubText(response.userName ? `Welcome, ${response.userName}` : 'Attendance Stamped');

      if (onSuccess) {
        onSuccess(response);
      }

      // Auto close modal after 1.6s
      setTimeout(() => {
        onClose();
      }, 1600);
    } catch (err) {
      setRecordingProgress(null);
      setStatus('error');
      setErrorMessage(
        err.message || 'Face verification failed. Please align your face inside the oval and retry.'
      );
      setGuideText('Verification Failed');
      setSubText('Face did not match registered employee profile');
    }
  };

  const handleResetTodayAndRetry = async () => {
    try {
      const storedUserId = localStorage.getItem('userId') || localStorage.getItem('id');
      const token = localStorage.getItem('token');
      const url = storedUserId ? `/api/attendance/reset-today?userId=${storedUserId}` : '/api/attendance/reset-today';
      await fetch(url, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setStatus('idle');
      setErrorMessage('');
      setGuideText('Today\'s attendance reset! Position face inside oval');
      setSubText('Ready to record Check-In');
    } catch (err) {
      setErrorMessage('Failed to reset attendance.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={status === 'detecting' || status === 'verifying' ? undefined : onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[32px] p-6 shadow-2xl overflow-hidden z-10 flex flex-col items-center text-slate-100"
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div
                className={`p-2 rounded-2xl ${
                  isCheckIn
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}
              >
                {isCheckIn ? <LogIn className="w-5 h-5" /> : <LogOut className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Face Recognition {isCheckIn ? 'Check-In' : 'Check-Out'}
                </h3>
                <p className="text-xs text-slate-400">
                  Authenticating: <span className="font-semibold text-slate-200">{employeeName}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={status === 'detecting' || status === 'verifying'}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer disabled:opacity-30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Camera Viewfinder */}
          <div className="w-full py-4 flex flex-col items-center">
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

          {/* Error Message Banner */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full p-3.5 mb-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex flex-col gap-2 text-xs text-rose-300"
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={handleResetTodayAndRetry}
                className="self-start text-[11px] font-bold text-rose-400 hover:text-rose-200 underline cursor-pointer mt-1"
              >
                Reset Today's Attendance & Try Again
              </button>
            </motion.div>
          )}

          {/* Action Trigger Button */}
          <div className="w-full pt-2 flex flex-col gap-2">
            <button
              onClick={handleVerifyAndPunch}
              disabled={!isReady || status === 'detecting' || status === 'verifying' || status === 'success'}
              className={`w-full py-4 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 ${
                isCheckIn
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-indigo-600/30'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30'
              } active:scale-98`}
            >
              {status === 'detecting' || status === 'verifying' ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {status === 'detecting' ? 'Recording Video Burst...' : 'Verifying Biometric Face...'}
                </span>
              ) : status === 'success' ? (
                <span className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  Attendance Verified Successfully!
                </span>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  <span>Verify Face & Mark {isCheckIn ? 'Check-In' : 'Check-Out'}</span>
                </>
              )}
            </button>

            {status === 'error' && (
              <button
                onClick={() => {
                  setStatus('idle');
                  setErrorMessage('');
                  setGuideText('Position your face inside the oval');
                  setSubText('Look directly into the camera');
                }}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-200 py-1 transition cursor-pointer"
              >
                Reset & Try Again
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EmployeeFaceAttendanceModal;
