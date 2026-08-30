import React, { useState, useEffect } from 'react';
import { 
  Lock, KeyRound, Shield, CheckCircle2, AlertCircle, 
  Save, X, MessageCircle, ExternalLink, RefreshCw, 
  Calendar, Trophy, MapPin, Eye, EyeOff, Sparkles,
  Ticket, Download, Search, Plus, Trash2, Check, UserCheck, Phone, Flame, Printer,
  Image as ImageIcon, Video, Heart, CheckSquare
} from 'lucide-react';
import { FestivalConfig, TokenRecord, PoojaBookingRecord, MediaItem } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: FestivalConfig;
  onUpdateConfig: (updated: Partial<FestivalConfig>) => Promise<void>;
}

export function AdminPortalModal({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}: AdminPortalModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('saig99729@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Admin Tab: 'tokens' | 'pooja' | 'media' | 'whatsapp' | 'festival' | 'password'
  const [activeTab, setActiveTab] = useState<'tokens' | 'pooja' | 'media' | 'whatsapp' | 'festival' | 'password'>('tokens');

  // Tokens Management State
  const [tokensList, setTokensList] = useState<TokenRecord[]>([]);
  const [tokensStats, setTokensStats] = useState({ totalBookings: 0, totalTokensSold: 0, totalAmount: 0 });
  const [tokensLoading, setTokensLoading] = useState(false);
  const [tokenSearch, setTokenSearch] = useState('');

  // Pooja Bookings State
  const [poojaList, setPoojaList] = useState<PoojaBookingRecord[]>([]);
  const [poojaStats, setPoojaStats] = useState({ totalBookings: 0, confirmed: 0, pending: 0 });
  const [poojaLoading, setPoojaLoading] = useState(false);
  const [poojaSearch, setPoojaSearch] = useState('');
  const [poojaDateFilter, setPoojaDateFilter] = useState('all');

  // Media Gallery Admin State
  const [adminMediaList, setAdminMediaList] = useState<MediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  
  // Manual Add Token State
  const [showManualAdd, setShowManualAdd] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualQuantity, setManualQuantity] = useState(1);
  const [manualNotes, setManualNotes] = useState('');
  const [manualSubmitting, setManualSubmitting] = useState(false);
  const [manualError, setManualError] = useState<string | null>(null);

  // WhatsApp Group Link state
  const [whatsAppGroupLink, setWhatsAppGroupLink] = useState(
    config.whatsAppGroupLink || 'https://chat.whatsapp.com/invite/bennurgalligang2026'
  );
  const [savingWhatsApp, setSavingWhatsApp] = useState(false);
  const [whatsAppSuccess, setWhatsAppSuccess] = useState(false);

  // Festival Config State
  const [festivalForm, setFestivalForm] = useState({
    eventTitle: config.eventTitle || "Sri Siddhi Vinayaka Utsav 2026",
    colonyName: config.colonyName || "B-Phase Colony, Bennur",
    eventStartDisplay: config.eventStartDisplay || "14 September 2026, 9:00 AM",
    luckyDrawDate: config.luckyDrawDate || "22 September 2026 (Final Day & Nimarjanam)",
    luckyDrawTokenPrice: config.luckyDrawTokenPrice || 50,
    specialPrize: config.specialPrize || "Special children’s cycling prize included",
    instagramHandle: config.instagramHandle || "@bennur_galligang",
    venueAddress: config.venueAddress || "NARSAIAH NILAYAM, 1-100/2, B-Phase Colony, Bennur, Telangana 501144"
  });
  const [savingFestival, setSavingFestival] = useState(false);
  const [festivalSuccess, setFestivalSuccess] = useState(false);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);

  // Auto-fill existing config
  useEffect(() => {
    if (config.whatsAppGroupLink) {
      setWhatsAppGroupLink(config.whatsAppGroupLink);
    }
    setFestivalForm({
      eventTitle: config.eventTitle || "Sri Siddhi Vinayaka Utsav 2026",
      colonyName: config.colonyName || "B-Phase Colony, Bennur",
      eventStartDisplay: config.eventStartDisplay || "14 September 2026, 9:00 AM",
      luckyDrawDate: config.luckyDrawDate || "22 September 2026 (Final Day & Nimarjanam)",
      luckyDrawTokenPrice: config.luckyDrawTokenPrice || 50,
      specialPrize: config.specialPrize || "Special children’s cycling prize included",
      instagramHandle: config.instagramHandle || "@bennur_galligang",
      venueAddress: config.venueAddress || "NARSAIAH NILAYAM, 1-100/2, B-Phase Colony, Bennur, Telangana 501144"
    });
  }, [config]);

  // Load Tokens when authenticated or switching to tokens tab
  const fetchTokens = async () => {
    setTokensLoading(true);
    try {
      const res = await fetch('/api/tokens');
      const data = await res.json();
      if (data.tokens) {
        setTokensList(data.tokens);
        setTokensStats({
          totalBookings: data.totalBookings || 0,
          totalTokensSold: data.totalTokensSold || 0,
          totalAmount: data.totalAmount || 0
        });
      }
    } catch (err) {
      console.error("Failed to load tokens:", err);
    } finally {
      setTokensLoading(false);
    }
  };

  // Load Pooja Bookings
  const fetchPoojaBookings = async () => {
    setPoojaLoading(true);
    try {
      const res = await fetch('/api/pooja-bookings');
      const data = await res.json();
      if (data.bookings) {
        setPoojaList(data.bookings);
        setPoojaStats(data.stats || { totalBookings: data.bookings.length, confirmed: 0, pending: 0 });
      }
    } catch (err) {
      console.error("Failed to load pooja bookings:", err);
    } finally {
      setPoojaLoading(false);
    }
  };

  // Load Media Items
  const fetchAdminMedia = async () => {
    setMediaLoading(true);
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      if (data.media) {
        setAdminMediaList(data.media);
      }
    } catch (err) {
      console.error("Failed to load media:", err);
    } finally {
      setMediaLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'tokens') {
        fetchTokens();
      } else if (activeTab === 'pooja') {
        fetchPoojaBookings();
      } else if (activeTab === 'media') {
        fetchAdminMedia();
      }
    }
  }, [isAuthenticated, activeTab]);

  // Toggle Pooja Booking Status
  const handleTogglePoojaStatus = async (booking: PoojaBookingRecord) => {
    const nextStatus: 'confirmed' | 'pending' | 'completed' = 
      booking.status === 'pending' ? 'confirmed' : booking.status === 'confirmed' ? 'completed' : 'confirmed';
    try {
      const res = await fetch(`/api/pooja-bookings/${booking.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        setPoojaList(prev => prev.map(p => p.id === booking.id ? { ...p, status: nextStatus } : p));
      }
    } catch (err) {
      console.error("Failed to update pooja status:", err);
    }
  };

  // Delete Pooja Booking
  const handleDeletePooja = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this Pooja registration?")) return;
    try {
      const res = await fetch(`/api/pooja-bookings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPoojaList(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete pooja booking:", err);
    }
  };

  // Toggle Media Item Approved Status
  const handleToggleMediaStatus = async (item: MediaItem) => {
    const newStatus = item.status === 'approved' ? 'pending' : 'approved';
    try {
      const res = await fetch(`/api/media/${item.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setAdminMediaList(prev => prev.map(m => m.id === item.id ? { ...m, status: newStatus } : m));
      }
    } catch (err) {
      console.error("Failed to update media status:", err);
    }
  };

  // Delete Media Item
  const handleDeleteMedia = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this photo / video from the public site?")) return;
    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAdminMediaList(prev => prev.filter(m => m.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete media item:", err);
    }
  };

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.trim() })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Incorrect password");
      }

      setIsAuthenticated(true);
      if (data.adminEmail) {
        setAdminEmail(data.adminEmail);
      }
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      setLoginError(errObj.message || "Invalid credentials. Use default password: bennur2026");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Quick Auto-Fill Password
  const handleQuickLoginWithDefault = () => {
    setPasswordInput('bennur2026');
  };

  // Toggle Token Verification Status
  const handleToggleTokenStatus = async (token: TokenRecord) => {
    const newStatus = token.status === 'verified' ? 'confirmed' : 'verified';
    try {
      const res = await fetch(`/api/tokens/${token.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setTokensList(prev => prev.map(t => t.id === token.id ? { ...t, status: newStatus } : t));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete Token
  const handleDeleteToken = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this token entry?")) return;
    try {
      const res = await fetch(`/api/tokens/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTokensList(prev => prev.filter(t => t.id !== id));
        fetchTokens();
      }
    } catch (err) {
      console.error("Failed to delete token:", err);
    }
  };

  // Manual Add Token
  const handleManualAddToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setManualError(null);
    setManualSubmitting(true);

    try {
      const res = await fetch('/api/tokens/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: manualName.trim(),
          phone: manualPhone.replace(/\D/g, ''),
          quantity: manualQuantity,
          notes: manualNotes.trim() ? `Manual/Cash Entry: ${manualNotes.trim()}` : "Manual Cash Entry at Counter"
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to add token");
      }

      setManualName('');
      setManualPhone('');
      setManualQuantity(1);
      setManualNotes('');
      setShowManualAdd(false);
      fetchTokens();
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      setManualError(errObj.message || "Failed to add token");
    } finally {
      setManualSubmitting(false);
    }
  };

  // Handle Save WhatsApp Group Link
  const handleSaveWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingWhatsApp(true);
    setWhatsAppSuccess(false);

    try {
      await onUpdateConfig({
        whatsAppGroupLink: whatsAppGroupLink.trim()
      });
      setWhatsAppSuccess(true);
      setTimeout(() => setWhatsAppSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save WhatsApp group link:", err);
    } finally {
      setSavingWhatsApp(false);
    }
  };

  // Handle Save Festival Form
  const handleSaveFestival = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingFestival(true);
    setFestivalSuccess(false);

    try {
      await onUpdateConfig({
        eventTitle: festivalForm.eventTitle.trim(),
        colonyName: festivalForm.colonyName.trim(),
        eventStartDisplay: festivalForm.eventStartDisplay.trim(),
        luckyDrawDate: festivalForm.luckyDrawDate.trim(),
        luckyDrawTokenPrice: Number(festivalForm.luckyDrawTokenPrice) || 50,
        specialPrize: festivalForm.specialPrize.trim(),
        instagramHandle: festivalForm.instagramHandle.trim(),
        venueAddress: festivalForm.venueAddress.trim()
      });
      setFestivalSuccess(true);
      setTimeout(() => setFestivalSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to update festival details:", err);
    } finally {
      setSavingFestival(false);
    }
  };

  // Handle Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: "New passwords do not match" });
      return;
    }

    if (newPassword.length < 4) {
      setPasswordMsg({ type: 'error', text: "New password must be at least 4 characters" });
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: currentPassword.trim(),
          newPassword: newPassword.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update password");
      }
      setPasswordMsg({ type: 'success', text: "Password changed successfully! Keep it safe." });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      setPasswordMsg({ type: 'error', text: errObj.message || "Failed to change password" });
    } finally {
      setChangingPassword(false);
    }
  };

  // Filtered tokens
  const filteredTokens = tokensList.filter(t => {
    const search = tokenSearch.toLowerCase();
    return (
      t.name.toLowerCase().includes(search) ||
      t.phone.includes(search) ||
      t.tokenNumbers.some(num => num.toLowerCase().includes(search)) ||
      (t.utrNumber && t.utrNumber.toLowerCase().includes(search))
    );
  });

  // Filtered Pooja Bookings
  const filteredPooja = poojaList.filter(p => {
    const search = poojaSearch.toLowerCase();
    const matchesSearch = 
      p.nameWithSurname.toLowerCase().includes(search) ||
      (p.gothram && p.gothram.toLowerCase().includes(search)) ||
      p.phone.includes(search) ||
      p.poojaType.toLowerCase().includes(search) ||
      p.bookingNumber.toLowerCase().includes(search);

    const matchesDate = poojaDateFilter === 'all' || p.poojaDate === poojaDateFilter;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-4xl w-full border-2 border-amber-400 shadow-2xl overflow-hidden animate-in zoom-in-95 my-auto max-h-[94vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#2A0F05] via-[#451A0A] to-[#2A0F05] p-4 sm:p-5 text-white flex items-center justify-between border-b-2 border-amber-500 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-lg sm:text-xl text-amber-200">
                  Organizer Admin Portal
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white">
                  bennur_galligang
                </span>
              </div>
              <p className="text-xs text-amber-200/80">
                Admin Access for: <strong className="text-white">{adminEmail}</strong> &bull; UPI: <strong className="text-amber-300 font-mono">esai4488@ybl</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Not Authenticated: Login Screen */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            <div className="max-w-md mx-auto text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-800 mx-auto flex items-center justify-center shadow-md">
                <KeyRound className="w-8 h-8" />
              </div>
              
              <h4 className="font-heading font-extrabold text-2xl text-stone-900">
                Admin Authentication
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Enter your password to manage <strong>Booked Tokens (₹50)</strong>, <strong>WhatsApp Link</strong>, and <strong>Festival Details</strong>.
              </p>

              {/* Password Info Callout with Account Details */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-left text-xs space-y-1.5 text-amber-950">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900">🔑 Account Access Credentials:</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-[10px] font-bold text-amber-900">Default Credentials</span>
                </div>
                <p>• <strong>Admin Email:</strong> <span className="font-mono">{adminEmail}</span></p>
                <p>• <strong>Default Password:</strong> <code className="px-2 py-0.5 bg-amber-200 text-amber-950 rounded font-bold font-mono">bennur2026</code></p>
                <button
                  type="button"
                  onClick={handleQuickLoginWithDefault}
                  className="mt-1 text-xs text-amber-800 font-bold underline hover:text-amber-950 block cursor-pointer"
                >
                  Click here to auto-fill default password
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password..."
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-stone-900 pr-10 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 px-6 rounded-xl font-black text-white bg-gradient-to-r from-red-600 via-amber-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {loginLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Unlock Admin Access</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Admin Tabs */}
            <div className="flex items-center gap-1 px-4 pt-3 bg-amber-50/70 border-b border-amber-200 overflow-x-auto shrink-0">
              
              <button
                onClick={() => setActiveTab('tokens')}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'tokens'
                    ? 'bg-white text-amber-950 border-t-2 border-x-2 border-amber-500 shadow-sm font-black'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Ticket className="w-3.5 h-3.5 text-amber-600" />
                <span>Booked Tokens &amp; Payments ({tokensStats.totalTokensSold})</span>
              </button>

              <button
                onClick={() => setActiveTab('pooja')}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'pooja'
                    ? 'bg-white text-red-950 border-t-2 border-x-2 border-red-500 shadow-sm font-black'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-red-600" />
                <span>Pooja Registrations ({poojaList.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('media')}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'media'
                    ? 'bg-white text-amber-950 border-t-2 border-x-2 border-amber-500 shadow-sm font-black'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>Photos &amp; Videos Wall ({adminMediaList.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'whatsapp'
                    ? 'bg-white text-emerald-950 border-t-2 border-x-2 border-emerald-400 shadow-sm font-black'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Group Link Tool</span>
              </button>

              <button
                onClick={() => setActiveTab('festival')}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'festival'
                    ? 'bg-white text-amber-950 border-t-2 border-x-2 border-amber-400 shadow-sm font-black'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-red-600" />
                <span>14-22 Sep Festival Dates</span>
              </button>

              <button
                onClick={() => setActiveTab('password')}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'password'
                    ? 'bg-white text-purple-950 border-t-2 border-x-2 border-purple-400 shadow-sm font-black'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5 text-purple-600" />
                <span>Password &amp; Security</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white">
              
              {/* TAB 0: BOOKED TOKENS & PAYMENTS (NEW TOOL) */}
              {activeTab === 'tokens' && (
                <div className="space-y-6">
                  
                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                        Total Tokens Allocated
                      </span>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="font-heading font-black text-2xl text-amber-950">
                          {tokensStats.totalTokensSold} Tokens
                        </span>
                        <Ticket className="w-5 h-5 text-amber-600" />
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                        Total Amount Collected
                      </span>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="font-heading font-black text-2xl text-emerald-950">
                          ₹{tokensStats.totalAmount}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 font-mono">esai4488@ybl</span>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 block">
                        Devotee Bookings
                      </span>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="font-heading font-black text-2xl text-purple-950">
                          {tokensStats.totalBookings} Orders
                        </span>
                        <UserCheck className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  {/* Controls: Search, Export CSV, Add Manual Token */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="relative flex-1 min-w-[200px] max-w-md">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={tokenSearch}
                        onChange={(e) => setTokenSearch(e.target.value)}
                        placeholder="Search by Name, Mobile, or Token #..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowManualAdd(!showManualAdd)}
                        className="py-2 px-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Offline Token</span>
                      </button>

                      <a
                        href="/api/tokens/export"
                        download
                        className="py-2 px-3.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-stone-500" />
                        <span>Export CSV</span>
                      </a>

                      <button
                        type="button"
                        onClick={fetchTokens}
                        className="p-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-600"
                        title="Refresh List"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${tokensLoading ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Manual Add Token Drawer Form */}
                  {showManualAdd && (
                    <form onSubmit={handleManualAddToken} className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-xs uppercase text-amber-900 tracking-wider">
                          Add Offline/Counter Token Booking
                        </h5>
                        <button
                          type="button"
                          onClick={() => setShowManualAdd(false)}
                          className="text-stone-400 hover:text-stone-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">Devotee Name</label>
                          <input
                            type="text"
                            value={manualName}
                            onChange={(e) => setManualName(e.target.value)}
                            placeholder="Full name"
                            required
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">10-Digit Mobile</label>
                          <input
                            type="tel"
                            value={manualPhone}
                            onChange={(e) => setManualPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            placeholder="Phone number"
                            maxLength={10}
                            required
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-mono bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">Token Quantity</label>
                          <select
                            value={manualQuantity}
                            onChange={(e) => setManualQuantity(Number(e.target.value))}
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-bold bg-white"
                          >
                            {[1, 2, 3, 4, 5, 10, 20].map(n => (
                              <option key={n} value={n}>{n} Tokens (₹{n * 50})</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {manualError && (
                        <p className="text-xs text-red-600">{manualError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={manualSubmitting}
                        className="py-2 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        {manualSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>Save &amp; Generate Token Numbers</span>
                      </button>
                    </form>
                  )}

                  {/* Tokens Table */}
                  <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-700 uppercase font-bold text-[10px] tracking-wider">
                          <tr>
                            <th className="py-3 px-3.5">Token Numbers</th>
                            <th className="py-3 px-3.5">Devotee Name</th>
                            <th className="py-3 px-3.5">Contact Number</th>
                            <th className="py-3 px-3.5">Amount</th>
                            <th className="py-3 px-3.5">Payment / UTR</th>
                            <th className="py-3 px-3.5">Status</th>
                            <th className="py-3 px-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {filteredTokens.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-stone-400">
                                {tokenSearch ? "No matching tokens found." : "No online token bookings yet. Booked tokens from the site will appear here."}
                              </td>
                            </tr>
                          ) : (
                            filteredTokens.map((token) => (
                              <tr key={token.id} className="hover:bg-amber-50/40 transition-colors">
                                <td className="py-3 px-3.5">
                                  <div className="flex flex-wrap gap-1">
                                    {token.tokenNumbers.map(n => (
                                      <span key={n} className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-950 font-mono font-black text-[11px] border border-amber-300">
                                        {n}
                                      </span>
                                    ))}
                                  </div>
                                </td>

                                <td className="py-3 px-3.5 font-bold text-stone-900">
                                  {token.name}
                                </td>

                                <td className="py-3 px-3.5 font-mono text-stone-700">
                                  <a 
                                    href={`https://wa.me/91${token.phone}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-emerald-700 flex items-center gap-1"
                                  >
                                    <Phone className="w-3 h-3 text-stone-400" />
                                    <span>+91 {token.phone}</span>
                                  </a>
                                </td>

                                <td className="py-3 px-3.5">
                                  <span className="font-bold text-stone-900 font-mono">₹{token.totalAmount}</span>
                                  <span className="text-[10px] text-stone-500 block">({token.quantity} Qty)</span>
                                </td>

                                <td className="py-3 px-3.5">
                                  <span className="text-[11px] text-stone-600 font-mono block">
                                    {token.upiId}
                                  </span>
                                  {token.utrNumber && (
                                    <span className="text-[10px] text-emerald-700 font-mono font-bold">
                                      UTR: {token.utrNumber}
                                    </span>
                                  )}
                                </td>

                                <td className="py-3 px-3.5">
                                  <button
                                    onClick={() => handleToggleTokenStatus(token)}
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                                      token.status === 'verified'
                                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                                    }`}
                                  >
                                    {token.status === 'verified' ? '✓ Verified' : 'Confirmed'}
                                  </button>
                                </td>

                                <td className="py-3 px-3.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <a
                                      href={`https://wa.me/91${token.phone}?text=${encodeURIComponent(`Namaste ${token.name} garu, your tokens for Sri Siddhi Vinayaka Utsav 2026 (${token.tokenNumbers.join(', ')}) have been verified. Lucky Draw on 22 Sep 2026!`)}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                      title="Send WhatsApp Confirmation"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5" />
                                    </a>

                                    <button
                                      onClick={() => handleDeleteToken(token.id)}
                                      className="p-1 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB: POOJA & SANKALPAM REGISTRATIONS */}
              {activeTab === 'pooja' && (
                <div className="space-y-5">
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-red-50 to-amber-50 border border-red-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-red-900 uppercase">Total Pooja Sevas</span>
                        <Flame className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="font-heading font-black text-2xl text-amber-950 mt-1">
                        {poojaStats.totalBookings}
                      </div>
                      <span className="text-[11px] text-stone-500 font-medium">Registered Devotees</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-900 uppercase">Confirmed Sankalpam</span>
                        <UserCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="font-heading font-black text-2xl text-emerald-950 mt-1">
                        {poojaStats.confirmed}
                      </div>
                      <span className="text-[11px] text-emerald-700 font-medium">Ready for Pandit Ji</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-900 uppercase">Pending Review</span>
                        <Calendar className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="font-heading font-black text-2xl text-amber-950 mt-1">
                        {poojaStats.pending}
                      </div>
                      <span className="text-[11px] text-amber-800 font-medium">New registrations</span>
                    </div>
                  </div>

                  {/* Actions Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[260px]">
                      <div className="relative flex-1 min-w-[180px]">
                        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={poojaSearch}
                          onChange={(e) => setPoojaSearch(e.target.value)}
                          placeholder="Search surname, name, mobile, pooja..."
                          className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 bg-white"
                        />
                      </div>

                      <select
                        value={poojaDateFilter}
                        onChange={(e) => setPoojaDateFilter(e.target.value)}
                        className="py-1.5 px-3 rounded-xl border border-stone-300 text-xs bg-white text-stone-800 font-medium"
                      >
                        <option value="all">All Dates</option>
                        <option value="14 Sep 2026 (Day 1 - Vinayaka Chavithi)">14 Sep (Day 1)</option>
                        <option value="15 Sep 2026 (Day 2)">15 Sep (Day 2)</option>
                        <option value="16 Sep 2026 (Day 3)">16 Sep (Day 3)</option>
                        <option value="17 Sep 2026 (Day 4)">17 Sep (Day 4)</option>
                        <option value="18 Sep 2026 (Day 5)">18 Sep (Day 5)</option>
                        <option value="19 Sep 2026 (Day 6)">19 Sep (Day 6)</option>
                        <option value="20 Sep 2026 (Day 7)">20 Sep (Day 7)</option>
                        <option value="21 Sep 2026 (Day 8)">21 Sep (Day 8)</option>
                        <option value="22 Sep 2026 (Day 9 - Final Visarjan)">22 Sep (Day 9 Finale)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={fetchPoojaBookings}
                        className="p-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold flex items-center gap-1"
                        title="Refresh list"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${poojaLoading ? 'animate-spin' : ''}`} />
                      </button>

                      <a
                        href="/api/pooja-bookings/export"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-3 rounded-xl border border-amber-300 bg-amber-100/70 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-800" />
                        <span>Export Sankalpam List (CSV)</span>
                      </a>
                    </div>
                  </div>

                  {/* Devotees Pooja Table */}
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto max-h-[50vh]">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-700 uppercase font-bold text-[10px] tracking-wider sticky top-0 z-10">
                          <tr>
                            <th className="py-3 px-3.5">Booking No</th>
                            <th className="py-3 px-3.5">Name with Surname (ఇంటి పేరు)</th>
                            <th className="py-3 px-3.5">Gothram</th>
                            <th className="py-3 px-3.5">Pooja / Seva</th>
                            <th className="py-3 px-3.5">Date</th>
                            <th className="py-3 px-3.5">Contact</th>
                            <th className="py-3 px-3.5">Status</th>
                            <th className="py-3 px-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {filteredPooja.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="py-8 text-center text-stone-400">
                                {poojaSearch ? "No matching Pooja registrations found." : "No Pooja registrations yet. Devotees registering via the site will appear here."}
                              </td>
                            </tr>
                          ) : (
                            filteredPooja.map((p) => (
                              <tr key={p.id} className="hover:bg-amber-50/40 transition-colors">
                                <td className="py-3 px-3.5 font-mono font-bold text-amber-900">
                                  {p.bookingNumber}
                                </td>

                                <td className="py-3 px-3.5 font-bold text-stone-900">
                                  <div>{p.nameWithSurname}</div>
                                  {p.familyMembers && (
                                    <div className="text-[10px] text-stone-500 font-normal mt-0.5">
                                      Family: {p.familyMembers}
                                    </div>
                                  )}
                                </td>

                                <td className="py-3 px-3.5 font-medium text-stone-700">
                                  {p.gothram || <span className="text-stone-400 italic">Shiva Gotram</span>}
                                </td>

                                <td className="py-3 px-3.5 font-semibold text-amber-950">
                                  {p.poojaType}
                                </td>

                                <td className="py-3 px-3.5 text-stone-700 font-medium whitespace-nowrap">
                                  {p.poojaDate}
                                </td>

                                <td className="py-3 px-3.5 font-mono text-stone-700">
                                  <a 
                                    href={`https://wa.me/91${p.phone}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-emerald-700 flex items-center gap-1"
                                  >
                                    <Phone className="w-3 h-3 text-stone-400" />
                                    <span>+91 {p.phone}</span>
                                  </a>
                                </td>

                                <td className="py-3 px-3.5">
                                  <button
                                    onClick={() => handleTogglePoojaStatus(p)}
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer border ${
                                      p.status === 'confirmed'
                                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                        : p.status === 'completed'
                                        ? 'bg-blue-100 text-blue-800 border-blue-300'
                                        : 'bg-amber-100 text-amber-800 border-amber-300'
                                    }`}
                                    title="Click to toggle status"
                                  >
                                    {p.status}
                                  </button>
                                </td>

                                <td className="py-3 px-3.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <a
                                      href={`https://wa.me/91${p.phone}?text=${encodeURIComponent(
                                        `Namaste ${p.nameWithSurname} garu! Your Pooja Sankalpam (${p.poojaType}) for Sri Siddhi Vinayaka Utsav on ${p.poojaDate} is confirmed. Booking No: ${p.bookingNumber}. May Lord Ganesha bless you!`
                                      )}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                      title="Send WhatsApp Confirmation to Devotee"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5" />
                                    </a>

                                    <button
                                      onClick={() => handleDeletePooja(p.id)}
                                      className="p-1 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB: MEDIA WALL MANAGEMENT & MODERATION */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  {/* Top Stats & Export */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                      <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                        Total Uploads
                      </span>
                      <span className="font-heading font-black text-2xl sm:text-3xl text-amber-950">
                        {adminMediaList.length}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                      <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                        Photos Live
                      </span>
                      <span className="font-heading font-black text-2xl sm:text-3xl text-emerald-950">
                        {adminMediaList.filter(m => m.type === 'image').length}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
                      <span className="text-[11px] font-bold text-red-900 uppercase tracking-wider block">
                        Videos Live
                      </span>
                      <span className="font-heading font-black text-2xl sm:text-3xl text-red-950">
                        {adminMediaList.filter(m => m.type === 'video').length}
                      </span>
                    </div>
                  </div>

                  {/* Actions & Search */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={mediaSearch}
                        onChange={(e) => setMediaSearch(e.target.value)}
                        placeholder="Search media by title, devotee name, category..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 bg-stone-50"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={fetchAdminMedia}
                        className="p-2 rounded-xl border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                        title="Refresh Media List"
                      >
                        <RefreshCw className={`w-4 h-4 ${mediaLoading ? 'animate-spin' : ''}`} />
                      </button>

                      <a
                        href="/api/media/export"
                        download="festival-media.csv"
                        className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </a>
                    </div>
                  </div>

                  {/* Media Grid / Table */}
                  {mediaLoading && adminMediaList.length === 0 ? (
                    <div className="text-center py-12">
                      <RefreshCw className="w-8 h-8 text-amber-600 animate-spin mx-auto mb-2" />
                      <p className="text-xs text-stone-500 font-semibold">Loading media items...</p>
                    </div>
                  ) : adminMediaList.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-stone-50 border-2 border-dashed border-stone-300 text-center space-y-2">
                      <ImageIcon className="w-8 h-8 text-stone-400 mx-auto" />
                      <p className="text-sm font-bold text-stone-700">No media uploaded yet</p>
                      <p className="text-xs text-stone-500">Devotees will upload festival photos and videos via the public gallery.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {adminMediaList
                        .filter(m => {
                          if (!mediaSearch.trim()) return true;
                          const q = mediaSearch.toLowerCase();
                          return (
                            m.title.toLowerCase().includes(q) ||
                            m.uploadedBy.toLowerCase().includes(q) ||
                            (m.description || '').toLowerCase().includes(q) ||
                            m.category.toLowerCase().includes(q)
                          );
                        })
                        .map(item => (
                          <div
                            key={item.id}
                            className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 shadow-sm flex gap-3 items-start"
                          >
                            {/* Thumbnail */}
                            <div className="w-24 h-24 rounded-xl bg-stone-900 overflow-hidden relative shrink-0">
                              <img
                                src={item.type === 'video' ? (item.thumbnailUrl || item.url) : item.url}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-black/80 text-white">
                                {item.type}
                              </span>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-start justify-between gap-1">
                                <h5 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                                  {item.title}
                                </h5>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase shrink-0 ${
                                  item.status === 'approved'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {item.status}
                                </span>
                              </div>

                              <p className="text-[11px] text-stone-600 truncate">
                                By: <strong>{item.uploadedBy}</strong> ({item.category})
                              </p>

                              <p className="text-[10px] text-stone-400">
                                {new Date(item.uploadedAt || item.createdAt || Date.now()).toLocaleDateString()} • {item.likesCount || 0} ❤️
                              </p>

                              {/* Action Buttons */}
                              <div className="pt-2 flex items-center gap-2">
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-white border border-stone-300 text-stone-700 hover:text-amber-700 text-[11px] font-semibold flex items-center gap-1"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span>View</span>
                                </a>

                                <button
                                  onClick={() => handleToggleMediaStatus(item)}
                                  className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                                    item.status === 'approved'
                                      ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                                      : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                                  }`}
                                >
                                  {item.status === 'approved' ? 'Mark Pending' : 'Approve'}
                                </button>

                                <button
                                  onClick={() => handleDeleteMedia(item.id)}
                                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors ml-auto cursor-pointer"
                                  title="Delete Media"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 1: WHATSAPP GROUP LINK */}
              {activeTab === 'whatsapp' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-emerald-950 text-sm">
                          Official WhatsApp Group Invite Link
                        </h4>
                        <p className="text-xs text-emerald-800 leading-relaxed">
                          This URL powers the <strong>"Join bennur_galligang Community"</strong> cards, direct click buttons, and the on-screen QR Code.
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSaveWhatsApp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        WhatsApp Group Invite URL
                      </label>
                      <input
                        type="url"
                        value={whatsAppGroupLink}
                        onChange={(e) => setWhatsAppGroupLink(e.target.value)}
                        placeholder="https://chat.whatsapp.com/invite/..."
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50 font-mono text-sm text-stone-900"
                      />
                      <p className="text-[11px] text-stone-500 mt-1">
                        Paste your group link from WhatsApp (Group Info &gt; Invite to Group via Link &gt; Copy link).
                      </p>
                    </div>

                    {whatsAppSuccess && (
                      <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>WhatsApp link updated and saved successfully!</span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={savingWhatsApp}
                        className="py-2.5 px-6 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        {savingWhatsApp ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        <span>Save WhatsApp Link</span>
                      </button>

                      <a
                        href={whatsAppGroupLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-xs font-bold text-stone-700 flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                        <span>Test Group Link</span>
                      </a>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: 14-22 SEP FESTIVAL DATES & DETAILS */}
              {activeTab === 'festival' && (
                <form onSubmit={handleSaveFestival} className="space-y-5">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-amber-950 text-sm">
                          9-Day Utsav Dates &amp; Lucky Draw Settings
                        </h4>
                        <p className="text-xs text-amber-800">
                          Configure festival start (14 Sep), final day &amp; lucky draw (22 Sep), token price (₹50), and colony details.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Event Title
                      </label>
                      <input
                        type="text"
                        value={festivalForm.eventTitle}
                        onChange={(e) => setFestivalForm({ ...festivalForm, eventTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Colony &amp; Area
                      </label>
                      <input
                        type="text"
                        value={festivalForm.colonyName}
                        onChange={(e) => setFestivalForm({ ...festivalForm, colonyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Day 1 Start Date &amp; Pooja Time
                      </label>
                      <input
                        type="text"
                        value={festivalForm.eventStartDisplay}
                        onChange={(e) => setFestivalForm({ ...festivalForm, eventStartDisplay: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500 font-medium"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Day 9 Finale &amp; Lucky Draw Date
                      </label>
                      <input
                        type="text"
                        value={festivalForm.luckyDrawDate}
                        onChange={(e) => setFestivalForm({ ...festivalForm, luckyDrawDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500 font-medium"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Lucky Draw Token Price (₹)
                      </label>
                      <input
                        type="number"
                        value={festivalForm.luckyDrawTokenPrice}
                        onChange={(e) => setFestivalForm({ ...festivalForm, luckyDrawTokenPrice: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500 font-mono font-bold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Special Prize Description
                      </label>
                      <input
                        type="text"
                        value={festivalForm.specialPrize}
                        onChange={(e) => setFestivalForm({ ...festivalForm, specialPrize: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Venue Address
                      </label>
                      <input
                        type="text"
                        value={festivalForm.venueAddress}
                        onChange={(e) => setFestivalForm({ ...festivalForm, venueAddress: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>

                  {festivalSuccess && (
                    <div className="p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-700" />
                      <span>Festival details updated and saved successfully!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={savingFestival}
                    className="py-2.5 px-6 rounded-xl font-bold text-white bg-amber-700 hover:bg-amber-800 shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    {savingFestival ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>Save Festival Details</span>
                  </button>
                </form>
              )}

              {/* TAB 3: PASSWORD & SECURITY */}
              {activeTab === 'password' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                    <div className="flex items-start gap-3">
                      <KeyRound className="w-6 h-6 text-purple-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-purple-950 text-sm">
                          Admin Security &amp; Password Management
                        </h4>
                        <p className="text-xs text-purple-800">
                          Account: <strong>{adminEmail}</strong> &bull; Default Password: <code className="font-mono bg-purple-200/80 px-1.5 py-0.5 rounded">bennur2026</code>
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleChangePassword} className="max-w-md space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password..."
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-purple-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password..."
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-purple-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-type new password..."
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-purple-500 font-mono"
                      />
                    </div>

                    {passwordMsg && (
                      <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        passwordMsg.type === 'success'
                          ? 'bg-emerald-100 border border-emerald-300 text-emerald-900'
                          : 'bg-red-100 border border-red-300 text-red-900'
                      }`}>
                        {passwordMsg.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-700" />
                        )}
                        <span>{passwordMsg.text}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={changingPassword}
                      className="py-2.5 px-6 rounded-xl font-bold text-white bg-purple-700 hover:bg-purple-800 shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      {changingPassword ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                      <span>Update Password</span>
                    </button>
                  </form>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
