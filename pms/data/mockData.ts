import { MaintenanceJob, Defect, NoonReport } from '../types';

export const mockJobs: MaintenanceJob[] = [
  // OVERDUE
  { id:'JOB001', equipment:'Main Engine > Fuel Pump', job_name:'Fuel Pump Inspection', job_description:'Inspect fuel pump pressure and nozzles. Check for leaks.', due_date:'2026-04-23', due_days_remaining:-3, status:'Planned', priority:'Urgent', estimated_time_minutes:45, created_at:'2026-04-20' },
  { id:'JOB002', equipment:'Main Engine > Turbocharger', job_name:'Turbo Pressure Test', job_description:'Test turbocharger boost pressure under load conditions.', due_date:'2026-04-24', due_days_remaining:-2, status:'Planned', priority:'Important', estimated_time_minutes:60, created_at:'2026-04-20' },

  // DUE TODAY
  { id:'JOB003', equipment:'Generator #1 > Oil Filter', job_name:'Oil Filter Change', job_description:'Replace oil filter cartridge and check oil level.', due_date:'2026-04-26', due_days_remaining:0, status:'In Progress', priority:'Routine', estimated_time_minutes:30, started_at:'2026-04-26T08:00:00Z', created_at:'2026-04-26' },
  { id:'JOB004', equipment:'Auxiliary Boiler > Burner', job_name:'Burner Inspection', job_description:'Inspect burner nozzle and flame pattern.', due_date:'2026-04-26', due_days_remaining:0, status:'Planned', priority:'Important', estimated_time_minutes:45, created_at:'2026-04-26' },
  { id:'JOB005', equipment:'Cooling Water > Pump', job_name:'Pump Bearing Check', job_description:'Check bearing temperature and vibration levels.', due_date:'2026-04-26', due_days_remaining:0, status:'Completed', priority:'Routine', estimated_time_minutes:20, time_spent_minutes:18, completed_at:'2026-04-26T10:00:00Z', remarks:'Bearing temp normal. No issues detected.', created_at:'2026-04-26' },
  { id:'JOB006', equipment:'Lube Oil > Filter', job_name:'ME Lube Oil Filter Change', job_description:'Replace main engine lube oil filter cartridge.', due_date:'2026-04-26', due_days_remaining:0, status:'Verified', priority:'Important', estimated_time_minutes:40, time_spent_minutes:42, completed_at:'2026-04-26T09:00:00Z', verified_by:'Chief Engineer', remarks:'Filter replaced. Oil level topped up.', created_at:'2026-04-26' },

  // UPCOMING
  { id:'JOB007', equipment:'Fresh Water > Tank', job_name:'FW Tank Level Check', due_date:'2026-04-27', due_days_remaining:1, status:'Planned', priority:'Routine', estimated_time_minutes:15, created_at:'2026-04-26' },
  { id:'JOB008', equipment:'Ballast Pump > Seal', job_name:'Ballast Pump Seal Inspection', due_date:'2026-04-27', due_days_remaining:1, status:'Planned', priority:'Important', estimated_time_minutes:50, created_at:'2026-04-26' },
  { id:'JOB009', equipment:'Main Engine > Injector', job_name:'Fuel Injector Cleaning', due_date:'2026-04-29', due_days_remaining:3, status:'Planned', priority:'Routine', estimated_time_minutes:90, created_at:'2026-04-26' },
  { id:'JOB010', equipment:'Steering Gear > Pump', job_name:'Hydraulic Pressure Test', due_date:'2026-05-01', due_days_remaining:5, status:'Planned', priority:'Important', estimated_time_minutes:60, created_at:'2026-04-26' },
];

export const mockDefects: Defect[] = [
  { id:'DEF001', equipment:'Main Engine > Cooling Water', severity:'Critical', description:'High temperature alarm triggered. Cooling water at 95C, limit is 90C.', status:'In Progress', reported_by:'Second Engineer', assigned_to:'Chief Engineer', reported_at:'2026-04-26T07:00:00Z' },
  { id:'DEF002', equipment:'Generator #1 > Insulation', severity:'Critical', description:'Insulation resistance dropped below 500 megaohm minimum. Risk of short circuit.', status:'Assigned', reported_by:'Chief Engineer', assigned_to:'Electrician', reported_at:'2026-04-26T05:00:00Z' },
  { id:'DEF003', equipment:'Fuel Oil Heater > Control Valve', severity:'Major', description:'Control valve slow response. Heating fuel takes 45 min instead of 15 min.', status:'In Progress', reported_by:'Chief Engineer', assigned_to:'Second Engineer', reported_at:'2026-04-25T12:00:00Z', fix_description:'Cleaned valve orifice and adjusted spring tension.', root_cause:'Partial blockage from fuel gum deposits' },
  { id:'DEF004', equipment:'Ballast Pump > Mechanical Seal', severity:'Major', description:'Oil seepage from mechanical seal, approx 0.5L per 24 hours.', status:'Assigned', reported_by:'Bosun', assigned_to:'Chief Engineer', reported_at:'2026-04-25T00:00:00Z' },
  { id:'DEF005', equipment:'Steering Gear > Coupling', severity:'Minor', description:'Coupling guard bolt loose. Potential vibration hazard.', status:'Resolved', reported_by:'Third Officer', assigned_to:'Chief Engineer', reported_at:'2026-04-25T00:00:00Z', fix_description:'All coupling bolts tightened with locking washers.', root_cause:'Normal wear and vibration loosening fastener over time', resolved_at:'2026-04-25T14:00:00Z' },
  { id:'DEF006', equipment:'Main Engine > Fuel Nozzle', severity:'Minor', description:'Slight fuel drip from port side nozzle during standby.', status:'Reported', reported_by:'Second Engineer', assigned_to:'', reported_at:'2026-04-26T06:00:00Z' },
];

export const mockNoonReports: NoonReport[] = [
  { id:'NR001', report_date:'2026-04-23', position:'N 35-42N E 139-45E (Tokyo Bay approach)', speed:14.2, distance_sailed:338, weather:'Fair', sea_state:'Calm, 0.5m swells', engine_status:'Normal', fuel_HFO:3.2, fuel_MGO:0.1, fuel_lube:0.08, remarks:'Normal passage. Approaching pilot station at 1600hrs.', submitted_at:'2026-04-23T12:00:00Z', submitted_by:'Chief Officer' },
  { id:'NR002', report_date:'2026-04-24', position:'Tokyo Harbor (Pilot embarked)', speed:4.1, distance_sailed:8, weather:'Fair', sea_state:'Calm (harbor)', engine_status:'Reduced', fuel_HFO:0.5, fuel_MGO:0.2, fuel_lube:0.04, remarks:'In port maneuvering with tugs. Bunkering completed at 1400hrs. 45t HFO, 8t MGO.', submitted_at:'2026-04-24T12:00:00Z', submitted_by:'Chief Officer' },
  { id:'NR003', report_date:'2026-04-25', position:'Tokyo Harbor - At Anchor', speed:0, distance_sailed:0, weather:'Fair', sea_state:'Calm', engine_status:'Stopped', fuel_HFO:0.0, fuel_MGO:0.15, fuel_lube:0.02, remarks:'Vessel at anchor. Engine maintenance ongoing. Departure planned 0600 tomorrow.', submitted_at:'2026-04-25T12:00:00Z', submitted_by:'Chief Officer' },
];

export const spareParts = [
  'Oil Filter Cartridge', 'Fuel Filter Element', 'Gasket Set', 'Bearing Assembly',
  'Seal Kit', 'V-Belt', 'Hose Assembly', 'Pump Coupling', 'Relief Valve', 'Check Valve',
  'Thermostat', 'Temperature Sensor', 'Pressure Switch', 'Control Valve', 'Strainer Basket',
];

export const commonEquipment = [
  'Main Engine', 'Generator #1', 'Generator #2', 'Fuel Oil Heater', 'Ballast Pump',
  'Steering Gear', 'Cooling Water System', 'Lube Oil System', 'Auxiliary Boiler', 'Air Compressor',
];
