import React, { useState } from 'react';
import { Sparkles, Calendar, User, Phone, CheckCircle, Flame, Heart, Info, ArrowRight, Share2, ShieldCheck, Check, Copy } from 'lucide-react';
import { GaneshaIcon, DiyaIcon, ModakIcon } from './FestiveIcons';
import { POOJA_OPTIONS, FESTIVAL_DATES } from '../data/festivalData';
import { PoojaBookingRecord, FestivalConfig } from '../types';
import { playTempleBell } from '../utils/festiveAudio';

interface WantToDoPoojaSectionProps {
  config: FestivalConfig;
  onOpenPoojaModal?: (poojaType?: string, date?: string) => void;
}

export function WantToDoPoojaSection({ config, onOpenPoojaModal }: WantToDoPoojaSectionProps) {
  const [nameWithSurname, setNameWithSurname] = useState('');
  const [gothram, setGothram] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPooja, setSelectedPooja] = useState(POOJA_OPTIONS[0].name);
  const [selectedDate, setSelectedDate] = useState(FESTIVAL_DATES[0]);
  const [familyMembers, setFamilyMembers] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedBooking, setSubmittedBooking] = useState<PoojaBookingRecord | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = nameWithSurname.trim();
    if (!trimmedName || trimmedName.length < 3) {
      setError("Please enter your Full Name with Surname (ఇంటి పేరుతో సహా పేరు).");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/pooja-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameWithSurname: trimmedName,
          gothram: gothram.trim() || undefined,
          phone: cleanPhone,
          poojaType: selectedPooja,
          poojaDate: selectedDate,
          familyMembers: familyMembers.trim() || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit Pooja registration.");
      }

      playTempleBell();
      setSubmittedBooking(data.booking);
    } catch (err: any) {
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopySlip = () => {
    if (!submittedBooking) return;
    const text = `🚩 *SRI SIDDHI VINAYAKA UTSAV 2026 - POOJA SANKALPAM* 🚩
━━━━━━━━━━━━━━━━━━━━
🪔 *Booking No:* ${submittedBooking.bookingNumber}
👤 *Devotee Name with Surname:* ${submittedBooking.nameWithSurname}
🏷️ *Gothram:* ${submittedBooking.gothram || 'Shiva Gotram / Family Gotram'}
📱 *Mobile:* +91 ${submittedBooking.phone}
🌺 *Pooja:* ${submittedBooking.poojaType}
📅 *Date:* ${submittedBooking.poojaDate}
${submittedBooking.familyMembers ? `👨‍👩‍👧‍👦 *Family Members:* ${submittedBooking.familyMembers}\n` : ''}📍 *Venue:* B-Phase Colony, Bennur
━━━━━━━━━━━━━━━━━━━━
🙏 Ganpati Bappa Morya!`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="pooja-booking" className="py-16 sm:py-20 bg-gradient-to-b from-[#FFFDF9] via-amber-50/50 to-[#FFFDF9] relative overflow-hidden border-b border-amber-200">
      {/* Decorative Aura */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-800 text-xs font-black uppercase tracking-wider shadow-sm">
            <Flame className="w-4 h-4 text-red-600 animate-pulse" />
            <span>భక్తుల సంకల్ప పూజ • Devotee Pooja Seva</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-amber-950 tracking-tight">
            Want to do Pooja?
          </h2>
          
          <p className="text-sm sm:text-base text-amber-900/90 font-medium">
            పూజ చేయాలనుకుంటున్నారా? దయచేసి మీ <span className="font-black text-red-700 underline underline-offset-2">ఇంటి పేరుతో సహా పేరు (Name with Surname)</span> నమోదు చేయండి.
          </p>

          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto">
            Our Vedic Pandit performs daily <strong className="text-amber-950">Gotra-Nama Sankalpam</strong> for health, success, and prosperity during Sri Siddhi Vinayaka Utsav 2026.
          </p>
        </div>

        {/* 2-Column Layout: Left (Pooja Sevas Catalogue) & Right (Name with Surname Registration Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Popular Pooja / Seva Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-xl text-amber-950 flex items-center gap-2">
                <DiyaIcon className="w-5 h-5 text-amber-700" />
                <span>Available Pooja &amp; Seva Offerings</span>
              </h3>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-200">
                14 Sep – 22 Sep 2026
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {POOJA_OPTIONS.map((pooja) => {
                const isSelected = selectedPooja === pooja.name;
                return (
                  <div
                    key={pooja.id}
                    onClick={() => {
                      setSelectedPooja(pooja.name);
                      const formEl = document.getElementById('pooja-registration-form');
                      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-100 to-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400'
                        : 'bg-white/90 border-amber-200 hover:border-amber-400 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-2xl">{pooja.icon}</span>
                        {pooja.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                            {pooja.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="font-heading font-bold text-base text-amber-950 leading-snug">
                        {pooja.name}
                      </h4>
                      <p className="text-xs font-semibold text-amber-800 mt-0.5">
                        {pooja.teluguName}
                      </p>
                      <p className="text-xs text-stone-600 mt-1.5 line-clamp-2">
                        {pooja.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-amber-200/70 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-stone-600">
                        🕒 {pooja.timeSlot}
                      </span>
                      <span className="font-bold text-amber-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Select</span>
                        <ArrowRight className="w-3 h-3 text-amber-600" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Auspicious Blessing Quote */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-50 via-amber-50 to-orange-50 border border-amber-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-200/70 flex items-center justify-center text-amber-900 flex-shrink-0">
                <GaneshaIcon className="w-8 h-8 text-amber-800" />
              </div>
              <div className="text-xs text-amber-950">
                <p className="font-bold">
                  "వక్రతుండ మహాకాయ సూర్యకోటి సమప్రభ | నిర్విఘ్నం కురు మే దేవ సర్వకార్యేషు సర్వదా ||"
                </p>
                <p className="text-stone-600 mt-0.5">
                  Register your family Sankalpam today • Free Devotional Seva for all devotees.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: "Enter Name with Surname" Registration Form (5 Cols) */}
          <div id="pooja-registration-form" className="lg:col-span-5">
            <div className="bg-white/95 rounded-3xl border-2 border-amber-300 shadow-xl p-5 sm:p-7 relative backdrop-blur-sm">
              
              {/* Card Ribbon */}
              <div className="flex items-center justify-between gap-2 border-b border-amber-200 pb-4 mb-5">
                <div>
                  <div className="text-[11px] font-black text-red-700 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>పూజ బుకింగ్ ఫారం</span>
                  </div>
                  <h3 className="font-heading font-black text-xl text-amber-950">
                    Register Pooja Sankalpam
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                  <DiyaIcon className="w-6 h-6 text-amber-700" />
                </div>
              </div>

              {submittedBooking ? (
                /* SUCCESS VIEW */
                <div className="space-y-5 animate-in zoom-in-95">
                  <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-md">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <h4 className="font-heading font-black text-xl text-emerald-950">
                      Pooja Registered!
                    </h4>
                    <p className="text-xs font-bold text-emerald-800">
                      Pass No: <span className="text-base font-black font-mono">{submittedBooking.bookingNumber}</span>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2.5 text-xs">
                    <div className="flex justify-between border-b border-amber-200/60 pb-1.5">
                      <span className="text-stone-500 font-bold uppercase">Name with Surname:</span>
                      <span className="font-heading font-black text-sm text-amber-950">{submittedBooking.nameWithSurname}</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-200/60 pb-1.5">
                      <span className="text-stone-500 font-bold uppercase">Gothram:</span>
                      <span className="font-bold text-stone-900">{submittedBooking.gothram || "Shiva Gotram"}</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-200/60 pb-1.5">
                      <span className="text-stone-500 font-bold uppercase">Pooja Type:</span>
                      <span className="font-bold text-amber-900">{submittedBooking.poojaType}</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-200/60 pb-1.5">
                      <span className="text-stone-500 font-bold uppercase">Date:</span>
                      <span className="font-bold text-stone-900">{submittedBooking.poojaDate}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleCopySlip}
                      className="w-full py-2.5 px-4 rounded-xl border border-amber-300 bg-amber-100/70 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-amber-800" />}
                      <span>{copied ? "Copied to Clipboard!" : "Copy Sankalpam Slip"}</span>
                    </button>

                    <a
                      href={`https://wa.me/919390905613?text=${encodeURIComponent(
                        `Namaste Sai Goud garu! I registered for Pooja:\nNo: ${submittedBooking.bookingNumber}\nName: ${submittedBooking.nameWithSurname}\nGotram: ${submittedBooking.gothram || 'Shiva Gotram'}\nPooja: ${submittedBooking.poojaType}\nDate: ${submittedBooking.poojaDate}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Send to Organizer on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => setSubmittedBooking(null)}
                      className="w-full py-2 text-center text-xs font-semibold text-stone-600 hover:text-amber-800"
                    >
                      Register for another family member
                    </button>
                  </div>
                </div>
              ) : (
                /* INPUT FORM */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {error && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  {/* 1. Full Name with Surname (CRITICAL FIELD) */}
                  <div className="space-y-1">
                    <label className="block text-xs font-black uppercase tracking-wider text-amber-950 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-amber-700" />
                        <span>Enter Name with Surname *</span>
                      </span>
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                        ఇంటి పేరుతో సహా
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      value={nameWithSurname}
                      onChange={(e) => setNameWithSurname(e.target.value)}
                      placeholder="e.g. Goud Sai Kumar / యాదవ్ నరేష్"
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 outline-none text-sm font-bold text-stone-900 bg-white placeholder:text-stone-400"
                    />
                    <p className="text-[10px] text-stone-500 italic">
                      Please enter surname for Pandit Ji's Sankalpam
                    </p>
                  </div>

                  {/* 2. Gothram & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-amber-950">
                        Gothram (గోత్రం)
                      </label>
                      <input
                        type="text"
                        value={gothram}
                        onChange={(e) => setGothram(e.target.value)}
                        placeholder="e.g. Shiva Gotram"
                        className="w-full px-3 py-2 rounded-xl border border-amber-200 focus:border-amber-600 outline-none text-xs font-semibold text-stone-900 bg-white placeholder:text-stone-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center justify-between">
                        <span>Mobile No *</span>
                        <span className="text-[10px] text-red-600 font-semibold">10 Digits</span>
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="9390905613"
                        className="w-full px-3 py-2 rounded-xl border-2 border-amber-300 focus:border-amber-600 outline-none text-xs font-bold text-stone-900 bg-white placeholder:text-stone-400"
                      />
                    </div>
                  </div>

                  {/* 3. Pooja Type Selection */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-950">
                      Pooja / Seva Type (పూజ ఎంపిక) *
                    </label>
                    <select
                      value={selectedPooja}
                      onChange={(e) => setSelectedPooja(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border-2 border-amber-300 focus:border-amber-600 outline-none text-xs font-bold text-stone-900 bg-white"
                    >
                      {POOJA_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.name}>
                          {opt.icon} {opt.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 4. Preferred Date */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-950">
                      Pooja Date (తేదీ ఎంపిక) *
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-amber-200 focus:border-amber-600 outline-none text-xs font-semibold text-stone-900 bg-white"
                    >
                      {FESTIVAL_DATES.map((date) => (
                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 5. Family Members for Sankalpam */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-950">
                      Family Members for Sankalpam (Optional)
                    </label>
                    <input
                      type="text"
                      value={familyMembers}
                      onChange={(e) => setFamilyMembers(e.target.value)}
                      placeholder="e.g. Spouse & Children names"
                      className="w-full px-3 py-2 rounded-xl border border-amber-200 focus:border-amber-600 outline-none text-xs font-medium text-stone-900 bg-white placeholder:text-stone-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl font-black text-sm text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 border border-amber-400 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {loading ? (
                      <span>Registering Sankalpam...</span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-amber-900" />
                        <span>Register Pooja Sankalpam (పూజ బుక్ చేయండి)</span>
                      </span>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-stone-500">
                    🙏 Devotee Gotra-Nama Sankalpam performed with full Vedic traditions
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
