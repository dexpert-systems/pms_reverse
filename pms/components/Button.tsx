'use client';
import React from 'react';

type BtnVariant = 'primary' | 'danger' | 'success' | 'warning' | 'ghost';
type BtnSize = 'sm' | 'md' | 'lg';

const variants: Record<BtnVariant, string> = {
  primary:
    'text-white bg-gradient-to-r from-ocean-600 via-ocean-500 to-cyan2-500 shadow-glow hover:shadow-[0_0_30px_-2px_rgba(34,211,238,0.7)]',
  danger:
    'text-white bg-gradient-to-r from-red-700 via-red-600 to-rose-500 shadow-glow-red hover:brightness-110',
  success:
    'text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 shadow-glow-green hover:brightness-110',
  warning:
    'text-ink-950 bg-gradient-to-r from-amber-300 via-gold-400 to-amber-400 hover:brightness-110',
  ghost:
    'text-slate-100 bg-white/5 border border-white/10 hover:bg-white/10',
};
const sizes: Record<BtnSize, string> = {
  sm: 'px-3 py-2 text-xs rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-5 py-3.5 text-[15px] font-bold rounded-xl tracking-wide',
};

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  size?: BtnSize;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children, onClick, variant = 'primary', size = 'md', disabled, fullWidth,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`relative font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-[0.98] overflow-hidden
      ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''}`}
  >
    <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    {/* gloss */}
    <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
  </button>
);
