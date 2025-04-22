
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 bg-family-blue rounded-lg rotate-6 opacity-70"></div>
        <div className="absolute inset-0 bg-family-blue rounded-lg rotate-3 opacity-85"></div>
        <div className="absolute inset-0 bg-family-blue rounded-lg flex items-center justify-center text-white">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-2/3 h-2/3"
          >
            <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
            <path d="M14 2v6h6" />
            <path d="M2 15h10" />
            <path d="M5 12l-3 3 3 3" />
          </svg>
        </div>
      </div>
      {withText && (
        <div className="font-bold text-xl text-family-blue">
          FamilyCloud
        </div>
      )}
    </div>
  );
};
