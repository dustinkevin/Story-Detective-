import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  Search,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Eye,
  X,
  Lock,
  AlertCircle,
  VolumeX,
} from 'lucide-react';
import { StoryPage, VocabularyWord, ClueHotspot } from '../types';
import { sounds } from '../utils/soundEffects';

interface StoryPageScreenProps {
  page: StoryPage;
  totalPages: number;
  isClueCollected: boolean;
  onCollectClue: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  onSelectWord: (wordData: VocabularyWord) => void;
}

export const StoryPageScreen: React.FC<StoryPageScreenProps> = ({
  page,
  totalPages,
  isClueCollected,
  onCollectClue,
  onNextPage,
  onPrevPage,
  onSelectWord,
}) => {
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<ClueHotspot | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showClueNeededAlert, setShowClueNeededAlert] = useState(false);
  const [showMobileAudioTip, setShowMobileAudioTip] = useState(false);

  // Reset alert on page change
  useEffect(() => {
    setShowClueNeededAlert(false);
    setIsInvestigating(false);
    setSelectedHotspot(null);
    setIsPlayingAudio(false);
  }, [page.pageNumber]);

  // Parse story text to make key words clickable
  const renderInteractiveText = () => {
    const keys = Object.keys(page.keyWords).sort((a, b) => b.length - a.length);
    const pattern = new RegExp(`(${keys.map((k) => `\\b${k}\\b`).join('|')})`, 'gi');
    const parts = page.storyText.split(pattern);

    return parts.map((part, index) => {
      const lower = part.toLowerCase();
      const matchedKey = keys.find((k) => k.toLowerCase() === lower);

      if (matchedKey) {
        const wordData = page.keyWords[matchedKey];
        return (
          <button
            key={index}
            onClick={() => {
              sounds.playTapSound();
              onSelectWord(wordData);
            }}
            className="inline-flex items-center mx-0.5 px-1.5 sm:px-2 py-0.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold border-b-2 border-amber-400 transition-all active:scale-95 group cursor-pointer"
            title="Tap to see meaning and hear pronunciation"
          >
            <span>{part}</span>
            <span className="text-[10px] sm:text-xs ml-1 text-amber-700 opacity-70 group-hover:opacity-100">
              {wordData.iconEmoji}
            </span>
          </button>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  const handleReadAloud = () => {
    sounds.playTapSound();
    setIsPlayingAudio(true);
    setShowMobileAudioTip(true);

    sounds.speak(
      page.storyText,
      () => {
        setIsPlayingAudio(false);
        setTimeout(() => setShowMobileAudioTip(false), 2000);
      },
      0.88
    );
  };

  const handleHotspotClick = (hotspot: ClueHotspot) => {
    setSelectedHotspot(hotspot);
    sounds.playTapSound();

    if (hotspot.isMainClue) {
      sounds.playClueFoundSound();
      setShowClueNeededAlert(false);
      onCollectClue();
    } else {
      sounds.speak(hotspot.description);
    }
  };

  const handleNextClick = () => {
    if (page.hasClueToCollect && !isClueCollected) {
      sounds.playTryAgainSound();
      setShowClueNeededAlert(true);
      setIsInvestigating(true);
      sounds.speak("Please collect the clue on this page before moving forward!");
      return;
    }
    sounds.playPageFlipSound();
    onNextPage();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-1.5 sm:py-3 flex flex-col justify-between h-[calc(100dvh-46px)] sm:min-h-[calc(100vh-65px)]">
      {/* 2-Column Storybook Layout (Side-by-side in landscape and on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-12 landscape:grid-cols-12 gap-2 sm:gap-4 items-stretch flex-1 min-h-0 my-auto">
        {/* Left Column: Story Illustration (Height-fitted in landscape) */}
        <div className="md:col-span-6 lg:col-span-7 landscape:col-span-6 flex flex-col justify-center min-h-0">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-xl border-2 sm:border-4 border-amber-300 bg-amber-100 aspect-16/10 sm:aspect-4/3 max-h-[36vh] landscape:max-h-[calc(100dvh-100px)] md:max-h-none group select-none flex items-center justify-center">
            <img
              src={page.illustration}
              alt={page.illustrationAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500"
            />

            {/* Investigation Mode Overlay & Hotspots */}
            {isInvestigating && page.hotspots && (
              <div className="absolute inset-0 bg-stone-950/35 backdrop-blur-xs transition-opacity p-2 sm:p-4 flex flex-col justify-between z-10">
                {/* Top bar with explicit Exit/Close button */}
                <div className="flex items-center justify-between gap-1.5 w-full">
                  <div className="bg-amber-950/90 text-amber-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-xl text-[10px] sm:text-xs font-bold inline-flex items-center gap-1 shadow-md">
                    <Search className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-400" />
                    <span>Investigation Mode: Tap objects!</span>
                  </div>

                  {/* Explicit Close Button */}
                  <button
                    onClick={() => {
                      sounds.playTapSound();
                      setIsInvestigating(false);
                      setSelectedHotspot(null);
                    }}
                    className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-xl bg-stone-900/90 hover:bg-black text-white text-[10px] sm:text-xs font-bold flex items-center gap-1 shadow-md transition-colors cursor-pointer"
                    title="Exit investigation mode"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Exit</span>
                  </button>
                </div>

                {/* Hotspot Markers centered directly on items */}
                {page.hotspots.map((hs) => {
                  const isMain = hs.isMainClue;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => handleHotspotClick(hs)}
                      style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-9 sm:w-11 h-9 sm:h-11 rounded-full flex items-center justify-center border-2 shadow-lg transition-transform active:scale-90 cursor-pointer ${
                        isMain
                          ? 'bg-amber-500/95 border-white text-white animate-bounce ring-4 ring-amber-400/50'
                          : 'bg-white/90 border-amber-400 text-amber-900 hover:scale-110'
                      }`}
                      title={hs.name}
                    >
                      {isMain ? (
                        <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
                      ) : (
                        <HelpCircle className="w-3.5 sm:w-5 h-3.5 sm:h-5" />
                      )}
                    </button>
                  );
                })}

                {/* Hotspot details card popup if selected */}
                {selectedHotspot && (
                  <div className="bg-white rounded-2xl p-2.5 sm:p-4 border-2 border-amber-400 shadow-xl max-w-xs sm:max-w-sm self-center text-center animate-in zoom-in-95 duration-150 relative">
                    <button
                      onClick={() => setSelectedHotspot(null)}
                      className="absolute top-1.5 right-1.5 p-1 text-slate-400 hover:text-slate-700"
                      title="Close info"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-bold text-amber-800 uppercase">
                      {selectedHotspot.isMainClue ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Important Mystery Clue!</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>Inspecting Scene</span>
                        </>
                      )}
                    </div>
                    <h4 className="font-story font-bold text-xs sm:text-base text-slate-900 mt-0.5">
                      {selectedHotspot.name}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-slate-700 mt-0.5 leading-relaxed">
                      {selectedHotspot.description}
                    </p>
                    {selectedHotspot.isMainClue && (
                      <div className="mt-1 text-[10px] sm:text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">
                        🎉 Clue saved to Detective Bag!
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Story Text & Interactive Controls (Scrollable if needed in landscape) */}
        <div className="md:col-span-6 lg:col-span-5 landscape:col-span-6 flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 border-2 border-amber-200/80 shadow-md min-h-0 landscape:max-h-[calc(100dvh-100px)] landscape:overflow-y-auto">
          {/* Top meta row with Location and Chapter */}
          <div>
            <div className="flex items-center justify-between pb-1.5 sm:pb-2.5 border-b border-amber-100">
              <div className="flex items-center gap-1.5">
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1">
                  <span>📍</span>
                  <span>{page.locationName}</span>
                </span>
                <span className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-amber-800">
                  · {page.title}
                </span>
              </div>

              {/* Read Aloud Button */}
              <button
                onClick={handleReadAloud}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
                }`}
                title="Listen to story text read aloud"
              >
                <Volume2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                <span>{isPlayingAudio ? 'Reading...' : 'Read Aloud'}</span>
              </button>
            </div>

            {/* Mobile Sound Tip if on iPhone/iPad */}
            {showMobileAudioTip && (
              <div className="mt-1 px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-[10px] text-amber-900 flex items-center gap-1 animate-in fade-in">
                <span>🔊</span>
                <span>Playing English audio. (아이폰 무음 모드 스위치가 켜져 있으면 소리가 안 날 수 있습니다)</span>
              </div>
            )}

            {/* Main story text - responsive font size */}
            <div className="mt-2.5 sm:mt-5">
              <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-story text-slate-900 leading-relaxed">
                {renderInteractiveText()}
              </div>
            </div>

            {/* Vocabulary Tip notice */}
            <div className="mt-2 pt-1.5 flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
              <span className="text-amber-600 font-bold">💡 Tip:</span>
              <span>Tap highlighted words for definition & audio!</span>
            </div>
          </div>

          {/* Clue status card & Mandatory Clue Notice */}
          <div className="mt-2 sm:mt-4 space-y-1.5">
            {showClueNeededAlert && !isClueCollected && (
              <div className="p-1.5 sm:p-2 rounded-xl bg-amber-100 border-2 border-amber-400 text-amber-950 text-[10px] sm:text-xs font-bold flex items-center gap-1.5 animate-bounce">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Detective Alert: Collect the clue on this page first!</span>
              </div>
            )}

            {page.hasClueToCollect && (
              <div>
                {isClueCollected ? (
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 sm:w-9 h-7 sm:h-9 rounded-xl bg-emerald-200 flex items-center justify-center text-base sm:text-xl shrink-0">
                        {page.clue?.iconEmoji || '🔍'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1 text-[9px] sm:text-[11px] font-bold text-emerald-800 uppercase">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Clue Collected!</span>
                        </div>
                        <div className="font-bold text-[11px] sm:text-xs md:text-sm text-slate-900 truncate">
                          {page.clue?.title}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sounds.playTapSound();
                        setIsInvestigating(!isInvestigating);
                        setSelectedHotspot(null);
                      }}
                      className="px-2 py-0.5 rounded-lg border border-emerald-300 text-emerald-800 text-[10px] sm:text-[11px] font-semibold hover:bg-emerald-100 transition-colors shrink-0"
                    >
                      {isInvestigating ? 'Close' : 'Re-inspect'}
                    </button>
                  </div>
                ) : (
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg sm:text-xl animate-bounce">🔍</span>
                      <div>
                        <div className="text-[9px] sm:text-[11px] font-bold text-amber-800 uppercase flex items-center gap-1">
                          <Lock className="w-3 h-3 text-amber-700" />
                          <span>Clue Required to Continue</span>
                        </div>
                        <div className="text-[10px] sm:text-xs text-slate-700">
                          {isInvestigating
                            ? 'Tap the glowing clue in the picture!'
                            : 'Tap [Collect Clue] to search!'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sounds.playTapSound();
                        setIsInvestigating(!isInvestigating);
                        setSelectedHotspot(null);
                      }}
                      className="px-2.5 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[10px] sm:text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
                    >
                      {isInvestigating ? 'Close' : 'Collect Clue'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Screen ② Navigation Footer (Always compact & 100% visible on screen) */}
      <div className="mt-1.5 sm:mt-3 pt-1.5 sm:pt-2.5 border-t border-amber-200/80 flex items-center justify-between gap-2 shrink-0">
        {/* Back Button */}
        <button
          onClick={() => {
            sounds.playPageFlipSound();
            onPrevPage();
          }}
          disabled={page.pageNumber === 1}
          className={`flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            page.pageNumber === 1
              ? 'opacity-40 cursor-not-allowed text-stone-400 bg-stone-100'
              : 'text-amber-900 bg-white border border-amber-300 hover:bg-amber-100/70 shadow-xs cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          <span>Back</span>
        </button>

        {/* Center: Collect Clue button if not collected and clue exists */}
        {page.hasClueToCollect && !isClueCollected && (
          <button
            onClick={() => {
              sounds.playTapSound();
              setIsInvestigating(true);
            }}
            className="flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-600/20 active:scale-95 transition-all animate-pulse-subtle cursor-pointer"
          >
            <Search className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>Search & Collect Clue</span>
          </button>
        )}

        {/* Next Button - Enforce clue collection */}
        {page.hasClueToCollect && !isClueCollected ? (
          <button
            onClick={handleNextClick}
            className="flex items-center gap-1 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-amber-100 hover:bg-amber-200 border-2 border-amber-400 text-amber-950 font-bold text-xs sm:text-sm shadow-xs active:scale-95 transition-all cursor-pointer animate-pulse"
            title="Collect the clue first to proceed!"
          >
            <Lock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-700" />
            <span>Collect Clue First</span>
          </button>
        ) : (
          <button
            onClick={handleNextClick}
            className="flex items-center gap-1 px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
