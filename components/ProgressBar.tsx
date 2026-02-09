
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 bg-zinc-100 z-50">
      <div 
        className="h-full bg-[#ff4d00] transition-all duration-300 ease-out shadow-[0_0_10px_#ff4d00]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
