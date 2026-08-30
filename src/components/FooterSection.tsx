import React from 'react';
import { Heart, Sparkles, Phone, MessageCircle, MapPin, Calendar, ArrowUp, Instagram, ExternalLink, Lock, Image as ImageIcon, Video, Upload, Camera } from 'lucide-react';
import { GaneshaIcon, DiyaIcon, RangoliBorder } from './FestiveIcons';
import { ORGANIZERS, FESTIVAL_CONFIG_DEFAULT } from '../data/festivalData';
import { FestivalConfig } from '../types';

interface FooterSectionProps {
  config?: FestivalConfig;
  onOpenAdminPortal?: () => void;
  onOpenAddMediaModal?: () => void;
}

export function FooterSection({ config = FESTIVAL_CONFIG_DEFAULT, onOpenAdminPortal, onOpenAddMediaModal }: FooterSectionProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const instagramHandle = config.instagramHandle || "@bennur_galligang";
  const instagramUrl = config.instagramUrl || "https://instagram.com/bennur_galligang";

  return (
    <footer className="bg-gradient-to-b from-[#2C1810] to-[#1F100A] text-amber-100/90 pt-10 pb-8 border-t-4 border-amber-500 relative overflow-hidden">
      
      {/* Background soft decorative radial */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* DEDICATED BOTTOM UPLOAD TOOL BANNER */}
        <div className="rounded-3xl p-5 sm:p-7 bg-gradient-to-r from-amber-900/90 via-orange-950/90 to-stone-900/95 border-2 border-amber-500/50 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-lg shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-2xl bg-amber-950/80 flex items-center justify-center text-amber-300">
                <Camera className="w-7 h-7" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/30 text-amber-300 border border-amber-400/30">
                  PUBLIC MEDIA TOOL
                </span>
                <span className="text-[11px] text-amber-400 font-semibold hidden sm:inline">
                  (ఫోటోలు &amp; వీడియోలు అప్‌లోడ్ టూల్)
                </span>
              </div>
              <h3 className="font-heading font-black text-lg sm:text-2xl text-white">
                Upload Festival Photos &amp; Videos
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Share your Lord Ganesha Darshanam photos, Harathi videos, and Dhol Tasha clips instantly with all devotees.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end shrink-0">
            {onOpenAddMediaModal && (
              <button
                onClick={onOpenAddMediaModal}
                className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-amber-300/40"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Photos / Videos (అప్‌లోడ్ చేయండి)</span>
              </button>
            )}

            <a
              href="#media-wall"
              className="flex-1 sm:flex-none px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-500/30 font-bold text-xs sm:text-sm text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>View Gallery Wall</span>
            </a>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-amber-900/60">
          
          {/* Brand & Auspicious Welcome (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 p-1 flex items-center justify-center">
                <GaneshaIcon className="w-9 h-9 text-amber-400" />
              </div>
              <div>
                <h3 className="font-heading font-black text-xl text-white tracking-wide">
                  Sri Siddhi Vinayaka Utsav 2026
                </h3>
                <p className="text-xs font-semibold text-amber-400 tracking-wider">
                  bennur_galligang &bull; B-Phase Colony, Bennur
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md">
              “Presented with devotion by <strong className="text-white">bennur_galligang</strong>. B-Phase Colony warmly welcomes all residents of Bennur village to join and celebrate 9 Days of Sri Siddhi Vinayaka Utsav starting 14 September, concluding on 22 September with Grand Ganesh Nimarjanam and Lucky Draw.”
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <span className="font-heading font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200">
                Ganpati Bappa Morya!
              </span>
              <DiyaIcon className="w-6 h-6 text-amber-400" />
            </div>

            {/* Official Instagram & Google Search Tag */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pink-950/60 hover:bg-pink-900/80 border border-pink-700/60 text-pink-200 text-xs font-bold transition-all shadow-sm group"
              >
                <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                <span>Instagram: {instagramHandle}</span>
                <ExternalLink className="w-3 h-3 text-pink-400" />
              </a>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                <span>🔍 Search:</span>
                <span className="text-white">bennur_galligang</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-amber-300">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>✦</span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>✦</span>
                  <span>Full Event Schedule</span>
                </a>
              </li>
              <li>
                <a href="#lucky-draw" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>✦</span>
                  <span>Lucky Draw (₹50) & Cycling Prize</span>
                </a>
              </li>
              <li>
                <a href="#venue" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>✦</span>
                  <span>Venue & Directions</span>
                </a>
              </li>
              <li>
                <a href="#whatsapp-updates" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>✦</span>
                  <span>WhatsApp Updates</span>
                </a>
              </li>
              <li>
                <a href="#media-wall" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-300 font-bold">
                  <span>📸</span>
                  <span>Photos &amp; Videos Wall</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>✦</span>
                  <span>Contact Organizers</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Key Coordinators & Helpline (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-amber-300">
              Coordinators Helpline & Socials
            </h4>
            
            <div className="space-y-2.5">
              {ORGANIZERS.map(org => (
                <div key={org.name} className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-900/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{org.name}</p>
                    <a href={`tel:${org.phone}`} className="text-xs font-mono text-amber-300 hover:underline block">
                      {org.displayPhone}
                    </a>
                    {org.instagramHandle && (
                      <span className="text-[10px] text-pink-300 font-mono">
                        {org.instagramHandle}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${org.phone}`}
                      className="p-1.5 rounded-lg bg-amber-800/60 hover:bg-amber-700 text-amber-200 text-xs"
                      title="Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={org.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-emerald-700/70 hover:bg-emerald-600 text-white text-xs"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                    {org.instagramUrl && (
                      <a
                        href={org.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-pink-900/70 hover:bg-pink-800 text-pink-200 text-xs"
                        title="Instagram"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-1 flex items-center justify-between">
              <a 
                href={config.googleMapsUrl || "https://maps.app.goo.gl/NFBAQ5Z4YXdsFyUf9"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] text-amber-300/80 hover:text-amber-200 hover:underline flex items-center gap-1"
              >
                <MapPin className="w-3 h-3 text-red-400" />
                <span>NARSAIAH NILAYAM, Bennur</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <span className="text-[11px] text-amber-400 font-bold">14–22 Sep 2026</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="text-center sm:text-left space-y-1">
            <p className="font-semibold text-amber-200/90">
              Sri Siddhi Vinayaka Utsav 2026 | B-Phase Colony, Bennur
            </p>
            <p>
              &copy; 2026 Sri Siddhi Vinayaka Utsav Committee. All rights reserved. Devotion &bull; Joy &bull; Unity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenAdminPortal && (
              <button
                onClick={onOpenAdminPortal}
                className="flex items-center gap-1 text-[11px] font-bold text-amber-400/80 hover:text-amber-300 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Portal</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-900/40 hover:bg-amber-800/60 text-amber-200 border border-amber-800/80 transition-colors text-xs font-bold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
