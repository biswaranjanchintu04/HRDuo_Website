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
  Layers,
  MapPin,
  Building2,
  Users
} from 'lucide-react';

export default function SolutionsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    document.title = "Solutions — Smart Attendance, Payroll & Workforce Suite";
  }, []);

  const solutions = [
    {
      id: "facial-attendance",
      number: "01",
      title: "Touchless AI Facial Kiosk",
      shortTitle: "Face Biometrics Kiosk",
      tagline: "Sub-second AI recognition with anti-spoof liveness check",
      icon: ScanFace,
      color: "bg-[#EBF3FA] text-[#002D62]",
      badge: "< 1s Speed",
      description: "Transform any standard tablet, smartphone, or laptop camera into an enterprise biometric kiosk. Eliminate buddy punching, entrance queues, and expensive proprietary hardware forever.",
      metrics: [
        { label: "Recognition Latency", val: "< 400ms" },
        { label: "Liveness Accuracy", val: "99.4%" },
        { label: "Hardware Cost", val: "₹0 (Browser Native)" }
      ],
      workflow: [
        { step: "01", name: "Camera Stream", desc: "Local video analyzed in WebAssembly memory without sending raw frames to external servers." },
        { step: "02", name: "Anti-Spoof Check", desc: "Multi-point depth and micro-motion analysis detects and rejects printed photos and screen replays." },
        { step: "03", name: "Vector Compare", desc: "128-D mathematical landmarks matched via Euclidean distance algorithms in milliseconds." },
        { step: "04", name: "Punch Logged", desc: "Timestamp cryptographically locked and synced directly to payroll & shift rosters." }
      ],
      capabilities: [
        "Rapid queue punch mode with touchless hygiene",
        "Active anti-spoof liveness prevents video playback fraud",
        "Offline buffer mode stores up to 10,000 punches during connectivity loss",
        "128-D mathematical vectors ensure zero raw employee photos are stored"
      ]
    },
    {
      id: "geofence-punch",
      number: "02",
      title: "Smart GPS Geofenced Punch",
      shortTitle: "GPS Geofenced Attendance",
      tagline: "Pinpoint mobile check-ins with automated perimeter validation",
      icon: MapPin,
      color: "bg-[#E6F8F8] text-[#00A8A8]",
      badge: "High Accuracy",
      description: "Define office, branch, or field site perimeters on interactive maps. Mobile staff can only register attendance when physically inside the designated radius.",
      metrics: [
        { label: "Radius Accuracy", val: "± 5 Meters" },
        { label: "Mock GPS Shield", val: "100% Blocked" },
        { label: "Battery Usage", val: "< 1% / Day" }
      ],
      workflow: [
        { step: "01", name: "Radius Setup", desc: "Set circular or polygon geo-fences around corporate offices, stores, or client facilities." },
        { step: "02", name: "GPS Verification", desc: "Mobile app queries device satellite telemetry and cross-checks anti-mock location APIs." },
        { step: "03", name: "In-Fence Validation", desc: "System grants instant check-in authorization only when verified inside perimeter." },
        { step: "04", name: "Live Feed Sync", desc: "Punches instantly populate HR and manager dashboards with geo-coordinates." }
      ],
      capabilities: [
        "Configurable multi-location branch radii from 25m to 500m",
        "Strict anti-spoofing rejects simulated fake-GPS apps and root devices",
        "Field agent route tracking with client-visit check-ins and notes",
        "Instant supervisor alerts on perimeter breach attempts"
      ]
    },
    {
      id: "dynamic-payroll",
      number: "03",
      title: "Attendance-Linked Payroll",
      shortTitle: "Attendance-Linked Payroll",
      tagline: "One-click salary calculations directly synced to live attendance",
      icon: IndianRupee,
      color: "bg-[#EBF3FA] text-[#002D62]",
      badge: "1-Click Run",
      description: "Eliminate manual Excel sheets and end-of-month reconciliations. The system calculates gross-to-net pay, overtime hours, unpaid leaves, and statutory taxes automatically.",
      metrics: [
        { label: "Processing Speed", val: "95% Faster" },
        { label: "Calculation Errors", val: "0.0%" },
        { label: "Payslip Output", val: "Instant Batch PDF" }
      ],
      workflow: [
        { step: "01", name: "Hour Aggregation", desc: "Auto-aggregates punch records, night premiums, late deductions, and approved leaves." },
        { step: "02", name: "Statutory Rules", desc: "Applies PF, ESIC, professional tax, medical insurance, and custom company allowances." },
        { step: "03", name: "Reconciliation Audit", desc: "Generates visual variance ledger highlighting edge cases for 1-click HR review." },
        { step: "04", name: "Batch Payout", desc: "Produces ready-to-upload bank ACH/NEFT disbursement files and distributes payslips." }
      ],
      capabilities: [
        "Auto-syncs verified attendance hours, late arrivals, and approved leaves",
        "Configurable tax brackets, provident fund, insurance, and company allowances",
        "Single-click batch payslip generation with direct employee self-service access",
        "Direct bank disbursement CSV exports ready for all major commercial banks"
      ]
    },
    {
      id: "leave-management",
      number: "04",
      title: "2-Step Leave Approvals",
      shortTitle: "2-Step Leave Approvals",
      tagline: "Transparent manager-to-HR approvals with instant balance deductions",
      icon: CalendarCheck,
      color: "bg-[#E6F8F8] text-[#00A8A8]",
      badge: "2-Step Flow",
      description: "Empower employees to request leaves from mobile or web. Approvals flow seamlessly from Team Managers to HR with real-time balance calculations.",
      metrics: [
        { label: "Approval Latency", val: "< 2 Hours" },
        { label: "Balance Drift", val: "Zero" },
        { label: "Audit Trail", val: "100% Digital" }
      ],
      workflow: [
        { step: "01", name: "Employee Request", desc: "Employee selects leave category and date range from mobile or web dashboard." },
        { step: "02", name: "Manager Approval", desc: "Team manager reviews applicant details, balance, and approves Step 1." },
        { step: "03", name: "HR Verification", desc: "HR administrator completes Step 2 verification for policy compliance." },
        { step: "04", name: "Ledger Update", desc: "Accrued balance deducted immediately and marked on attendance register for payroll." }
      ],
      capabilities: [
        "Customizable leave categories (Casual, Sick, Paid, Maternity, Paternity)",
        "Automated monthly balance accruals and carry-forward policy enforcement",
        "Unified team calendar view preventing simultaneous key staff absences",
        "Direct synchronization with monthly payroll deduction rules"
      ]
    },
    {
      id: "shift-scheduling",
      number: "05",
      title: "Rotational Shifts & Rosters",
      shortTitle: "Shifts & Grace Windows",
      tagline: "Effortless multi-branch and rotational shift management",
      icon: Clock,
      color: "bg-[#EBF3FA] text-[#002D62]",
      badge: "Zero Conflicts",
      description: "Coordinate complex rotations, split shifts, weekend duty, and grace periods across branches without scheduling collisions.",
      metrics: [
        { label: "Schedule Conflicts", val: "Eliminated" },
        { label: "Grace Window", val: "Configurable" },
        { label: "Overtime Visibility", val: "Real-Time" }
      ],
      workflow: [
        { step: "01", name: "Roster Design", desc: "Configure morning, evening, rotational, and night shifts with custom grace windows." },
        { step: "02", name: "Staff Mapping", desc: "Assign shifts by team or branch using interactive visual calendar matrix." },
        { step: "03", name: "Conflict Guard", desc: "System auto-checks labor law compliance, rest periods, and overtime caps." },
        { step: "04", name: "Punch Matching", desc: "Kiosks automatically tag employee check-ins against active shift windows in real time." }
      ],
      capabilities: [
        "Visual shift assignment with automatic overlap and conflict detection",
        "Flexible grace periods for early check-ins and late punch thresholds",
        "Automated push notifications sent to employee portals for upcoming roster shifts",
        "Multi-location branch mapping with geofenced kiosk assignments"
      ]
    },
    {
      id: "biometric-security",
      number: "06",
      title: "128-D Vector Privacy Security",
      shortTitle: "Vector AI Encryption",
      tagline: "Irreversible mathematical coordinates with zero raw photos stored",
      icon: ShieldCheck,
      color: "bg-[#E6F8F8] text-[#00A8A8]",
      badge: "Zero Photos",
      description: "We lead the industry in ethical biometric privacy. Facial features are converted to non-invertible 128-dimensional vectors and camera frames are immediately cleared from memory.",
      metrics: [
        { label: "Encryption Grade", val: "AES-256" },
        { label: "Stored Raw Photos", val: "0 (Guaranteed)" },
        { label: "Compliance", val: "SOC 2 · GDPR · DPDP" }
      ],
      workflow: [
        { step: "01", name: "RAM Landmark", desc: "Camera detects 68 landmark points and extracts 128 numerical coordinate floats." },
        { step: "02", name: "Instant Purge", desc: "Raw video frame is deleted from volatile memory within milliseconds of extraction." },
        { step: "03", name: "TLS 1.3 Transport", desc: "Float vector is encrypted with AES-256 and transmitted with forward secrecy." },
        { step: "04", name: "Isolated Vault", desc: "Vectors stored inside isolated schemas mathematically impossible to reconstruct into images." }
      ],
      capabilities: [
        "Irreversible mathematical embeddings cannot be reverse-engineered into faces",
        "End-to-end TLS 1.3 encryption in transit and AES-256 vector encryption at rest",
        "Rigorous multi-tenant organizational data isolation",
        "Comprehensive cryptographic audit logging for full enterprise compliance"
      ]
    }
  ];

  const current = solutions[activeTab];

  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">

      {/* 1. Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#002D62] text-xs font-semibold border border-[#D9E2EC]">
          <Sparkles className="w-3.5 h-3.5 text-[#00A8A8]" />
          Full-Stack Workforce Solutions
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#002D62] leading-tight">
          Everything Your Workforce Needs. <br />
          <span className="text-[#00A8A8]">Unified in One Platform.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#334E68] font-normal leading-relaxed">
          Eliminate fragmented tools, tedious spreadsheets, and legacy biometric hardware.
          Unify attendance, shifts, leave approvals, and payroll into a high-performance ecosystem.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => navigate('/face-attendance')}
            className="bg-gradient-to-r from-[#002D62] to-[#004B8D] hover:from-[#001E42] hover:to-[#003B73] text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-md cursor-pointer"
          >
            <span>Launch Face Kiosk Demo</span>
            <ArrowRight className="w-4 h-4 text-[#00C9CE]" />
          </button>
          <button
            onClick={() => navigate('/pricing')}
            className="bg-white hover:bg-slate-50 text-[#002D62] border border-slate-200 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer shadow-xs"
          >
            Explore Pricing Plans
          </button>
        </div>
      </div>

      {/* 2. Interactive Solutions Master-Detail Explorer */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">

        <div className="mb-8 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A8A8]">
            Interactive Module Explorer
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002D62] mt-1">
            Explore Core Solution Modules
          </h2>
          <p className="text-sm text-[#334E68] mt-1">
            Select any module to inspect its step-by-step workflow, technical specs, and live preview.
          </p>
        </div>

        {/* Master-Detail Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Modules Navigation */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#627D98] mb-2 px-1">
              Workforce Modules ({solutions.length})
            </div>

            <div className="space-y-2.5">
              {solutions.map((sol, idx) => {
                const Icon = sol.icon;
                const isSelected = activeTab === idx;
                return (
                  <button
                    key={sol.id}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                      isSelected
                        ? 'bg-[#002D62] text-white border-[#002D62] shadow-md shadow-blue-900/15'
                        : 'bg-slate-50/80 text-[#334E68] border-slate-200/80 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-white border border-slate-200 text-[#002D62]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-bold text-sm truncate ${
                            isSelected ? 'text-white' : 'text-[#002D62]'
                          }`}>
                            {sol.shortTitle}
                          </h3>
                        </div>
                        <p className={`text-xs truncate mt-0.5 ${
                          isSelected ? 'text-blue-100' : 'text-[#627D98]'
                        }`}>
                          {sol.tagline}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ml-2 ${
                      isSelected ? 'text-[#00C9CE]' : 'text-slate-400'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Test Kiosk Prompt */}
            <div className="mt-5 p-4 rounded-2xl bg-[#EBF3FA] border border-[#D9E2EC] flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-[#002D62]">
                  Test Live Face Scanner
                </div>
                <div className="text-[11px] text-[#486581]">
                  Experience sub-second recognition with your webcam right now.
                </div>
              </div>
              <button
                onClick={() => navigate('/face-attendance')}
                className="bg-[#002D62] hover:bg-[#001E42] text-white text-xs font-semibold px-3.5 py-2 rounded-lg whitespace-nowrap cursor-pointer shadow-xs"
              >
                Launch Kiosk
              </button>
            </div>
          </div>

          {/* RIGHT: Selected Module Detail View */}
          <div className="lg:col-span-7 bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-6">

            {/* Header: Title & Metrics */}
            <div className="space-y-3 pb-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${current.color}`}>
                    {React.createElement(current.icon, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#002D62]">
                      {current.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#00A8A8] font-medium">
                      {current.tagline}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E6F8F8] text-[#008585] border border-[#D0EFEF] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8A8] animate-pulse" />
                  <span>Module Active</span>
                </span>
              </div>

              <p className="text-[#334E68] text-sm leading-relaxed font-normal pt-1">
                {current.description}
              </p>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {current.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="bg-white rounded-xl p-3 border border-slate-200/80 text-center shadow-2xs">
                    <div className="text-base sm:text-lg font-extrabold text-[#002D62]">
                      {m.val}
                    </div>
                    <div className="text-[11px] text-[#627D98] font-medium mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Workflow Pipeline */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#002D62] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#00A8A8]" />
                  <span>Step-by-Step Automation Pipeline</span>
                </h4>
                <span className="text-[11px] text-[#627D98]">4 Stages</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.workflow.map((wf, wIdx) => (
                  <div key={wIdx} className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs space-y-1">
                    <div className="text-xs font-bold text-[#002D62] flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#EBF3FA] text-[#002D62] flex items-center justify-center text-[10px] font-bold">
                        {wf.step}
                      </span>
                      <span>{wf.name}</span>
                    </div>
                    <p className="text-xs text-[#334E68] leading-relaxed">
                      {wf.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Technical Capabilities */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#002D62]">
                Key Technical Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {current.capabilities.map((cap, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2 text-xs text-[#334E68] bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00A8A8] flex-shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/face-attendance')}
                className="bg-gradient-to-r from-[#002D62] to-[#004B8D] hover:from-[#001E42] hover:to-[#003B73] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Test Live in Kiosk</span>
                <ArrowRight className="w-4 h-4 text-[#00C9CE]" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="bg-white hover:bg-slate-50 text-[#002D62] border border-slate-200 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Request Custom Demo
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 3. Comparison Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A8A8]">
            The Modern Alternative
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002D62]">
            Why Workforces Switch to Us
          </h2>
          <p className="text-[#334E68] text-sm">
            Say goodbye to fingerprint hardware maintenance, manual registers, and spreadsheet formulas.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-[#627D98]">
                <th className="py-4 px-4">Feature / Capability</th>
                <th className="py-4 px-4 text-slate-400">Fingerprint Hardware</th>
                <th className="py-4 px-4 text-slate-400">Manual Spreadsheets</th>
                <th className="py-4 px-4 text-[#002D62] bg-[#EBF3FA]/70 rounded-t-xl font-bold">
                  Smart HRMS Platform
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-[#334E68]">
              <tr>
                <td className="py-4 px-4 font-semibold text-[#002D62]">Dedicated Hardware Costs</td>
                <td className="py-4 px-4 text-rose-500">₹40,000 - ₹1,50,000 / terminal</td>
                <td className="py-4 px-4 text-slate-500">Zero upfront, high labor</td>
                <td className="py-4 px-4 bg-[#EBF3FA]/70 font-semibold text-[#002D62]">
                  ₹0 (Standard phones/iPads)
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-[#002D62]">Buddy Punching Protection</td>
                <td className="py-4 px-4 text-amber-600">Moderate (card sharing)</td>
                <td className="py-4 px-4 text-rose-500">Zero protection</td>
                <td className="py-4 px-4 bg-[#EBF3FA]/70 font-semibold text-[#00A8A8]">
                  100% Anti-Spoof AI Face Match
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-[#002D62]">Verification Speed</td>
                <td className="py-4 px-4 text-slate-600">2 - 4 seconds per person</td>
                <td className="py-4 px-4 text-slate-600">N/A (Manual signature)</td>
                <td className="py-4 px-4 bg-[#EBF3FA]/70 font-semibold text-[#00A8A8]">
                  Sub-Second Instant Edge Match
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-[#002D62]">Payroll Integration</td>
                <td className="py-4 px-4 text-rose-500">Manual CSV export required</td>
                <td className="py-4 px-4 text-rose-500">Error-prone manual formulas</td>
                <td className="py-4 px-4 bg-[#EBF3FA]/70 font-semibold text-[#00A8A8]">
                  1-Click Direct Calculation
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-[#002D62]">Employee Biometric Privacy</td>
                <td className="py-4 px-4 text-amber-600">Stored physical templates</td>
                <td className="py-4 px-4 text-rose-500">Unprotected paper logs</td>
                <td className="py-4 px-4 bg-[#EBF3FA]/70 rounded-b-xl font-semibold text-[#00A8A8]">
                  128-D Irreversible Math Vectors
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
