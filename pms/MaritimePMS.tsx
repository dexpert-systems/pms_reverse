'use client';
import React, { useState } from 'react';
import { Dashboard } from './screens/Dashboard';
import { Jobs } from './screens/Jobs';
import { JobDetail } from './screens/JobDetail';
import { Defects } from './screens/Defects';
import { DefectDetail } from './screens/DefectDetail';
import { NoonReportScreen } from './screens/NoonReport';
import { ReportDefect } from './screens/ReportDefect';
import { MaintenanceJob, Defect, NoonReport } from './types';
import { mockJobs, mockDefects, mockNoonReports } from './data/mockData';
import { getDashboardSummary } from './utils/helpers';

type Screen = 'dashboard' | 'jobs' | 'job-detail' | 'defects' | 'defect-detail' | 'noon-report' | 'report-defect';

export const MaritimePMS: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [jobs, setJobs] = useState<MaintenanceJob[]>(mockJobs);
  const [defects, setDefects] = useState<Defect[]>(mockDefects);
  const [noonReports, setNoonReports] = useState<NoonReport[]>(mockNoonReports);
  const [selectedJob, setSelectedJob] = useState<MaintenanceJob | null>(null);
  const [selectedDefect, setSelectedDefect] = useState<Defect | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [lastSynced, setLastSynced] = useState<string | undefined>(undefined);

  const summary = getDashboardSummary(jobs, defects);
  const overdueJobs = jobs.filter(j => j.due_days_remaining < 0);
  const criticalDefects = defects.filter(d => d.severity === 'Critical' && d.status !== 'Closed' && d.status !== 'Resolved');

  const updateJob = (updated: MaintenanceJob) => {
    setJobs(prev => prev.map(j => j.id === updated.id ? updated : j));
    setSelectedJob(updated);
    if (!isOnline) setPendingCount(p => p + 1);
  };

  const updateDefect = (updated: Defect) => {
    setDefects(prev => prev.map(d => d.id === updated.id ? updated : d));
    setSelectedDefect(updated);
    if (!isOnline) setPendingCount(p => p + 1);
  };

  const addDefect = (defect: Defect) => {
    setDefects(prev => [defect, ...prev]);
    if (!isOnline) setPendingCount(p => p + 1);
    setScreen('defects');
  };

  const submitNoonReport = (report: NoonReport) => {
    setNoonReports(prev => [report, ...prev]);
    if (!isOnline) setPendingCount(p => p + 1);
    setScreen('dashboard');
  };

  const handleSync = () => {
    if (!isOnline) return;
    setTimeout(() => {
      setLastSynced(new Date().toISOString());
      setPendingCount(0);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center px-4 py-8 bg-grad-night">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-60" />
      <div className="pointer-events-none absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-ocean-700/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-cyan2-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] rounded-full bg-fuchsia-500/10 blur-[120px]" />

      {/* Brand wordmark */}
      <div className="hidden md:flex absolute top-6 left-8 items-center gap-3 text-white/80">
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#1a6cf5" />
            </linearGradient>
          </defs>
          <path d="M16 2 L28 26 L16 20 L4 26 Z" fill="url(#lg)" />
        </svg>
        <div>
          <p className="font-display text-lg font-bold tracking-tight leading-none">SEALOG <span className="text-cyan-300">PMS</span></p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">Vessel Operations</p>
        </div>
      </div>
      <div className="hidden md:block absolute top-7 right-8 text-right text-white/60 text-[11px]">
        <p className="uppercase tracking-[0.25em]">Live Demo</p>
        <p className="font-mono text-cyan-300">v 1.0 · build 2604</p>
      </div>

      {/* Phone shell */}
      <div className="relative">
        {/* Soft floor reflection */}
        <div className="absolute inset-x-6 -bottom-6 h-12 bg-cyan2-400/20 blur-2xl rounded-full" />
        <div className="relative w-[390px] max-w-[94vw] h-[820px] max-h-[92vh] rounded-[3rem] p-[3px] bg-gradient-to-b from-white/20 via-white/5 to-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)]">
          <div className="relative w-full h-full rounded-[2.85rem] overflow-hidden bg-ink-950">
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 w-28 h-6 bg-black rounded-full flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              <span className="w-8 h-2 rounded-full bg-zinc-800" />
            </div>
            {/* Status bar */}
            <div className="absolute top-2.5 left-0 right-0 z-40 px-7 flex justify-between text-white/80 text-[11px] font-semibold pointer-events-none">
              <span className="font-mono">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
              <div className="flex items-center gap-1.5">
                <span className="opacity-80">●●●●</span>
                <span>5G</span>
                <span className="ml-1">▮▮▮▯</span>
              </div>
            </div>

            <div className="relative w-full h-full overflow-hidden">
              {screen === 'dashboard' && (
                <Dashboard
                  summary={summary}
                  overdueJobs={overdueJobs}
                  criticalDefects={criticalDefects}
                  isOnline={isOnline}
                  pendingCount={pendingCount}
                  lastSynced={lastSynced}
                  onStartJobs={() => setScreen('jobs')}
                  onReportDefect={() => setScreen('report-defect')}
                  onNoonReport={() => setScreen('noon-report')}
                  onToggleOnline={() => setIsOnline(p => !p)}
                  onSync={handleSync}
                />
              )}
              {screen === 'jobs' && (
                <Jobs
                  jobs={jobs}
                  onJobClick={j => { setSelectedJob(j); setScreen('job-detail'); }}
                  onBack={() => setScreen('dashboard')}
                />
              )}
              {screen === 'job-detail' && selectedJob && (
                <JobDetail
                  job={selectedJob}
                  onBack={() => setScreen('jobs')}
                  onUpdate={updateJob}
                />
              )}
              {screen === 'defects' && (
                <Defects
                  defects={defects}
                  onDefectClick={d => { setSelectedDefect(d); setScreen('defect-detail'); }}
                  onReportDefect={() => setScreen('report-defect')}
                  onBack={() => setScreen('dashboard')}
                />
              )}
              {screen === 'defect-detail' && selectedDefect && (
                <DefectDetail
                  defect={selectedDefect}
                  onBack={() => setScreen('defects')}
                  onUpdate={updateDefect}
                />
              )}
              {screen === 'noon-report' && (
                <NoonReportScreen
                  reports={noonReports}
                  onSubmit={submitNoonReport}
                  onBack={() => setScreen('dashboard')}
                />
              )}
              {screen === 'report-defect' && (
                <ReportDefect
                  onSubmit={addDefect}
                  onBack={() => setScreen('dashboard')}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
