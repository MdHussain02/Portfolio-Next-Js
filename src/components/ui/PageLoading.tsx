"use client";

import React, { useEffect, useState } from "react";

interface PageLoadingProps {
  isLoading: boolean;
  onComplete?: () => void;
  variant?: "spinner" | "dots" | "pulse" | "bars";
}

const PageLoading: React.FC<PageLoadingProps> = ({
  isLoading,
  onComplete,
  variant = "spinner",
}) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setFadeOut(false);

      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          onComplete?.();
        }, 500);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return (
          <div className="relative">
            <div className="w-12 h-12 border-2 border-white/20 rounded-full" />
            <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-white rounded-full animate-spin" />
          </div>
        );

      case "dots":
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        );

      case "pulse":
        return (
          <div className="w-12 h-12 bg-white rounded-full animate-pulse opacity-75" />
        );

      case "bars":
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-1 bg-white animate-pulse"
                style={{
                  height: `${20 + (i % 2) * 10}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Logo/Name */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-2">
            MH
          </h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Loading Portfolio
          </p>
        </div>

        {/* Single Loading Element */}
        {renderLoader()}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </div>
  );
};

export default PageLoading;
