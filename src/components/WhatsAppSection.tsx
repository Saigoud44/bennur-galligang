import React, { useState } from 'react';
import { MessageCircle, CheckCircle2, ShieldCheck, Send, Sparkles, AlertCircle, Bell, User, Phone, Users, Download, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GaneshaIcon, RangoliBorder } from './FestiveIcons';
import { playTempleBell } from '../utils/festiveAudio';

export function WhatsAppSection() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    id: string;
    fullName: string;
    phone: string;
    subscribedAt: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Admin subscriber list state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminSubscribers, setAdminSubscribers] = useState<Array<{
    id: string;
    fullName: string;
    maskedPhone: string;
    subscribedAt: string;
    whatsAppReadyNumber: string;
  }>>([]);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  const validatePhoneInput = (val: string) => {
    // allow only numbers, spaces, and leading plus
    return val.replace(/[^\d+ ]/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      setErrorMessage("Please enter your WhatsApp mobile number.");
      return;
    }

    if (!consent) {
      setErrorMessage("Please check the consent box to receive WhatsApp updates.");
      return;
    }

    // Basic quick client-side check for 10-digit Indian phone
    const cleanDigits = phone.replace(/\D/g, '');
    const tenDigits = cleanDigits.length === 12 && cleanDigits.startsWith('91') 
      ? cleanDigits.slice(2) 
      : cleanDigits.length === 11 && cleanDigits.startsWith('0') 
        ? cleanDigits.slice(1) 
        : cleanDigits;

    if (tenDigits.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!/^[6-9]/.test(tenDigits)) {
      setErrorMessage("Indian mobile numbers must start with 6, 7, 8, or 9.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          consent: true
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed. Please check your number.");
      }

      // Success
      setSuccessData(data.subscriber);
      playTempleBell();
      
      // Celebrate with confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EA580C', '#DC2626', '#10B981', '#FBBF24']
      });

    } catch (err: unknown) {
      const errObj = err as { message?: string };
      setErrorMessage(errObj.message || "Could not save subscription. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFetchAdminList = async () => {
    setLoadingAdmin(true);
    try {
      const res = await fetch('/api/subscribers');
      const data = await res.json();
      setAdminSubscribers(data.subscribers || []);
      setShowAdminModal(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAdmin(false);
    }
  };

  return (
    <section id="whatsapp-updates" className="py-14 bg-gradient-to-b from-[#FFFDF9] via-emerald-50/30 to-[#FFFDF9] border-b border-amber-200 relative overflow-hidden">
      
      {/* Decorative WhatsApp & Mandala glowing backdrop */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-900 uppercase tracking-widest">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Official Broadcast Channel</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-stone-900">
            Get Festival Updates on WhatsApp
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Opt in below to receive timely event-day reminders, daily morning and evening Aarti timings, cultural program alerts, and important Lucky Draw announcements directly on WhatsApp.
          </p>

          <div className="pt-1">
            <RangoliBorder />
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Benefits & Features (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-stone-900 text-base">
                  What You’ll Receive:
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Daily Aarti & Bhog Alerts:</strong> Timings for 7:00 AM and 7:30 PM rituals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Mahaprasadam Reminder:</strong> Notice for 21 September community feast.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Lucky Draw Live Results:</strong> Live winner numbers for ₹50 tokens and children's bicycle on 22 Sep.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Visarjan Procession Route:</strong> Real-time Shobha Yatra progress in Bennur village.</span>
                </li>
              </ul>
            </div>

            {/* Privacy Promise Card */}
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-900 mb-0.5">Privacy Note:</strong>
                <span>Contact details will only be used for festival-related updates and will not be shared with any third parties. Zero spam.</span>
              </div>
            </div>

            {/* Organizer Quick WhatsApp Contact Link */}
            <div className="text-center sm:text-left pt-1">
              <p className="text-xs text-stone-500">
                Prefer to chat directly? Contact <a href="https://wa.me/919390905613" className="font-bold text-emerald-700 hover:underline">Sai Goud</a> or <a href="https://wa.me/918688757194" className="font-bold text-emerald-700 hover:underline">Naresh Yadav</a>.
              </p>
            </div>

          </div>

          {/* Right Column: Subscription Form or Success Confirmation (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border-2 border-emerald-300 p-6 sm:p-8 shadow-lg relative overflow-hidden">
              
              {/* Form State */}
              {!successData ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-emerald-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <span className="font-heading font-bold text-base text-stone-900">
                        Join WhatsApp Utsav Updates
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Free & Instant
                    </span>
                  </div>

                  {/* Full Name Input */}
                  <div>
                    <label htmlFor="wa-fullname" className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-stone-500" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      id="wa-fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Reddy / Anitha Goud"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm bg-[#FFFDF9] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-stone-400"
                    />
                  </div>

                  {/* WhatsApp Mobile Number Input */}
                  <div>
                    <label htmlFor="wa-phone" className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-stone-500" />
                      <span>WhatsApp Number (10-Digit Indian Mobile) *</span>
                    </label>
                    <div className="relative flex rounded-xl border border-stone-300 bg-[#FFFDF9] focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 overflow-hidden">
                      <span className="inline-flex items-center px-3.5 bg-stone-100 text-stone-700 text-sm font-semibold border-r border-stone-200 select-none">
                        🇮🇳 +91
                      </span>
                      <input
                        id="wa-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(validatePhoneInput(e.target.value))}
                        placeholder="98765 43210"
                        maxLength={15}
                        required
                        className="w-full px-3.5 py-3 text-sm bg-transparent focus:outline-none placeholder:text-stone-400 font-mono tracking-wide"
                      />
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Enter your 10-digit mobile number active on WhatsApp.
                    </p>
                  </div>

                  {/* Required Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <input
                        id="wa-consent-checkbox"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        className="mt-1 h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <span className="text-xs text-stone-700 leading-relaxed group-hover:text-stone-900">
                        <strong>I agree to receive Sri Siddhi Vinayaka Utsav 2026 updates and reminders on WhatsApp.</strong>
                      </span>
                    </label>
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      id="subscribe-whatsapp-btn"
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Saving your subscription...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Subscribe for Updates</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy note */}
                  <p className="text-[11px] text-center text-stone-500">
                    🔒 Stored securely in festival registry. You can unsubscribe anytime by replying STOP.
                  </p>
                </form>
              ) : (
                /* Success Confirmation State */
                <div className="text-center py-4 space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold tracking-widest text-emerald-800">
                      Subscription Confirmed!
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-stone-900">
                      Namaste, {successData.fullName}!
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                      You have successfully opted in for <strong>Sri Siddhi Vinayaka Utsav 2026</strong> WhatsApp updates on <span className="font-mono font-bold text-stone-800">{successData.phone}</span>.
                    </p>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 text-left space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Next Steps for Devotees:</span>
                    </div>
                    <p>• Save the committee numbers <strong>Sai Goud (9390905613)</strong> & <strong>Naresh Yadav (8688757194)</strong> so broadcast messages are delivered directly.</p>
                    <p>• Daily aarti reminders will be sent before 7:00 AM & 7:30 PM.</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/919390905613?text=Namaste%20Sai%20Goud%20garu,%20I%20(${encodeURIComponent(successData.fullName)})%20have%20subscribed%20for%20Sri%20Siddhi%20Vinayaka%20Utsav%202026%20updates!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Say Hi on Organizer WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        setSuccessData(null);
                        setFullName('');
                        setPhone('');
                        setConsent(false);
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200"
                    >
                      Subscribe Another Number
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Committee Admin Access Tool */}
            <div className="mt-3 text-right">
              <button
                onClick={handleFetchAdminList}
                className="text-[11px] font-semibold text-stone-400 hover:text-stone-700 inline-flex items-center gap-1"
              >
                <Lock className="w-3 h-3" />
                <span>Committee Broadcast Registry</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Admin Subscriber Registry Viewer Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 border-2 border-emerald-300 shadow-2xl animate-in zoom-in-95 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-700" />
                <div>
                  <h3 className="font-heading font-bold text-lg text-stone-900">
                    WhatsApp Broadcast Subscribers ({adminSubscribers.length})
                  </h3>
                  <p className="text-xs text-stone-500">Registry ready for WhatsApp Business API / Gupshup / Twilio</p>
                </div>
              </div>
              <button
                onClick={() => setShowAdminModal(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between py-2 border-b border-stone-100 mb-3">
              <span className="text-xs text-stone-600 font-medium">
                Total Registered Devotees: <strong>{adminSubscribers.length}</strong>
              </span>
              <a
                href="/api/subscribers/export"
                download="sri-siddhi-vinayaka-utsav-whatsapp-subscribers.csv"
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV for WhatsApp Sender</span>
              </a>
            </div>

            {/* Table */}
            <div className="overflow-y-auto flex-1 divide-y divide-stone-100 pr-1">
              {adminSubscribers.length === 0 ? (
                <div className="py-8 text-center text-xs text-stone-500">
                  No subscribers yet. Fill the form to register your first devotee.
                </div>
              ) : (
                adminSubscribers.map((sub, idx) => (
                  <div key={sub.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-stone-900">{sub.fullName}</p>
                      <p className="text-stone-500 font-mono">{sub.maskedPhone}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Consent Verified
                      </span>
                      <p className="text-[10px] text-stone-400 mt-0.5">
                        {new Date(sub.subscribedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-stone-200 text-right">
              <button
                onClick={() => setShowAdminModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800"
              >
                Close Registry
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
