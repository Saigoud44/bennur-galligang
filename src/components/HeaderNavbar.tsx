import React, { useState } from 'react';
import { Menu, X, Bell, Phone, MessageCircle, Calendar, MapPin, Sparkles, Instagram, Lock, Ticket, Flame } from 'lucide-react';
import { GaneshaIcon } from './FestiveIcons';
import { playTempleBell } from '../utils/festiveAudio';

interface HeaderNavbarProps {
  onOpenMantras?: () => void;
  onOpenAdminPortal?: () => void;
  onOpenTakeTokenModal?: () => void;
  onOpenPoojaModal?: () => void;
  onOpenAddMediaModal?: () => void;
  instagramUrl?: string;
  instagramHandle?: string;
}

export function HeaderNavbar({ 
  onOpenMantras, 
  onOpenAdminPortal,
  onOpenTakeTokenModal,
  onOpenPoojaModal,
  onOpenAddMediaModal,
  instagramUrl = "https://instagram.com/bennur_galligang", 
  instagramHandle = "@bennur_galligang" 
}: HeaderNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bellRung, setBellRung] = useState(false);

  const handleBellClick = () => {
    playTempleBell();
    setBellRung(true);
    setTimeout(() => setBellRung(false), 1200);
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Want to do Pooja?', href: '#pooja-booking' },
    { label: 'Photos & Videos', href: '#media-gallery' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Take Token (₹50)', href: '#lucky-draw' },
    { label: 'Venue', href: '#venue' },
    { label: 'WhatsApp', href: '#whatsapp-updates' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-200 shadow-sm transition-all duration-300">
      {/* Top Auspicious Banner */}
      <div className="bg-gradient-to-r from-red-700 via-amber-600 to-red-700 text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-between sm:justify-center gap-2 shadow-inner">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="animate-pulse">🚩</span>
          <span>Ganpati Bappa Morya! | bennur_galligang Presents Sri Siddhi Vinayaka Utsav 2026</span>
          <span className="hidden md:inline">✨ 14 Sep (Start) - 22 Sep (Final Day & Prize Draw)</span>
        </div>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded-full transition-colors"
          title="Follow bennur_galligang on Instagram"
        >
          <Instagram className="w-3 h-3 text-pink-200" />
          <span>{instagramHandle}</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Festival Title */}
          <a href="#home" id="nav-brand-logo" className="flex items-center gap-3 group text-left">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-amber-50 flex items-center justify-center">
                <GaneshaIcon className="w-9 h-9 text-amber-700" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-lg sm:text-xl text-amber-900 tracking-tight leading-none">
                  Sri Siddhi Vinayaka Utsav
                </span>
                <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-700 border border-red-200">
                  2026
                </span>
              </div>
              <p className="text-xs font-semibold text-amber-800 tracking-wide mt-0.5 flex items-center gap-1">
                <span>bennur_galligang</span>
                <span className="text-stone-400">•</span>
                <span>B-Phase Colony, Bennur</span>
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  link.label.includes('Take Token')
                    ? 'bg-amber-100/90 text-amber-950 font-black border border-amber-300 shadow-sm'
                    : 'text-stone-700 hover:text-amber-700 hover:bg-amber-100/60'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons & Temple Bell */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Temple Bell audio interact */}
            <button
              id="header-temple-bell-btn"
              onClick={handleBellClick}
              title="Ring Temple Bell (Audio Chime)"
              className={`p-2 rounded-full border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 hover:border-amber-400 transition-all ${
                bellRung ? 'scale-125 rotate-12 text-amber-600 shadow-lg' : ''
              }`}
            >
              <Bell className={`w-5 h-5 ${bellRung ? 'animate-bounce' : ''}`} />
            </button>

            {/* Instagram Link button */}
            <a
              id="header-instagram-btn"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-pink-200 bg-pink-50 text-pink-700 hover:bg-pink-100 hover:border-pink-300 transition-colors"
              title="Follow Sri Siddhi Vinayaka Utsav on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* Admin Portal Tool button */}
            {onOpenAdminPortal && (
              <button
                id="header-admin-portal-btn"
                onClick={onOpenAdminPortal}
                className="p-2 rounded-xl border border-stone-300 bg-stone-100/80 text-stone-700 hover:bg-amber-100 hover:text-amber-900 hover:border-amber-400 transition-colors flex items-center gap-1 text-xs font-bold"
                title="Organizer & Booked Tokens Admin Tool"
              >
                <Lock className="w-4 h-4 text-amber-700" />
                <span className="hidden xl:inline">Admin Tool</span>
              </button>
            )}

            {/* Want to do Pooja CTA Button */}
            {onOpenPoojaModal ? (
              <button
                id="header-want-pooja-btn"
                onClick={onOpenPoojaModal}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-red-950 bg-red-100 hover:bg-red-200 border border-red-300 shadow-sm transition-all hover:shadow hover:-translate-y-0.5 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-red-600" />
                <span>Do Pooja</span>
              </button>
            ) : (
              <a
                href="#pooja-booking"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-red-950 bg-red-100 hover:bg-red-200 border border-red-300 shadow-sm"
              >
                <Flame className="w-4 h-4 text-red-600" />
                <span>Do Pooja</span>
              </a>
            )}

            {/* Take Token Online CTA Button */}
            {onOpenTakeTokenModal ? (
              <button
                id="header-take-token-btn"
                onClick={onOpenTakeTokenModal}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 border border-amber-400 shadow-sm transition-all hover:shadow hover:-translate-y-0.5 cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-amber-900" />
                <span>Take Token (₹50)</span>
              </button>
            ) : (
              <a
                href="#lucky-draw"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border border-amber-400 shadow-sm"
              >
                <Ticket className="w-4 h-4 text-amber-900" />
                <span>Take Token (₹50)</span>
              </a>
            )}

            {/* Direct WhatsApp updates CTA */}
            <a
              id="header-whatsapp-cta"
              href="#whatsapp-updates"
              className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Updates</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {onOpenPoojaModal && (
              <button
                onClick={onOpenPoojaModal}
                className="px-2 py-1 rounded-xl bg-red-100 text-red-950 text-xs font-bold flex items-center gap-1 border border-red-300 shadow-sm"
              >
                <Flame className="w-3.5 h-3.5 text-red-600" />
                <span>Pooja</span>
              </button>
            )}

            {onOpenTakeTokenModal && (
              <button
                onClick={onOpenTakeTokenModal}
                className="px-2.5 py-1.5 rounded-xl bg-amber-400 text-amber-950 text-xs font-black flex items-center gap-1 shadow-sm"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>₹50 Token</span>
              </button>
            )}

            <button
              id="mobile-bell-btn"
              onClick={handleBellClick}
              className="p-2 rounded-full bg-amber-100/80 text-amber-800"
              aria-label="Ring Temple Bell"
            >
              <Bell className={`w-5 h-5 ${bellRung ? 'animate-bounce text-amber-600' : ''}`} />
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-amber-900 hover:bg-amber-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF8] border-b border-amber-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-stone-800 hover:bg-amber-100 hover:text-amber-900 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-amber-200 space-y-2">
            {onOpenPoojaModal ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPoojaModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black text-red-950 bg-gradient-to-r from-red-100 via-amber-100 to-red-100 border border-red-300 shadow-sm"
              >
                <Flame className="w-4 h-4 text-red-600" />
                <span>Want to do Pooja? (Enter Name with Surname)</span>
              </button>
            ) : (
              <a
                href="#pooja-booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black text-red-950 bg-gradient-to-r from-red-100 via-amber-100 to-red-100 border border-red-300 shadow-sm"
              >
                <Flame className="w-4 h-4 text-red-600" />
                <span>Want to do Pooja? (Enter Name with Surname)</span>
              </a>
            )}

            {onOpenAddMediaModal ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAddMediaModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-black text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Add Festival Photo / Video (ఫోటో & వీడియో)</span>
              </button>
            ) : (
              <a
                href="#media-gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-black text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Festival Photos & Videos Gallery</span>
              </a>
            )}

            {onOpenTakeTokenModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTakeTokenModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black text-amber-950 bg-gradient-to-r from-amber-400 to-amber-300 shadow-md"
              >
                <Ticket className="w-4 h-4 text-amber-900" />
                <span>Take Festival Token Online (₹50)</span>
              </button>
            )}

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-pink-300 text-sm font-bold text-pink-900 bg-pink-50 hover:bg-pink-100 transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>Follow {instagramHandle} on Instagram</span>
            </a>

            {onOpenAdminPortal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminPortal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-300 text-sm font-bold text-stone-800 bg-stone-100 hover:bg-stone-200"
              >
                <Lock className="w-4 h-4 text-amber-700" />
                <span>Admin Management &amp; Booked Tokens</span>
              </button>
            )}

            {onOpenMantras && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMantras();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-amber-300 text-sm font-semibold text-amber-900 bg-amber-50"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Read Aarti &amp; Mantras</span>
              </button>
            )}

            <a
              href="#whatsapp-updates"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get Updates on WhatsApp</span>
            </a>

            <div className="pt-2 border-t border-amber-200/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block mb-1 px-1">
                Direct Coordinator Calls:
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                <a
                  href="tel:9390905613"
                  className="w-full flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold text-amber-950 bg-amber-100/70 hover:bg-amber-100"
                >
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-700" />
                    <span>Sai Goud</span>
                  </span>
                  <span className="font-mono font-bold text-amber-900">93909 05613</span>
                </a>
                <a
                  href="tel:8688757194"
                  className="w-full flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold text-amber-950 bg-amber-100/70 hover:bg-amber-100"
                >
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-700" />
                    <span>Naresh Yadav</span>
                  </span>
                  <span className="font-mono font-bold text-amber-900">86887 57194</span>
                </a>
                <a
                  href="tel:7671803053"
                  className="w-full flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold text-amber-950 bg-amber-100/70 hover:bg-amber-100"
                >
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-700" />
                    <span>Venkat Yadav</span>
                  </span>
                  <span className="font-mono font-bold text-amber-900">76718 03053</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
