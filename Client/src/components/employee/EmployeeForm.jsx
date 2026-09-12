import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, UserPlus, Sparkles, Copy, Check, ShieldCheck, Mail, Phone, User, Briefcase, Calendar, Key, CheckCircle2, ScanFace } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmployees } from '../../context/EmployeeContext';

const EmployeeForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const { departmentsList } = useEmployees();
  const initialFormState = {
    empId: '',
    name: '',
    email: '',
    phone: '',
    department: departmentsList[0] || 'Development',
    role: '',
    password: '',
    joiningDate: new Date().toISOString().split('T')[0],
    status: 'Active',
    employmentType: 'FULL_TIME'
  };

  const [formData, setFormData] = useState(initialData || initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [otpMessage, setOtpMessage] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Created Credentials State
  const [createdCredentials, setCreatedCredentials] = useState(null);
  const [copiedPassword, setCopiedPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowPassword(false);
      setOtp('');
      setVerificationToken('');
      setOtpMessage('');
      setCreatedCredentials(null);
      setCopiedPassword(false);
      if (initialData) {
        setFormData({
          ...initialData,
          empId: initialData.empId || initialData.id || '',
          password: initialData.password || '',
          status: initialData.status || 'Active',
          employmentType: initialData.employmentType || 'FULL_TIME'
        });
      } else {
        setFormData(initialFormState);
      }
    }
  }, [isOpen, initialData, departmentsList]);

  // Generate random password helper
  const handleAutoGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$';
    let newPass = '';
    for (let i = 0; i < 10; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password: newPass }));
    setShowPassword(true);
  };

  const requestOtp = async () => {
    if (!formData.email) {
      setOtpMessage('Please enter email address first.');
      return;
    }

    setIsSendingOtp(true);
    setOtpMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/email-otp/request', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email, purpose: 'EMPLOYEE_REGISTRATION' })
      });
      if (!res.ok) throw new Error(await res.text());
      setOtpMessage('OTP sent to employee email address.');
    } catch (err) {
      setOtpMessage(err.message || 'Failed to send OTP.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setOtpMessage('Please enter OTP code.');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/email-otp/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email, purpose: 'EMPLOYEE_REGISTRATION', otp })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid OTP code.');
      setVerificationToken(data.verificationToken);
      setOtpMessage('Email address verified successfully.');
    } catch (err) {
      setVerificationToken('');
      setOtpMessage(err.message || 'Failed to verify OTP.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!initialData && !verificationToken) {
      setOtpMessage('Please verify email OTP before registering employee.');
      return;
    }

    const payload = { ...formData, emailVerificationToken: verificationToken };
    onSubmit(payload);

    if (!initialData) {
      // Show credentials confirmation dialog
      setCreatedCredentials({
        name: formData.name,
        email: formData.email,
        password: formData.password || 'EmployeePass123',
        department: formData.department,
        role: formData.role
      });
    } else {
      onClose();
    }
  };

  const handleCopyCredentialsPassword = () => {
    if (createdCredentials?.password) {
      navigator.clipboard.writeText(createdCredentials.password);
      setCopiedPassword(true);
      setTimeout(() => setCopiedPassword(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-md">
      <AnimatePresence>
        {createdCredentials ? (
          /* Credentials Confirmation Box */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[32px] shadow-2xl max-w-lg w-full p-6 lg:p-8 border border-gray-100 flex flex-col gap-6 relative overflow-hidden text-left"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100 shadow-inner">
                <CheckCircle2 size={32} />
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 border border-emerald-100">
                Onboard Complete
              </span>
              <h3 className="text-xl font-black text-gray-900">Employee Created Successfully!</h3>
              <p className="text-xs text-gray-500 font-semibold mt-1">
                Account created for <span className="text-gray-900 font-bold">{createdCredentials.name}</span>
              </p>
              <div className="mt-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200/80 text-xs font-bold flex items-center gap-1.5">
                <span>✉️ Login credentials email sent to {createdCredentials.email}</span>
              </div>
            </div>

            {/* Credentials Card */}
            <div className="p-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl space-y-4 shadow-xl border border-slate-800">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Generated Login Credentials</span>
                <Key size={16} className="text-blue-400" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">Official Email:</span>
                  <span className="font-bold text-white">{createdCredentials.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">Department:</span>
                  <span className="font-bold text-blue-200">{createdCredentials.department}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="text-gray-400 font-medium">Generated Password:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-emerald-400 font-mono text-sm bg-black/40 px-3 py-1 rounded-xl border border-emerald-500/30">
                      {createdCredentials.password}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCredentialsPassword}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all cursor-pointer"
                      title="Copy Password"
                    >
                      {copiedPassword ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={() => {
                  setCreatedCredentials(null);
                  onClose();
                  window.location.href = '/admin/face-registration';
                }}
                className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs transition-all shadow-lg shadow-indigo-500/20 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <ScanFace size={16} />
                Enroll Face Now
              </button>
              <button
                type="button"
                onClick={() => {
                  setCreatedCredentials(null);
                  onClose();
                }}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-bold text-xs transition-all active:scale-95 cursor-pointer"
              >
                Done & Close
              </button>
            </div>
          </motion.div>
        ) : (
          /* Add / Edit Employee Form Modal */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1, y: 0 }}
            className="bg-white rounded-[36px] shadow-2xl w-full max-w-xl flex flex-col max-h-[92vh] border border-gray-100 overflow-hidden relative"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 text-white flex justify-between items-center relative overflow-hidden">
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner">
                  <UserPlus size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight">{initialData ? 'Edit Employee Profile' : 'Onboard New Employee'}</h2>
                  <p className="text-xs text-blue-200 font-medium mt-0.5">
                    {initialData ? 'Update employee designation & account settings' : 'Add new team member & generate login credentials'}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer relative z-10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-5 overflow-y-auto flex-1 text-left">
              
              {/* Section 1: Credentials */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Key size={14} className="text-[#0061e0]" /> Account Password
                  </label>
                  {!initialData && (
                    <button
                      type="button"
                      onClick={handleAutoGeneratePassword}
                      className="text-xs font-bold text-[#0061e0] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles size={13} /> Auto-Generate
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input 
                    required={!initialData}
                    type={showPassword ? "text" : "password"} 
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl py-3.5 px-4 pr-12 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-sm text-gray-900 transition-all shadow-sm"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Section 2: Personal Details */}
              <div className="space-y-4 pt-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  <User size={14} className="text-[#0061e0]" /> Personal Details
                </label>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500/20 font-semibold text-sm text-gray-900 transition-all shadow-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Biswaranjan Sahoo"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Email Address</label>
                    <input 
                      required
                      type="email" 
                      className={`w-full border border-gray-200 rounded-2xl py-3 px-4 outline-none transition-all font-semibold text-sm shadow-sm ${
                        initialData ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50/80 focus:ring-2 focus:ring-blue-500/20 text-gray-900'
                      }`}
                      value={formData.email}
                      onChange={(e) => {
                        if (initialData) return;
                        setFormData({...formData, email: e.target.value});
                        setVerificationToken('');
                        setOtp('');
                        setOtpMessage('');
                      }}
                      placeholder="biswa@company.com"
                      disabled={!!initialData}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Mobile Phone</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500/20 font-semibold text-sm text-gray-900 transition-all shadow-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Job Role & Department */}
              <div className="space-y-4 pt-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase size={14} className="text-[#0061e0]" /> Department & Role
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Department</label>
                    <select 
                      className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500/20 font-semibold text-sm text-gray-900 transition-all shadow-sm cursor-pointer"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                    >
                      {departmentsList.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Designation / Role</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500/20 font-semibold text-sm text-gray-900 transition-all shadow-sm"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      placeholder="e.g. Senior Software Engineer"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Employment Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'FULL_TIME', label: 'Full Time' },
                      { value: 'INTERN', label: 'Intern' },
                      { value: 'PROBATION', label: 'Probation' }
                    ].map(type => {
                      const isSelected = formData.employmentType === type.value;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({...formData, employmentType: type.value})}
                          className={`py-3 rounded-2xl border text-xs font-extrabold text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0061e0] border-transparent text-white shadow-md shadow-blue-500/20'
                              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {type.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Email OTP Verification Section for New Employee */}
              {!initialData && (
                <div className="space-y-2 rounded-3xl border border-blue-100 bg-blue-50/50 p-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-[#0061e0]" /> Email OTP Verification
                    </label>
                    {verificationToken && (
                      <span className="px-2.5 py-0.5 bg-emerald-500 text-white rounded-full text-[9px] font-black uppercase tracking-wider">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      className="min-w-0 flex-1 bg-white border border-gray-200 rounded-2xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-sm text-gray-900 transition-all shadow-sm"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit OTP"
                    />
                    <button
                      type="button"
                      onClick={requestOtp}
                      disabled={isSendingOtp || !!verificationToken}
                      className="px-4 py-2 bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-2xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      {isSendingOtp ? 'Sending...' : 'Send OTP'}
                    </button>
                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={isVerifyingOtp || !!verificationToken}
                      className="px-4 py-2 bg-[#0061e0] text-white rounded-2xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-blue-500/20"
                    >
                      {verificationToken ? 'Verified' : isVerifyingOtp ? 'Verifying...' : 'Verify Code'}
                    </button>
                  </div>
                  {otpMessage && <p className="text-xs font-bold text-blue-600 mt-1">{otpMessage}</p>}
                </div>
              )}

              {/* Date of Joining */}
              <div className="space-y-1 pt-2">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#0061e0]" /> Joining Date
                </label>
                <input 
                  required
                  type="date" 
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500/20 font-semibold text-sm text-gray-900 transition-all shadow-sm cursor-pointer"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                />
              </div>

              {initialData && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Account Status</label>
                  <select 
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500/20 font-semibold text-sm text-gray-900 transition-all shadow-sm cursor-pointer"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3.5 border border-gray-200 rounded-2xl font-bold text-xs text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3.5 bg-[#0061e0] text-white rounded-2xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserPlus size={16} />
                  <span>{initialData ? 'Update Profile' : 'Complete Onboarding'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployeeForm;
