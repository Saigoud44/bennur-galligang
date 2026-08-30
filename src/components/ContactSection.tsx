import React from 'react';
import { Phone, MessageCircle, User, Shield, HeartHandshake, Sparkles, HelpCircle, Instagram, Camera, ExternalLink } from 'lucide-react';
import { ORGANIZERS, FESTIVAL_CONFIG_DEFAULT } from '../data/festivalData';
import { RangoliBorder, DiyaIcon } from './FestiveIcons';
import { FestivalConfig } from '../types';

interface ContactSectionProps {
  config?: FestivalConfig;
}

export function ContactSection({ config = FESTIVAL_CONFIG_DEFAULT }: ContactSectionProps) {
  const instagramHandle = config.instagramHandle || "@bennur_galligang";
  const instagramUrl = config.instagramUrl || "https://instagram.com/bennur_galligang";

  return (
    <section id="contact" className="py-14 bg-[#FFFDF8] border-b border-amber-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-bold text-amber-900 uppercase tracking-widest">
            <Phone className="w-3.5 h-3.5 text-amber-700" />
            <span>Utsav Organizing Committee</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-amber-950">
            Contact Organizers & Social Media
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            For Lucky Draw tokens, Pooja seva offerings, Bhajan participation, or pandal directions, please feel free to call, WhatsApp, or connect with our coordinators on Instagram.
          </p>

          <div className="pt-1">
            <RangoliBorder />
          </div>
        </div>

        {/* Official Instagram Page Banner */}
        <div className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-3xl p-6 sm:p-7 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-white p-2.5 shadow-md flex items-center justify-center shrink-0">
                <Instagram className="w-10 h-10 text-pink-600" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  <Camera className="w-3 h-3 text-pink-100" />
                  <span>Official Instagram Page</span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                  {instagramHandle}
                </h3>
                <p className="text-xs sm:text-sm text-pink-100 leading-relaxed max-w-lg">
                  Follow for daily Live Aarti streams, photo galleries, Bhajan reels, lucky draw winner announcements, and Visarjan updates!
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <a
                id="official-instagram-link-btn"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-black text-sm bg-white text-pink-600 hover:bg-pink-50 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <Instagram className="w-4 h-4 text-pink-600 group-hover:scale-110 transition-transform" />
                <span>Follow on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-pink-100">
            <span>📸 Tag us in your festival stories & reels</span>
            <span className="font-mono font-bold text-white">#SriSiddhiVinayaka2026 #BPhaseBennurUtsav #GanpatiBappaMorya</span>
          </div>
        </div>

        {/* Organizer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {ORGANIZERS.map((org, index) => (
            <div
              key={org.name}
              className="bg-white rounded-3xl border-2 border-amber-200 hover:border-amber-400 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-heading font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                      {org.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-amber-950">
                        {org.name}
                      </h3>
                      <p className="text-xs font-semibold text-amber-800">
                        {org.role}
                      </p>
                    </div>
                  </div>

                  {org.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 text-center">
                      {org.badge}
                    </span>
                  )}
                </div>

                <div className="py-2.5 px-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 mb-4">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                    Mobile Number
                  </span>
                  <a
                    href={`tel:${org.phone}`}
                    className="font-mono font-extrabold text-lg sm:text-xl text-amber-950 hover:text-red-700 transition-colors"
                  >
                    {org.displayPhone}
                  </a>
                </div>

                {org.instagramHandle && (
                  <div className="py-2 px-3 rounded-xl bg-pink-50/70 border border-pink-200/70 mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-pink-900 font-semibold">
                      <Instagram className="w-3.5 h-3.5 text-pink-600" />
                      <span>Instagram:</span>
                    </div>
                    <a
                      href={org.instagramUrl || `https://instagram.com/${org.instagramHandle.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-pink-700 hover:text-pink-900 hover:underline flex items-center gap-1"
                    >
                      <span>{org.instagramHandle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Action Buttons: One-Click Call, WhatsApp & Instagram */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    id={`call-${org.name.toLowerCase().replace(/\s+/g, '-')}`}
                    href={`tel:${org.phone}`}
                    className="py-2.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm text-center text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-amber-700" />
                    <span>Call Now</span>
                  </a>

                  <a
                    id={`whatsapp-${org.name.toLowerCase().replace(/\s+/g, '-')}`}
                    href={org.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm text-center text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {org.instagramUrl && (
                  <a
                    id={`instagram-${org.name.toLowerCase().replace(/\s+/g, '-')}`}
                    href={org.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl font-bold text-xs text-center text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span>View {org.name.split(' ')[0]}’s Instagram</span>
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Quick Help / Inquiry Topics */}
        <div className="max-w-4xl mx-auto mt-8 p-5 bg-gradient-to-r from-amber-50 via-[#FFFDF5] to-orange-50 rounded-2xl border border-amber-300 text-center">
          <h4 className="font-heading font-bold text-sm text-amber-950 mb-2 flex items-center justify-center gap-2">
            <HeartHandshake className="w-4 h-4 text-amber-700" />
            <span>How Can We Help You?</span>
          </h4>
          
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <a
              href="https://wa.me/919390905613?text=Namaste,%20I%20want%20to%20know%20about%20Lucky%20Draw%20Tokens%20for%20Sri%20Siddhi%20Vinayaka%20Utsav%202026."
              className="px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-amber-900 font-semibold hover:bg-amber-100 transition-colors"
            >
              🎟️ Lucky Draw Tokens (₹50)
            </a>
            <a
              href="https://wa.me/918688757194?text=Namaste,%20I%20want%20to%20contribute%20for%20Mahaprasadam%20Annadanam%20Seva%20on%2021%20September."
              className="px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-amber-900 font-semibold hover:bg-amber-100 transition-colors"
            >
              🍲 Mahaprasadam Seva (21 Sep)
            </a>
            <a
              href="https://wa.me/917671803053?text=Namaste%20Venkat%20Yadav%20garu,%20I%20would%20like%20to%20volunteer%20and%20support%20Sri%20Siddhi%20Vinayaka%20Utsav%202026."
              className="px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-amber-900 font-semibold hover:bg-amber-100 transition-colors"
            >
              🤝 Volunteer &amp; Youth (Venkat Yadav)
            </a>
            <a
              href="https://wa.me/918688757194?text=Namaste,%20I%20would%20like%20to%20participate%20in%20Cultural%20Programs%20and%20Bhajans."
              className="px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-amber-900 font-semibold hover:bg-amber-100 transition-colors"
            >
              🎤 Bhajan &amp; Cultural Participation
            </a>
            <a
              href="https://wa.me/919390905613?text=Namaste,%20I%20need%20directions%20to%20reach%20B-Phase%20Colony,%20Bennur."
              className="px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-amber-900 font-semibold hover:bg-amber-100 transition-colors"
            >
              📍 Pandal Location Assistance
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
