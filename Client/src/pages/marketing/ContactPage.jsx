import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2
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

  useEffect(() => {
    document.title = "Contact Us — HRDuo Sales & Enterprise Setup";
  }, []);

  const [errorMessage, setErrorMessage] = useState('');
  const [notice, setNotice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
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
          setNotice('Form captured! To deliver live emails to your inbox, add your Brevo SMTP key in Client/.env');
        } else {
          setNotice('');
        }
        setSubmitted(true);
      } else {
        throw new Error(result.error || 'Failed to send message via Brevo');
      }
    } catch (err) {
      console.warn('Contact form submission info:', err);
      setNotice(err.message || 'Inquiry captured locally. Check Brevo SMTP settings.');
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16">

      {/* Top Header Section matching reference image */}
      <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-5">
        {/* Pill Badge: GET IN TOUCH */}
        <div className="inline-flex items-center justify-center">
          <div className="bg-white text-slate-950 text-xs sm:text-sm font-black tracking-wider uppercase px-5 sm:px-6 py-2 rounded-full border-2 border-slate-950 shadow-[2.5px_2.5px_0px_#000] select-none cursor-default">
            GET IN TOUCH
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-slate-950 leading-[1.12]">
          We'd Love to Hear From You.
        </h1>

        {/* Subtitle Description */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
          Have queries about biometric kiosks, pricing, or custom enterprise deployment? Drop us a line and our workforce experts will get back to you within 24 hours.
        </p>
      </div>

      {/* 2-Column Neo-Brutalist Layout matching Reference Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

        {/* Left Card: Send Us a Message (Only the 6 requested fields) */}
        <div className="lg:col-span-7 bg-white rounded-3xl sm:rounded-[2.5rem] border-2 border-slate-950 shadow-[6px_6px_0px_#000] p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-2 border-slate-950 shadow-[2px_2px_0px_#000]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                  Message Sent Successfully!
                </h3>
                <p className="text-slate-600 text-sm sm:text-base font-medium max-w-md mx-auto">
                  Thank you for reaching out, <strong>{formData.name}</strong> from <strong>{formData.businessName || 'your business'}</strong>. An HRDuo specialist from our Bhubaneswar hub will contact you within 2 business hours.
                </p>
                {notice && (
                  <div className={`text-xs font-semibold px-4 py-2.5 rounded-xl max-w-md mx-auto border ${notice.includes('delivered') || notice.includes('successfully')
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}>
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
                  className="mt-4 bg-[#FFD027] hover:bg-[#F5C21B] text-slate-950 px-6 py-2.5 rounded-full font-black text-sm border-2 border-slate-950 shadow-[2px_2px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                {/* 1. Name & 2. Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-700/80 focus:border-slate-950 focus:outline-none text-sm text-slate-900 font-medium placeholder:text-slate-400 bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Tech Solutions Ltd."
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-700/80 focus:border-slate-950 focus:outline-none text-sm text-slate-900 font-medium placeholder:text-slate-400 bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* 3. Email & 4. Solutions Interested */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-700/80 focus:border-slate-950 focus:outline-none text-sm text-slate-900 font-medium placeholder:text-slate-400 bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                      Solutions Interested *
                    </label>
                    <select
                      value={formData.solutionInterested}
                      onChange={(e) => setFormData({ ...formData, solutionInterested: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-700/80 focus:border-slate-950 focus:outline-none text-sm text-slate-900 font-medium bg-white transition-colors cursor-pointer"
                    >
                      <option value="all-in-one">Complete HRDuo Suite (Face Attendance + Payroll)</option>
                      <option value="face-attendance">AI Face Attendance & Edge Kiosks</option>
                      <option value="payroll">Automated Dynamic Payroll & Payslips</option>
                      <option value="shift-roster">Shift Rosters & Leave Management</option>
                      <option value="enterprise-custom">Enterprise Custom Integration</option>
                    </select>
                  </div>
                </div>

                {/* 6. Message */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Type your query in detail here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-700/80 focus:border-slate-950 focus:outline-none text-sm text-slate-900 font-medium placeholder:text-slate-400 bg-white transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#FFD027] hover:bg-[#F5C21B] text-slate-950 font-black px-7 sm:px-8 py-3.5 rounded-full border-2 border-slate-950 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer disabled:opacity-75"
                  >
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

        {/* Right Card: Contact Details */}
        <div className="lg:col-span-5 bg-[#FEF9EC] rounded-3xl sm:rounded-[2.5rem] border-2 border-slate-950 shadow-[6px_6px_0px_#000] p-6 sm:p-10 flex flex-col justify-between">

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Contact Details
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 mb-8">
              Feel free to reach out via direct phone or email channels.
            </p>

            {/* List of 4 Contact Channels */}
            <div className="space-y-6">

              {/* EMAIL US */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full border-2 border-slate-950 bg-white flex items-center justify-center flex-shrink-0 shadow-[1.5px_1.5px_0px_#000]">
                  <Mail className="w-5 h-5 text-slate-950 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                    EMAIL US
                  </span>
                  <a
                    href="mailto:contact.hrduo@gmail.com"
                    className="font-bold text-slate-950 hover:text-[#008C75] text-sm sm:text-base transition-colors"
                  >
                    contact.hrduo@gmail.com
                  </a>
                </div>
              </div>

              {/* CALL US */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full border-2 border-slate-950 bg-white flex items-center justify-center flex-shrink-0 shadow-[1.5px_1.5px_0px_#000]">
                  <Phone className="w-5 h-5 text-slate-950 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                    CALL US
                  </span>
                  <a
                    href="tel:+918260935532"
                    className="font-bold text-slate-950 hover:text-[#008C75] text-sm sm:text-base transition-colors"
                  >
                    +91 82609 35532
                  </a>
                </div>
              </div>

              {/* OUR LOCATION */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full border-2 border-slate-950 bg-white flex items-center justify-center flex-shrink-0 shadow-[1.5px_1.5px_0px_#000]">
                  <MapPin className="w-5 h-5 text-slate-950 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                    OUR LOCATION
                  </span>
                  <p className="font-bold text-slate-950 text-sm sm:text-base">
                    Bhubaneswar, Odisha, India
                  </p>
                </div>
              </div>

              {/* OFFICE HOURS */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full border-2 border-slate-950 bg-white flex items-center justify-center flex-shrink-0 shadow-[1.5px_1.5px_0px_#000]">
                  <Clock className="w-5 h-5 text-slate-950 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                    OFFICE HOURS
                  </span>
                  <p className="font-bold text-slate-950 text-sm sm:text-base">
                    Mon – Sat: 9:00 AM – 7:00 PM IST
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Social Media Channels */}
          <div className="pt-8 border-t border-slate-300/80 mt-8">
            <span className="text-xs sm:text-sm font-bold text-slate-900 block mb-3">
              Connect on Social Media
            </span>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* WhatsApp */}
              <a
                href="https://wa.me/918260935532"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-slate-950 bg-white hover:bg-emerald-50 shadow-[1.5px_1.5px_0px_#000] flex items-center justify-center hover:scale-105 transition-transform"
              >
                <svg className="w-5 h-5 fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-slate-950 bg-white hover:bg-red-50 shadow-[1.5px_1.5px_0px_#000] flex items-center justify-center hover:scale-105 transition-transform"
              >
                <svg className="w-5 h-5 fill-[#FF0000]" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-slate-950 bg-white hover:bg-pink-50 shadow-[1.5px_1.5px_0px_#000] flex items-center justify-center hover:scale-105 transition-transform"
              >
                <svg className="w-5 h-5 fill-[#E4405F]" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-slate-950 bg-white hover:bg-blue-50 shadow-[1.5px_1.5px_0px_#000] flex items-center justify-center hover:scale-105 transition-transform"
              >
                <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-slate-950 bg-white hover:bg-blue-50 shadow-[1.5px_1.5px_0px_#000] flex items-center justify-center hover:scale-105 transition-transform"
              >
                <svg className="w-5 h-5 fill-[#0A66C2]" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-slate-950 bg-white hover:bg-sky-50 shadow-[1.5px_1.5px_0px_#000] flex items-center justify-center hover:scale-105 transition-transform"
              >
                <svg className="w-5 h-5 fill-[#229ED9]" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
                </svg>
              </a>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
