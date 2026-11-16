import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    solutionInterested: 'all-in-one',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    document.title = "Contact Sales — Schedule a Demo & Free Consultation";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotice('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.needsKey) {
          setNotice('Inquiry captured! Add Brevo SMTP key in Client/.env for live dispatch.');
        } else {
          setNotice('');
        }
        setSubmitted(true);
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (err) {
      console.warn('Contact form submission info:', err);
      setNotice(err.message || 'Inquiry captured successfully.');
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16">

      {/* Top Header Section */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#002D62] text-xs font-semibold border border-[#D9E2EC]">
          <Sparkles className="w-3.5 h-3.5 text-[#00A8A8]" />
          Get In Touch
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#002D62] leading-tight">
          Schedule a Demo or Consultation
        </h1>

        <p className="text-base sm:text-lg text-[#334E68] font-normal leading-relaxed max-w-2xl mx-auto">
          Have queries about biometric kiosks, geofencing, or automated payroll? Speak directly with our workforce specialists.
        </p>
      </div>

      {/* 2-Column Clean SaaS Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

        {/* Left Card: Send Us a Message */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002D62] mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E6F8F8] text-[#00A8A8] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#002D62]">
                  Message Received!
                </h3>
                <p className="text-[#334E68] text-sm sm:text-base font-normal max-w-md mx-auto">
                  Thank you for reaching out, <strong>{formData.name}</strong> from <strong>{formData.businessName || 'your business'}</strong>. A product specialist will connect with you within 2 business hours.
                </p>
                {notice && (
                  <div className="text-xs font-medium px-4 py-2.5 rounded-xl max-w-md mx-auto bg-[#EBF3FA] border border-[#D9E2EC] text-[#002D62]">
                    {notice}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      businessName: '',
                      email: '',
                      solutionInterested: 'all-in-one',
                      message: ''
                    });
                  }}
                  className="mt-4 bg-[#002D62] hover:bg-[#001E42] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                {/* 1. Name & 2. Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#002D62] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002D62] focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm text-[#002D62] placeholder:text-slate-400 bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#002D62] mb-1.5">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Enterprises Ltd."
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002D62] focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm text-[#002D62] placeholder:text-slate-400 bg-white transition-all"
                    />
                  </div>
                </div>

                {/* 3. Email & 4. Solutions Interested */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#002D62] mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002D62] focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm text-[#002D62] placeholder:text-slate-400 bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#002D62] mb-1.5">
                      Solution Interested In *
                    </label>
                    <select
                      value={formData.solutionInterested}
                      onChange={(e) => setFormData({ ...formData, solutionInterested: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002D62] focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm text-[#002D62] bg-white transition-all cursor-pointer"
                    >
                      <option value="all-in-one">Complete Suite (Face Attendance + Payroll)</option>
                      <option value="face-attendance">AI Face Biometrics & Touchless Kiosks</option>
                      <option value="geofence">GPS Geofencing Mobile Attendance</option>
                      <option value="gym-suite">Gym & Fitness Member Turnstile Suite</option>
                      <option value="campus-suite">Education & Campus Kiosks</option>
                      <option value="enterprise-custom">Enterprise Custom API Integration</option>
                    </select>
                  </div>
                </div>

                {/* 5. Message */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#002D62] mb-1.5">
                    Message / Requirement *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your team size, locations, and requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002D62] focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm text-[#002D62] placeholder:text-slate-400 bg-white transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-[#002D62] to-[#004B8D] hover:from-[#001E42] hover:to-[#003B73] text-white font-semibold px-7 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer disabled:opacity-75"
                  >
                    <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
                    <ArrowRight className="w-4 h-4 text-[#00C9CE]" />
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

        {/* Right Card: Contact Details */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 flex flex-col justify-between">

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002D62]">
              Direct Contact
            </h2>
            <p className="text-xs sm:text-sm text-[#486581] font-normal mt-1 mb-8">
              Reach our enterprise support team through any direct channel.
            </p>

            {/* List of 4 Contact Channels */}
            <div className="space-y-6">

              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EBF3FA] text-[#002D62] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#627D98] block">
                    EMAIL
                  </span>
                  <a
                    href="mailto:contact.hrduo@gmail.com"
                    className="font-semibold text-[#002D62] hover:text-[#00A8A8] text-sm sm:text-base transition-colors"
                  >
                    contact.hrduo@gmail.com
                  </a>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E6F8F8] text-[#00A8A8] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#627D98] block">
                    PHONE
                  </span>
                  <a
                    href="tel:+918260935532"
                    className="font-semibold text-[#002D62] hover:text-[#00A8A8] text-sm sm:text-base transition-colors"
                  >
                    +91 82609 35532
                  </a>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EBF3FA] text-[#002D62] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#627D98] block">
                    OFFICE HUB
                  </span>
                  <p className="font-semibold text-[#002D62] text-sm sm:text-base">
                    Bhubaneswar, Odisha, India
                  </p>
                </div>
              </div>

              {/* HOURS */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E6F8F8] text-[#00A8A8] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#627D98] block">
                    SUPPORT HOURS
                  </span>
                  <p className="font-semibold text-[#002D62] text-sm sm:text-base">
                    Mon – Sat: 9:00 AM – 7:00 PM IST
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Social Channels */}
          <div className="pt-8 border-t border-slate-100 mt-8">
            <span className="text-xs font-semibold text-[#627D98] uppercase tracking-wider block mb-3">
              Fast Response on WhatsApp
            </span>

            <a
              href="https://wa.me/918260935532"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E6F8F8] hover:bg-[#D0EFEF] text-[#008585] font-semibold text-xs transition-colors"
            >
              <span>Chat Directly on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00A8A8]" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
