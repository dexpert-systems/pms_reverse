'use client';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  danger?: boolean;
}

/**
 * Premium glass card on dark canvas.
 * - default: subtle white-glass over dark backdrop
 * - danger:  red-tinted glass with glowing edge
 */
export const Card: React.FC<CardProps> = ({ children, onClick, className = '', danger = false }) => {
  const base =
    'relative p-4 rounded-2xl transition-all duration-200 ring-glow';
  const skin = danger
    ? 'bg-gradient-to-br from-red-500/15 via-red-500/[0.06] to-transparent border border-red-400/30 shadow-glow-red'
    : 'glass';
  const interactive = onClick
    ? 'cursor-pointer hover:-translate-y-[1px] hover:border-cyan2-400/40 active:scale-[0.99]'
    : '';
  return (
    <div onClick={onClick} role={onClick ? 'button' : undefined} className={`${base} ${skin} ${interactive} ${className}`}>
      {danger && (
        <span className="pointer-events-none absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-400/70 to-transparent" />
      )}
      {children}
    </div>
  );
};
