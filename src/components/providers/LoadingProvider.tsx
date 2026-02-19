"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PageLoading from "../ui/PageLoading";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Handle initial page load only
  useEffect(() => {
    // Check if this is the very first load
    const hasLoadedBefore = sessionStorage.getItem("hasLoadedBefore");

    if (!hasLoadedBefore) {
      // First time loading - show loading screen
      sessionStorage.setItem("hasLoadedBefore", "true");
      // PageLoading will handle the timeout and call onComplete
    } else {
      // Already loaded before - skip loading screen
      setIsLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const contextValue: LoadingContextType = {
    isLoading,
    setIsLoading,
    startLoading,
    stopLoading,
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {isLoading && (
        <PageLoading
          isLoading={isLoading}
          onComplete={() => setIsLoading(false)}
          variant="spinner"
        />
      )}
      <div
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
