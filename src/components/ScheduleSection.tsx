import React, { useState } from 'react';
import { Calendar, Clock, Sparkles, Music, Gift, Bell, Check, Copy, Flame, Search, Filter } from 'lucide-react';
import { SCHEDULE_DATA } from '../data/festivalData';
import { DaySchedule, ScheduleItem } from '../types';
import { DiyaIcon, KalashIcon, ModakIcon, RangoliBorder } from './FestiveIcons';

export function ScheduleSection() {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedDay, setCopiedDay] = useState<string | null>(null);

  const getCategoryBadge = (category: ScheduleItem['category']) => {
    switch (category) {
      case 'ritual':
        return { bg: 'bg-red-100 text-red-800 border-red-200', label: 'Vedic Ritual' };
      case 'aarti':
        return { bg: 'bg-amber-100 text-amber-900 border-amber-200', label: 'Maha Aarti' };
      case 'cultural':
        return { bg: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Bhajans & Cultural' };
      case 'prasadam':
        return { bg: 'bg-orange-100 text-orange-900 border-orange-200', label: 'Mahaprasadam / Annadanam' };
      case 'luckydraw':
        return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: '₹50 Lucky Draw' };
      case 'procession':
        return { bg: 'bg-red-100 text-red-900 border-red-300 font-bold', label: 'గణేష్ నిమజ్జనం (Ganesh Nimarjanam)' };
      default:
        return { bg: 'bg-stone-100 text-stone-700 border-stone-200', label: 'Program' };
    }
  };

  const renderIcon = (iconType?: ScheduleItem['iconType'], highlight?: boolean) => {
    const baseClass = highlight ? 'w-5 h-5 text-red-600' : 'w-5 h-5 text-amber-600';
    switch (iconType) {
      case 'kalash':
        return <KalashIcon className={baseClass} />;
      case 'modak':
        return <ModakIcon className={baseClass} />;
      case 'diya':
        return <DiyaIcon className={baseClass} glow={false} />;
      case 'bell':
        return <Bell className={baseClass} />;
      case 'music':
        return <Music className={baseClass} />;
      case 'trophy':
        return <Gift className={baseClass} />;
      case 'visarjan':
        return <Flame className={baseClass} />;
      default:
        return <Sparkles className={baseClass} />;
    }
  };

  // Filter logic
  const filteredDays = SCHEDULE_DATA.map(day => {
    // If specific day selected, filter out non-matching days
    if (selectedTab !== 'all' && day.id !== selectedTab) {
      return null;
    }

    // Filter items by category & search query
    const matchingItems = day.items.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery = !searchQuery.trim() || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        day.dateStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        day.dayName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });

    if (matchingItems.length === 0 && (selectedCategory !== 'all' || searchQuery.trim())) {
      return null;
    }

    return {
      ...day,
      items: matchingItems
    };
  }).filter((day): day is DaySchedule => day !== null);

  const handleCopySchedule = (day: DaySchedule) => {
    let text = `🚩 *Sri Siddhi Vinayaka Utsav 2026*\n🏛️ *bennur_galligang Presents*\n📍 *B-Phase Colony, Bennur*\n📅 *${day.dateStr}* (${day.dayName})\n🔖 *${day.badge || ''}*\n\n`;
    day.items.forEach(item => {
      text += `⏰ *${item.time}*: ${item.title}\n`;
      if (item.description) text += `   _${item.description}_\n`;
    });
    text += `\n🌺 *Ganpati Bappa Morya!* All residents are warmly welcome!`;

    navigator.clipboard.writeText(text);
    setCopiedDay(day.id);
    setTimeout(() => setCopiedDay(null), 2500);
  };

  const handleCopyAll = () => {
    let text = `🚩 *SRI SIDDHI VINAYAKA UTSAV 2026 - 9 DAYS SCHEDULE*\n🏛️ *bennur_galligang Presents*\n📍 B-Phase Colony, Bennur (NARSAIAH NILAYAM)\n📅 *Start Date: 14 September 2026 (9 Days Count)*\n\n`;
    SCHEDULE_DATA.forEach(day => {
      text += `━━━━━━━━━━━━━━━━━━━━━\n📅 *${day.dateStr}* - ${day.dayName}\n🏷️ ${day.badge || ''}\n`;
      day.items.forEach(item => {
        text += `• ${item.time} - ${item.title}\n`;
      });
      text += `\n`;
    });
    text += `🎟️ *Lucky Draw Token:* ₹50 (Children’s Bicycle Prize!)\n🏆 *Prize Opening & Ganesh Nimarjanam:* 22 September 2026 (Final Day)\n🌺 *Organized with devotion by bennur_galligang*`;

    navigator.clipboard.writeText(text);
    setCopiedDay('all');
    setTimeout(() => setCopiedDay(null), 2500);
  };

  return (
    <section id="schedule" className="py-14 bg-[#FFFDF8] border-b border-amber-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-bold text-amber-900 uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5 text-red-600" />
            <span>9 Days Ganesh Festival Schedule</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-amber-950">
            9 Days Event Schedule & Timings
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Presented by <strong className="text-amber-900 font-bold">bennur_galligang</strong> at B-Phase Colony, Bennur. Explore all 9 days of daily Vedic rituals, Aartis, Bhajans, Annadanam, and the Grand Ganesh Nimarjanam.
          </p>

          <div className="pt-1">
            <RangoliBorder />
          </div>
        </div>

        {/* 9-Day Selector Strip */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <span>🗓️ 9 Days of Count:</span>
              <span className="text-stone-500 font-normal">(Starting 14 September 2026)</span>
            </span>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
              Day 1 Sthapana ➜ Day 9 Nimarjanam
            </span>
          </div>

          {/* Grid of 9 Days + All */}
          <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-2xl bg-amber-100/70 border border-amber-200">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedTab === 'all'
                  ? 'bg-amber-800 text-white shadow'
                  : 'text-amber-900 hover:bg-amber-200/70'
              }`}
            >
              ✨ All 9 Days
            </button>

            {[
              { id: 'day-1', num: '1', date: '14 Sep', label: 'Sthapana' },
              { id: 'day-2', num: '2', date: '15 Sep', label: 'Puja' },
              { id: 'day-3', num: '3', date: '16 Sep', label: 'Archana' },
              { id: 'day-4', num: '4', date: '17 Sep', label: 'Homam' },
              { id: 'day-5', num: '5', date: '18 Sep', label: 'Cultural' },
              { id: 'day-6', num: '6', date: '19 Sep', label: 'Deepotsav' },
              { id: 'day-7', num: '7', date: '20 Sep', label: 'Kumkum' },
              { id: 'day-8', num: '8', date: '21 Sep', label: 'Annadanam' },
              { id: 'day-9', num: '9', date: '22 Sep', label: 'Nimarjanam', special: true },
            ].map(day => (
              <button
                key={day.id}
                onClick={() => setSelectedTab(day.id)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedTab === day.id
                    ? day.special 
                      ? 'bg-red-700 text-white shadow' 
                      : 'bg-amber-700 text-white shadow'
                    : day.special
                      ? 'bg-red-100 text-red-900 hover:bg-red-200 border border-red-300'
                      : 'text-amber-900 hover:bg-amber-200/60'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-black ${
                  selectedTab === day.id ? 'bg-white/20 text-white' : 'bg-amber-200 text-amber-900'
                }`}>
                  {day.num}
                </span>
                <span className="font-bold">{day.date}</span>
                <span className="hidden md:inline text-[10px] opacity-80">({day.label})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter Toolbar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rituals, aartis, nimarjanam..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-amber-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto">
            {[
              { id: 'all', label: 'All Events' },
              { id: 'aarti', label: 'Aartis' },
              { id: 'ritual', label: 'Vedic Rituals' },
              { id: 'cultural', label: 'Bhajans / Music' },
              { id: 'prasadam', label: 'Annadanam' },
              { id: 'luckydraw', label: 'Lucky Draw' },
              { id: 'procession', label: 'Ganesh Nimarjanam' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors border ${
                  selectedCategory === cat.id
                    ? 'bg-amber-900 text-white border-amber-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Copy / WhatsApp Share button */}
          <button
            onClick={handleCopyAll}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-900 bg-white border-2 border-amber-300 hover:bg-amber-50 shadow-sm transition-all whitespace-nowrap w-full md:w-auto"
          >
            {copiedDay === 'all' ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Schedule Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-700" />
                <span>Share 9 Days Schedule</span>
              </>
            )}
          </button>
        </div>

        {/* Timeline Day Cards */}
        {filteredDays.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-amber-200 p-6">
            <p className="text-stone-500 text-sm font-semibold">No schedule items match your current search.</p>
            <button
              onClick={() => { setSelectedTab('all'); setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-3 px-4 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs hover:bg-amber-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredDays.map((day) => {
              const isNimarjanamDay = day.id === 'day-9' || day.badge?.includes('నిమజ్జనం');
              const isSthapanaDay = day.id === 'day-1' || day.badge?.includes('స్థాపన');

              return (
                <div
                  key={day.id}
                  className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden transition-all ${
                    isNimarjanamDay
                      ? 'border-red-400 ring-2 ring-red-300/50'
                      : isSthapanaDay
                      ? 'border-amber-400 ring-2 ring-amber-300/40'
                      : 'border-amber-200 hover:border-amber-300'
                  }`}
                >
                  {/* Day Header */}
                  <div className={`px-4 sm:px-6 py-3.5 border-b flex flex-wrap items-center justify-between gap-2 ${
                    isNimarjanamDay
                      ? 'bg-gradient-to-r from-red-100 via-orange-100 to-amber-100 border-red-300 text-red-950'
                      : isSthapanaDay
                      ? 'bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 border-amber-300 text-amber-950'
                      : 'bg-gradient-to-r from-amber-50 via-orange-50/70 to-amber-100/60 border-amber-200 text-amber-950'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-heading font-black text-xs sm:text-sm shadow-sm ${
                        isNimarjanamDay
                          ? 'bg-red-700 text-white animate-pulse'
                          : isSthapanaDay
                          ? 'bg-amber-700 text-white'
                          : 'bg-amber-600 text-white'
                      }`}>
                        {day.id.replace('day-', 'D-')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-heading font-bold text-base sm:text-lg">
                            {day.dateStr}
                          </h3>
                          {isNimarjanamDay && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white uppercase tracking-wider shadow-sm">
                              Maha Nimarjanam
                            </span>
                          )}
                          {isSthapanaDay && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-600 text-white uppercase tracking-wider shadow-sm">
                              Grand Sthapana
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-amber-900/90">
                          {day.dayName} {day.badge && <span className="text-stone-700 font-bold">• {day.badge}</span>}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopySchedule(day)}
                        className="p-1.5 sm:px-3 sm:py-1 rounded-lg text-xs font-semibold text-amber-900 hover:bg-amber-200/70 transition-colors flex items-center gap-1 border border-amber-300 bg-white/90 shadow-sm"
                        title="Copy this day's schedule"
                      >
                        {copiedDay === day.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-amber-700" />
                        )}
                        <span className="hidden sm:inline">
                          {copiedDay === day.id ? 'Copied' : 'Share Day'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Day Summary */}
                  <div className="px-4 sm:px-6 pt-3 pb-2 text-xs sm:text-sm text-stone-600 bg-amber-50/20">
                    {day.summary}
                  </div>

                  {/* Event Items List */}
                  <div className="divide-y divide-amber-100 p-2 sm:p-4">
                    {day.items.map((item) => {
                      const badge = getCategoryBadge(item.category);
                      return (
                        <div
                          key={item.id}
                          className={`p-3 sm:p-4 rounded-xl transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                            item.highlight 
                              ? isNimarjanamDay
                                ? 'bg-red-50/80 border border-red-200 my-1'
                                : 'bg-amber-50/80 border border-amber-200/80 my-1' 
                              : 'hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-start gap-3 sm:gap-4 flex-1">
                            {/* Time & Icon */}
                            <div className={`flex flex-col items-center justify-center min-w-[85px] sm:min-w-[100px] p-2 rounded-xl border text-center ${
                              isNimarjanamDay && item.highlight
                                ? 'bg-red-100/80 border-red-200'
                                : 'bg-amber-100/70 border-amber-200'
                            }`}>
                              <div className="mb-1">
                                {renderIcon(item.iconType, item.highlight)}
                              </div>
                              <span className="text-xs font-black text-amber-950">
                                {item.time}
                              </span>
                            </div>

                            {/* Title & Description */}
                            <div className="space-y-1 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-heading font-bold text-sm sm:text-base text-stone-900">
                                  {item.title}
                                </h4>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold border ${badge.bg}`}>
                                  {badge.label}
                                </span>
                              </div>

                              {item.description && (
                                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Reminder / Highlights tag */}
                          {item.highlight && (
                            <div className="self-end sm:self-center">
                              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                                isNimarjanamDay
                                  ? 'text-red-800 bg-red-100 border-red-300'
                                  : 'text-amber-800 bg-amber-100 border-amber-300'
                              }`}>
                                <Sparkles className="w-3 h-3" />
                                <span>High Highlight</span>
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Daily Aarti Quick Reference Box */}
        <div className="mt-8 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 p-5 rounded-2xl border-2 border-amber-300 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-700 text-white flex items-center justify-center shadow-md">
              <DiyaIcon className="w-7 h-7 text-amber-200" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-amber-950 text-base">
                Daily Aarti Schedule for all 9 Days
              </h4>
              <p className="text-xs sm:text-sm text-stone-700">
                Morning Aarti at <strong className="text-amber-900">7:00 AM</strong> &bull; Evening Aarti at <strong className="text-amber-900">7:30 PM</strong> daily. Organized by <strong className="text-amber-900">bennur_galligang</strong>.
              </p>
            </div>
          </div>

          <a
            href="#whatsapp-updates"
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-amber-800 hover:bg-amber-900 transition-colors shadow-sm whitespace-nowrap"
          >
            Get Daily 9-Day Reminders
          </a>
        </div>

      </div>
    </section>
  );
}
