import React, { useState, useEffect } from 'react';
import { HeaderNavbar } from './components/HeaderNavbar';
import { HeroSection } from './components/HeroSection';
import { WantToDoPoojaSection } from './components/WantToDoPoojaSection';
import { PublicMediaSection } from './components/PublicMediaSection';
import { ScheduleSection } from './components/ScheduleSection';
import { LuckyDrawSection } from './components/LuckyDrawSection';
import { VenueSection } from './components/VenueSection';
import { WhatsAppSection } from './components/WhatsAppSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { AartiMantrasModal } from './components/AartiMantrasModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { TakeTokenModal } from './components/TakeTokenModal';
import { PoojaRegistrationModal } from './components/PoojaRegistrationModal';
import { AddMediaModal } from './components/AddMediaModal';
import { FESTIVAL_CONFIG_DEFAULT } from './data/festivalData';
import { FestivalConfig } from './types';
import { Phone, MessageCircle, Calendar, Sparkles, Lock, Ticket, Flame, Image as ImageIcon, Video } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<FestivalConfig>(FESTIVAL_CONFIG_DEFAULT);
  const [isMantrasModalOpen, setIsMantrasModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isTakeTokenModalOpen, setIsTakeTokenModalOpen] = useState(false);
  const [selectedTokenQuantity, setSelectedTokenQuantity] = useState(2);
  const [isPoojaModalOpen, setIsPoojaModalOpen] = useState(false);
  const [selectedPoojaType, setSelectedPoojaType] = useState<string | undefined>(undefined);
  const [selectedPoojaDate, setSelectedPoojaDate] = useState<string | undefined>(undefined);
  const [isAddMediaModalOpen, setIsAddMediaModalOpen] = useState(false);

  // Fetch persisted config on load
  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data && data.eventTitle) {
          setConfig(prev => ({ ...prev, ...data }));
        }
      })
      .catch(err => {
        console.debug("Config fetch using default:", err);
      });
  }, []);

  const handleUpdateConfig = async (updated: Partial<FestivalConfig>) => {
    const response = await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    if (!response.ok) {
      throw new Error("Failed to save config");
    }
    const result = await response.json();
    if (result.config) {
      setConfig(result.config);
    }
  };

  const handleOpenTakeToken = (quantity: number = 2) => {
    setSelectedTokenQuantity(quantity);
    setIsTakeTokenModalOpen(true);
  };

  const handleOpenPoojaModal = (poojaType?: string, date?: string) => {
    setSelectedPoojaType(poojaType);
    setSelectedPoojaDate(date);
    setIsPoojaModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#2C1810]">
      
      {/* Top Navbar */}
      <HeaderNavbar 
        onOpenMantras={() => setIsMantrasModalOpen(true)}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
        onOpenTakeTokenModal={() => handleOpenTakeToken(2)}
        onOpenPoojaModal={() => handleOpenPoojaModal()}
        onOpenAddMediaModal={() => setIsAddMediaModalOpen(true)}
        instagramHandle={config.instagramHandle}
        instagramUrl={config.instagramUrl}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection 
          config={config} 
          onOpenMantras={() => setIsMantrasModalOpen(true)} 
          onOpenTakeTokenModal={() => handleOpenTakeToken(2)}
          onOpenPoojaModal={() => handleOpenPoojaModal()}
        />

        {/* 2. Want to do Pooja? Devotee Registration (Name with Surname / Gotram) */}
        <WantToDoPoojaSection 
          config={config} 
          onOpenPoojaModal={handleOpenPoojaModal} 
        />

        {/* 3. Extra Tool: Public Media & Videos Gallery Wall (Image & Video Upload For All Public) */}
        <PublicMediaSection 
          config={config} 
        />

        {/* 4. Full Event Schedule & Timings (14 Sep - 22 Sep) */}
        <ScheduleSection />

        {/* 5. Take Token Online (₹50) & Special Children's Cycling Prize (22 Sep) */}
        <LuckyDrawSection 
          config={config} 
          onOpenTakeTokenModal={handleOpenTakeToken}
        />

        {/* 6. Venue & Directions with Editable Timing */}
        <VenueSection 
          config={config} 
          onUpdateConfig={handleUpdateConfig} 
        />

        {/* 7. WhatsApp Updates Opt-in & Broadcast Registry */}
        <WhatsAppSection />

        {/* 8. Contact Organizers (Sai Goud, Naresh Yadav, Venkat Yadav) */}
        <ContactSection config={config} />
      </main>

      {/* Footer with End-of-Site Upload Tool */}
      <FooterSection 
        config={config} 
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
        onOpenAddMediaModal={() => setIsAddMediaModalOpen(true)}
      />

      {/* Floating Bottom-Right Quick Upload Media Tool (Desktop & Tablet) */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAddMediaModalOpen(true)}
          className="group px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm shadow-2xl hover:shadow-amber-500/50 hover:scale-105 transition-all flex items-center gap-2 border-2 border-amber-300 cursor-pointer animate-pulse hover:animate-none"
          title="Upload Photos & Videos (అప్‌లోడ్ చేయండి)"
        >
          <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
            <ImageIcon className="w-4 h-4 text-white" />
          </div>
          <span>Upload Photos / Videos</span>
          <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded-full text-amber-200">
            అప్‌లోడ్
          </span>
        </button>
      </div>

      {/* Extra Tool: Add Image / Add Video Public Modal */}
      <AddMediaModal
        isOpen={isAddMediaModalOpen}
        onClose={() => setIsAddMediaModalOpen(false)}
      />

      {/* Want to do Pooja Modal */}
      <PoojaRegistrationModal
        isOpen={isPoojaModalOpen}
        onClose={() => setIsPoojaModalOpen(false)}
        initialPoojaType={selectedPoojaType}
        initialDate={selectedPoojaDate}
      />

      {/* Take Token Online Modal (with PhonePe QR & esai4488@ybl) */}
      <TakeTokenModal
        isOpen={isTakeTokenModalOpen}
        onClose={() => setIsTakeTokenModalOpen(false)}
        config={config}
        initialQuantity={selectedTokenQuantity}
      />

      {/* Devotional Lyrics Modal */}
      <AartiMantrasModal
        isOpen={isMantrasModalOpen}
        onClose={() => setIsMantrasModalOpen(false)}
      />

      {/* Organizer Admin Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
      />

      {/* Mobile Sticky Quick Action Bar */}
      <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40 bg-white/95 backdrop-blur-md p-2 rounded-2xl border-2 border-amber-300 shadow-xl flex items-center justify-between gap-1.5">
        <button
          onClick={() => handleOpenPoojaModal()}
          className="flex-1 py-2 px-2 rounded-xl bg-red-100 text-red-950 border border-red-300 text-center font-black text-xs flex items-center justify-center gap-1 shadow-sm"
        >
          <Flame className="w-3.5 h-3.5 text-red-600" />
          <span>Pooja</span>
        </button>

        <button
          onClick={() => setIsAddMediaModalOpen(true)}
          className="flex-1 py-2 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white border border-amber-400 text-center font-black text-xs flex items-center justify-center gap-1 shadow-md active:scale-95 transition-transform"
          title="Upload Photo / Video (ఫోటోలు & వీడియోలు అప్‌లోడ్)"
        >
          <ImageIcon className="w-3.5 h-3.5 text-white" />
          <span>Upload</span>
        </button>

        <button
          onClick={() => handleOpenTakeToken(2)}
          className="flex-1 py-2 px-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 border border-amber-400 text-center font-black text-xs flex items-center justify-center gap-1 shadow-sm"
        >
          <Ticket className="w-3.5 h-3.5 text-amber-900" />
          <span>₹50 Token</span>
        </button>

        <a
          href="#schedule"
          className="py-2 px-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-center font-bold text-xs flex items-center justify-center gap-1"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
        </a>

        <a
          href="#whatsapp-updates"
          className="py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
          title="WhatsApp Updates"
        >
          <MessageCircle className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={() => setIsAdminPortalOpen(true)}
          className="py-2 px-2.5 rounded-xl bg-stone-900 text-amber-300 text-center font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
          title="Admin Tool"
        >
          <Lock className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </div>

    </div>
  );
}
