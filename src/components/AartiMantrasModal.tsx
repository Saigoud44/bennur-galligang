import React, { useState } from 'react';
import { X, Sparkles, Volume2, BookOpen, Heart } from 'lucide-react';
import { GANESH_MANTRAS } from '../data/festivalData';
import { GaneshaIcon, DiyaIcon } from './FestiveIcons';
import { playTempleBell } from '../utils/festiveAudio';

interface AartiMantrasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AartiMantrasModal({ isOpen, onClose }: AartiMantrasModalProps) {
  const [selectedTab, setSelectedTab] = useState<'aarti' | 'mantra'>('aarti');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFDF8] rounded-3xl max-w-2xl w-full p-6 border-2 border-amber-300 shadow-2xl animate-in zoom-in-95 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
              <GaneshaIcon className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-amber-950">
                Devotional Aartis & Mantras
              </h3>
              <p className="text-xs text-stone-500">Sri Siddhi Vinayaka Utsav 2026 Daily Chants</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => playTempleBell()}
              className="p-1.5 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 text-xs font-semibold flex items-center gap-1"
              title="Ring Temple Bell"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chime Bell</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 text-sm font-bold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 my-3 p-1 rounded-xl bg-amber-100/70">
          <button
            onClick={() => setSelectedTab('aarti')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedTab === 'aarti' ? 'bg-amber-700 text-white shadow' : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            Jai Ganesh Deva (Aarti)
          </button>
          <button
            onClick={() => setSelectedTab('mantra')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedTab === 'mantra' ? 'bg-amber-700 text-white shadow' : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            Sacred Slokas & Mantras
          </button>
        </div>

        {/* Lyrics Content */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4 text-stone-800 text-sm leading-relaxed">
          {selectedTab === 'aarti' ? (
            <div className="space-y-4 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
              <div className="text-center pb-2 border-b border-amber-200">
                <span className="text-xs uppercase font-bold text-red-700">Maha Mangala Aarti</span>
                <h4 className="font-heading font-extrabold text-lg text-amber-950">
                  जय गणेश, जय गणेश, जय गणेश देवा
                </h4>
              </div>

              <div className="text-center space-y-3 font-medium text-stone-800">
                <p>
                  जय गणेश, जय गणेश, जय गणेश देवा।<br />
                  माता जाकी पार्वती, पिता महादेवा॥<br />
                  <span className="text-xs text-amber-800 font-bold">॥ जय गणेश, जय गणेश, जय गणेश देवा ॥</span>
                </p>

                <p>
                  एक दंत दयावंत, चार भुजा धारी।<br />
                  माथे पर तिलक सोहे, मूसे की सवारी॥<br />
                  पान चढ़े, फूल चढ़े, और चढ़े मेवा।<br />
                  लड्डुअन का भोग लगे, संत करें सेवा॥<br />
                  <span className="text-xs text-amber-800 font-bold">॥ जय गणेश, जय गणेश, जय गणेश देवा ॥</span>
                </p>

                <p>
                  अंधन को आंख देत, कोढ़िन को काया।<br />
                  बांझन को पुत्र देत, निर्धन को माया॥<br />
                  ‘सूर’ श्याम शरण आए, सफल कीजे सेवा।<br />
                  माता जाकी पार्वती, पिता महादेवा॥<br />
                  <span className="text-xs text-amber-800 font-bold">॥ जय गणेश, जय गणेश, जय गणेश देवा ॥</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {GANESH_MANTRAS.map((m, idx) => (
                <div key={idx} className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-sm text-amber-950">{m.title}</h4>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">Mantra</span>
                  </div>
                  <pre className="font-serif text-sm text-red-900 whitespace-pre-wrap leading-relaxed font-semibold">
                    {m.sanskrit}
                  </pre>
                  <p className="text-xs text-stone-600 border-t border-amber-200/60 pt-2 italic">
                    <strong>Meaning:</strong> {m.meaning}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-amber-200 flex items-center justify-between">
          <span className="text-xs font-bold text-amber-800">
            🚩 Ganpati Bappa Morya!
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
