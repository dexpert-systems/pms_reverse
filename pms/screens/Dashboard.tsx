'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { MaintenanceJob, Defect, DashboardSummary } from '../types';

interface Props {
  summary: DashboardSummary;
  overdueJobs: MaintenanceJob[];
  criticalDefects: Defect[];
  isOnline: boolean;
  pendingCount: number;
  lastSynced?: string;
  onStartJobs: () => void;
  onReportDefect: () => void;
  onNoonReport: () => void;
  onToggleOnline: () => void;
  onSync: () => void;
}

const KPI: React.FC<{
  label: string;
  value: number;
  hint?: string;
  tone?: 'danger' | 'ok' | 'warn' | 'info';
  icon: React.ReactNode;
  onClick?: () => void;
}> = ({ label, value, hint, tone = 'info', icon, onClick }) => {
  const palette: Record<string, string> = {
    danger: 'from-rose-500/30 via-red-500/10 to-transparent border-rose-400/40 text-rose-200',
    warn:   'from-amber-400/25 via-amber-400/5 to-transparent border-amber-300/40 text-amber-200',
    ok:     'from-emerald-500/25 via-emerald-500/5 to-transparent border-emerald-400/40 text-emerald-200',
    info:   'from-cyan-500/25 via-cyan-500/5 to-transparent border-cyan-400/30 text-cyan-200',
  };
  return (
    <button
      onClick={onClick}
      className={`relative rounded-2xl p-3 bg-gradient-to-br ${palette[tone]} border ring-glow overflow-hidden text-left transition-all active:scale-[0.97] hover:brightness-110`}
    >
      <div className="flex items-start justify-between">
        <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-white/70">{label}</p>
        <span className="opacity-80">{icon}</span>
      </div>
      <p className="font-display text-3xl font-bold mt-0.5 text-white tabular-nums">{value}</p>
      {hint && <p className="text-[9px] mt-0.5 font-semibold opacity-90">{hint}</p>}
      <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-white/5 blur-2xl" />
      {/* Tap hint */}
      <Icon.ChevronR size={10} className="absolute bottom-2 right-2 text-white/30" />
    </button>
  );
};

export const Dashboard: React.FC<Props> = ({
  summary, overdueJobs, criticalDefects,
  isOnline, pendingCount, lastSynced,
  onStartJobs, onReportDefect, onNoonReport, onToggleOnline, onSync,
}) => {
  const total = summary.jobs_due_today + summary.jobs_completed_today;
  const pct = summary.completion_percentage;

  // Issue 3: Show sync banner when switching from offline → online with pending changes
  const [showSyncBanner, setShowSyncBanner] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
    } else if (wasOffline && isOnline && pendingCount > 0) {
      setShowSyncBanner(true);
      setWasOffline(false);
    }
  }, [isOnline, wasOffline, pendingCount]);

  const handleSyncClick = () => {
    if (!isOnline) return;
    setSyncing(true);
    onSync();
    setTimeout(() => {
      setSyncing(false);
      setShowSyncBanner(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-ink-950 text-white">
      {/* COMPACT HERO — reduced padding */}
      <div className="relative pt-11 pb-3 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grad-ocean opacity-90" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute -top-24 -right-20 w-72 h-72 bg-cyan2-400/30 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-cyan-200/90 text-[9px] font-bold tracking-[0.3em] uppercase">M/V Pacific Voyager</p>
              <h1 className="font-display text-[22px] font-bold leading-tight mt-0.5">
                <span className="shimmer-text">Mission Control</span>
              </h1>
            </div>
            <div className="flex items-center gap-1.5">
              {/* Sync button */}
              <button
                onClick={handleSyncClick}
                disabled={!isOnline || syncing}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md transition-all active:scale-95
                  ${isOnline
                    ? 'border-cyan-300/50 bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30'
                    : 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed'}`}
              >
                <Icon.Sync size={11} className={syncing ? 'animate-spin' : ''} />
                {syncing ? 'Syncing' : 'Sync'}
                {pendingCount > 0 && (
                  <span className="ml-0.5 px-1 py-0 rounded-full bg-amber-400/30 text-amber-200 text-[8px] font-bold">{pendingCount}</span>
                )}
              </button>
              {/* Online/Offline toggle */}
              <button
                onClick={onToggleOnline}
                className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md
                  ${isOnline ? 'border-emerald-300/50 bg-emerald-500/15 text-emerald-200' : 'border-amber-300/50 bg-amber-400/15 text-amber-200'}`}
              >
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-emerald-400' : 'bg-amber-300'}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? 'bg-emerald-400' : 'bg-amber-300'}`} />
                </span>
                {isOnline ? 'Online' : 'Offline'}
              </button>
            </div>
          </div>

          {/* Vessel mini-stats — single row, compact */}
          <div className="mt-2 flex gap-1.5 text-[10px]">
            <div className="flex-1 glass-strong rounded-lg px-2 py-1.5">
              <p className="text-white/50 text-[8px]">POS</p>
              <p className="font-mono font-bold">35°42′N 139°45′E</p>
            </div>
            <div className="flex-1 glass-strong rounded-lg px-2 py-1.5">
              <p className="text-white/50 text-[8px]">SPD</p>
              <p className="font-mono font-bold text-cyan-200">14.2 kts</p>
            </div>
            <div className="flex-1 glass-strong rounded-lg px-2 py-1.5">
              <p className="text-white/50 text-[8px]">HDG</p>
              <p className="font-mono font-bold">082° E</p>
            </div>
          </div>

          {/* KPI Grid — Issue 4: now clickable */}
          <div className="grid grid-cols-2 gap-2 mt-2.5">
            <KPI
              label="Overdue"
              value={summary.jobs_overdue}
              tone={summary.jobs_overdue > 0 ? 'danger' : 'ok'}
              hint={summary.jobs_overdue > 0 ? 'Action needed' : 'On track'}
              icon={<Icon.Alert size={13} />}
              onClick={onStartJobs}
            />
            <KPI
              label="Due Today"
              value={summary.jobs_due_today}
              tone="warn"
              icon={<Icon.Clock size={13} />}
              onClick={onStartJobs}
            />
            <KPI
              label="Completed"
              value={summary.jobs_completed_today}
              tone="ok"
              hint="Today"
              icon={<Icon.Check size={13} />}
              onClick={onStartJobs}
            />
            <KPI
              label="Critical"
              value={summary.critical_defects}
              tone={summary.critical_defects > 0 ? 'danger' : 'ok'}
              hint={summary.critical_defects > 0 ? 'Immediate' : 'None'}
              icon={<Icon.Bolt size={13} />}
              onClick={onReportDefect}
            />
          </div>
        </div>
      </div>

      {/* Issue 3: Sync banner when switching back online */}
      {showSyncBanner && (
        <div className="mx-4 mt-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-ocean-500/20 border border-cyan-400/40 px-4 py-3 flex items-center justify-between animate-pop">
          <div className="flex items-center gap-2">
            <Icon.Sync size={16} className={`text-cyan-300 ${syncing ? 'animate-spin' : ''}`} />
            <div>
              <p className="text-sm font-bold text-cyan-100">Back Online</p>
              <p className="text-[10px] text-cyan-200/70">{pendingCount} changes waiting to sync</p>
            </div>
          </div>
          <button
            onClick={handleSyncClick}
            disabled={syncing}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-ocean-500 text-white text-xs font-bold shadow-glow active:scale-95 transition-all disabled:opacity-60"
          >
            {syncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
      )}

      {/* BODY — Issue 1: reduced pb so more space visible */}
      <div className="flex-1 overflow-y-auto phone-scroll px-4 py-3 space-y-2.5 pb-40 bg-gradient-to-b from-ink-950 to-ink-900">
        {/* Progress ring + bar — compact */}
        <Card>
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 shrink-0">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="16" fill="none"
                  stroke="url(#progGrad)" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * 100.5} 100.5`}
                />
                <defs>
                  <linearGradient id="progGrad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#22d3ee" />
                    <stop offset="1" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-display text-lg font-bold text-white tabular-nums">{pct}<span className="text-[10px] text-white/60">%</span></p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/50">Today&apos;s Progress</p>
              <p className="font-display text-sm font-bold mt-0.5">
                {summary.jobs_completed_today} of {total} jobs cleared
              </p>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-emerald-300 transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex gap-3 mt-1.5 text-[9px] text-white/50">
                <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Done {summary.jobs_completed_today}</span>
                <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-300" /> Pending {summary.jobs_due_today}</span>
                <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Late {summary.jobs_overdue}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Overdue Alert */}
        {overdueJobs.length > 0 && (
          <Card danger onClick={onStartJobs}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-red-500/20 text-red-300">
                  <Icon.Alert size={14} />
                </span>
                <div>
                  <h3 className="font-display font-bold text-red-100 text-sm">{overdueJobs.length} Overdue {overdueJobs.length > 1 ? 'Jobs' : 'Job'}</h3>
                  <p className="text-[9px] uppercase tracking-wider text-red-300/80">Action required</p>
                </div>
              </div>
              <Badge variant="red" label="Priority" pulse />
            </div>
            <div className="space-y-1">
              {overdueJobs.slice(0, 3).map(j => (
                <div key={j.id} className="flex items-center justify-between rounded-lg bg-red-500/5 border border-red-400/15 px-2.5 py-1.5">
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-red-50 truncate">{j.job_name}</p>
                    <p className="text-[10px] text-red-200/70 truncate">{j.equipment}</p>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-red-300 shrink-0 ml-2">
                    {Math.abs(j.due_days_remaining)}d late
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Critical Defects */}
        {criticalDefects.length > 0 && (
          <Card danger>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-red-500/20 text-red-300">
                  <Icon.Bolt size={14} />
                </span>
                <div>
                  <h3 className="font-display font-bold text-red-100 text-sm">{criticalDefects.length} Critical {criticalDefects.length > 1 ? 'Defects' : 'Defect'}</h3>
                  <p className="text-[9px] uppercase tracking-wider text-red-300/80">Chief Engineer alerted</p>
                </div>
              </div>
              <Badge variant="red" label="Live" pulse />
            </div>
            <div className="space-y-1">
              {criticalDefects.map(d => (
                <div key={d.id} className="rounded-lg bg-red-500/5 border border-red-400/15 px-2.5 py-1.5">
                  <div className="flex justify-between items-start">
                    <p className="text-[12px] font-semibold text-red-50">{d.equipment}</p>
                    <Badge variant="red" label={d.status} />
                  </div>
                  <p className="text-[10px] text-red-200/70 mt-0.5 line-clamp-1">{d.description}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Activity feed */}
        <Card>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/50">Live Activity</p>
            <Icon.Activity size={12} className="text-cyan-300" />
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2 text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-white/50 font-mono text-[9px]">11:42</span>
              <span className="font-semibold">Lube oil pump check</span>
              <span className="text-emerald-300 ml-auto text-[9px]">VERIFIED</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
              <span className="text-white/50 font-mono text-[9px]">10:18</span>
              <span className="font-semibold">Noon report submitted</span>
              <span className="text-cyan-300 ml-auto text-[9px]">SYNCED</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
              <span className="text-white/50 font-mono text-[9px]">09:05</span>
              <span className="font-semibold">FW generator inspection</span>
              <span className="text-amber-300 ml-auto text-[9px]">IN PROG</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Action Dock — Issue 1: tighter padding */}
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-4 pt-2 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent">
        <div className="glass-strong rounded-2xl p-2.5 ring-glow">
          <Button onClick={onStartJobs} variant="primary" size="md" fullWidth>
            <Icon.Wrench size={14} /> Start Today&apos;s Jobs <Icon.ChevronR size={12} />
          </Button>
          <div className="grid grid-cols-2 gap-1.5 mt-1.5">
            <Button onClick={onReportDefect} variant="danger" size="sm" fullWidth>
              <Icon.Alert size={12} /> Report Defect
            </Button>
            <Button onClick={onNoonReport} variant="success" size="sm" fullWidth>
              <Icon.Compass size={12} /> Noon Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
