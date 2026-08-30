import React, { useState, useEffect, useRef } from 'react';
import { 
  Image as ImageIcon, Video, Upload, Heart, Share2, 
  Play, Pause, Sparkles, Filter, Search, RefreshCw, X, Download, 
  ExternalLink, Calendar, User, Eye, Flame, CheckCircle, Tag,
  LayoutGrid, Grid2X2, List, MonitorPlay, ChevronLeft, ChevronRight,
  TrendingUp, Award, BarChart3, Maximize2
} from 'lucide-react';
import { DiyaIcon, GaneshaIcon } from './FestiveIcons';
import { AddMediaModal } from './AddMediaModal';
import { MediaItem, FestivalConfig } from '../types';

interface PublicMediaSectionProps {
  config: FestivalConfig;
}

export function PublicMediaSection({ config }: PublicMediaSectionProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'image' | 'video' | '2026' | '2025'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'feed'>('grid');
  
  // Modal & Slideshow states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<MediaItem | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<MediaItem | null>(null);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(true);
  const [slideshowIntervalSec, setSlideshowIntervalSec] = useState(4);

  // Local likes tracking
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        setMediaList(data.media || []);
      }
    } catch (err) {
      console.error("Failed to fetch media:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleMediaAdded = (newItem: MediaItem) => {
    setMediaList(prev => [newItem, ...prev]);
  };

  const handleLike = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedIds[id]) return;

    // Optimistic UI update
    setLikedIds(prev => ({ ...prev, [id]: true }));
    setMediaList(prev => prev.map(m => m.id === id ? { ...m, likesCount: (m.likesCount || 0) + 1 } : m));

    try {
      await fetch(`/api/media/${id}/like`, { method: 'POST' });
    } catch (err) {
      console.error("Failed to like:", err);
    }
  };

  const handleShareWhatsApp = (item: MediaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `🕉️ Sri Siddhi Vinayaka Utsav 2026 (B-Phase Colony, Bennur) 🕉️\n\n📸 *${item.title}*\nUploaded by: ${item.uploadedBy}\n\nView festival photos & videos dashboard:\n${window.location.origin}/#media-dashboard`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Filtering
  const filteredMedia = mediaList.filter(item => {
    // Type/Year Tab Filter
    if (activeTab === 'image' && item.type !== 'image') return false;
    if (activeTab === 'video' && item.type !== 'video') return false;
    if (activeTab === '2026' && item.eventYear !== '2026') return false;
    if (activeTab === '2025' && item.eventYear !== '2025') return false;

    // Category Filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = item.title.toLowerCase().includes(q);
      const matchesUploader = item.uploadedBy.toLowerCase().includes(q);
      const matchesDesc = (item.description || '').toLowerCase().includes(q);
      const matchesCategory = item.category.toLowerCase().includes(q);
      if (!matchesTitle && !matchesUploader && !matchesDesc && !matchesCategory) return false;
    }

    return true;
  });

  const photoCount = mediaList.filter(m => m.type === 'image').length;
  const videoCount = mediaList.filter(m => m.type === 'video').length;
  const totalLikes = mediaList.reduce((acc, m) => acc + (m.likesCount || 0), 0);
  const liveCount = mediaList.filter(m => m.eventYear === '2026').length;

  // Auto Slideshow Timer Effect
  useEffect(() => {
    if (!isSlideshowOpen || !isSlideshowPlaying || filteredMedia.length === 0) return;

    const timer = setInterval(() => {
      setSlideshowIndex(prev => (prev + 1) % filteredMedia.length);
    }, slideshowIntervalSec * 1000);

    return () => clearInterval(timer);
  }, [isSlideshowOpen, isSlideshowPlaying, slideshowIntervalSec, filteredMedia.length]);

  const startSlideshow = () => {
    if (filteredMedia.length === 0) return;
    setSlideshowIndex(0);
    setIsSlideshowPlaying(true);
    setIsSlideshowOpen(true);
  };

  return (
    <section 
      id="media-dashboard" 
      className="py-12 sm:py-16 bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#FFFDF9] border-t border-amber-200/70 relative scroll-mt-16"
    >
      {/* Anchor helper tags */}
      <span id="media-gallery" className="absolute -top-20" />
      <span id="media-wall" className="absolute -top-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* DASHBOARD HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-black shadow-sm">
            <DiyaIcon className="w-4 h-4 text-amber-700" />
            <span>FESTIVAL MEDIA DASHBOARD • ఫోటో &amp; వీడియో డ్యాష్‌బోర్డ్</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-4xl text-amber-950 tracking-tight">
            Festival Photos &amp; Videos Dashboard
          </h2>
          
          <p className="text-sm sm:text-base text-stone-700 font-medium">
            Live Devotee Wall • Instant Easy Uploads • Fullscreen Pandal Slideshow
          </p>

          {/* Prominent Action Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-amber-300"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Photos / Videos (అప్‌లోడ్ చేయండి)</span>
            </button>

            {filteredMedia.length > 0 && (
              <button
                onClick={startSlideshow}
                className="py-3 px-5 rounded-2xl bg-stone-900 hover:bg-black text-amber-300 font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer border border-amber-500/40 hover:scale-105 transition-all"
              >
                <MonitorPlay className="w-4 h-4 text-amber-400" />
                <span>Pandal Slideshow View (స్లైడ్‌షో)</span>
              </button>
            )}

            <a
              href={config.instagramUrl || "https://instagram.com/bennur_galligang"}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-2xl bg-white hover:bg-stone-50 text-pink-700 border border-pink-200 font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
            >
              <span>{config.instagramHandle || "@bennur_galligang"}</span>
              <ExternalLink className="w-3.5 h-3.5 text-pink-500" />
            </a>
          </div>
        </div>

        {/* DASHBOARD STATS METRICS BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-stone-500">Total Uploads</div>
              <div className="text-xl font-heading font-black text-amber-950">{mediaList.length}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center shrink-0">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-stone-500">Photos</div>
              <div className="text-xl font-heading font-black text-orange-950">{photoCount}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-stone-500">Videos &amp; Reels</div>
              <div className="text-xl font-heading font-black text-red-950">{videoCount}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 fill-rose-600 text-rose-600" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-stone-500">Devotee Cheers</div>
              <div className="text-xl font-heading font-black text-rose-950">{totalLikes} ❤️</div>
            </div>
          </div>
        </div>

        {/* DASHBOARD CONTROLS & FILTER BAR */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-2 border-amber-200 shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Primary Tab Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-amber-500 text-white shadow-sm font-black'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All Media ({mediaList.length})
              </button>

              <button
                onClick={() => setActiveTab('image')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'image'
                    ? 'bg-amber-500 text-white shadow-sm font-black'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photos ({photoCount})</span>
              </button>

              <button
                onClick={() => setActiveTab('video')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'video'
                    ? 'bg-red-600 text-white shadow-sm font-black'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Videos ({videoCount})</span>
              </button>

              <button
                onClick={() => setActiveTab('2026')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === '2026'
                    ? 'bg-emerald-600 text-white shadow-sm font-black'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                2026 Utsav Live ({liveCount})
              </button>

              <button
                onClick={() => setActiveTab('2025')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === '2025'
                    ? 'bg-stone-800 text-white shadow-sm font-black'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                2025 Highlights
              </button>
            </div>

            {/* View Mode Switcher + Search */}
            <div className="flex items-center gap-2">
              
              {/* View Layout Selector */}
              <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-amber-950 shadow-xs font-bold' : 'text-stone-500 hover:text-stone-900'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    viewMode === 'masonry' ? 'bg-white text-amber-950 shadow-xs font-bold' : 'text-stone-500 hover:text-stone-900'
                  }`}
                  title="Masonry Wall"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('feed')}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    viewMode === 'feed' ? 'bg-white text-amber-950 shadow-xs font-bold' : 'text-stone-500 hover:text-stone-900'
                  }`}
                  title="Feed List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 md:w-56">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 bg-stone-50 text-stone-900 placeholder:text-stone-400 outline-none"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={fetchMedia}
                className="p-2 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 cursor-pointer"
                title="Refresh Media Dashboard"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

          </div>

          {/* Secondary Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 scrollbar-none text-[11px]">
            <span className="font-bold text-stone-500 flex items-center gap-1 uppercase tracking-wider text-[10px] pl-1 shrink-0">
              <Tag className="w-3 h-3 text-amber-600" />
              <span>Category:</span>
            </span>

            {[
              { id: 'all', label: 'All Categories' },
              { id: 'idol', label: '🪔 Ganesh Idol' },
              { id: 'pooja', label: '🌺 Pooja & Harathi' },
              { id: 'cultural', label: '🥁 Dhol Tasha & Dance' },
              { id: 'annadanam', label: '🍲 Annadanam' },
              { id: 'laddu', label: '🏆 Laddu & Draw' },
              { id: 'procession', label: '🌊 Visarjan' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-100 text-amber-950 border border-amber-300 font-bold'
                    : 'bg-stone-50 text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* MEDIA DISPLAY AREA */}
        {loading && mediaList.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
            <p className="text-xs text-stone-600 font-semibold">Loading Utsav Photos &amp; Videos...</p>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-dashed border-amber-300 max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center shadow-inner">
              <ImageIcon className="w-8 h-8 text-amber-700" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-heading font-black text-lg sm:text-xl text-amber-950">
                {searchQuery ? "No matching photos or videos found" : "No Festival Photos Uploaded Yet"}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {searchQuery 
                  ? "Try clearing your search query or selecting a different category." 
                  : "Be the first devotee or colony member to upload Lord Ganesha photos, Pooja Harathi clips, or Dhol Tasha videos!"}
              </p>
              <p className="text-[11px] text-amber-800 font-semibold">
                (ఫోటోలు మరియు వీడియోలను ఇప్పుడే అప్‌లోడ్ చేయండి)
              </p>
            </div>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload First Photo / Video</span>
              </button>
            </div>
          </div>
        ) : viewMode === 'feed' ? (
          /* FEED / LIST VIEW */
          <div className="space-y-4 max-w-3xl mx-auto">
            {filteredMedia.map((item) => {
              const isLiked = likedIds[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-amber-200/90 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start hover:shadow-md transition-shadow"
                >
                  <div 
                    onClick={() => item.type === 'video' ? setActiveVideoModal(item) : setActiveLightbox(item)}
                    className="relative w-full sm:w-44 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-stone-900 shrink-0 cursor-pointer group"
                  >
                    <img
                      src={item.type === 'video' ? (item.thumbnailUrl || item.url) : item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-black/80 text-white">
                      {item.type}
                    </span>
                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between h-full space-y-2 w-full">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap text-[11px] text-stone-500 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold uppercase text-[9px]">
                          {item.category}
                        </span>
                        <span>•</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Uploaded by: <strong className="text-stone-800">{item.uploadedBy}</strong></span>
                      </div>

                      <h3 
                        onClick={() => item.type === 'video' ? setActiveVideoModal(item) : setActiveLightbox(item)}
                        className="font-heading font-black text-base sm:text-lg text-amber-950 hover:text-amber-700 cursor-pointer"
                      >
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleLike(item.id, e)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isLiked
                              ? 'bg-red-50 text-red-600 border border-red-200'
                              : 'bg-stone-100 hover:bg-red-50 text-stone-600 hover:text-red-600'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-600 text-red-600' : ''}`} />
                          <span>{item.likesCount || 0}</span>
                        </button>

                        <button
                          onClick={(e) => handleShareWhatsApp(item, e)}
                          className="px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>
                      </div>

                      <button
                        onClick={() => item.type === 'video' ? setActiveVideoModal(item) : setActiveLightbox(item)}
                        className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Full {item.type}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* GRID & MASONRY CARD VIEW */
          <div className={viewMode === 'masonry' ? "columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"}>
            {filteredMedia.map((item) => {
              const isLiked = likedIds[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.type === 'video') {
                      setActiveVideoModal(item);
                    } else {
                      setActiveLightbox(item);
                    }
                  }}
                  className="bg-white rounded-3xl border border-amber-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer transform hover:-translate-y-1 break-inside-avoid"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden">
                    <img
                      src={item.type === 'video' ? (item.thumbnailUrl || item.url) : item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 backdrop-blur-md ${
                        item.type === 'video' 
                          ? 'bg-red-600/90 text-white' 
                          : 'bg-black/70 text-amber-200'
                      }`}>
                        {item.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                        <span>{item.type === 'video' ? 'Video' : 'Photo'}</span>
                      </span>

                      {item.eventYear === '2026' && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-400 text-amber-950 shadow-sm">
                          2026 Live
                        </span>
                      )}
                    </div>

                    {/* Video Play Icon Overlay */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* View full photo overlay */}
                    {item.type === 'image' && (
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Full Photo</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-amber-950 line-clamp-1 group-hover:text-amber-700 transition-colors">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Metadata & Actions */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-600 truncate">
                        <User className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate font-semibold text-stone-800" title={item.uploadedBy}>
                          {item.uploadedBy}
                        </span>
                      </div>

                      {/* Interaction Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleLike(item.id, e)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isLiked
                              ? 'bg-red-50 text-red-600 border border-red-200'
                              : 'bg-stone-100 hover:bg-red-50 text-stone-600 hover:text-red-600'
                          }`}
                          title="Like / Bless"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-600 text-red-600' : ''}`} />
                          <span>{item.likesCount || 0}</span>
                        </button>

                        <button
                          onClick={(e) => handleShareWhatsApp(item, e)}
                          className="p-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                          title="Share to WhatsApp"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* 1. ADD MEDIA MODAL */}
      <AddMediaModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onMediaAdded={handleMediaAdded}
      />

      {/* 2. FULLSCREEN PANDAL SLIDESHOW PLAYER */}
      {isSlideshowOpen && filteredMedia.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-between p-4 sm:p-6 text-white animate-in fade-in duration-200">
          
          {/* Slideshow Top Controls */}
          <div className="w-full max-w-6xl flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5">
                <MonitorPlay className="w-3.5 h-3.5" />
                <span>PANDAL SLIDESHOW MODE</span>
              </div>
              <span className="text-xs text-stone-400">
                {slideshowIndex + 1} of {filteredMedia.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Interval selector */}
              <div className="flex items-center gap-1 text-xs text-stone-400 bg-white/10 px-2.5 py-1 rounded-xl">
                <span>Speed:</span>
                {[3, 5, 8].map(sec => (
                  <button
                    key={sec}
                    onClick={() => setSlideshowIntervalSec(sec)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                      slideshowIntervalSec === sec ? 'bg-amber-500 text-white' : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>

              {/* Play / Pause */}
              <button
                onClick={() => setIsSlideshowPlaying(!isSlideshowPlaying)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                title={isSlideshowPlaying ? "Pause" : "Play"}
              >
                {isSlideshowPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              {/* Close */}
              <button
                onClick={() => setIsSlideshowOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-red-600 text-white cursor-pointer transition-colors"
                title="Exit Slideshow"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Current Slide Display */}
          <div className="flex-1 w-full max-w-5xl flex items-center justify-center relative p-2 sm:p-6 overflow-hidden">
            {/* Prev Button */}
            <button
              onClick={() => setSlideshowIndex(prev => (prev - 1 + filteredMedia.length) % filteredMedia.length)}
              className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-amber-600 text-white transition-colors cursor-pointer"
              title="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slide Media */}
            {filteredMedia[slideshowIndex] && (
              <div className="relative max-h-[70vh] flex flex-col items-center justify-center">
                {filteredMedia[slideshowIndex].type === 'video' ? (
                  <div className="aspect-video max-h-[65vh] w-auto max-w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
                    {filteredMedia[slideshowIndex].videoId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${filteredMedia[slideshowIndex].videoId}?autoplay=1&rel=0`}
                        title={filteredMedia[slideshowIndex].title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={filteredMedia[slideshowIndex].url}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                ) : (
                  <img
                    src={filteredMedia[slideshowIndex].url}
                    alt={filteredMedia[slideshowIndex].title}
                    className="max-h-[65vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
                  />
                )}
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={() => setSlideshowIndex(prev => (prev + 1) % filteredMedia.length)}
              className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-amber-600 text-white transition-colors cursor-pointer"
              title="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Slideshow Bottom Info */}
          {filteredMedia[slideshowIndex] && (
            <div className="w-full max-w-3xl text-center space-y-1 bg-white/5 border border-white/10 p-4 rounded-2xl">
              <h3 className="font-heading font-black text-lg sm:text-xl text-amber-300">
                {filteredMedia[slideshowIndex].title}
              </h3>
              <p className="text-xs text-stone-300">
                Uploaded by: <strong className="text-amber-200">{filteredMedia[slideshowIndex].uploadedBy}</strong> • Category: {filteredMedia[slideshowIndex].category} • {filteredMedia[slideshowIndex].eventYear} Utsav
              </p>
            </div>
          )}

        </div>
      )}

      {/* 3. FULLSCREEN PHOTO LIGHTBOX */}
      {activeLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveLightbox(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-stone-900/90 border-b border-white/10 text-white flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-amber-300">
                  {activeLightbox.title}
                </h3>
                <span className="text-xs text-stone-400">
                  Photo by: <strong className="text-white">{activeLightbox.uploadedBy}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleShareWhatsApp(activeLightbox, e)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>

                <a
                  href={activeLightbox.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  title="Open Full Image"
                >
                  <Download className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setActiveLightbox(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-2 sm:p-4 flex items-center justify-center bg-black/60">
              <img
                src={activeLightbox.url}
                alt={activeLightbox.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
              />
            </div>

            {activeLightbox.description && (
              <div className="p-3 sm:p-4 bg-stone-900 border-t border-white/10 text-xs text-stone-300 text-center">
                {activeLightbox.description}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. RESPONSIVE VIDEO PLAYER MODAL */}
      {activeVideoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveVideoModal(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-stone-900 border-b border-white/10 text-white flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-amber-300">
                  {activeVideoModal.title}
                </h3>
                <span className="text-xs text-stone-400">
                  Video by: <strong className="text-white">{activeVideoModal.uploadedBy}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleShareWhatsApp(activeVideoModal, e)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </button>

                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                  title="Close Video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="aspect-video w-full bg-black">
              {activeVideoModal.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoModal.videoId}?autoplay=1&rel=0`}
                  title={activeVideoModal.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : activeVideoModal.url.includes('instagram.com') ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white space-y-3 bg-stone-950">
                  <Video className="w-12 h-12 text-pink-500 animate-pulse" />
                  <p className="text-sm font-bold">Instagram Reel / Video Clip</p>
                  <a
                    href={activeVideoModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <span>Watch on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <video
                  src={activeVideoModal.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {activeVideoModal.description && (
              <div className="p-4 bg-stone-900 border-t border-white/10 text-xs text-stone-300">
                {activeVideoModal.description}
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
