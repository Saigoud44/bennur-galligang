import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Edit3, Check, X, Sparkles, AlertCircle, ExternalLink, Building } from 'lucide-react';
import { FestivalConfig } from '../types';
import { RangoliBorder, DiyaIcon } from './FestiveIcons';

interface VenueSectionProps {
  config: FestivalConfig;
  onUpdateConfig: (updated: Partial<FestivalConfig>) => Promise<void>;
}

export function VenueSection({ config, onUpdateConfig }: VenueSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Edit form state
  const [formData, setFormData] = useState({
    eventStartDisplay: config.eventStartDisplay || "14 September 2026, 9:00 AM",
    eventStartDateTime: config.eventStartDateTime || "2026-09-14T09:00:00",
    venueAddress: config.venueAddress || "NARSAIAH NILAYAM, 1-100/2, B-Phase Colony, Bennur, Telangana 501144",
    district: config.district || "Vikarabad",
    state: config.state || "Telangana",
    pinCode: config.pinCode || "501144",
    googleMapsUrl: config.googleMapsUrl || "https://maps.app.goo.gl/NFBAQ5Z4YXdsFyUf9",
    googleMapsQuery: config.googleMapsQuery || "NARSAIAH NILAYAM, 1-100/2, Bennur, Telangana 501144",
    instagramHandle: config.instagramHandle || "@srisiddhi_vinayaka_bennur",
    instagramUrl: config.instagramUrl || "https://instagram.com/srisiddhi_vinayaka_bennur"
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onUpdateConfig(formData);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditing(false);
      }, 1500);
    } catch (err) {
      setError("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const directMapsUrl = config.googleMapsUrl || "https://maps.app.goo.gl/NFBAQ5Z4YXdsFyUf9";
  const embedQuery = encodeURIComponent(config.googleMapsQuery || config.venueAddress || "NARSAIAH NILAYAM, 1-100/2, Bennur, Telangana 501144");

  return (
    <section id="venue" className="py-14 bg-[#FFFDF9] border-b border-amber-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-bold text-amber-900 uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <span>Pandal Location & Timings</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-amber-950">
            Venue & Event Timings
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Sri Siddhi Vinayaka Pandal is situated at B-Phase Colony in Bennur. Follow directions below or contact coordinators for route assistance.
          </p>

          <div className="pt-1">
            <RangoliBorder />
          </div>
        </div>

        {/* Top Highlight Cards: Event Starts Card & Venue Address Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: Highlighted "Event Starts" Card (Editable) */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-7 text-white shadow-lg relative overflow-hidden group">
            
            {/* Background Diya glow */}
            <div className="absolute right-3 top-3 opacity-20 group-hover:opacity-30 transition-opacity">
              <DiyaIcon className="w-24 h-24 text-white" glow={false} />
            </div>

            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-white/20 text-white backdrop-blur-sm uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-200" />
                <span>OFFICIAL INAUGURATION</span>
              </span>

              {/* Edit toggle button for organizers */}
              <button
                onClick={() => {
                  setFormData({
                    eventStartDisplay: config.eventStartDisplay,
                    eventStartDateTime: config.eventStartDateTime,
                    venueAddress: config.venueAddress,
                    district: config.district,
                    state: config.state,
                    pinCode: config.pinCode,
                    countdownDateTime: config.countdownDateTime || "2026-09-22T17:00:00",
                    backgroundImageUrl: config.backgroundImageUrl || "",
                    googleMapsUrl: config.googleMapsUrl || "https://maps.app.goo.gl/NFBAQ5Z4YXdsFyUf9",
                    googleMapsQuery: config.googleMapsQuery || "NARSAIAH NILAYAM, 1-100/2, Bennur, Telangana 501144",
                    instagramHandle: config.instagramHandle || "@srisiddhi_vinayaka_bennur",
                    instagramUrl: config.instagramUrl || "https://instagram.com/srisiddhi_vinayaka_bennur"
                  });
                  setIsEditing(true);
                }}
                className="p-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-white/90 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1"
                title="Edit event start timing or venue address"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="text-[11px]">Edit Timing</span>
              </button>
            </div>

            <div className="space-y-1 relative z-10">
              <div className="text-xs uppercase font-bold text-amber-100 tracking-wider">
                Highlighted Schedule
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
                Event Starts: {config.eventStartDisplay || "14 September 2026, 9:00 AM"}
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/90 pt-1 leading-relaxed">
                Ceremonial Ganesh Sthapana & Pran Pratishtha rituals commence promptly at 9:00 AM on Monday, 14 September 2026 (9 Days Utsav concluding on 22 September with Ganesh Nimarjanam and Lucky Draw).
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-amber-100">
              <span>🌺 Mahaprasadam to follow</span>
              <span className="font-bold text-amber-200">Everyone Welcome</span>
            </div>
          </div>

          {/* Card 2: Prominent Venue Address Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-300 shadow-md relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-red-100 text-red-800 border border-red-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-red-600" />
                  <span>PANDAL LOCATION</span>
                </span>
                <span className="text-xs text-stone-500 font-medium">Bennur Village</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-amber-950">
                  Venue: {config.venueAddress || "NARSAIAH NILAYAM, 1-100/2, B-Phase Colony, Bennur, Telangana 501144"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  The grand pandal is being decorated at NARSAIAH NILAYAM in B-Phase Colony, Bennur. Ample space for darshan, seating, cultural programs, and bhajan mandali.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-amber-100 flex flex-wrap items-center justify-between gap-3">
              <a
                id="venue-get-directions-btn"
                href={directMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Open Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="tel:9390905613"
                className="text-xs font-bold text-amber-800 hover:text-amber-950 underline"
              >
                Need Route Help? Call Sai: 9390905613
              </a>
            </div>

          </div>

        </div>

        {/* Embedded Map Section */}
        <div className="bg-white rounded-3xl border-2 border-amber-200 shadow-md overflow-hidden">
          
          <div className="p-4 sm:p-5 bg-amber-50/70 border-b border-amber-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              <span className="font-heading font-bold text-sm sm:text-base text-amber-950">
                Interactive Pandal Map (NARSAIAH NILAYAM, Bennur)
              </span>
            </div>
            <span className="text-xs text-stone-600 bg-white px-2.5 py-1 rounded-full border border-amber-200 font-medium">
              Centered on Bennur Pandal Area
            </span>
          </div>

          <div className="relative w-full h-80 sm:h-96 bg-stone-100">
            {/* Embedded Google Map iframe */}
            <iframe
              title="Sri Siddhi Vinayaka Utsav 2026 Venue Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${embedQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full"
            ></iframe>

            {/* Overlay Banner with Quick Navigation Button */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-amber-300 shadow-xl max-w-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="text-left">
                  <p className="text-xs font-bold text-amber-950">NARSAIAH NILAYAM, Bennur</p>
                  <p className="text-[11px] text-stone-600">Sri Siddhi Vinayaka Utsav 2026</p>
                </div>
                <a
                  href={directMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Editable Modal for Organizers */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border-2 border-amber-300 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-amber-100 mb-4">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-600" />
                <h3 className="font-heading font-bold text-lg text-amber-950">
                  Edit Event Timings & Venue Details
                </h3>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Event Starts Display Text *
                </label>
                <input
                  type="text"
                  value={formData.eventStartDisplay}
                  onChange={(e) => setFormData({ ...formData, eventStartDisplay: e.target.value })}
                  placeholder="e.g. 7 September 2026, 9:00 AM"
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-[11px] text-stone-500 mt-1">Displayed on the highlighted hero and venue cards.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Venue Address / Placeholder *
                </label>
                <textarea
                  rows={2}
                  value={formData.venueAddress}
                  onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                  placeholder="e.g. B-Phase Colony, Bennur, [District], [State], [PIN Code]"
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-[11px] text-stone-500 mt-1">Update this once the exact colony plot/landmark or PIN code is finalized.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Countdown Target Date/Time (ISO)
                  </label>
                  <input
                    type="text"
                    value={formData.countdownDateTime || "2026-09-14T17:00:00"}
                    onChange={(e) => setFormData({ ...formData, countdownDateTime: e.target.value })}
                    placeholder="2026-09-14T17:00:00"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">Targets 14 September 2026 for Visarjan & Lucky Draw.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Custom Background Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.backgroundImageUrl || ""}
                    onChange={(e) => setFormData({ ...formData, backgroundImageUrl: e.target.value })}
                    placeholder="https://... (or leave empty for royal gold mandap)"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">Leave empty to use the royal dark-burgundy & gold festive mandap.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Google Maps Link *
                </label>
                <input
                  type="url"
                  value={formData.googleMapsUrl}
                  onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                  placeholder="https://maps.app.goo.gl/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-[11px] text-stone-500 mt-1">Google Maps short link or place URL for one-click navigation.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={formData.instagramHandle}
                    onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                    placeholder="e.g. @srisiddhi_vinayaka_bennur"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Instagram Profile URL
                  </label>
                  <input
                    type="text"
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                    placeholder="https://instagram.com/your_handle"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Updated successfully!</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-amber-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow flex items-center gap-1.5"
                >
                  {saving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
