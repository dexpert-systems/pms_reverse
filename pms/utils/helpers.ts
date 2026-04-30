import { MaintenanceJob, Defect, DashboardSummary } from '../types';

export const formatDuration = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const d = new Date(date); d.setHours(0, 0, 0, 0);
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff < -1) return `${Math.abs(diff)}d overdue`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatDateTime = (dateStr: string): string =>
  new Date(dateStr).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });

export const getDashboardSummary = (
  jobs: MaintenanceJob[],
  defects: Defect[],
): DashboardSummary => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const dueToday = jobs.filter(j => j.due_days_remaining === 0);
  const overdue = jobs.filter(j => j.due_days_remaining < 0);
  const completedToday = jobs.filter(j =>
    (j.status === 'Completed' || j.status === 'Verified' || j.status === 'Closed') &&
    j.completed_at && new Date(j.completed_at) >= today
  );
  const openDefects = defects.filter(d => d.status !== 'Closed' && d.status !== 'Resolved');
  const criticalDefects = openDefects.filter(d => d.severity === 'Critical');
  const totalScheduled = dueToday.length + completedToday.length;
  return {
    jobs_due_today: dueToday.length,
    jobs_overdue: overdue.length,
    jobs_completed_today: completedToday.length,
    open_defects: openDefects.length,
    critical_defects: criticalDefects.length,
    completion_percentage: totalScheduled > 0
      ? Math.round((completedToday.length / totalScheduled) * 100)
      : 0,
  };
};
