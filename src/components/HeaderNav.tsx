import React from 'react';
import { Search, BookOpen, Volume2, VolumeX, RotateCcw, Award } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface HeaderNavProps {
  currentScreen: 'cover' | 'story' | 'question' | 'retell' | 'result';
  currentPage: number;
  totalPages: number;
  cluesCollectedCount: number;
  totalCluesCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenNotebook: () => void;
  onReset: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScreen,
  currentPage,
  totalPages,
  cluesCollectedCount,
  totalCluesCount,
  isMuted,
  onToggleMute,
  onOpenNotebook,
  onReset,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-amber-50/95 backdrop-blur-md border-b border-amber-200/80 px-4 py-2.5 shadow-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Zone 1: Brand title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white shadow-xs">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <span className="font-story font-bold text-lg md:text-xl text-amber-950 tracking-tight flex items-center gap-1.5">
              Story Detective!
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation & Progress */}
        <div className="flex items-center gap-3">
          {currentScreen === 'story' && (
            <div className="flex items-center gap-2 bg-amber-100/70 border border-amber-300/60 px-3 py-1 rounded-full text-xs font-semibold text-amber-900">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          )}

          {currentScreen === 'question' && (
            <div className="flex items-center gap-2 bg-indigo-100/80 border border-indigo-300/60 px-3 py-1 rounded-full text-xs font-semibold text-indigo-900">
              <span>Detective Question</span>
            </div>
          )}

          {currentScreen === 'retell' && (
            <div className="flex items-center gap-2 bg-emerald-100/80 border border-emerald-300/60 px-3 py-1 rounded-full text-xs font-semibold text-emerald-900">
              <span>Story Retelling</span>
            </div>
          )}

          {currentScreen === 'result' && (
            <div className="flex items-center gap-2 bg-yellow-100 border border-yellow-300 px-3 py-1 rounded-full text-xs font-semibold text-yellow-900">
              <Award className="w-3.5 h-3.5 text-yellow-700" />
              <span>Case Solved</span>
            </div>
          )}
        </div>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          {/* Clue Bag Button */}
          <button
            onClick={() => {
              sounds.playTapSound();
              onOpenNotebook();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-xs font-bold text-amber-950 shadow-xs hover:bg-amber-100/80 transition-colors"
            title="Open Detective Notebook"
          >
            <span className="text-sm">🔍</span>
            <span className="hidden sm:inline">Clue Bag:</span>
            <span className="bg-amber-600 text-white px-1.5 py-0.5 rounded text-[11px]">
              {cluesCollectedCount}/{totalCluesCount}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              sounds.playTapSound();
              onToggleMute();
            }}
            className="p-1.5 rounded-lg border border-amber-300/70 bg-white text-amber-900 hover:bg-amber-100/80 transition-colors"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-amber-600" /> : <Volume2 className="w-4 h-4 text-amber-800" />}
          </button>

          {/* Restart */}
          {currentScreen !== 'cover' && (
            <button
              onClick={() => {
                if (window.confirm('Restart this mystery from the beginning?')) {
                  sounds.playTapSound();
                  onReset();
                }
              }}
              className="p-1.5 rounded-lg border border-amber-300/70 bg-white text-amber-800 hover:bg-amber-100/80 transition-colors"
              title="Restart story"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
