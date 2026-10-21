import React from 'react';
import { SimOperator } from '../types';

interface OperatorLogoProps {
  operator: SimOperator;
  className?: string;
  size?: number;
}

export const OperatorLogo: React.FC<OperatorLogoProps> = ({ operator, className = '', size = 32 }) => {
  switch (operator) {
    case 'Grameenphone':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`inline-block ${className}`}
        >
          <rect width="100" height="100" rx="16" fill="#00a4d3" />
          {/* GP stylized petal/flower logo */}
          <path
            d="M50 20 C65 20 75 32 75 48 C75 62 64 74 50 78 C36 74 25 62 25 48 C25 32 35 20 50 20 Z"
            fill="white"
            opacity="0.95"
          />
          <path
            d="M50 32 C58 32 64 38 64 47 C64 55 58 62 50 64 C42 62 36 55 36 47 C36 38 42 32 50 32 Z"
            fill="#00a4d3"
          />
          <circle cx="50" cy="48" r="5" fill="white" />
        </svg>
      );

    case 'Robi':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`inline-block ${className}`}
        >
          <rect width="100" height="100" rx="16" fill="#ffffff" stroke="#e50914" strokeWidth="2" />
          {/* Robi triangle crystals */}
          <polygon points="50,18 78,65 50,52" fill="#e50914" />
          <polygon points="50,18 22,65 50,52" fill="#f58220" />
          <polygon points="50,52 78,65 50,82" fill="#ffcb05" />
          <polygon points="50,52 22,65 50,82" fill="#d91b24" />
        </svg>
      );

    case 'Banglalink':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`inline-block ${className}`}
        >
          <rect width="100" height="100" rx="16" fill="#f26522" />
          {/* Banglalink stylized diagonal tiger stripes */}
          <path d="M22 68 L48 24 L56 24 L30 68 Z" fill="white" />
          <path d="M42 68 L68 24 L76 24 L50 68 Z" fill="#1a1a1a" />
          <path d="M62 68 L78 40 L84 40 L70 68 Z" fill="white" opacity="0.8" />
        </svg>
      );

    case 'Airtel':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`inline-block ${className}`}
        >
          <rect width="100" height="100" rx="16" fill="#e31b23" />
          {/* Airtel curve badge */}
          <path
            d="M32 70 C24 62 22 46 32 34 C42 22 60 22 68 32 C74 40 73 54 65 60 C58 66 48 64 45 56 C42 48 46 42 52 40 C58 38 60 44 58 48 C56 50 53 50 52 48"
            stroke="white"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'Teletalk':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`inline-block ${className}`}
        >
          <rect width="100" height="100" rx="16" fill="#007a3d" />
          {/* Teletalk BD red circle and signal wave */}
          <circle cx="50" cy="50" r="26" fill="#da291c" />
          <circle cx="50" cy="50" r="14" fill="#007a3d" />
          <circle cx="50" cy="50" r="6" fill="white" />
          <path
            d="M26 34 A32 32 0 0 1 74 34"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    default:
      return null;
  }
};
