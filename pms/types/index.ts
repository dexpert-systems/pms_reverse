export type JobStatus = 'Planned' | 'In Progress' | 'Completed' | 'Verified' | 'Closed';
export type JobPriority = 'Routine' | 'Important' | 'Urgent';

export interface MaintenanceJob {
  id: string;
  equipment: string;
  job_name: string;
  job_description?: string;
  due_date: string;
  due_days_remaining: number;
  status: JobStatus;
  priority: JobPriority;
  estimated_time_minutes: number;
  started_at?: string;
  completed_at?: string;
  time_spent_minutes?: number;
  spare_parts_used?: string[];
  remarks?: string;
  verified_by?: string;
  created_at: string;
}

export type DefectStatus = 'Reported' | 'Assigned' | 'In Progress' | 'Resolved' | 'Closed';
export type DefectSeverity = 'Critical' | 'Major' | 'Minor';

export interface Defect {
  id: string;
  equipment: string;
  severity: DefectSeverity;
  description: string;
  status: DefectStatus;
  reported_by: string;
  assigned_to?: string;
  reported_at: string;
  fix_description?: string;
  root_cause?: string;
  resolved_at?: string;
}

export interface NoonReport {
  id: string;
  report_date: string;
  position: string;
  speed: number;
  distance_sailed: number;
  weather: 'Fair' | 'Moderate' | 'Rough' | 'Heavy';
  sea_state: string;
  engine_status: 'Normal' | 'Reduced' | 'Stopped';
  fuel_HFO: number;
  fuel_MGO: number;
  fuel_lube: number;
  remarks?: string;
  submitted_at?: string;
  submitted_by: string;
}

export interface DashboardSummary {
  jobs_due_today: number;
  jobs_overdue: number;
  jobs_completed_today: number;
  open_defects: number;
  critical_defects: number;
  completion_percentage: number;
}
