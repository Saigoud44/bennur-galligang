import React, { useState } from 'react';
import { X, Sparkles, CheckCircle, Calendar, Phone, User, Heart, Share2, Copy, Check, ShieldCheck, Flame, Info } from 'lucide-react';
import { GaneshaIcon, ModakIcon, DiyaIcon } from './FestiveIcons';
import { POOJA_OPTIONS, FESTIVAL_DATES, ORGANIZERS } from '../data/festivalData';
import { PoojaBookingRecord, FestivalConfig } from '../types';
import { playTempleBell } from '../utils/festiveAudio';

interface PoojaRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config?: FestivalConfig;
  initialPoojaType?: string;
  initialDate?: string;
  defaultPoojaType?: string;
  defaultDate?: string;
}

export function PoojaRegistrationModal({
  isOpen,
  onClose,
  config,
  initialPoojaType,
  initialDate,
  defaultPoojaType,
  defaultDate
}: PoojaRegistrationModalProps) {
  const [nameWithSurname, setNameWithSurname] = useState('');
  const [gothram, setGothram] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPooja, setSelectedPooja] = useState(initialPoojaType || defaultPoojaType || POOJA_OPTIONS[0].name);
  const [selectedDate, setSelectedDate] = useState(initialDate || defaultDate || FESTIVAL_DATES[0]);
  const [familyMembers, setFamilyMembers] = useState('');
  const [specialWishes, setSpecialWishes] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<PoojaBookingRecord | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

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
      setError("Please enter a valid 10-digit mobile number for confirmation.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/pooja-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameWithSurname: trimmedName,
          gothram: gothram.trim() || undefined,
          phone: cleanPhone,
          poojaType: selectedPooja,
          poojaDate: selectedDate,
          familyMembers: familyMembers.trim() || undefined,
          specialWishes: specialWishes.trim() || undefined,
          notes: notes.trim() || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit Pooja registration. Please try again.");
      }

      playTempleBell();
      setBookingSuccess(data.booking);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopySlip = () => {
    if (!bookingSuccess) return;
    const text = `🚩 *SRI SIDDHI VINAYAKA UTSAV 2026 - POOJA SANKALPAM SLIP* 🚩
━━━━━━━━━━━━━━━━━━━━
🪔 *Booking No:* ${bookingSuccess.bookingNumber}
👤 *Devotee Name with Surname:* ${bookingSuccess.nameWithSurname}
🏷️ *Gothram:* ${bookingSuccess.gothram || 'Shiva Gotram / Family Gotram'}
📱 *Contact:* +91 ${bookingSuccess.phone}
🌺 *Pooja / Seva:* ${bookingSuccess.poojaType}
📅 *Pooja Date:* ${bookingSuccess.poojaDate}
${bookingSuccess.familyMembers ? `👨‍👩‍👧‍👦 *Family Members:* ${bookingSuccess.familyMembers}\n` : ''}📍 *Venue:* NARSAIAH NILAYAM, 1-100/2, B-Phase Colony, Bennur
✨ *Organized by:* bennur_galligang
━━━━━━━━━━━━━━━━━━━━
🙏 Ganpati Bappa Morya! Mangala Murti Morya!`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const generateWhatsAppShareUrl = (orgPhone: string) => {
    if (!bookingSuccess) return '';
    const message = `Namaste! I have registered for Pooja at bennur_galligang Sri Siddhi Vinayaka Utsav 2026:
🪔 *Booking No:* ${bookingSuccess.bookingNumber}
👤 *Name with Surname:* ${bookingSuccess.nameWithSurname}
🏷️ *Gotram:* ${bookingSuccess.gothram || 'Shiva Gotram'}
🌺 *Pooja:* ${bookingSuccess.poojaType}
📅 *Date:* ${bookingSuccess.poojaDate}
${bookingSuccess.familyMembers ? `👨‍👩‍👧‍👦 *Family:* ${bookingSuccess.familyMembers}` : ''}
Please include our Gotra-Nama in the daily Sankalpam. Ganpati Bappa Morya!`;
    return `https://wa.me/91${orgPhone}?text=${encodeURIComponent(message)}`;
  };

  const handleResetForm = () => {
    setBookingSuccess(null);
    setNameWithSurname('');
    setGothram('');
    setPhone('');
    setFamilyMembers('');
    setSpecialWishes('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl border-2 border-amber-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Auspicious Header */}
        <div className="relative bg-gradient-to-r from-red-700 via-amber-700 to-orange-700 text-white p-5 sm:p-6 text-left">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/30 border border-amber-300/40 p-1 flex items-center justify-center backdrop-blur-sm shadow-inner">
                <GaneshaIcon className="w-10 h-10 text-amber-200" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 text-[11px] font-black uppercase tracking-wider text-amber-200 mb-1 border border-white/20">
                  <Flame className="w-3 h-3 text-amber-300" />
                  <span>పూజ సంకల్ప రిజిస్ట్రేషన్ • Pooja Booking</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-amber-100 leading-tight">
                  Want to do Pooja?
                </h2>
                <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
                  Enter your Name with Surname for Gotra-Nama Sankalpam
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-amber-200 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">

          {bookingSuccess ? (
            /* SUCCESS CONFIRMATION / SANKALPAM SLIP */
            <div className="space-y-6 animate-in zoom-in-95">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-green-500 text-white mx-auto flex items-center justify-center shadow-lg animate-bounce">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <h3 className="font-heading font-black text-2xl text-amber-950">
                  Pooja Registered Successfully!
                </h3>
                <p className="text-sm font-semibold text-emerald-800">
                  మీ పూజ సంకల్ప వివరాలు విజయవంతంగా నమోదు చేయబడ్డాయి
                </p>
              </div>

              {/* Devotional Sankalpam Slip Card */}
              <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/60 to-red-50/40 border-2 border-amber-300 shadow-md">
                <div className="absolute top-3 right-3 text-xs font-black px-2.5 py-1 rounded-full bg-amber-500 text-amber-950">
                  {bookingSuccess.bookingNumber}
                </div>

                <div className="flex items-center gap-2 mb-4 border-b border-amber-200 pb-3">
                  <DiyaIcon className="w-5 h-5 text-amber-600" />
                  <span className="font-heading font-bold text-base text-amber-900">
                    Sri Siddhi Vinayaka Utsav 2026 • Sankalpam Pass
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-white/90 rounded-xl border border-amber-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                      Devotee Name with Surname (ఇంటి పేరు)
                    </span>
                    <span className="font-heading font-black text-lg text-amber-950">
                      {bookingSuccess.nameWithSurname}
                    </span>
                  </div>

                  <div className="p-3 bg-white/90 rounded-xl border border-amber-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                      Gothram (గోత్రం)
                    </span>
                    <span className="font-bold text-base text-stone-800">
                      {bookingSuccess.gothram || "Shiva Gotram / Family Gotram"}
                    </span>
                  </div>

                  <div className="p-3 bg-white/90 rounded-xl border border-amber-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                      Selected Pooja / Seva
                    </span>
                    <span className="font-bold text-amber-900">
                      {bookingSuccess.poojaType}
                    </span>
                  </div>

                  <div className="p-3 bg-white/90 rounded-xl border border-amber-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                      Pooja Date
                    </span>
                    <span className="font-bold text-stone-800">
                      {bookingSuccess.poojaDate}
                    </span>
                  </div>

                  {bookingSuccess.familyMembers && (
                    <div className="p-3 bg-white/90 rounded-xl border border-amber-200 sm:col-span-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                        Family Members for Sankalpam
                      </span>
                      <span className="text-sm font-medium text-stone-800">
                        {bookingSuccess.familyMembers}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-amber-200 flex items-center justify-between text-xs text-amber-900">
                  <span className="font-bold">📍 B-Phase Colony, Bennur</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Confirmed with Pandit Ji
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={handleCopySlip}
                    className="flex-1 py-3 px-4 rounded-xl border-2 border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-amber-700" />}
                    <span>{copied ? "Copied to Clipboard!" : "Copy Sankalpam Slip"}</span>
                  </button>

                  <a
                    href={generateWhatsAppShareUrl('9390905613')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md text-center"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Send Slip to Sai Goud</span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={generateWhatsAppShareUrl('8688757194')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-center"
                  >
                    Share to Naresh Yadav (8688757194)
                  </a>
                  <a
                    href={generateWhatsAppShareUrl('7671803053')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-center"
                  >
                    Share to Venkat Yadav (7671803053)
                  </a>
                </div>

                <button
                  onClick={handleResetForm}
                  className="w-full py-2.5 text-center text-xs font-bold text-stone-600 hover:text-amber-800 underline"
                >
                  Register another Pooja / Family Member
                </button>
              </div>
            </div>
          ) : (
            /* POOJA REGISTRATION FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Highlight Guidance Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900">
                <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-amber-950">
                    Enter Name with Surname (ఇంటి పేరుతో సహా పేరు)
                  </p>
                  <p className="text-stone-600 mt-0.5 leading-relaxed">
                    Please provide your family surname and Gotram so the Vedic Pandit performs the sacred <strong>Gotra-Nama Sankalpam</strong> on your chosen festival day.
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center gap-2">
                  <span className="text-red-600 font-bold">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* 1. Name with Surname Input (CRITICAL FIELD) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-amber-950 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-700" />
                    <span>Enter Name with Surname (ఇంటి పేరుతో సహా పేరు) *</span>
                  </span>
                  <span className="text-[11px] font-bold text-red-600">Required</span>
                </label>
                <input
                  type="text"
                  required
                  value={nameWithSurname}
                  onChange={(e) => setNameWithSurname(e.target.value)}
                  placeholder="e.g. Goud Sai Kumar / యాదవ్ నరేష్ / కట్ట వెంకట్"
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 outline-none text-base font-semibold text-stone-900 bg-white placeholder:text-stone-400"
                />
                <p className="text-[11px] font-medium text-stone-500 italic">
                  Example format: [Surname] [First Name] — e.g. "Goud Sai", "Yadav Naresh"
                </p>
              </div>

              {/* 2. Gothram & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Gothram (గోత్రం)</span>
                    <span className="text-[10px] text-stone-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={gothram}
                    onChange={(e) => setGothram(e.target.value)}
                    placeholder="e.g. Shiva Gotram / Kashyapa"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-200 outline-none text-sm font-semibold text-stone-900 bg-white placeholder:text-stone-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-amber-950 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-700" />
                      <span>Mobile Number *</span>
                    </span>
                    <span className="text-[11px] font-bold text-red-600">Required</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-stone-500">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="9390905613"
                      className="w-full pl-11 pr-3.5 py-2.5 rounded-xl border-2 border-amber-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 outline-none text-sm font-bold text-stone-900 bg-white placeholder:text-stone-400"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Select Pooja / Seva Type */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-700" />
                  <span>Select Pooja / Seva (పూజ / సేవ ఎంపిక) *</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {POOJA_OPTIONS.map((opt) => {
                    const isSelected = selectedPooja === opt.name;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setSelectedPooja(opt.name)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-500 ring-2 ring-amber-400 shadow-sm'
                            : 'bg-white border-amber-200 hover:bg-amber-50/60'
                        }`}
                      >
                        <span className="text-xl flex-shrink-0">{opt.icon}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-amber-950 truncate">
                            {opt.name}
                          </p>
                          <p className="text-[11px] text-amber-800 truncate">
                            {opt.teluguName}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-semibold text-stone-500">
                            🕒 {opt.timeSlot}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Preferred Pooja Date */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>Select Preferred Date (పూజ తేదీ ఎంపిక) *</span>
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 outline-none text-xs sm:text-sm font-bold text-stone-900 bg-white"
                >
                  {FESTIVAL_DATES.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Family Members for Sankalpam */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-amber-700" />
                  <span>Family Members for Sankalpam (కుటుంబ సభ్యుల పేర్లు)</span>
                  <span className="text-[10px] text-stone-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={familyMembers}
                  onChange={(e) => setFamilyMembers(e.target.value)}
                  placeholder="e.g. Spouse Name, Children Names, Parents for blessings"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-200 outline-none text-xs sm:text-sm font-medium text-stone-900 bg-white placeholder:text-stone-400"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 border-2 border-amber-400 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-amber-950 border-t-transparent rounded-full animate-spin" />
                      <span>Registering Pooja Sankalpam...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <DiyaIcon className="w-5 h-5 text-amber-900" />
                      <span>Confirm &amp; Register Pooja (పూజ బుక్ చేయండి)</span>
                    </span>
                  )}
                </button>
                <p className="text-[11px] text-center font-medium text-stone-500 mt-2">
                  🙏 Free Devotional Registration • Organizers will contact on WhatsApp with timings
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
