'use client';
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Defect, DefectSeverity, DefectStatus } from '../types';
import { formatDateTime } from '../utils/helpers';

interface Props {
  defects: Defect[];
  onDefectClick: (defect: Defect) => void;
  onReportDefect: () => void;
  onBack: () => void;
}

type Filter = 'open' | 'critical' | 'resolved' | 'all';

const severityBadge = (s: DefectSeverity) => {
  if (s === 'Critical') return <Badge variant="red" label="Critical" pulse />;
  if (s === 'Major') return <Badge variant="orange" label="Major" />;
  return <Badge variant="yellow" label="Minor" />;
};

const statusBadge = (s: DefectStatus) => {
  if (s === 'Resolved' || s === 'Closed') return <Badge variant="green" label={s} />;
  if (s === 'In Progress') return <Badge variant="yellow" label={s} />;
  if (s === 'Assigned') return <Badge variant="blue" label={s} />;
  return <Badge variant="gray" label={s} />;
};

export const Defects: React.FC<Props> = ({ defects, onDefectClick, onReportDefect, onBack }) => {
  const [filter, setFilter] = useState<Filter>('open');

  const filtered = defects.filter(d => {
    if (filter === 'critical') return d.severity === 'Critical';
    if (filter === 'open') return d.status !== 'Closed' && d.status !== 'Resolved';
    if (filter === 'resolved') return d.status === 'Closed' || d.status === 'Resolved';
    return true;
  });

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: 'open', label: 'Open', count: defects.filter(d => d.status !== 'Closed' && d.status !== 'Resolved').length },
    { key: 'critical', label: 'Critical', count: defects.filter(d => d.severity === 'Critical').length },
    { key: 'resolved', label: 'Resolved', count: defects.filter(d => d.status === 'Closed' || d.status === 'Resolved').length },
    { key: 'all', label: 'All', count: defects.length },
  ];

  return (
    <div className="flex flex-col h-full bg-ink-950 text-white">
      <div className="relative pt-12 pb-4 px-5 overflow-hidden">
        <div className="absolute inset-0 bg-grad-ocean opacity-90" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative z-10 flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-xl glass-strong flex items-center justify-center text-white">
            <Icon.ArrowLeft size={16} />
          </button>
          <div className="flex-1">
            <p className="text-cyan-200/90 text-[10px] font-bold tracking-[0.3em] uppercase">Quality</p>
            <h2 className="font-display text-2xl font-bold leading-tight">Defect Register</h2>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-bold tabular-nums">{filtered.length}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/60">items</p>
          </div>
        </div>
      </div>

      <div className="bg-ink-900 border-y border-white/5 px-3 py-3 flex gap-2 overflow-x-auto phone-scroll">
        {filters.map(f => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all
                ${active
                  ? 'bg-gradient-to-r from-cyan-500 to-ocean-500 text-white shadow-glow'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'}`}
            >
              {f.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${active ? 'bg-white/20' : 'bg-white/10'}`}>{f.count}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll p-4 space-y-3 pb-28 bg-ink-950">
        {filtered.length === 0 ? (
          <Card><p className="text-center text-white/60 py-8 text-sm">No defects in this filter</p></Card>
        ) : filtered.map(d => {
          const accent = d.severity === 'Critical' ? 'from-red-500 to-rose-500' :
                         d.severity === 'Major' ? 'from-orange-400 to-amber-500' :
                         'from-amber-300 to-yellow-400';
          return (
            <Card key={d.id} onClick={() => onDefectClick(d)} danger={d.severity === 'Critical'}>
              <span className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r bg-gradient-to-b ${accent}`} />
              <div className="pl-2">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <p className="font-display font-bold text-white text-[14px]">{d.equipment}</p>
                  {severityBadge(d.severity)}
                </div>
                <p className="text-[12px] text-white/75 mb-2 line-clamp-2">{d.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {statusBadge(d.status)}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-white/55">
                  <span>By <strong className="text-white/80">{d.reported_by}</strong></span>
                  <span className="font-mono">{formatDateTime(d.reported_at)}</span>
                </div>
                {d.assigned_to && (
                  <div className="mt-2 rounded-lg bg-cyan-500/10 border border-cyan-400/20 px-2 py-1 text-[11px] text-cyan-200">
                    Assigned to <strong>{d.assigned_to}</strong>
                  </div>
                )}
                <div className="flex justify-end mt-2">
                  <span className="text-cyan-300 text-[11px] font-bold inline-flex items-center gap-0.5">Open <Icon.ChevronR size={12} /></span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-3 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent">
        <div className="glass-strong rounded-2xl p-3 ring-glow">
          <Button onClick={onReportDefect} variant="danger" size="lg" fullWidth>
            <Icon.Alert size={16}/> Report New Defect
          </Button>
        </div>
      </div>
    </div>
  );
};
