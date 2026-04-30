'use client';
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Icon } from '../components/Icon';
import { MaintenanceJob, JobStatus } from '../types';
import { formatDate, formatDuration } from '../utils/helpers';

interface Props {
  jobs: MaintenanceJob[];
  onJobClick: (job: MaintenanceJob) => void;
  onBack: () => void;
}

type Filter = 'urgent' | 'today' | 'pending' | 'all';

const statusBadge = (status: JobStatus) => {
  if (status === 'In Progress') return <Badge variant="yellow" label={status} />;
  if (status === 'Completed' || status === 'Verified') return <Badge variant="green" label={status} />;
  if (status === 'Closed') return <Badge variant="gray" label={status} />;
  return <Badge variant="blue" label={status} />;
};

export const Jobs: React.FC<Props> = ({ jobs, onJobClick, onBack }) => {
  const [filter, setFilter] = useState<Filter>('urgent');

  const filtered = jobs.filter(j => {
    if (filter === 'urgent') return j.due_days_remaining <= 0;
    if (filter === 'today') return j.due_days_remaining === 0;
    if (filter === 'pending') return j.status === 'Planned' || j.status === 'In Progress';
    return true;
  });

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: 'urgent', label: 'Urgent', count: jobs.filter(j => j.due_days_remaining <= 0).length },
    { key: 'today', label: 'Today', count: jobs.filter(j => j.due_days_remaining === 0).length },
    { key: 'pending', label: 'Pending', count: jobs.filter(j => j.status === 'Planned' || j.status === 'In Progress').length },
    { key: 'all', label: 'All', count: jobs.length },
  ];

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
          <div className="flex-1">
            <p className="text-cyan-200/90 text-[10px] font-bold tracking-[0.3em] uppercase">Workorders</p>
            <h2 className="font-display text-2xl font-bold leading-tight">Maintenance Jobs</h2>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-bold tabular-nums">{filtered.length}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/60">in view</p>
          </div>
        </div>
      </div>

      {/* Filter pills */}
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

      {/* Job List */}
      <div className="flex-1 overflow-y-auto phone-scroll p-4 space-y-3 pb-12 bg-ink-950">
        {filtered.length === 0 ? (
          <Card><p className="text-center text-white/60 py-8 text-sm">No jobs in this filter</p></Card>
        ) : filtered.map(job => {
          const overdue = job.due_days_remaining < 0;
          const dueToday = job.due_days_remaining === 0;
          const accent = overdue ? 'from-red-500 to-rose-500' : dueToday ? 'from-amber-400 to-orange-500' : 'from-cyan-400 to-ocean-500';
          return (
            <Card key={job.id} onClick={() => onJobClick(job)} danger={overdue}>
              {/* gradient sidebar */}
              <span className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r bg-gradient-to-b ${accent}`} />
              <div className="pl-2">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-display font-bold text-white text-[15px] leading-tight">{job.job_name}</h3>
                  {statusBadge(job.status)}
                </div>
                <p className="text-[11px] text-white/60 mb-2 inline-flex items-center gap-1">
                  <Icon.Engine size={12} className="text-cyan-300" /> {job.equipment}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {overdue && <Badge variant="red" label={`${Math.abs(job.due_days_remaining)}d overdue`} pulse />}
                  {dueToday && !overdue && <Badge variant="orange" label="Due Today" />}
                  {!overdue && !dueToday && <Badge variant="blue" label={`Due in ${job.due_days_remaining}d`} />}
                  <Badge
                    variant={job.priority === 'Urgent' ? 'red' : job.priority === 'Important' ? 'orange' : 'gray'}
                    label={job.priority}
                  />
                </div>

                <div className="flex items-center gap-3 text-[11px] text-white/60">
                  <span className="inline-flex items-center gap-1"><Icon.Clock size={12} /> {formatDuration(job.estimated_time_minutes)}</span>
                  <span className="inline-flex items-center gap-1"><Icon.Calendar size={12} /> {formatDate(job.due_date)}</span>
                </div>

                {job.status === 'In Progress' && job.started_at && (
                  <div className="mt-2 rounded-lg bg-amber-400/10 border border-amber-300/25 px-2 py-1.5 text-[11px] text-amber-200 inline-flex items-center gap-1.5">
                    <Icon.Activity size={12} /> Started {new Date(job.started_at).toLocaleTimeString()}
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
    </div>
  );
};
