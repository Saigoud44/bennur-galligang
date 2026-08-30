import React, { useState } from 'react';
import { 
  Ticket, Bike, Trophy, Sparkles, CheckCircle2, MessageCircle, 
  Phone, Award, ShieldCheck, Gift, Copy, Check, ExternalLink, RefreshCw, QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FestivalConfig, TokenRecord } from '../types';
import { ModakIcon, RangoliBorder } from './FestiveIcons';

interface LuckyDrawSectionProps {
  config: FestivalConfig;
  onOpenTakeTokenModal?: (qty?: number) => void;
}

export function LuckyDrawSection({ config, onOpenTakeTokenModal }: LuckyDrawSectionProps) {
  const [tokenQuantity, setTokenQuantity] = useState(2);
  const [devoteeName, setDevoteeName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookedRecord, setBookedRecord] = useState<TokenRecord | null>(null);

  const tokenPrice四周 = config.luckyDrawTokenPrice || 50;
  const tokenPrice = Number(tokenPrice四周) || 50;
  const totalAmount = tokenQuantity * tokenPrice;
  const upiId = "esai4488@ybl";
  const organizerPhone = "9390905613";

  const upiPayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent("Sri Siddhi Vinayaka Utsav")}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(`Token for ${tokenQuantity} entries`)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=8&data=${encodeURIComponent(upiPayUrl)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleInlineBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    const cleanPhone = contactNumber.replace(/\D/g, '');
    if (!devoteeName.trim() || devoteeName.trim().length < 2) {
      setBookingError("Please enter your full name.");
      return;
    }
    if (cleanPhone.length < 10) {
      setBookingError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res拼 = await fetch('/api/tokens/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: devoteeName.trim(),
          phone: cleanPhone,
          quantity: tokenQuantity,
          utrNumber: utrNumber.trim() || undefined,
          notes: `Site Token Tool: ${tokenQuantity} tokens paid to ${upiId}`
        })
      });

      const data = await res拼.json();
      if (!res拼.ok) {
        throw new Error(data.error || "Failed to book token");
      }

      setBookedRecord(data.token);
      
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#f59e0b', '#dc2626', '#10b981', '#fbbf24']
        });
      } catch (cErr) {
        console.debug("Confetti skipped:", cErr);
      }

    } catch (err: unknown) {
      const errObj = err as { message?: string };
      setBookingError(errObj.message || "Failed to record token entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lucky-draw" className="py-14 bg-gradient-to-b from-[#FFFDF8] via-amber-50/50 to-[#FFFDF8] border-b border-amber-200 relative overflow-hidden">
      
      {/* Decorative background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-300 text-xs font-bold text-red-800 uppercase tracking-widest">
            <Gift className="w-3.5 h-3.5 text-red-600" />
            <span>Community Celebration &amp; Prizes</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-amber-950">
            Take Festival Token Online (₹{tokenPrice})
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Support the Utsav celebrations by taking your lucky draw tokens directly on site. Pay using UPI ID <strong className="text-stone-900 font-mono">esai4488@ybl</strong> or PhonePe QR code to enter the 22 September grand draw!
          </p>

          <div className="pt-1">
            <RangoliBorder />
          </div>
        </div>

        {/* Feature Grid: Ticket Card & Children's Cycle Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Special Children's Cycling Prize Spotlight (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-7 shadow-md relative overflow-hidden space-y-5">
            
            {/* Top Festive Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-amber-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>STAR ATTRACTION</span>
                </span>
                <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full">
                  22 September 2026 • 5:00 PM
                </span>
              </div>
              <span className="text-xs font-semibold text-stone-500">Live Stage Draw</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              
              {/* Cycling Icon / Visual illustration badge */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 border-2 border-amber-300 p-4 flex flex-col items-center justify-center text-center shadow-inner shrink-0 relative group">
                <div className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center text-amber-700 mb-1.5 group-hover:scale-110 transition-transform">
                  <Bike className="w-8 h-8 text-orange-600" />
                </div>
                <span className="text-[11px] font-black text-amber-950 uppercase tracking-tight">
                  Brand New Cycle
                </span>
                <span className="text-[9px] text-amber-800 font-semibold">Special Edition</span>
              </div>

              {/* Description & Rules */}
              <div className="space-y-2 text-left">
                <h3 className="font-heading font-bold text-xl text-amber-950">
                  Special Children’s Cycling Prize
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  As part of Sri Siddhi Vinayaka Utsav 2026, a high-quality bicycle is dedicated specially for village children to foster health, joy, and celebration in Bennur!
                </p>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Every ₹50 token gives one lucky entry</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Transparent drawing on 22 Sep (Final Day)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Payment Info Card with PhonePe Styling */}
            <div className="p-4 rounded-2xl bg-stone-900 text-white border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-bold text-xs">
                    पे
                  </div>
                  <span className="font-bold text-sm text-white">PhonePe / UPI Payment</span>
                </div>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-[#5f259f] text-purple-100">
                  Accepted Here
                </span>
              </div>

              <div className="bg-stone-800/90 rounded-xl p-2.5 flex items-center justify-between gap-2 border border-stone-700">
                <div>
                  <span className="text-[9px] uppercase font-bold text-stone-400 block">UPI ID:</span>
                  <span className="font-mono font-black text-xs sm:text-sm text-amber-300">{upiId}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="py-1 px-2.5 rounded-lg bg-[#5f259f] hover:bg-[#7b2cbf] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <span>Account Holder: <strong>Sai Goud (bennur_galligang)</strong></span>
                <span>Mobile: <strong>+91 93909 05613</strong></span>
              </div>
            </div>

            {/* Quick WhatsApp Contact */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-stone-600">Need help with tokens?</span>
              <a
                href={`https://wa.me/91${organizerPhone}?text=Namaste%20Sai%20Goud%20garu,%20I%20have%20a%20query%20regarding%20Sri%20Siddhi%20Vinayaka%20Utsav%20Tokens.`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat with Organizer Sai (+91 93909 05613)</span>
              </a>
            </div>

          </div>

          {/* Right: Interactive Site Token Taking Tool (6 cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
            
            {/* Background watermark */}
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
              <ModakIcon className="w-48 h-48 text-white" />
            </div>

            {/* Token Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-amber-200">
                  <Ticket className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-heading font-black text-lg tracking-wide uppercase block leading-tight">
                    Take Token Online
                  </span>
                  <span className="text-[10px] text-amber-200/90">Instant Serial Number Allocation</span>
                </div>
              </div>
              <div className="bg-amber-400 text-amber-950 font-black text-xs px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                ₹{tokenPrice} / Token
              </div>
            </div>

            {!bookedRecord ? (
              /* ACTIVE TOKEN BOOKING FORM */
              <form onSubmit={handleInlineBook} className="space-y-4">
                
                {/* Step 1: Select Token Quantity */}
                <div className="bg-black/20 backdrop-blur-sm p-3.5 rounded-2xl border border-white/20 space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-100 font-bold">
                    <span>1. Select Number of Tokens:</span>
                    <span className="text-white bg-white/20 px-2 py-0.5 rounded-md font-mono">
                      {tokenQuantity} {tokenQuantity === 1 ? 'Token' : 'Tokens'} = ₹{totalAmount}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 5, 10].map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setTokenQuantity(qty)}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          tokenQuantity === qty
                            ? 'bg-amber-300 text-amber-950 font-black shadow-md scale-[1.02]'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        {qty} {qty === 1 ? 'Token' : 'Tokens'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Name & Contact Number */}
                <div className="bg-black/20 backdrop-blur-sm p-3.5 rounded-2xl border border-white/20 space-y-3">
                  <span className="text-xs text-amber-100 font-bold block">
                    2. Devotee Details:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-amber-200 mb-1">
                        Devotee Full Name *
                      </label>
                      <input
                        type="text"
                        value={devoteeName}
                        onChange={(e) => setDevoteeName(e.target.value)}
                        placeholder="Enter full name..."
                        required
                        className="w-full px-3 py-2 rounded-xl bg-white text-stone-900 placeholder-stone-400 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-amber-200 mb-1">
                        Contact Mobile *
                      </label>
                      <input
                        type="tel"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="10-digit mobile..."
                        maxLength={10}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-white text-stone-900 placeholder-stone-400 text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-amber-200/90 mb-1">
                      UPI Ref / UTR Number (Optional):
                    </label>
                    <input
                      type="text"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      placeholder="e.g. 4235... (from PhonePe/GPay confirmation)"
                      className="w-full px-3 py-1.5 rounded-xl bg-white/10 text-white placeholder-amber-200/50 text-xs font-mono border border-white/20 focus:outline-none focus:bg-white/20"
                    />
                  </div>
                </div>

                {/* Step 3: PhonePe QR & Direct Pay Preview */}
                <div className="bg-black/30 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-3">
                  <div className="bg-white p-2 rounded-xl shrink-0 shadow">
                    <img 
                      src={qrCodeUrl} 
                      alt="UPI QR Code - esai4488@ybl" 
                      className="w-20 h-20 rounded"
                    />
                  </div>
                  <div className="space-y-1 text-center sm:text-left flex-1">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5">
                      <span className="text-[11px] font-black text-amber-300 font-mono">esai4488@ybl</span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="text-[10px] bg-white/20 hover:bg-white/30 px-1.5 py-0.5 rounded text-white font-bold"
                      >
                        {copiedUpi ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="text-[10px] text-amber-100/90 leading-tight">
                      Scan with PhonePe / GPay or click below to submit and generate your serial number!
                    </p>
                  </div>
                </div>

                {bookingError && (
                  <p className="text-xs bg-red-950/80 border border-red-500 text-red-200 p-2.5 rounded-xl">
                    {bookingError}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-2xl font-black text-sm text-amber-950 bg-amber-300 hover:bg-amber-200 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-900" />
                      <span>Recording Token Entry...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-900" />
                      <span>Take {tokenQuantity} Tokens (₹{totalAmount}) Now</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[10px] text-amber-200/80 pt-0.5 px-1">
                  <span>✨ 100% Transparent Live Draw</span>
                  <span>🔒 Handled by bennur_galligang</span>
                </div>

              </form>
            ) : (
              /* SUCCESS CARD SLIP */
              <div className="space-y-4 animate-in zoom-in-95">
                <div className="bg-black/25 rounded-2xl p-4 border border-white/30 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-400 text-emerald-950 mx-auto flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-black text-lg text-white">
                    Tokens Allocated Successfully!
                  </h4>
                  <p className="text-xs text-amber-100">
                    Devotee: <strong>{bookedRecord.name}</strong> (+91 {bookedRecord.phone})
                  </p>

                  <div className="py-2">
                    <span className="text-[10px] uppercase font-bold text-amber-200 block mb-1">
                      Your Official Token Numbers:
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                      {bookedRecord.tokenNumbers.map((num) => (
                        <span
                          key={num}
                          className="px-3 py-1 rounded-lg bg-amber-300 text-amber-950 font-black text-sm shadow"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-amber-200 font-mono">
                    Total: ₹{bookedRecord.totalAmount} &bull; Beneficiary: {upiId}
                  </p>
                </div>

                <a
                  href={`https://wa.me/91${organizerPhone}?text=${encodeURIComponent(`Namaste Sai Goud garu,\nI have taken Lucky Draw Token(s) on site:\nToken No(s): ${bookedRecord.tokenNumbers.join(', ')}\nName: ${bookedRecord.name}\nPhone: ${bookedRecord.phone}\nAmount: ₹${bookedRecord.totalAmount}\nUPI ID: ${upiId}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Token Slip to Organizer on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setBookedRecord(null);
                    setDevoteeName('');
                    setContactNumber('');
                    setUtrNumber('');
                    setTokenQuantity(2);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 cursor-pointer"
                >
                  Take More Tokens
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
