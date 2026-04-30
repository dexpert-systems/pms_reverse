'use client';
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Defect, DefectStatus } from '../types';
import { formatDateTime } from '../utils/helpers';

interface Props {
  defect: Defect;
  onBack: () => void;
  onUpdate: (defect: Defect) => void;
}

const STATUSES: DefectStatus[] = ['Reported', 'Assigned', 'In Progress', 'Resolved', 'Closed'];

export const DefectDetail: React.FC<Props> = ({ defect, onBack, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [fixDesc, setFixDesc] = useState(defect.fix_description || '');
  const [rootCause, setRootCause] = useState(defect.root_cause || '');

  const currentIdx = STATUSES.indexOf(defect.status);
  const canResolve = defect.status !== 'Resolved' && defect.status !== 'Closed';

  const handleResolve = () => {
    if (!fixDesc.trim() || !rootCause.trim()) {
      alert('Both fix description and root cause are required to resolve a defect.');
      return;
    }
    onUpdate({
      ...defect,
      status: 'Resolved',
      fix_description: fixDesc,
      root_cause: rootCause,
      resolved_at: new Date().toISOString(),
    });
    setShowForm(false);
  };

  const handleClose = () => onUpdate({ ...defect, status: 'Closed' });

  return (
    <div className="flex flex-col h-full bg-ink-950 text-white">
      <div className="relative pt-12 pb-4 px-5 overflow-hidden">
        <div className={`absolute inset-0 ${defect.severity === 'Critical' ? 'bg-grad-danger' : 'bg-grad-ocean'} opacity-90`} />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative z-10 flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-xl glass-strong flex items-center justify-center text-white">
            <Icon.ArrowLeft size={16} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-white/70 text-[10px] font-bold tracking-[0.3em] uppercase truncate">{defect.equipment}</p>
            <h2 className="font-display text-lg font-bold leading-tight truncate">Defect Details</h2>
          </div>
          <Badge
            variant={defect.severity === 'Critical' ? 'red' : defect.severity === 'Major' ? 'orange' : 'yellow'}
            label={defect.severity}
            pulse={defect.severity === 'Critical'}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll p-4 space-y-3 pb-44 bg-gradient-to-b from-ink-950 to-ink-900">
        {/* Description */}
        <Card danger={defect.severity === 'Critical'}>
          <div className="flex justify-between items-center mb-2">
            <Badge
              variant={defect.severity === 'Critical' ? 'red' : defect.severity === 'Major' ? 'orange' : 'yellow'}
              label={defect.severity}
              pulse={defect.severity === 'Critical'}
            />
            <Badge
              variant={defect.status === 'Resolved' || defect.status === 'Closed' ? 'green' : defect.status === 'In Progress' ? 'yellow' : 'blue'}
              label={defect.status}
            />
          </div>
          <p className="text-sm text-white/90 font-medium leading-relaxed">{defect.description}</p>
        </Card>

        {/* Workflow */}
        <Card>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3">Defect Workflow</p>
          <div className="flex items-center gap-1">
            {STATUSES.map((s, i) => {
              const done = i < currentIdx;
              const cur = i === currentIdx;
              return (
                <React.Fragment key={s}>
                  <div className="flex flex-col items-center flex-1">
                    <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border
                      ${done ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400/50' :
                        cur ? 'bg-gradient-to-br from-cyan-400 to-ocean-500 text-white border-cyan-300 shadow-glow' :
                        'bg-white/5 text-white/40 border-white/10'}`}>
                      {done ? <Icon.Check size={14} /> : i + 1}
                      {cur && <span className="absolute inset-0 rounded-full ring-2 ring-cyan-300/40 animate-ping" />}
                    </div>
                    <p className={`text-center leading-tight mt-1.5 ${cur ? 'text-cyan-200' : 'text-white/50'}`} style={{ fontSize: 9 }}>{s}</p>
                  </div>
                  {i < STATUSES.length - 1 && (
                    <div className={`flex-1 h-0.5 mb-5 ${i < currentIdx ? 'bg-emerald-400/50' : 'bg-white/10'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </Card>

        {/* Info */}
        <Card>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3">Report Info</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/50">Reported by</span>
              <span className="font-bold text-white/90">{defect.reported_by}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Reported at</span>
              <span className="font-mono font-bold text-white/90">{formatDateTime(defect.reported_at)}</span>
            </div>
            {defect.assigned_to && (
              <div className="flex justify-between">
                <span className="text-white/50">Assigned to</span>
                <span className="font-bold text-cyan-200">{defect.assigned_to}</span>
              </div>
            )}
          </div>
        </Card>

        {/* Resolve form */}
        {showForm && canResolve && (
          <Card>
            <p className="text-[10px] uppercase tracking-[0.2em] text-rose-300 mb-1">Resolve Defect</p>
            <p className="text-[11px] text-rose-200/80 mb-4">Both fields mandatory — cannot close without root cause.</p>

            <div className="mb-4">
              <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">Fix Description *</label>
              <textarea
                value={fixDesc}
                onChange={e => setFixDesc(e.target.value)}
                placeholder="Describe the corrective action taken..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                rows={3}
              />
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">Root Cause *</label>
              <textarea
                value={rootCause}
                onChange={e => setRootCause(e.target.value)}
                placeholder="Identify root cause to prevent recurrence..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setShowForm(false)} variant="ghost" fullWidth>Cancel</Button>
              <Button onClick={handleResolve} variant="success" fullWidth><Icon.Check size={14}/> Resolve</Button>
            </div>
          </Card>
        )}

        {/* Resolved info */}
        {(defect.status === 'Resolved' || defect.status === 'Closed') && (
          <Card>
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-300 mb-3 inline-flex items-center gap-1.5"><Icon.Check size={12}/> Resolution</p>
            <div className="space-y-3 text-sm">
              {defect.fix_description && (
                <div className="rounded-lg bg-emerald-500/5 border border-emerald-400/15 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-emerald-300">Fix Applied</p>
                  <p className="mt-1 text-white/90">{defect.fix_description}</p>
                </div>
              )}
              {defect.root_cause && (
                <div className="rounded-lg bg-emerald-500/5 border border-emerald-400/15 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-emerald-300">Root Cause</p>
                  <p className="mt-1 text-white/90">{defect.root_cause}</p>
                </div>
              )}
              {defect.resolved_at && (
                <p className="text-[11px] font-mono text-emerald-300/80">Resolved {formatDateTime(defect.resolved_at)}</p>
              )}
            </div>
          </Card>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-3 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent">
        <div className="glass-strong rounded-2xl p-3 ring-glow space-y-2">
          {canResolve && !showForm && (
            <Button onClick={() => setShowForm(true)} variant="warning" size="lg" fullWidth>
              <Icon.Wrench size={16}/> Resolve Defect
            </Button>
          )}
          {defect.status === 'Resolved' && (
            <Button onClick={handleClose} variant="ghost" size="lg" fullWidth>Close Defect</Button>
          )}
          {defect.status === 'Closed' && (
            <div className="text-center text-white/50 py-2 font-semibold text-sm">Defect Closed</div>
          )}
        </div>
      </div>
    </div>
  );
};
