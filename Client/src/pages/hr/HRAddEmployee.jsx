import React, { useState } from 'react';
import { 
  UserPlus, ArrowLeft, Check, User, Mail, Phone, Building2, 
  Briefcase, DollarSign, MapPin, Laptop, ShieldCheck, 
  Sparkles, Calendar, ChevronRight, CheckCircle2, FileText, ArrowRight
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useHRMS } from '../../context/HRMSContext';
import { useAlert } from '../../context/AlertContext';

const STEPS = [
  { id: 1, title: 'Personal Info', desc: 'Identity & contact' },
  { id: 2, title: 'Role & Team', desc: 'Department & title' },
  { id: 3, title: 'Compensation', desc: 'Salary & benefits' },
  { id: 4, title: 'IT & Onboarding', desc: 'Hardware & access' },
];

export default function HRAddEmployee() {
  const navigate = useNavigate();
  const { addEmployee, departments } = useHRMS();
  const { showToast } = useAlert();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'San Francisco HQ',
    department: 'Engineering',
    role: '',
    employmentType: 'Full-time',
    manager: 'Marcus Sterling',
    joiningDate: new Date().toISOString().split('T')[0],
    salary: '$115,000',
    payFrequency: 'Monthly',
    benefitsTier: 'Standard Comprehensive (Health + Dental)',
    laptop: 'Apple MacBook Pro M3 (16-inch)',
    cloudAccess: true,
    autoOnboard: true,
    status: 'Active'
  });

  const nextStep = () => {
    if (currentStep === 1 && (!formData.name || !formData.email)) {
      showToast('Please provide employee full name and email address', 'error');
      return;
    }
    if (currentStep === 2 && !formData.role) {
      showToast('Please specify employee designation or role', 'error');
      return;
    }
    setCurrentStep(prev => Math.min(STEPS.length, prev + 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      showToast('Please complete all required fields', 'error');
      return;
    }

    addEmployee({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '+1 (555) 234-5678',
      department: formData.department,
      role: formData.role,
      salary: formData.salary,
      manager: formData.manager,
      location: formData.location,
      status: formData.status,
      employmentType: formData.employmentType,
    });

    showToast(`Employee "${formData.name}" successfully provisioned into HRDuo!`, 'success');
    navigate('/hr/employees');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/hr/employees"
            className="p-2 rounded-xl bg-white border border-slate-200/80 text-slate-500 hover:text-[#002D62] hover:border-slate-300 transition-all shadow-2xs"
            title="Back to Employees"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A8A8] bg-[#00A8A8]/10 px-2 py-0.5 rounded border border-[#00A8A8]/20">
                Workforce Provisioning
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-400 font-medium">HR Portal Workflow</span>
            </div>
            <h1 className="text-2xl font-black text-[#002D62] tracking-tight mt-0.5">
              Add New Employee
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Step {currentStep} of {STEPS.length}</span>
          <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#002D62] to-[#00A8A8] transition-all duration-300"
              style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stepper Tabs Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-2xs">
        {STEPS.map((s) => {
          const isDone = currentStep > s.id;
          const isCurrent = currentStep === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                if (isDone) setCurrentStep(s.id);
              }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                isCurrent 
                  ? 'bg-[#002D62] text-white shadow-sm'
                  : isDone
                    ? 'hover:bg-slate-50 cursor-pointer text-slate-700'
                    : 'opacity-50 cursor-not-allowed text-slate-400'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                isCurrent 
                  ? 'bg-white/20 text-white' 
                  : isDone 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-slate-100 text-slate-500'
              }`}>
                {isDone ? <Check size={14} /> : s.id}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold truncate">{s.title}</div>
                <div className={`text-[10px] truncate ${isCurrent ? 'text-white/70' : 'text-slate-400'}`}>{s.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Content Layout: Form + Live Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Form Container */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* STEP 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-[#002D62] flex items-center gap-2">
                    <User size={18} className="text-[#00A8A8]" />
                    Personal & Contact Details
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Basic identification information used across tax, insurance, and system access.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Liam Gallagher"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8] focus:border-[#00A8A8]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Corporate Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="liam@hrduo.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Work Location
                    </label>
                    <select
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8] bg-white"
                    >
                      <option value="San Francisco HQ">San Francisco HQ (Onsite)</option>
                      <option value="New York Hub">New York Hub (Hybrid)</option>
                      <option value="London Office">London Office (UK)</option>
                      <option value="Remote - United States">Remote - United States</option>
                      <option value="Remote - Global">Remote - Global</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Role & Team */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-[#002D62] flex items-center gap-2">
                    <Briefcase size={18} className="text-[#00A8A8]" />
                    Organizational Placement & Hierarchy
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Assign departments, job roles, reporting lines, and contract types.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Department
                      </label>
                      <select
                        value={formData.department}
                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8] bg-white"
                      >
                        {departments.map(d => (
                          <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Designation / Role Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Senior Full Stack Engineer"
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Reporting Line / Manager
                      </label>
                      <input
                        type="text"
                        value={formData.manager}
                        onChange={e => setFormData({ ...formData, manager: e.target.value })}
                        placeholder="Marcus Sterling"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Employment Type
                      </label>
                      <select
                        value={formData.employmentType}
                        onChange={e => setFormData({ ...formData, employmentType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8] bg-white"
                      >
                        <option value="Full-time">Full-time Regular</option>
                        <option value="Part-time">Part-time Regular</option>
                        <option value="Contractor">Contractor (1099/B2B)</option>
                        <option value="Internship">Internship / Co-op</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Start / Joining Date
                    </label>
                    <input
                      type="date"
                      value={formData.joiningDate}
                      onChange={e => setFormData({ ...formData, joiningDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8] bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Compensation & Benefits */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-[#002D62] flex items-center gap-2">
                    <DollarSign size={18} className="text-[#00A8A8]" />
                    Compensation Structure & Benefits
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Define payroll base salary, disbursement schedule, and health coverage.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Annual Base Salary
                      </label>
                      <input
                        type="text"
                        value={formData.salary}
                        onChange={e => setFormData({ ...formData, salary: e.target.value })}
                        placeholder="$115,000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Disbursement Cycle
                      </label>
                      <select
                        value={formData.payFrequency}
                        onChange={e => setFormData({ ...formData, payFrequency: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8] bg-white"
                      >
                        <option value="Monthly">Monthly (End of month)</option>
                        <option value="Semi-Monthly">Semi-Monthly (15th & 30th)</option>
                        <option value="Bi-Weekly">Bi-Weekly (Every 2 weeks)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Benefits & Health Plan Tier
                    </label>
                    <select
                      value={formData.benefitsTier}
                      onChange={e => setFormData({ ...formData, benefitsTier: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8] bg-white"
                    >
                      <option value="Executive Platinum (100% Covered + Vision)">Executive Platinum (100% Medical, Dental, Vision)</option>
                      <option value="Standard Comprehensive (Health + Dental)">Standard Comprehensive (Health + Dental)</option>
                      <option value="Essential Health Only">Essential Health Only</option>
                      <option value="Waived / Contractor stipend">Waived / Contractor stipend</option>
                    </select>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#00A8A8]/5 border border-[#00A8A8]/20 flex items-start gap-3">
                    <ShieldCheck size={18} className="text-[#00A8A8] shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-600">
                      <span className="font-bold text-[#002D62]">Statutory Deductions Automated: </span>
                      Federal & state tax withholdings, Social Security, and 401(k) allocations will calculate automatically upon payroll cycle execution.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: IT & Onboarding Automation */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-[#002D62] flex items-center gap-2">
                    <Laptop size={18} className="text-[#00A8A8]" />
                    Hardware Provisioning & Automated Onboarding
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Connect IT logistics and initiate automated new-hire task checklists.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Allocated Work Hardware
                    </label>
                    <select
                      value={formData.laptop}
                      onChange={e => setFormData({ ...formData, laptop: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8] bg-white"
                    >
                      <option value="Apple MacBook Pro M3 (16-inch)">Apple MacBook Pro M3 (16-inch / 36GB RAM)</option>
                      <option value="Apple MacBook Air M3 (13-inch)">Apple MacBook Air M3 (13-inch / 16GB RAM)</option>
                      <option value="Lenovo ThinkPad X1 Carbon">Lenovo ThinkPad X1 Carbon (Intel Core Ultra)</option>
                      <option value="Dell Precision 5690 Workstation">Dell Precision 5690 Workstation</option>
                      <option value="BYOD (Bring Your Own Device)">BYOD (Bring Your Own Device + MDM Profile)</option>
                    </select>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 hover:border-[#00A8A8] transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.cloudAccess}
                        onChange={e => setFormData({ ...formData, cloudAccess: e.target.checked })}
                        className="mt-1 rounded text-[#002D62] focus:ring-[#00A8A8] w-4 h-4"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Provision Google Workspace & Slack Account</div>
                        <div className="text-[11px] text-slate-500">Auto-create corporate mailbox and invite to primary team channels.</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 hover:border-[#00A8A8] transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.autoOnboard}
                        onChange={e => setFormData({ ...formData, autoOnboard: e.target.checked })}
                        className="mt-1 rounded text-[#002D62] focus:ring-[#00A8A8] w-4 h-4"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Enroll in Onboarding Checklist Pipeline</div>
                        <div className="text-[11px] text-slate-500">Automatically creates an onboarding dossier in the HR Onboarding tab.</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Previous Step
                </button>
              ) : (
                <Link
                  to="/hr/employees"
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Cancel
                </Link>
              )}

              {currentStep < STEPS.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#002D62] hover:bg-[#001D42] text-white text-xs font-bold shadow-md shadow-[#002D62]/20 transition-all cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#002D62] to-[#00A8A8] hover:opacity-95 text-white text-xs font-bold shadow-md shadow-[#002D62]/25 transition-all cursor-pointer"
                >
                  <Check size={16} />
                  <span>Enroll & Finalize Provisioning</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Live Preview Card */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Profile Preview</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#002D62] to-[#00A8A8] text-white font-extrabold text-base flex items-center justify-center shadow-md shadow-[#002D62]/20 shrink-0">
                {formData.name ? formData.name.charAt(0).toUpperCase() : 'N'}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-black text-[#002D62] truncate">
                  {formData.name || 'New Employee Name'}
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {formData.role || 'Designation Pending'}
                </div>
                <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-[#00A8A8] bg-[#00A8A8]/10 px-2 py-0.5 rounded">
                  {formData.department}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-50 border-t border-slate-50 pt-2">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Work Email:</span>
                <span className="font-semibold text-slate-700 truncate max-w-[150px]">{formData.email || '—'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Location:</span>
                <span className="font-semibold text-slate-700">{formData.location}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Reporting To:</span>
                <span className="font-semibold text-slate-700">{formData.manager}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Base Salary:</span>
                <span className="font-bold text-emerald-600">{formData.salary}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Contract:</span>
                <span className="font-semibold text-slate-700">{formData.employmentType}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Hardware:</span>
                <span className="font-semibold text-slate-700 truncate max-w-[150px]">{formData.laptop}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 flex items-start gap-2.5">
            <Sparkles size={16} className="text-[#00A8A8] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-700">Pro-tip for HR Managers:</span> You can also add employees in batch via the CSV export/import tool in the Employee Directory.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
