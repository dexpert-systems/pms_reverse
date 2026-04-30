'use client';
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Defect, DefectSeverity } from '../types';
import { commonEquipment } from '../data/mockData';

interface Props {
  onSubmit: (defect: Defect) => void;
  onBack: () => void;
}

export const ReportDefect: React.FC<Props> = ({ onSubmit, onBack }) => {
  const [equipment, setEquipment] = useState('');
  const [severity, setSeverity] = useState<DefectSeverity>('Major');
  const [description, setDescription] = useState('');

  const handle = () => {
    if (!equipment || !description.trim()) {
      alert('Equipment and description are required');
      return;
    }
    onSubmit({
      id: `DEF${Date.now()}`,
      equipment,
      severity,
      description,
      status: 'Reported',
      reported_by: 'Crew Member',
      reported_at: new Date().toISOString(),
    });
  };

  const sevTone: Record<DefectSeverity, string> = {
    Critical: 'border-red-400 bg-red-500/15 text-red-200 shadow-glow-red',
    Major:    'border-orange-400 bg-orange-500/15 text-orange-200',
    Minor:    'border-amber-300 bg-amber-300/10 text-amber-200',
  };

  return (
    <div className="flex flex-col h-full bg-ink-950 text-white">
      <div className="relative pt-12 pb-4 px-5 overflow-hidden">
        <div className="absolute inset-0 bg-grad-danger opacity-95" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative z-10 flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-xl glass-strong flex items-center justify-center text-white">
            <Icon.ArrowLeft size={16} />
          </button>
          <div>
            <p className="text-rose-100 text-[10px] font-bold tracking-[0.3em] uppercase">Quality / New</p>
            <h2 className="font-display text-2xl font-bold leading-tight">Report Defect</h2>
            <p className="text-rose-100/80 text-[11px] mt-0.5">Logged immediately to ship register</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll p-4 space-y-3 pb-28 bg-gradient-to-b from-ink-950 to-ink-900">
        <Card>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 inline-flex items-center gap-1.5"><Icon.Bolt size={12}/> Severity</p>
          <div className="grid grid-cols-3 gap-2">
            {(['Critical', 'Major', 'Minor'] as DefectSeverity[]).map(s => (
              <button
                key={s}
                onClick={() => setSeverity(s)}
                className={`py-3 rounded-xl text-xs font-bold border-2 transition-all
                  ${severity === s ? sevTone[s] : 'border-white/10 bg-white/5 text-white/60'}`}
              >
                {s}
              </button>
            ))}
          </div>
          {severity === 'Critical' && (
            <div className="mt-3 rounded-xl bg-red-500/10 border border-red-400/30 px-3 py-2 text-[11px] text-red-200 inline-flex items-center gap-2">
              <Icon.Alert size={14}/> Will alert Chief Engineer immediately
            </div>
          )}
        </Card>

        <Card>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 inline-flex items-center gap-1.5"><Icon.Engine size={12}/> Equipment *</p>
          <div className="grid grid-cols-1 gap-2">
            {commonEquipment.map(eq => (
              <button
                key={eq}
                onClick={() => setEquipment(eq)}
                className={`text-left p-3 rounded-xl border transition-all text-sm flex items-center gap-2
                  ${equipment === eq
                    ? 'border-cyan-400 bg-cyan-400/10 text-cyan-100 font-bold'
                    : 'border-white/10 bg-white/5 text-white/70'}`}
              >
                <span className={`w-4 h-4 rounded border flex items-center justify-center ${equipment === eq ? 'bg-cyan-400 border-cyan-300' : 'border-white/20'}`}>
                  {equipment === eq && <Icon.Check size={10} className="text-ink-950"/>}
                </span>
                {eq}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 inline-flex items-center gap-1.5"><Icon.Doc size={12}/> Description *</p>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe the problem clearly. What did you observe?"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            rows={5}
          />
        </Card>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-3 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent">
        <div className="glass-strong rounded-2xl p-3 ring-glow flex gap-2">
          <Button onClick={onBack} variant="ghost" size="lg" fullWidth>Cancel</Button>
          <Button onClick={handle} variant="danger" size="lg" fullWidth><Icon.Alert size={16}/> Report</Button>
        </div>
      </div>
    </div>
  );
};
