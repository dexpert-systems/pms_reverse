'use client';
import React from 'react';

type Variant = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'gray';

const styles: Record<Variant, string> = {
  red:
    'bg-red-500/15 text-red-300 border-red-400/40 shadow-[inset_0_0_0_1px_rgba(248,113,113,0.15)]',
  orange:
    'bg-orange-500/15 text-orange-300 border-orange-400/40',
  yellow:
    'bg-amber-400/15 text-amber-200 border-amber-300/40',
  green:
    'bg-emerald-500/15 text-emerald-300 border-emerald-400/40',
  blue:
    'bg-cyan-500/15 text-cyan-300 border-cyan-400/40',
  gray:
    'bg-white/5 text-slate-300 border-white/15',
};

const dot: Record<Variant, string> = {
  red: 'bg-red-400',
  orange: 'bg-orange-400',
  yellow: 'bg-amber-300',
  green: 'bg-emerald-400',
  blue: 'bg-cyan-300',
  gray: 'bg-slate-400',
};

interface BadgeProps { variant: Variant; label: string; pulse?: boolean; }

export const Badge: React.FC<BadgeProps> = ({ variant, label, pulse }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2 py-[3px] rounded-full text-[10.5px] font-semibold tracking-wide uppercase border whitespace-nowrap ${styles[variant]}`}
  >
    <span className="relative flex h-1.5 w-1.5">
      {pulse && (
        <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${dot[variant]}`} />
      )}
      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dot[variant]}`} />
    </span>
    {label}
  </span>
);
