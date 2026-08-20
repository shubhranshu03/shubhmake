"use client";

import React, { useState, useRef, useEffect } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = async () => {
    console.log('Spotify icon clicked!'); // Debug log
    
    if (!audioRef.current) {
      console.log('Audio ref not available');
      return;
    }

    try {
      if (isPlaying) {
        console.log('Pausing music');
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        console.log('Playing music');
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio play failed:', error);
      alert('Audio playback failed. Check console for details.');
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      console.log('Audio can play');
      setIsLoaded(true);
    };

    const handleError = (e: any) => {
      console.error('Audio error:', e);
      console.error('Audio error details:', audio.error);
    };

    const handleLoadStart = () => {
      console.log('Audio loading started');
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  return (
    <div className="flex items-center gap-3">
      {/* Spotify Icon with Animation */}
      <button 
        onClick={toggleMusic}
        className={`w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center transition-all duration-300 cursor-pointer ${
          isPlaying ? 'animate-pulse' : 'hover:scale-110'
        }`}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </button>

      {/* Animated Audio Bars */}
      {isPlaying && (
        <div className="flex items-center gap-1 mx-2">
          <div className="w-1 bg-[#1DB954] rounded-full animate-bar-1" style={{height: '16px'}}></div>
          <div className="w-1 bg-[#1DB954] rounded-full animate-bar-2" style={{height: '12px'}}></div>
          <div className="w-1 bg-[#1DB954] rounded-full animate-bar-3" style={{height: '20px'}}></div>
          <div className="w-1 bg-[#1DB954] rounded-full animate-bar-4" style={{height: '8px'}}></div>
          <div className="w-1 bg-[#1DB954] rounded-full animate-bar-5" style={{height: '14px'}}></div>
        </div>
      )}

      {/* Song Info */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-sm text-[#6e6e73]">
          All The Stars (with SZA) - From "Black Panther: The Album"
        </p>
      </div>

      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        preload="metadata" 
        loop
        crossOrigin="anonymous"
      >
        <source src="/all.mp3" type="audio/mpeg" />
        <source src="/all.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* CSS Animations for Audio Bars */}
      <style jsx>{`
        @keyframes bar-1 {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        @keyframes bar-2 {
          0%, 100% { transform: scaleY(0.7); }
          25% { transform: scaleY(1); }
        }
        @keyframes bar-3 {
          0%, 100% { transform: scaleY(0.5); }
          75% { transform: scaleY(1); }
        }
        @keyframes bar-4 {
          0%, 100% { transform: scaleY(0.9); }
          40% { transform: scaleY(0.3); }
        }
        @keyframes bar-5 {
          0%, 100% { transform: scaleY(0.6); }
          60% { transform: scaleY(1); }
        }
        .animate-bar-1 {
          animation: bar-1 0.8s ease-in-out infinite;
          transform-origin: bottom;
        }
        .animate-bar-2 {
          animation: bar-2 0.6s ease-in-out infinite;
          transform-origin: bottom;
        }
        .animate-bar-3 {
          animation: bar-3 1s ease-in-out infinite;
          transform-origin: bottom;
        }
        .animate-bar-4 {
          animation: bar-4 0.7s ease-in-out infinite;
          transform-origin: bottom;
        }
        .animate-bar-5 {
          animation: bar-5 0.9s ease-in-out infinite;
          transform-origin: bottom;
        }
      `}</style>
    </div>
  );
}