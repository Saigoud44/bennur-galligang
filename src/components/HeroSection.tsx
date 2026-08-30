import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Ticket, Bike, Trophy, MapPin, ChevronRight, MessageCircle, Sparkles, Image as ImageIcon, Eye, Bell, Heart, Gift, Search, Globe, Flame } from 'lucide-react';
import { GaneshaIcon, DiyaIcon, RangoliBorder, ToranBanner, MarigoldGarland } from './FestiveIcons';
import { FestivalConfig } from '../types';

interface HeroSectionProps {
  config: FestivalConfig;
  onOpenMantras?: () => void;
  onOpenTakeTokenModal?: () => void;
  onOpenPoojaModal?: () => void;
}

export function HeroSection({ config, onOpenMantras, onOpenTakeTokenModal, onOpenPoojaModal }: HeroSectionProps) {
  // Live Countdown logic targeting 14 September 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
    isPast: false
  });

  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  // Target: 22 September 2026, 17:00:00 (5:00 PM IST) for Final Day Prize Open & Nimarjanam
  const targetDateStr = config.countdownDateTime || "2026-09-22T17:00:00";

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        const festivalEnd = new Date("2026-09-22T23:59:59").getTime();
        const ongoing = now <= festivalEnd;
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isLive: ongoing,
          isPast: !ongoing
        });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hoursPostfix = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({
          days,
          hours: hoursPostfix,
          minutes,
          seconds,
          isLive: false,
          isPast: false
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const customBg = config.backgroundImageUrl;

  return (
    <section 
      id="home" 
      className="relative pt-6 pb-16 overflow-hidden border-b-2 border-amber-300 transition-all"
      style={{
        backgroundImage: customBg 
          ? `linear-gradient(to bottom, rgba(35, 12, 5, 0.85), rgba(45, 18, 8, 0.92)), url('${customBg}')`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Default Rich Festive Temple Background when no custom URL */}
      {!customBg && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Deep royal burgundy to golden amber gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A0E07] via-[#3D1409] to-[#1E0904]"></div>
          
          {/* Subtle golden mandala and sparkle aura */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-amber-500/20 via-orange-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/15 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-red-500/15 rounded-full blur-2xl animate-pulse"></div>

          {/* Golden ornamental stars/dust pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
          
          {/* Traditional hanging temple bells graphic on corners */}
          <div className="absolute top-4 left-6 sm:left-12 flex flex-col items-center opacity-70 animate-float-slow">
            <div className="w-0.5 h-16 bg-gradient-to-b from-amber-400 to-amber-600"></div>
            <div className="w-8 h-8 rounded-b-xl bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-lg flex items-center justify-center text-amber-950 font-bold text-xs">🔔</div>
          </div>
          <div className="absolute top-4 right-6 sm:right-12 flex flex-col items-center opacity-70 animate-float-slow" style={{ animationDelay: '1.5s' }}>
            <div className="w-0.5 h-20 bg-gradient-to-b from-amber-400 to-amber-600"></div>
            <div className="w-8 h-8 rounded-b-xl bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-lg flex items-center justify-center text-amber-950 font-bold text-xs">🔔</div>
          </div>
        </div>
      )}

      {/* Traditional Toran Header Banner */}
      <div className="max-w-5xl mx-auto px-4 mb-4 relative z-10">
        <ToranBanner />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">

          {/* Web Search & Google Brand Tag: bennur_galligang */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-900/90 border border-amber-400 shadow-md text-amber-200 text-xs sm:text-sm font-bold backdrop-blur-md">
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Google Search: <span className="text-white underline decoration-amber-400 underline-offset-2">bennur_galligang</span></span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/80 border border-red-400/80 shadow-md text-red-200 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-amber-300 font-bold">14 Sep (Start) - 22 Sep (Final Day & Prize)</span>
              <span className="text-amber-500">•</span>
              <span className="text-amber-100">9 Days Count</span>
            </div>
          </div>

          {/* Central Auspicious Ganesha Aura & Floral Arch */}
          <div className="flex justify-center my-1">
            <div className="relative">
              {/* Golden Sunburst Glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100 border-4 border-amber-400 p-2 shadow-2xl flex items-center justify-center">
                <GaneshaIcon className="w-24 h-24 sm:w-32 sm:h-32 text-amber-800" />
                
                {/* Lit Brass Diyas */}
                <div className="absolute -left-4 bottom-2 bg-amber-950/80 p-1.5 rounded-full border border-amber-400/80 shadow-lg">
                  <DiyaIcon className="w-6 h-6 text-amber-400" />
                </div>
                <div className="absolute -right-4 bottom-2 bg-amber-950/80 p-1.5 rounded-full border border-amber-400/80 shadow-lg">
                  <DiyaIcon className="w-6 h-6 text-amber-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Authentic Telugu Calligraphy & Festival Headings from Poster */}
          <div className="space-y-2">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold tracking-widest uppercase">
              bennur_galligang PRESENTS &bull; స్వాగతం
            </div>

            {/* Telugu Title */}
            <div className="pt-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-200 tracking-wide drop-shadow-md">
                శ్రీ వినాయక
              </h2>
              <div className="inline-block my-1.5 px-6 py-2 rounded-2xl bg-gradient-to-r from-red-800 via-red-700 to-red-900 border-2 border-amber-400 shadow-xl">
                <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-amber-100 tracking-tight drop-shadow-md">
                  శ్రీ సిద్ధి వినాయక ఉత్సవ కమిటీ 2026
                </h1>
              </div>
            </div>

            <p className="font-heading font-bold text-base sm:text-xl text-amber-300 tracking-wide drop-shadow">
              Sri Siddhi Vinayaka Utsav &bull; bennur_galligang &bull; B-Phase Colony, Bennur
            </p>
          </div>

          {/* Authentic Poster Highlight Showcase Banner (Inspired by Uploaded Image) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#381308] via-[#2D0F06] to-[#1F0A04] border-2 border-amber-400/90 shadow-2xl p-5 sm:p-7 text-amber-100 overflow-hidden text-center">
            {/* Background shimmer */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Top decorative badge */}
            <div className="flex items-center justify-center gap-2 mb-3 text-xs uppercase font-black tracking-widest text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>బెన్నూరు గ్రామస్తులందరికీ సాదర సుస్వాగతం</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            <blockquote className="text-amber-50 text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
              “B-Phase Colony, Bennur warmly invites everyone to join bennur_galligang for 9 Days of Sri Siddhi Vinayaka Utsav starting 14 September, concluding on 22 September with Grand Ganesh Nimarjanam and Lucky Draw.”
            </blockquote>

            {/* Poster Badges Row (₹50 Token, Cycling Prize, 22 Sep Draw Date) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-amber-500/30 text-left">
              {/* Badge 1: ₹50 Token */}
              <div className="p-3 rounded-2xl bg-amber-950/70 border border-amber-500/40 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 shrink-0">
                  <Ticket className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-300 block">లక్కీ డ్రా టోకెన్</span>
                  <span className="font-extrabold text-sm text-white">50 రూపాయలు టోకెన్</span>
                </div>
              </div>

              {/* Badge 2: Children Cycling */}
              <div className="p-3 rounded-2xl bg-amber-950/70 border border-amber-500/40 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-500/20 border border-orange-400 flex items-center justify-center text-orange-300 shrink-0">
                  <Bike className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-orange-300 block">ప్రత్యేక బహుమతి</span>
                  <span className="font-extrabold text-sm text-white">చిన్న పిల్లల సైక్లింగ్</span>
                </div>
              </div>

              {/* Badge 3: 22 Sep Ganesh Nimarjanam & Prize Open */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-red-950/90 to-amber-950/80 border border-red-400/60 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-red-300 shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-red-300 block">గణేష్ నిమజ్జనం & ప్రైజ్ ఓపెన్</span>
                  <span className="font-extrabold text-sm text-amber-200">22 సెప్టెంబర్ 2026 (Final Day)</span>
                </div>
              </div>
            </div>

            {/* Poster Full View Trigger */}
            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-300">
              <span className="italic font-bold">🔔 నిమజ్జనం సమయంలో ప్రైజ్ ఓపెన్ చేయబడును (22 సెప్టెంబర్)</span>
              <button
                id="view-official-poster-btn"
                onClick={() => setIsPosterModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-200 font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Eye className="w-3.5 h-3.5 text-amber-300" />
                <span>View Official Telugu Poster</span>
              </button>
            </div>
          </div>

          {/* COUNTDOWN TIMER SECTION - TARGETING 22 SEPTEMBER 2026 */}
          <div className="bg-gradient-to-b from-[#2E1007] to-[#220B04] p-5 sm:p-7 rounded-3xl border-2 border-amber-400 shadow-2xl max-w-3xl mx-auto text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 pb-3 border-b border-amber-500/30">
              <div className="flex items-center gap-2 text-amber-200 font-black text-sm sm:text-base">
                <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                <span>{config.countdownTitle || "Final Day Prize Open & Ganesh Nimarjanam Countdown"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md border border-amber-300/40">
                  🎯 22 September 2026, 5:00 PM (Final Day)
                </span>
              </div>
            </div>

            <div className="mb-4 text-xs sm:text-sm text-amber-200/90 font-medium">
              🎁 <span className="font-bold text-amber-300">నిమజ్జనం సమయంలో ప్రైజ్ ఓపెన్ చేయబడును</span> &bull; 9-Day Festival (14 - 22 Sep) by <strong className="text-white">bennur_galligang</strong>!
            </div>

            {timeLeft.isLive ? (
              <div className="py-4 text-center bg-gradient-to-r from-amber-600 to-red-600 rounded-2xl border border-amber-300 shadow-lg">
                <p className="text-lg sm:text-xl font-black text-white animate-pulse">
                  🎉 Sri Siddhi Vinayaka Visarjan & Lucky Draw are LIVE at B-Phase Colony! 🎉
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
                <div className="p-3 sm:p-4 rounded-2xl bg-amber-950/80 border border-amber-500/40 shadow-inner">
                  <div className="font-heading font-black text-2xl sm:text-4xl text-amber-300 drop-shadow">
                    {timeLeft.days}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-200/80 mt-1">
                    Days
                  </div>
                </div>

                <div className="p-3 sm:p-4 rounded-2xl bg-amber-950/80 border border-amber-500/40 shadow-inner">
                  <div className="font-heading font-black text-2xl sm:text-4xl text-amber-300 drop-shadow">
                    {timeLeft.hours}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-200/80 mt-1">
                    Hours
                  </div>
                </div>

                <div className="p-3 sm:p-4 rounded-2xl bg-amber-950/80 border border-amber-500/40 shadow-inner">
                  <div className="font-heading font-black text-2xl sm:text-4xl text-amber-300 drop-shadow">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-200/80 mt-1">
                    Minutes
                  </div>
                </div>

                <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-red-950 to-amber-950 border border-red-500/60 shadow-inner">
                  <div className="font-heading font-black text-2xl sm:text-4xl text-red-400 drop-shadow animate-pulse">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-red-200 mt-1">
                    Seconds
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-amber-500/30 flex flex-wrap items-center justify-between gap-2 text-[11px] text-amber-300/80">
              <span>📅 9 Days Festival: 14 Sep - 22 Sep 2026</span>
              <span>📍 NARSAIAH NILAYAM, Bennur (501144)</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            {/* Want to do Pooja Button */}
            {onOpenPoojaModal ? (
              <button
                id="hero-want-pooja-cta"
                onClick={onOpenPoojaModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-black text-amber-950 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 hover:from-amber-200 hover:to-amber-100 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 border-2 border-amber-400 cursor-pointer scale-105"
              >
                <Flame className="w-5 h-5 text-red-600 animate-pulse" />
                <span>Want to do Pooja? (Name with Surname)</span>
              </button>
            ) : (
              <a
                id="hero-want-pooja-cta"
                href="#pooja-booking"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-black text-amber-950 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 hover:from-amber-200 hover:to-amber-100 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 border-2 border-amber-400 scale-105"
              >
                <Flame className="w-5 h-5 text-red-600 animate-pulse" />
                <span>Want to do Pooja? (Name with Surname)</span>
              </a>
            )}

            {/* Take Token Online */}
            {onOpenTakeTokenModal ? (
              <button
                id="hero-take-token-cta"
                onClick={onOpenTakeTokenModal}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-black text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 border border-amber-300/40 cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-amber-200" />
                <span>Take Token (₹50)</span>
              </button>
            ) : (
              <a
                id="hero-take-token-cta"
                href="#lucky-draw"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-black text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 border border-amber-300/40"
              >
                <Ticket className="w-4 h-4 text-amber-200" />
                <span>Take Token (₹50)</span>
              </a>
            )}

            <a
              id="hero-gallery-cta"
              href="#media-gallery"
              className="w-full sm:w-auto px-4 py-3.5 rounded-xl font-bold text-amber-200 bg-amber-900/60 hover:bg-amber-900 border border-amber-400/60 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <ImageIcon className="w-4 h-4 text-amber-300" />
              <span>Photos &amp; Videos (గ్యాలరీ)</span>
            </a>

            <a
              id="hero-schedule-cta"
              href="#schedule"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 hover:from-amber-800 hover:to-orange-800 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group border border-amber-500/30"
            >
              <Calendar className="w-4 h-4" />
              <span>9 Days Schedule</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              id="hero-venue-cta"
              href="#venue"
              className="w-full sm:w-auto px-4 py-3.5 rounded-xl font-semibold text-amber-200 bg-amber-950/80 hover:bg-amber-900 border border-amber-400/80 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <MapPin className="w-4 h-4 text-red-400" />
              <span>Venue</span>
            </a>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
            
            {/* Card 1: Lucky Draw Token */}
            <div className="bg-gradient-to-b from-[#331107] to-[#240C05] rounded-2xl p-4 sm:p-5 border-2 border-amber-400/80 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group text-amber-100">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-amber-400/40">
                <Ticket className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-heading font-bold text-base text-white">
                  Lucky Draw Token
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-amber-950 shadow-sm">
                  ₹50 Only
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-200/80 mt-1.5 leading-relaxed">
                Purchase your ₹50 token from bennur_galligang committee coordinators to win festival prizes.
              </p>
              <a href="#lucky-draw" className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-amber-200 mt-2.5">
                <span>View prize details</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            {/* Card 2: Children's Cycling Prize */}
            <div className="bg-gradient-to-b from-[#331107] to-[#240C05] rounded-2xl p-4 sm:p-5 border-2 border-orange-400/80 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group text-amber-100">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-orange-400/40">
                <Bike className="w-5 h-5 text-orange-400" />
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-heading font-bold text-base text-white">
                  Children’s Bicycle
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-400/50">
                  చిన్న పిల్లల సైక్లింగ్
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-200/80 mt-1.5 leading-relaxed">
                Special children’s bicycle prize included to bring joy to the kids of Bennur village!
              </p>
              <a href="#lucky-draw" className="inline-flex items-center gap-1 text-xs font-bold text-orange-300 hover:text-orange-200 mt-2.5">
                <span>See prize details</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            {/* Card 3: Grand Distribution Date & Nimarjanam */}
            <div className="bg-gradient-to-b from-[#331107] to-[#240C05] rounded-2xl p-4 sm:p-5 border-2 border-red-400/80 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group text-amber-100">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-red-400/40">
                <Trophy className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-heading font-bold text-base text-white">
                  Ganesh Nimarjanam
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-400/50">
                  22 Sep 2026 (Final Day)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-200/80 mt-1.5 leading-relaxed">
                Lucky draw & grand prizes opened live during Nimajjanam (నిమజ్జనం సమయంలో ప్రైజ్ ఓపెన్).
              </p>
              <a href="#schedule" className="inline-flex items-center gap-1 text-xs font-bold text-red-300 hover:text-red-200 mt-2.5">
                <span>View Nimarjanam timeline</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

          </div>

          <div className="pt-2">
            <RangoliBorder />
          </div>

        </div>
      </div>

      {/* Official Poster Modal */}
      {isPosterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#240D06] rounded-3xl border-2 border-amber-400 max-w-2xl w-full p-6 text-amber-100 relative shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <div className="flex items-center gap-2">
                <GaneshaIcon className="w-7 h-7 text-amber-400" />
                <h3 className="font-heading font-bold text-lg text-white">
                  Official Festival Invitation Poster (bennur_galligang)
                </h3>
              </div>
              <button
                onClick={() => setIsPosterModalOpen(false)}
                className="w-8 h-8 rounded-full bg-amber-950 text-amber-300 hover:bg-amber-900 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Poster Visual Presentation Container */}
            <div className="rounded-2xl bg-gradient-to-b from-[#381308] via-[#2A0E06] to-[#1A0703] border-2 border-amber-400 p-6 text-center space-y-4 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl"></div>

              <div className="text-amber-300 text-xs font-bold tracking-widest uppercase">
                ✦ WELCOME &bull; స్వాగతం &bull; bennur_galligang ✦
              </div>

              <div className="space-y-1">
                <h2 className="text-3xl font-extrabold text-amber-200">శ్రీ వినాయక</h2>
                <div className="inline-block px-5 py-1.5 rounded-xl bg-red-800 border border-amber-400 shadow-md">
                  <h1 className="text-xl sm:text-2xl font-black text-white">
                    శ్రీ సిద్ధి వినాయక ఉత్సవ కమిటీ
                  </h1>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-500/40 text-left space-y-2 text-sm text-amber-100">
                <p className="font-bold text-amber-300 text-center">
                  బెన్నూరు గ్రామస్తులకు స్వాగతం - ఘన బహుమతులు
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-black/30 p-2.5 rounded-lg border border-amber-500/20">
                    <span className="text-amber-400 font-bold block">🎟️ లక్కీ డ్రా:</span>
                    <span>50 రూపాయలు టోకెన్</span>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-lg border border-amber-500/20">
                    <span className="text-orange-400 font-bold block">🚲 ప్రత్యేక బహుమతి:</span>
                    <span>చిన్న పిల్లల సైక్లింగ్</span>
                  </div>
                </div>
                <div className="bg-red-950/50 p-2.5 rounded-lg border border-red-500/30 text-center text-xs">
                  <span className="text-red-300 font-bold block">📅 ప్రైజ్ ఓపెన్ & నిమజ్జనం: 22 సెప్టెంబర్ 2026</span>
                  <span className="text-amber-200">నిమజ్జనం సమయంలో ప్రైజ్ ఓపెన్ చేయబడును</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-amber-300 font-mono font-bold tracking-wider">
                📍 B_PHASE COLONY BENNUR &bull; bennur_galligang
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsPosterModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
              >
                Close Poster
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
