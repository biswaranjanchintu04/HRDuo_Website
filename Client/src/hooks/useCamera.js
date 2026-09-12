import { useState, useEffect, useRef, useCallback } from 'react';

export const useCamera = ({ width = 640, height = 480 } = {}) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setStream(null);
      setIsReady(false);
    }
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Webcam API is not supported by your browser or requires HTTPS.');
      }

      // Stop existing tracks if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: width },
          height: { ideal: height },
          facingMode: 'user',
        },
        audio: false,
      });

      streamRef.current = mediaStream;
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(() => {});
          setIsReady(true);
        };
      }
    } catch (err) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Camera permission denied. Please allow camera access in your browser settings.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('No webcam device found. Please connect a camera.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError('Webcam is currently in use by another application.');
      } else {
        setError(err.message || 'Unable to access camera.');
      }
      setIsReady(false);
    }
  }, [width, height]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    stream,
    error,
    isReady,
    startCamera,
    stopCamera,
  };
};
