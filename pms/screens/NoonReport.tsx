'use client';
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { NoonReport } from '../types';

interface Props {
  reports: NoonReport[];
  onSubmit: (report: NoonReport) => void;
  onBack: () => void;
}

const emptyReport = (): NoonReport => ({
  id: `NR${Date.now()}`,
  report_date: new Date().toISOString().split('T')[0],
  position: '',
  speed: 0,
  distance_sailed: 0,
  weather: 'Fair',
  sea_state: '',
  engine_status: 'Normal',
  fuel_HFO: 0,
  fuel_MGO: 0,
  fuel_lube: 0,
  remarks: '',
  submitted_by: 'Chief Officer',
});

export const NoonReportScreen: React.FC<Props> = ({ reports, onSubmit, onBack }) => {
  const [view, setView] = useState<'form' | 'history'>('form');
  const prev = reports[0];
  const [form, setForm] = useState<NoonReport>(emptyReport());

  const upd = (field: keyof NoonReport, value: any) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = () => {
    if (!form.position.trim()) { alert('Position is required'); return; }
    onSubmit({ ...form, submitted_at: new Date().toISOString() });
  };

  const InputRow = ({ label, field, type = 'text', placeholder = '', icon }: {
    label: string; field: keyof NoonReport; type?: string; placeholder?: string; icon?: React.ReactNode;
  }) => {
    const isNum = type === 'number';
    const prevVal = prev ? (prev[field as keyof NoonReport] as number) : 0;
    const curVal = form[field] as number;
    const delta = isNum && prev ? curVal - prevVal : 0;
    const showDelta = isNum && prev && curVal !== prevVal;

    return (
      <div>
        <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5 inline-flex items-center gap-1.5">
          {icon}{label}
        </label>
        <input
          type={type}
          value={form[field] as any}
          onChange={e => upd(field, type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 font-mono"
        />
        {prev && isNum && (
          <p className="text-[10px] text-white/40 mt-0.5 font-mono">
            Prev: {prevVal as any}
            {showDelta && (
              <span className={`ml-1.5 font-bold ${delta > 0 ? 'text-amber-300' : 'text-emerald-300'}`}>
                ({delta > 0 ? '↑' : '↓'} {Math.abs(delta).toFixed(2)})
              </span>
            )}
          </p>
        )}
      </div>
    );
  };

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
            <p className="text-cyan-200/90 text-[10px] font-bold tracking-[0.3em] uppercase">Bridge Log</p>
            <h2 className="font-display text-2xl font-bold leading-tight">Noon Report</h2>
            <p className="text-blue-100/70 text-[11px] mt-0.5 font-mono">{form.report_date}</p>
          </div>
          <Icon.Compass size={28} className="text-cyan-200/70" />
        </div>
      </div>

      <div className="bg-ink-900 border-y border-white/5 flex">
        {(['form', 'history'] as const).map(t => {
          const active = view === t;
          return (
            <button
              key={t}
              onClick={() => setView(t)}
              className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2
                ${active ? 'border-cyan-400 text-cyan-300 bg-white/[0.02]' : 'border-transparent text-white/50'}`}
            >
              {t === 'form' ? 'Form' : 'History'}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll p-4 pb-28 bg-gradient-to-b from-ink-950 to-ink-900">
        {view === 'form' ? (
          <div className="space-y-3">
            <Card>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 inline-flex items-center gap-1.5">
                <Icon.Pin size={12}/> Position & Movement
              </p>
              <div className="space-y-3">
                <InputRow label="Position (GPS / Port) *" field="position" placeholder="e.g. 35°42N 139°45E" icon={<Icon.Pin size={11}/>} />
                <InputRow label="Speed (knots)" field="speed" type="number" placeholder="14.2" icon={<Icon.Activity size={11}/>} />
                <InputRow label="Distance Sailed (NM)" field="distance_sailed" type="number" placeholder="338" icon={<Icon.Compass size={11}/>} />
              </div>
            </Card>

            <Card>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 inline-flex items-center gap-1.5">
                <Icon.Cloud size={12}/> Weather & Engine
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">Weather</label>
                  <select
                    value={form.weather}
                    onChange={e => upd('weather', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option className="bg-ink-800">Fair</option>
                    <option className="bg-ink-800">Moderate</option>
                    <option className="bg-ink-800">Rough</option>
                    <option className="bg-ink-800">Heavy</option>
                  </select>
                </div>
                <InputRow label="Sea State" field="sea_state" placeholder="e.g. Calm, 0.5m swells" icon={<Icon.Wave size={11}/>} />
                <div>
                  <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">Engine Status</label>
                  <select
                    value={form.engine_status}
                    onChange={e => upd('engine_status', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option className="bg-ink-800">Normal</option>
                    <option className="bg-ink-800">Reduced</option>
                    <option className="bg-ink-800">Stopped</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 inline-flex items-center gap-1.5">
                <Icon.Fuel size={12}/> Fuel Consumption (tons / 24h)
              </p>
              <div className="space-y-3">
                <InputRow label="HFO" field="fuel_HFO" type="number" placeholder="3.2" />
                <InputRow label="MGO" field="fuel_MGO" type="number" placeholder="0.1" />
                <InputRow label="Lube Oil" field="fuel_lube" type="number" placeholder="0.08" />
              </div>
            </Card>

            <Card>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 inline-flex items-center gap-1.5">
                <Icon.Doc size={12}/> Remarks
              </p>
              <textarea
                value={form.remarks}
                onChange={e => upd('remarks', e.target.value)}
                placeholder="Any special observations or events..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                rows={3}
              />
            </Card>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.length === 0 ? (
              <Card><p className="text-center text-white/60 py-8 text-sm">No reports yet</p></Card>
            ) : reports.map(r => (
              <Card key={r.id}>
                <div className="flex justify-between items-start mb-2">
                  <p className="font-display font-bold text-white">{new Date(r.report_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                  {r.submitted_at ? <Badge variant="green" label="Submitted" /> : <Badge variant="yellow" label="Draft" />}
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                  <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2"><p className="text-[9px] uppercase tracking-wider text-white/40">Speed</p><p className="font-mono font-bold text-cyan-200">{r.speed} kts</p></div>
                  <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2"><p className="text-[9px] uppercase tracking-wider text-white/40">Distance</p><p className="font-mono font-bold text-white">{r.distance_sailed} NM</p></div>
                  <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2"><p className="text-[9px] uppercase tracking-wider text-white/40">Weather</p><p className="font-bold text-white text-xs">{r.weather}</p></div>
                  <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2"><p className="text-[9px] uppercase tracking-wider text-white/40">HFO</p><p className="font-mono font-bold text-amber-200">{r.fuel_HFO}t</p></div>
                  <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2"><p className="text-[9px] uppercase tracking-wider text-white/40">MGO</p><p className="font-mono font-bold text-amber-200">{r.fuel_MGO}t</p></div>
                  <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2"><p className="text-[9px] uppercase tracking-wider text-white/40">Engine</p><p className="font-bold text-white text-xs">{r.engine_status}</p></div>
                </div>
                <p className="text-[11px] text-white/60 border-t border-white/5 pt-2 font-mono">{r.position}</p>
                {r.remarks && <p className="text-[11px] text-white/50 mt-1 italic">&ldquo;{r.remarks}&rdquo;</p>}
              </Card>
            ))}
          </div>
        )}
      </div>

      {view === 'form' && (
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-3 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent">
          <div className="glass-strong rounded-2xl p-3 ring-glow">
            <Button onClick={handleSubmit} variant="success" size="lg" fullWidth>
              <Icon.Compass size={16}/> Submit Noon Report
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
