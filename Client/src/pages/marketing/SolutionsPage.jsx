import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ScanFace, 
  IndianRupee, 
  Clock, 
  CalendarCheck, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ChevronRight,
  Lock,
  EyeOff,
  Check,
  Cpu,
  Terminal,
  Sliders,
  Activity,
  Layers,
  CheckCheck
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function SolutionsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    document.title = "Solutions — HRDuo Intelligent HR & Biometric Platform";
  }, []);

  const solutions = [
    {
      id: "facial-attendance",
      number: "01",
      title: "AI Face Attendance Kiosk",
      shortTitle: "Face Attendance Kiosk",
      tagline: "Sub-200ms Contactless Edge Recognition with Anti-Spoofing",
      icon: ScanFace,
      color: "bg-[#FFC933] text-slate-950",
      accent: "#FFC933",
      badge: "Sub-200ms",
      description: "Transform any standard tablet, laptop, or phone into a high-security attendance kiosk. Eliminate buddy punching, entrance bottleneck queues, and dirty fingerprint hardware permanently.",
      metrics: [
        { label: "Recognition Latency", val: "< 180ms" },
        { label: "Liveness Accuracy", val: "99.8%" },
        { label: "Hardware Capital", val: "₹0 (Browser Native)" }
      ],
      workflow: [
        { step: "01", name: "Edge Capture", desc: "Local camera stream analyzed in WebAssembly RAM without sending raw video frames to remote servers." },
        { step: "02", name: "3D Liveness", desc: "Multi-point micro-motion analysis rejects phone screens, paper photos, and video replays." },
        { step: "03", name: "Vector Compare", desc: "128-D coordinate landmarks compared via Euclidean distance algorithms in under 200ms." },
        { step: "04", name: "Punch Logged", desc: "Timestamp cryptographically locked and synced directly to real-time payroll & shift rosters." }
      ],
      capabilities: [
        "Multi-employee rapid queue check-in with zero physical touch",
        "Active 3D anti-spoof liveness prevents video replay attacks",
        "Offline buffer mode stores up to 10,000 punches during internet drops",
        "Mathematical vector matching ensures zero raw photos are ever saved"
      ]
    },
    {
      id: "dynamic-payroll",
      number: "02",
      title: "Automated Dynamic Payroll",
      shortTitle: "Automated Dynamic Payroll",
      tagline: "One-Click Salary Calculation Directly Connected to Live Attendance",
      icon: IndianRupee,
      color: "bg-[#008C75] text-white",
      accent: "#008C75",
      badge: "1-Click Payroll",
      description: "Say goodbye to manual Excel reconciliations and end-of-month panic. HRDuo calculates gross-to-net pay, overtime multipliers, unpaid leave deductions, and statutory taxes instantly based on real-time attendance logs.",
      metrics: [
        { label: "Processing Speed", val: "90% Faster" },
        { label: "Calculation Errors", val: "0.0%" },
        { label: "Payslip Output", val: "Instant Batch PDF" }
      ],
      workflow: [
        { step: "01", name: "Hour Aggregation", desc: "Auto-aggregates punch records, night-shift premiums, late deductions, and approved leaves." },
        { step: "02", name: "Statutory Rules", desc: "Applies jurisdiction tax brackets, provident fund, medical insurance, and custom allowances." },
        { step: "03", name: "Audit Preview", desc: "Generates visual reconciliation ledger highlighting edge cases for 1-click administrator review." },
        { step: "04", name: "Batch Payout", desc: "Produces ready-to-upload bank ACH/NEFT disbursement files and distributes encrypted payslips." }
      ],
      capabilities: [
        "Auto-syncs verified attendance hours, late arrivals, and approved leaves",
        "Configurable tax brackets, provident fund, insurance, and company allowances",
        "Single-click batch payslip generation with direct employee self-service access",
        "Direct bank disbursement CSV exports ready for all major commercial banks"
      ]
    },
    {
      id: "shift-scheduling",
      number: "03",
      title: "Shift Rosters & Scheduling",
      shortTitle: "Shift Rosters & Grace Rules",
      tagline: "Effortless Multi-Location & Rotational Shift Management",
      icon: Clock,
      color: "bg-[#FF5A36] text-white",
      accent: "#FF5A36",
      badge: "Zero Conflicts",
      description: "Coordinate complex workforce rotations, split shifts, weekend rosters, and grace periods across multiple branches without scheduling conflicts.",
      metrics: [
        { label: "Schedule Conflicts", val: "Eliminated" },
        { label: "Grace Rule Margin", val: "Configurable" },
        { label: "Overtime Visibility", val: "Real-Time" }
      ],
      workflow: [
        { step: "01", name: "Roster Creation", desc: "Configure morning, evening, rotational, and graveyard shifts with custom grace windows." },
        { step: "02", name: "Staff Mapping", desc: "Assign shifts by team or branch using interactive visual drag-and-drop calendar matrix." },
        { step: "03", name: "Conflict Guard", desc: "Engine auto-checks labor law compliance, mandatory rest periods, and overtime caps." },
        { step: "04", name: "Punch Matching", desc: "Kiosk automatically tags employee punches against active shift windows in real time." }
      ],
      capabilities: [
        "Drag-and-drop shift assignment with automatic conflict detection",
        "Flexible grace periods for early check-ins and late punch thresholds",
        "Automated notifications sent to employee portals for upcoming roster updates",
        "Multi-location branch mapping with geofenced kiosk assignments"
      ]
    },
    {
      id: "leave-management",
      number: "04",
      title: "Smart Leave Workflows",
      shortTitle: "Smart Leave Workflows",
      tagline: "Transparent Accruals, Fast Approvals, and Real-Time Calendars",
      icon: CalendarCheck,
      color: "bg-emerald-600 text-white",
      accent: "#059669",
      badge: "Instant Accrual",
      description: "Empower employees to request paid time off, sick days, and compensatory leave directly from their mobile portal. Managers approve in seconds with automated balance adjustments.",
      metrics: [
        { label: "Approval Latency", val: "< 2 Hours" },
        { label: "Balance Drift", val: "Zero" },
        { label: "Paper Trail", val: "100% Digital" }
      ],
      workflow: [
        { step: "01", name: "Self Request", desc: "Employee selects leave category and date range from mobile or web dashboard." },
        { step: "02", name: "Team Heatmap", desc: "Algorithm analyzes department calendar to ensure critical staffing thresholds remain met." },
        { step: "03", name: "Manager Action", desc: "Supervisor receives instant push notification and approves with a single tap." },
        { step: "04", name: "Ledger Update", desc: "Accrued balance deducted immediately and marked on attendance register for payroll." }
      ],
      capabilities: [
        "Customizable leave categories (Sick, Casual, Annual, Paternity, Maternity)",
        "Automated monthly balance accruals and carry-forward policy enforcement",
        "Unified team calendar view preventing simultaneous key staff absences",
        "Direct synchronization with monthly payroll deduction rules"
      ]
    },
    {
      id: "biometric-security",
      number: "05",
      title: "Vector Biometric Security",
      shortTitle: "Vector Biometric Security",
      tagline: "Privacy-Preserving 128-D Mathematical Encryption",
      icon: ShieldCheck,
      color: "bg-indigo-600 text-white",
      accent: "#4F46E5",
      badge: "Zero Photos",
      description: "We lead the industry in data ethics. HRDuo converts facial landmarks into irreversible 128-dimensional floating-point vectors and destroys source images immediately.",
      metrics: [
        { label: "Encryption Grade", val: "AES-256" },
        { label: "Stored Raw Photos", val: "0 (Guaranteed)" },
        { label: "Compliance", val: "SOC 2 · GDPR · DPDP" }
      ],
      workflow: [
        { step: "01", name: "RAM Landmark", desc: "Local camera detects 68 facial points and extracts 128 numerical coordinate floats." },
        { step: "02", name: "Instant Purge", desc: "Raw video frame is deleted from volatile memory within 8 milliseconds of extraction." },
        { step: "03", name: "TLS 1.3 Transport", desc: "Float vector is encrypted with AES-256 and transmitted with forward secrecy." },
        { step: "04", name: "Isolated Vault", desc: "Vectors stored inside isolated multi-tenant schemas mathematically impossible to invert." }
      ],
      capabilities: [
        "Irreversible mathematical embeddings cannot be reverse-engineered into faces",
        "End-to-end TLS 1.3 encryption in transit and AES-256 vector encryption at rest",
        "Rigorous multi-tenant organizational data isolation",
        "Comprehensive cryptographic audit logging for full enterprise compliance"
      ]
    },
    {
      id: "analytics-reports",
      number: "06",
      title: "Executive Analytics & Reports",
      shortTitle: "Executive Analytics & Reports",
      tagline: "Turn Workforce Attendance into Strategic Decision-Making Data",
      icon: BarChart3,
      color: "bg-amber-600 text-white",
      accent: "#D97706",
      badge: "Real-Time BI",
      description: "Spot attendance anomalies, departmental absenteeism patterns, overtime spikes, and payroll cost trends through executive visual dashboards.",
      metrics: [
        { label: "Data Freshness", val: "Real-Time Stream" },
        { label: "Export Formats", val: "PDF · CSV · XLS" },
        { label: "Anomaly Guard", val: "Machine Automated" }
      ],
      workflow: [
        { step: "01", name: "Real-Time Ingestion", desc: "Kiosk punches, leave approvals, and shift hours stream into analytics pipeline." },
        { step: "02", name: "Anomaly Flagging", desc: "System auto-detects chronic tardiness patterns, buddy punch attempts, and overtime burn." },
        { step: "03", name: "Visual Telemetry", desc: "Departmental punctuality heatmaps and labor cost graphs rendered dynamically." },
        { step: "04", name: "Automated Digest", desc: "Delivers scheduled weekly executive summaries directly to HR directors." }
      ],
      capabilities: [
        "Live attendance status board displaying who is in, absent, or on leave right now",
        "Department-level punctuality ratings and overtime cost heatmaps",
        "One-click audit reports formatted for statutory labor compliance inspections",
        "Automated scheduled email summaries delivered directly to department heads"
      ]
    }
  ];

  const current = solutions[activeTab];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      
      {/* 1. Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="yellow">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Full-Stack Workforce Solutions
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          Everything Your Modern Workplace Needs. <br />
          <span className="text-[#008C75]">Unified in One Platform.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium">
          Eliminate fragmented tools, tedious spreadsheets, and legacy biometric hardware. 
          HRDuo brings attendance, shifts, leave, and payroll together into a singular, high-performance ecosystem.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/face-attendance')}
            className="flex items-center gap-2"
          >
            <span>Launch Face Kiosk Demo</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/pricing')}
          >
            Explore Pricing
          </Button>
        </div>
      </div>

      {/* 2. SPLIT SECTION: Left (All Modules) vs Right (Module-Wise Work & Live Professional Mockup) */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 sm:p-10 lg:p-12">
        
        <div className="mb-10 text-left">
          <Badge variant="teal">Interactive Explorer</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Explore Core Solution Modules
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
            Select any module on the left to see its step-by-step workflow, technical specs, and live interactive work console on the right.
          </p>
        </div>

        {/* Master-Detail Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT SIDE: ALL MODULES LIST ================= */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 px-1">
              Select Solution Module ({solutions.length})
            </div>

            <div className="space-y-3">
              {solutions.map((sol, idx) => {
                const Icon = sol.icon;
                const isSelected = activeTab === idx;
                return (
                  <button
                    key={sol.id}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-200 flex items-center justify-between border-2 group ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-[1.02]'
                        : 'bg-[#FDFBF7] text-slate-800 border-[#F1E8D9] hover:border-slate-400 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                        isSelected ? 'bg-[#FFC933] text-slate-950 font-black' : 'bg-white border border-slate-200 text-[#008C75]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-mono font-bold ${
                            isSelected ? 'text-[#FFC933]' : 'text-slate-400'
                          }`}>
                            {sol.number}.
                          </span>
                          <h3 className={`font-black text-sm sm:text-base truncate ${
                            isSelected ? 'text-white' : 'text-slate-900'
                          }`}>
                            {sol.shortTitle}
                          </h3>
                        </div>
                        <p className={`text-xs truncate font-medium mt-0.5 ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {sol.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border hidden sm:inline-block ${
                        isSelected 
                          ? 'bg-[#FFC933] text-slate-950 border-[#FFC933]' 
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}>
                        {sol.badge}
                      </span>
                      <ChevronRight className={`w-5 h-5 transition-transform ${
                        isSelected ? 'text-[#FFC933] translate-x-0.5' : 'text-slate-400 group-hover:text-slate-700'
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Browser Test Kiosk Card */}
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-[#FEF3C7] to-amber-100 border border-[#FDE68A] flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-black text-amber-950 uppercase tracking-wider">
                  Test Live Facial Scanner
                </div>
                <div className="text-xs text-amber-900 font-medium">
                  Experience sub-200ms recognition with your webcam right now.
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/face-attendance')}
                className="whitespace-nowrap flex-shrink-0 bg-slate-900 text-white hover:bg-slate-800"
              >
                Launch Kiosk
              </Button>
            </div>
          </div>

          {/* ================= RIGHT SIDE: MODULE-WISE WORK & DYNAMIC COCKPIT ================= */}
          <div className="lg:col-span-7 bg-[#FDFBF7] rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] p-6 sm:p-8 lg:p-10 space-y-6 shadow-sm">
            
            {/* Header: Title, Category & Badge */}
            <div className="space-y-3 pb-5 border-b border-slate-200/80">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${current.color}`}>
                    {React.createElement(current.icon, { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {current.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-[#008C75]">
                      {current.tagline}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Module Active</span>
                </span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed font-medium pt-1">
                {current.description}
              </p>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1">
                {current.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="bg-white rounded-2xl p-3 border border-slate-200 text-center shadow-xs">
                    <div className="text-base sm:text-lg font-black text-slate-900">
                      {m.val}
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= HIGH-TECH PROFESSIONAL WORK CONSOLE ================= */}
            {/* (Replaces the broken image with a real, responsive, vector-driven visual HUD) */}
            <div className="w-full bg-white rounded-2xl border-2 border-slate-900 p-5 shadow-[6px_6px_0_0_#0F172A] relative overflow-hidden space-y-4">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline-block">
                    hrduo.engine // {current.id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                    Live Engine Status: Optimal
                  </span>
                </div>
              </div>

              {/* Center Canvas: Dynamic Component Display Based on Active Module */}
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 p-4 text-white">
                
                {/* 1. Face Attendance Viewfinder */}
                {activeTab === 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        FRONT_DOOR_KIOSK_01
                      </span>
                      <span>Latency: 184ms</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 rounded-xl p-3.5 border border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#008C75] to-[#FFC933] flex items-center justify-center text-slate-950 font-black text-lg shadow-sm">
                          SJ
                        </div>
                        <div>
                          <div className="font-black text-sm text-white">Sarah Jenkins</div>
                          <div className="text-xs text-slate-400">Product Engineering · EMP-2041</div>
                          <div className="text-[11px] font-mono text-emerald-400">Punch: 09:02:14 AM</div>
                        </div>
                      </div>

                      <div className="text-right sm:text-right w-full sm:w-auto">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                          <Check className="w-3 h-3" />
                          <span>99.8% Match</span>
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1 font-mono">
                          Zero Raw Photos Stored
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Automated Dynamic Payroll */}
                {activeTab === 1 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                      <span className="text-emerald-400 font-bold">PAYROLL_RUN // SEP_2026</span>
                      <span className="text-slate-300">David Vance (EMP-1088)</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <div className="text-slate-400 text-[10px]">Base Salary</div>
                        <div className="font-mono font-bold text-white mt-0.5">₹45,000.00</div>
                      </div>
                      <div className="p-2.5 bg-emerald-950/40 rounded-lg border border-emerald-800/40">
                        <div className="text-emerald-400 text-[10px]">Overtime (14h)</div>
                        <div className="font-mono font-bold text-emerald-300 mt-0.5">+₹2,800.00</div>
                      </div>
                      <div className="p-2.5 bg-red-950/40 rounded-lg border border-red-800/40">
                        <div className="text-red-400 text-[10px]">Taxes & PF</div>
                        <div className="font-mono font-bold text-red-300 mt-0.5">-₹5,400.00</div>
                      </div>
                      <div className="p-2.5 bg-[#FFC933]/15 rounded-lg border border-[#FFC933]/30">
                        <div className="text-[#FFC933] text-[10px] font-bold">Net Payout</div>
                        <div className="font-mono font-black text-white mt-0.5">₹42,400.00</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span className="font-mono">Bank NEFT/IMPS Disbursement Ready</span>
                      <span className="text-emerald-400 font-bold">PDF Payslip Generated</span>
                    </div>
                  </div>
                )}

                {/* 3. Shift Rosters & Scheduling */}
                {activeTab === 2 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                      <span className="text-[#FFC933] font-bold">ACTIVE_ROTATIONAL_ROSTER</span>
                      <span>0 Schedule Conflicts</span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-bold text-white">Morning Shift A (08:00 - 16:30)</span>
                        </div>
                        <span className="text-emerald-400 font-bold text-[11px]">48 On Duty</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-slate-500" />
                          <span className="font-bold text-slate-300">Evening Shift B (16:00 - 00:30)</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">32 Rostered</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                      <span className="text-[#FFC933] font-bold">15-Minute Grace Window Active</span>
                      <span className="font-mono">Auto-Conflict Guard Active</span>
                    </div>
                  </div>
                )}

                {/* 4. Smart Leave Workflows */}
                {activeTab === 3 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                      <span className="text-emerald-400 font-bold">LEAVE_APPROVAL_FLOW</span>
                      <span className="text-emerald-400 font-bold">Auto-Approved by Policy</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-0.5">
                        <div className="text-slate-400 text-[10px]">Applicant & Dept</div>
                        <div className="font-bold text-white">Alex Rivera</div>
                        <div className="text-slate-400 text-[11px]">Engineering Team</div>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-0.5">
                        <div className="text-slate-400 text-[10px]">Leave Scope</div>
                        <div className="font-bold text-white">Annual Paid Leave</div>
                        <div className="text-emerald-400 text-[11px]">Oct 14 - 16 (3 Days)</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>Accrual: <strong className="text-white">11 Days Left</strong></span>
                      <span className="text-emerald-400 font-bold">0 Team Schedule Collisions</span>
                    </div>
                  </div>
                )}

                {/* 5. Vector Biometric Security */}
                {activeTab === 4 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                      <span className="text-[#FFC933] font-bold flex items-center gap-1.5">
                        <Lock className="w-3 h-3" />
                        <span>AES-256-GCM ENCRYPTED</span>
                      </span>
                      <span className="text-emerald-400 font-bold">Non-Invertible</span>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <div className="text-[10px] font-mono text-slate-400">128-D Coordinate Embedding Vector:</div>
                      <div className="text-[11px] font-mono text-emerald-400 break-all bg-slate-950 p-2 rounded border border-slate-800">
                        [ 0.1428, -0.8912, 0.4501, 0.0219, -0.6721, 0.9124, 0.3811 ... ]
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="text-red-400 font-bold flex items-center gap-1">
                        <EyeOff className="w-3 h-3" />
                        <span>Raw Camera Frames Deleted in RAM</span>
                      </span>
                      <span className="font-mono">SHA-256 Verified</span>
                    </div>
                  </div>
                )}

                {/* 6. Executive Analytics & Reports */}
                {activeTab === 5 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                      <span className="text-emerald-400 font-bold">TELEMETRY_STREAM</span>
                      <span>All 6 Kiosks Online</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs text-center">
                      <div className="p-2 bg-emerald-950/40 rounded-lg border border-emerald-800/40">
                        <div className="text-slate-400 text-[10px]">Present</div>
                        <div className="font-bold text-emerald-400 text-sm">96.4%</div>
                      </div>
                      <div className="p-2 bg-amber-950/40 rounded-lg border border-amber-800/40">
                        <div className="text-slate-400 text-[10px]">Late Arrivals</div>
                        <div className="font-bold text-amber-400 text-sm">2.1%</div>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <div className="text-slate-400 text-[10px]">On Leave</div>
                        <div className="font-bold text-slate-300 text-sm">1.5%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                      <span className="text-emerald-400">Marketing: 18% Under Overtime Cap</span>
                      <span className="text-slate-400 underline cursor-pointer">Export CSV</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Status Pill */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs font-bold text-amber-900">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>Sub-200ms Active Matching Engine</span>
                </div>
                <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active</span>
                </span>
              </div>

            </div>

            {/* Step-by-Step Workflow Pipeline */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#008C75]" />
                  <span>How This Module Works (Step-by-Step)</span>
                </h4>
                <span className="text-[11px] font-bold text-slate-500">4-Stage Automation</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.workflow.map((wf, wIdx) => (
                  <div key={wIdx} className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs space-y-1">
                    <div className="text-xs font-black text-[#008C75] flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#E6F7F5] text-[#008C75] flex items-center justify-center text-[10px] font-black">
                        {wf.step}
                      </span>
                      <span>{wf.name}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {wf.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Technical Capabilities */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Key Technical Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {current.capabilities.map((cap, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#008C75] flex-shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/face-attendance')}
                className="flex items-center gap-2"
              >
                <span>Test Live in Kiosk</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/contact')}
              >
                Request Custom Demo
              </Button>
            </div>

          </div>

        </div>

      </div>

      {/* 3. Comparison Matrix: Traditional vs HRDuo */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#F1E8D9] p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <Badge variant="teal">Why Switch?</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            How HRDuo Outperforms Legacy Systems
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            See why progressive organizations are ditching dirty fingerprint readers and chaotic spreadsheets.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-500">
                <th className="py-4 px-4">Feature / Capability</th>
                <th className="py-4 px-4 text-slate-400">Fingerprint Hardware</th>
                <th className="py-4 px-4 text-slate-400">Manual Spreadsheets</th>
                <th className="py-4 px-4 text-[#008C75] bg-[#E6F7F5]/50 rounded-t-2xl font-black">
                  HRDuo AI Platform
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
              <tr>
                <td className="py-4 px-4 font-bold text-slate-900">Dedicated Hardware Costs</td>
                <td className="py-4 px-4 text-red-500">₹40,000 - ₹1,60,000 per door</td>
                <td className="py-4 px-4 text-slate-500">Low upfront, high labor</td>
                <td className="py-4 px-4 bg-[#E6F7F5]/50 font-bold text-emerald-700">
                  ₹0 (Runs on browser / tablets)
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-slate-900">Buddy Punching Protection</td>
                <td className="py-4 px-4 text-amber-600">Moderate (card sharing)</td>
                <td className="py-4 px-4 text-red-500">Zero protection</td>
                <td className="py-4 px-4 bg-[#E6F7F5]/50 font-bold text-emerald-700">
                  100% Anti-Spoof AI Face Match
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-slate-900">Verification Speed</td>
                <td className="py-4 px-4 text-slate-600">1 - 3 seconds per person</td>
                <td className="py-4 px-4 text-slate-600">N/A (Manual signature)</td>
                <td className="py-4 px-4 bg-[#E6F7F5]/50 font-bold text-emerald-700">
                  Sub-200ms Instant Edge Match
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-slate-900">Payroll Integration</td>
                <td className="py-4 px-4 text-red-500">Manual CSV export required</td>
                <td className="py-4 px-4 text-red-500">Error-prone manual formulas</td>
                <td className="py-4 px-4 bg-[#E6F7F5]/50 font-bold text-emerald-700">
                  1-Click Instant Calculation
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-slate-900">Hygiene & Contact</td>
                <td className="py-4 px-4 text-red-500">High touch (germ transfer)</td>
                <td className="py-4 px-4 text-slate-600">Shared pens & paper</td>
                <td className="py-4 px-4 bg-[#E6F7F5]/50 font-bold text-emerald-700">
                  100% Contactless Experience
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-slate-900">Employee Privacy</td>
                <td className="py-4 px-4 text-amber-600">Stored physical prints</td>
                <td className="py-4 px-4 text-red-500">Unprotected records</td>
                <td className="py-4 px-4 bg-[#E6F7F5]/50 rounded-b-2xl font-bold text-emerald-700">
                  128-D Irreversible Math Vectors
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Impact Numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-[#F1E8D9] text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-slate-900">99.8%</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
            Buddy Punching Eliminated
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-[#F1E8D9] text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-[#008C75]">12+ Hrs</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
            Saved Per Payroll Cycle
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-[#F1E8D9] text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-[#FF5A36]">0 Sec</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
            Queue Delays at Entrance
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-[#F1E8D9] text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-amber-600">100%</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
            Paperless Operations
          </div>
        </div>
      </div>

      {/* 5. Bottom Call to Action */}
      <div className="bg-slate-950 text-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black">
            Ready to Modernize Your Entire HR Workflow?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-medium">
            Test the live facial attendance kiosk in your browser right now, or schedule a customized walkthrough for your team.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/face-attendance')}
              className="flex items-center gap-2"
            >
              <span>Test Facial Kiosk Live</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/contact')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Contact Sales Team
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
