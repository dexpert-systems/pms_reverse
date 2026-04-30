'use client';
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { MaintenanceJob, JobStatus } from '../types';
import { formatDuration, formatDate, formatDateTime } from '../utils/helpers';
import { spareParts } from '../data/mockData';

interface Props {
  job: MaintenanceJob;
  onBack: () => void;
  onUpdate: (job: MaintenanceJob) => void;
}

const STATUSES: JobStatus[] = ['Planned', 'In Progress', 'Completed', 'Verified', 'Closed'];

export const JobDetail: React.FC<Props> = ({ job, onBack, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [timeSpent, setTimeSpent] = useState(job.time_spent_minutes?.toString() || '');
  const [selectedParts, setSelectedParts] = useState<string[]>(job.spare_parts_used || []);
  const [remarks, setRemarks] = useState(job.remarks || '');

  const currentIdx = STATUSES.indexOf(job.status);

  const handleStart = () => {
    onUpdate({ ...job, status: 'In Progress', started_at: new Date().toISOString() });
  };

  const handleComplete = () => {
    if (!timeSpent || !remarks.trim()) {
      alert('Time spent and remarks are required');
      return;
    }
    onUpdate({
      ...job,
      status: 'Completed',
      completed_at: new Date().toISOString(),
      time_spent_minutes: parseInt(timeSpent),
      spare_parts_used: selectedParts,
      remarks,
    });
    setShowForm(false);
  };

  const handleVerify = () => onUpdate({ ...job, status: 'Verified', verified_by: 'Chief Engineer' });
  const handleClose = () => onUpdate({ ...job, status: 'Closed' });
  const togglePart = (part: string) =>
    setSelectedParts(prev => prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]);

  return (
    <div className="flex flex-col h-full bg-ink-950 text-white">
      {/* Header */}
      <div className="relative pt-12 pb-4 px-5 overflow-hidden">
        <div className="absolute inset-0 bg-grad-ocean opacity-90" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative z-10 flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-xl glass-strong flex items-center justify-center text-white">
            <Icon.ArrowLeft size={16} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-cyan-200/90 text-[10px] font-bold tracking-[0.3em] uppercase truncate">{job.equipment}</p>
            <h2 className="font-display text-lg font-bold leading-tight truncate">{job.job_name}</h2>
          </div>
          <Badge
            variant={job.priority === 'Urgent' ? 'red' : job.priority === 'Important' ? 'orange' : 'gray'}
            label={job.priority}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll p-4 space-y-3 pb-44 bg-gradient-to-b from-ink-950 to-ink-900">
        {/* Workflow Timeline */}
        <Card>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3">Workflow</p>
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

        {/* Details */}
        <Card>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3">Details</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
              <p className="text-[10px] uppercase tracking-wider text-white/50 inline-flex items-center gap-1"><Icon.Clock size={11}/> Est. Time</p>
              <p className="font-display font-bold text-white mt-1">{formatDuration(job.estimated_time_minutes)}</p>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
              <p className="text-[10px] uppercase tracking-wider text-white/50 inline-flex items-center gap-1"><Icon.Calendar size={11}/> Due</p>
              <p className="font-display font-bold text-white mt-1">{formatDate(job.due_date)}</p>
            </div>
            {job.started_at && (
              <div className="col-span-2 rounded-xl bg-amber-400/10 border border-amber-300/25 p-3">
                <p className="text-[10px] uppercase tracking-wider text-amber-200 inline-flex items-center gap-1"><Icon.Activity size={11}/> Started</p>
                <p className="font-mono font-bold text-amber-100 mt-1">{formatDateTime(job.started_at)}</p>
              </div>
            )}
          </div>
          {job.job_description && (
            <div className="mt-3 pt-3 border-t border-white/5">
              <p className="text-[10px] uppercase tracking-wider text-white/50">Description</p>
              <p className="text-sm text-white/85 mt-1 leading-relaxed">{job.job_description}</p>
            </div>
          )}
        </Card>

        {/* Completion Form */}
        {showForm && job.status === 'In Progress' && (
          <Card>
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300 mb-3">Complete Job</p>

            <div className="mb-4">
              <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">⏱ Time Spent (min) *</label>
              <input
                type="number"
                value={timeSpent}
                onChange={e => setTimeSpent(e.target.value)}
                placeholder="e.g. 45"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-lg font-bold text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">Spare Parts Used</label>
              <div className="grid grid-cols-2 gap-2">
                {spareParts.map(p => (
                  <button
                    key={p}
                    onClick={() => togglePart(p)}
                    className={`p-2 text-xs rounded-lg border transition-all text-left
                      ${selectedParts.includes(p)
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-100 font-bold'
                        : 'border-white/10 bg-white/5 text-white/70'}`}
                  >
                    {selectedParts.includes(p) ? '✓ ' : ''}{p}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">Remarks *</label>
              <textarea
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                placeholder="What was done? Any issues?"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setShowForm(false)} variant="ghost" fullWidth>Cancel</Button>
              <Button onClick={handleComplete} variant="success" fullWidth><Icon.Check size={14}/> Complete</Button>
            </div>
          </Card>
        )}

        {/* Completed */}
        {(job.status === 'Completed' || job.status === 'Verified') && (
          <Card>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-300 inline-flex items-center gap-1.5"><Icon.Check size={12}/> Completion Details</p>
              {job.verified_by && <Badge variant="green" label={`Verified · ${job.verified_by}`} />}
            </div>
            <div className="space-y-2 text-sm text-white/85">
              {job.time_spent_minutes && (
                <div className="flex justify-between"><span className="text-white/50">Time</span><span className="font-bold">{formatDuration(job.time_spent_minutes)}</span></div>
              )}
              {job.spare_parts_used && job.spare_parts_used.length > 0 && (
                <div>
                  <p className="text-white/50">Parts used</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {job.spare_parts_used.map(p => <Badge key={p} variant="blue" label={p} />)}
                  </div>
                </div>
              )}
              {job.remarks && (
                <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2 mt-2">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Remarks</p>
                  <p className="text-white/85 mt-0.5">{job.remarks}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Action dock */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-3 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent">
        <div className="glass-strong rounded-2xl p-3 ring-glow space-y-2">
          {job.status === 'Planned' && (
            <Button onClick={handleStart} variant="success" size="lg" fullWidth>
              <Icon.Bolt size={16}/> Start Job
            </Button>
          )}
          {job.status === 'In Progress' && !showForm && (
            <Button onClick={() => setShowForm(true)} variant="warning" size="lg" fullWidth>
              <Icon.Check size={16}/> Complete Job
            </Button>
          )}
          {job.status === 'Completed' && (
            <>
              <Button onClick={handleVerify} variant="success" size="lg" fullWidth>
                <Icon.Shield size={16}/> Verify (Chief Engineer)
              </Button>
              <p className="text-[10px] text-center text-white/50">Verification required before close</p>
            </>
          )}
          {job.status === 'Verified' && (
            <Button onClick={handleClose} variant="ghost" size="lg" fullWidth>
              Close Job
            </Button>
          )}
          {job.status === 'Closed' && (
            <div className="text-center text-white/50 py-2 font-semibold text-sm">Job Closed</div>
          )}
        </div>
      </div>
    </div>
  );
};
