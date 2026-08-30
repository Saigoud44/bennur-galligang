import React, { useState, useEffect } from 'react';
import { 
  Ticket, CheckCircle2, AlertCircle, Copy, Check, 
  Sparkles, X, Phone, MessageCircle, ArrowRight, 
  Download, QrCode, ShieldCheck, HeartHandshake, ExternalLink, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FestivalConfig, TokenRecord } from '../types';

interface TakeTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: FestivalConfig;
  initialQuantity?: number;
}

export function TakeTokenModal({
  isOpen,
  onClose,
  config,
  initialQuantity = 2
}: TakeTokenModalProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookedToken, setBookedToken] = useState<TokenRecord | null>(null);

  const tokenPrice = config.luckyDrawTokenPrice || 50;
  const totalAmount = quantity * tokenPrice;
  const upiId = "esai4488@ybl";
  const organizerPhone = "9390905613";

  // UPI deep link
  const upiPayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent("Sri Siddhi Vinayaka Utsav")}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(`Token Booking for ${quantity} tokens`)}`;
  
  // High-res QR code generated for this exact transaction
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=12&data=${encodeURIComponent(upiPayUrl)}`;

  useEffect(() => {
    if (isOpen) {
      setQuantity(initialQuantity || 2);
      setError(null);
    }
  }, [isOpen, initialQuantity]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleBookToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanPhone = phone.replace(/\D/g, '');
    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/tokens/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanPhone,
          quantity,
          utrNumber: utrNumber.trim() || undefined,
          notes: `Online Booking on site for ${quantity} tokens (₹${totalAmount}) to ${upiId}`
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to book token");
      }

      setBookedToken(data.token);
      
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#dc2626', '#10b981', '#fbbf24']
        });
      } catch (cErr) {
        console.debug("Confetti skipped:", cErr);
      }

    } catch (err: unknown) {
      const errObj = err as { message?: string };
      setError(errObj.message || "Failed to submit token booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForNew = () => {
    setBookedToken(null);
    setName('');
    setPhone('');
    setUtrNumber('');
    setQuantity(2);
  };

  // WhatsApp confirmation text for devotee
  const getDevoteeWhatsAppMsg = () => {
    if (!bookedToken) return '';
    const tokensList = bookedToken.tokenNumbers.join(', ');
    return `Namaste Sai Goud garu,\nI have taken Lucky Draw Token(s) on the website for Sri Siddhi Vinayaka Utsav 2026.\n\n🎟️ Token Number(s): ${tokensList}\n👤 Name: ${bookedToken.name}\n📱 Mobile: ${bookedToken.phone}\n💰 Total Amount: ₹${bookedToken.totalAmount} (${bookedToken.quantity} Tokens)\n💳 Paid to UPI ID: ${upiId}${bookedToken.utrNumber ? `\n🧾 UTR/Ref: ${bookedToken.utrNumber}` : ''}\n\nPlease confirm my token entry for 22 Sep Lucky Draw!`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FFFDF8] rounded-3xl max-w-2xl w-full border-2 border-amber-400 shadow-2xl overflow-hidden animate-in zoom-in-95 my-auto max-h-[94vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#5f259f] via-[#7b2cbf] to-[#9d4edd] p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center text-amber-300 shadow-inner">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-lg sm:text-xl text-white">
                  Take Festival Token Online
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950 uppercase tracking-wide">
                  ₹{tokenPrice} / Token
                </span>
              </div>
              <p className="text-xs text-purple-100">
                bennur_galligang &bull; 22 Sep Lucky Draw & Children’s Cycle Prize
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {!bookedToken ? (
            /* BOOKING FORM & PAYMENT SCREEN */
            <form onSubmit={handleBookToken} className="space-y-6">
              
              {/* Step 1: Select Quantity & Devotee Details */}
              <div className="bg-amber-50/70 rounded-2xl p-4 sm:p-5 border border-amber-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center">1</span>
                    <h4 className="font-bold text-amber-950 text-sm sm:text-base">
                      Token Details & Devotee Info
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-amber-800">
                    ₹{tokenPrice} each
                  </span>
                </div>

                {/* Token Quantity Selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Select Number of Tokens:
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {[1, 2, 5, 10].map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setQuantity(qty)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          quantity === qty
                            ? 'bg-amber-600 text-white border-amber-700 shadow-md font-black scale-[1.02]'
                            : 'bg-white text-stone-700 border-stone-300 hover:bg-amber-100/50'
                        }`}
                      >
                        {qty} {qty === 1 ? 'Token' : 'Tokens'} (₹{qty * tokenPrice})
                      </button>
                    ))}
                  </div>

                  {/* Custom Quantity Stepper */}
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-amber-200 text-xs">
                    <span className="font-medium text-stone-600">Custom Count:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 font-black text-sm flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-bold font-mono text-sm px-2 text-stone-900">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(50, quantity + 1))}
                        className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 font-black text-sm flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-black text-amber-900 text-sm">
                      Total: ₹{totalAmount}
                    </span>
                  </div>
                </div>

                {/* Devotee Name and Contact Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Devotee Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Goud"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-stone-900 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Contact Mobile Number <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="10-digit mobile"
                        maxLength={10}
                        required
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-stone-900 text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Payment on esai4488@ybl & PhonePe QR Code (Matching Uploaded Image) */}
              <div className="bg-[#111111] rounded-3xl p-5 sm:p-6 text-white border-2 border-[#5f259f] shadow-xl relative overflow-hidden space-y-4">
                
                {/* PhonePe Header Branding */}
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-[#5f259f] flex items-center justify-center shadow-lg">
                      <span className="font-black text-xl text-white font-sans">पे</span>
                    </div>
                    <span className="font-heading font-black text-2xl tracking-wide text-white">
                      PhonePe
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-xs font-black tracking-widest text-[#a855f7] uppercase block">
                      ACCEPTED HERE
                    </span>
                    <p className="text-[11px] text-stone-400">
                      Scan &amp; Pay Using Any UPI App (PhonePe, GPay, Paytm)
                    </p>
                  </div>
                </div>

                {/* QR Code and Amount Display */}
                <div className="flex flex-col items-center justify-center gap-3 py-2">
                  
                  {/* PhonePe High Contrast White Box */}
                  <div className="bg-white p-3.5 rounded-2xl shadow-2xl border-4 border-[#5f259f] flex flex-col items-center max-w-[240px] w-full">
                    <img 
                      src={qrCodeUrl}
                      alt="PhonePe QR Code - esai4488@ybl"
                      className="w-full h-auto aspect-square rounded-lg"
                    />
                    <div className="mt-2 text-center">
                      <span className="text-[11px] font-black text-stone-900 block">
                        Amount: ₹{totalAmount}
                      </span>
                      <span className="text-[9px] text-stone-500 font-mono">
                        esai4488@ybl
                      </span>
                    </div>
                  </div>

                  {/* UPI ID Callout with 1-Click Copy */}
                  <div className="w-full max-w-sm bg-[#1e1e1e] rounded-2xl p-3 border border-[#333333] flex items-center justify-between gap-2">
                    <div className="text-left">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        Official UPI ID:
                      </span>
                      <span className="font-mono font-bold text-sm text-amber-300">
                        {upiId}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="py-1.5 px-3 rounded-xl bg-[#5f259f] hover:bg-[#7b2cbf] text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-md"
                    >
                      {copiedUpi ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy UPI</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Direct UPI App Trigger for Mobile */}
                  <div className="w-full max-w-sm flex items-center gap-2">
                    <a
                      href={upiPayUrl}
                      className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#5f259f] to-[#7b2cbf] hover:from-[#6739B7] hover:to-[#9C27B0] text-white text-center font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Pay ₹{totalAmount} via PhonePe / UPI App</span>
                    </a>
                  </div>

                </div>

                {/* Optional UTR / Reference Input */}
                <div className="pt-2 border-t border-stone-800">
                  <label className="block text-[11px] font-medium text-stone-300 mb-1">
                    UPI Reference / UTR Number <span className="text-stone-500">(Optional, after payment)</span>:
                  </label>
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="e.g. 4235XXXXXXXX or 12-digit UTR"
                    className="w-full px-3 py-2 rounded-xl bg-[#1e1e1e] border border-stone-700 text-white placeholder-stone-500 text-xs font-mono focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

              </div>

              {/* Error Box */}
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-red-700 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl font-black text-base text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-amber-900" />
                    <span>Confirming Token Entry...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-900" />
                    <span>Confirm Token Booking (₹{totalAmount})</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Organized by <strong>bennur_galligang</strong> &bull; Draw on 22 September 2026</span>
                </p>
              </div>

            </form>
          ) : (
            /* SUCCESS CONFIRMATION & DIGITAL TOKEN CARD */
            <div className="space-y-6 animate-in fade-in zoom-in-95">
              
              {/* Top Celebratory Banner */}
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-black text-2xl text-emerald-950">
                  Token Confirmed Successfully!
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  May Lord Sri Siddhi Vinayaka bless you! Your token entry has been recorded in the official festival register.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 sm:p-6 text-white shadow-2xl border-2 border-amber-300 relative overflow-hidden">
                
                <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-200 block">
                      OFFICIAL LUCKY DRAW PASS
                    </span>
                    <h5 className="font-heading font-black text-lg text-white">
                      Sri Siddhi Vinayaka Utsav 2026
                    </h5>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white text-amber-950 font-black text-xs">
                    bennur_galligang
                  </span>
                </div>

                {/* Token Numbers Showcase */}
                <div className="bg-black/25 rounded-2xl p-4 border border-white/20 text-center mb-4 space-y-1">
                  <span className="text-[11px] font-bold text-amber-200 uppercase tracking-wider block">
                    Your Official Token {bookedToken.tokenNumbers.length === 1 ? 'Number' : 'Numbers'}:
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    {bookedToken.tokenNumbers.map((num) => (
                      <span
                        key={num}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-300 text-amber-950 font-heading font-black text-base sm:text-lg shadow tracking-wide"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15">
                  <div>
                    <span className="text-amber-200 text-[10px] block">Devotee Name:</span>
                    <strong className="text-white text-sm">{bookedToken.name}</strong>
                  </div>
                  <div>
                    <span className="text-amber-200 text-[10px] block">Contact Number:</span>
                    <strong className="text-white font-mono text-sm">+91 {bookedToken.phone}</strong>
                  </div>
                  <div className="mt-1">
                    <span className="text-amber-200 text-[10px] block">Amount Paid:</span>
                    <strong className="text-white font-mono text-sm">₹{bookedToken.totalAmount} ({bookedToken.quantity} Tokens)</strong>
                  </div>
                  <div className="mt-1">
                    <span className="text-amber-200 text-[10px] block">Lucky Draw Date:</span>
                    <strong className="text-amber-200 font-bold">22 Sep 2026, 5:00 PM</strong>
                  </div>
                </div>

                <div className="mt-3 text-center text-[10px] text-amber-100">
                  Venue: NARSAIAH NILAYAM, B-Phase Colony, Bennur &bull; Special Children's Cycling Prize
                </div>
              </div>

              {/* Action Buttons: WhatsApp Share & Save */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/91${organizerPhone}?text=${encodeURIComponent(getDevoteeWhatsAppMsg())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Token Slip to Sai Goud on WhatsApp</span>
                </a>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetForNew}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Ticket className="w-3.5 h-3.5 text-amber-800" />
                    <span>Take Another Token</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Done &amp; Close</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
