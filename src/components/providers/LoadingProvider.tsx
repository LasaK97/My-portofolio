// src/components/providers/LoadingProvider.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingAnimation from '../animations/LoadingAnimation';

const LoadingContext = createContext({
  isLoading: true,
  setIsLoading: (loading: boolean) => {}
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingAnimation onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </LoadingContext.Provider>
  );
};