// src/components/providers/BackgroundProvider.tsx
'use client';

import NeuralBackground from '../animations/NeuralBackground';

export default function BackgroundProvider() {
  return (
    <>
      <div className="fixed inset-0 bg-gray-900/20" />
      <div className="fixed inset-0 ">
        <NeuralBackground />
      </div>
    </>
  );
}