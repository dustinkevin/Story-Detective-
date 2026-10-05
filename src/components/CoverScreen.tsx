import React from 'react';
import { Volume2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { coverImage, predictionQuestion } from '../data/storyData';
import { PredictionOption } from '../types';
import { sounds } from '../utils/soundEffects';

interface CoverScreenProps {
  selectedPrediction: string | null;
  onSelectPrediction: (optionId: string) => void;
  onStartStory: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({
  selectedPrediction,
  onSelectPrediction,
  onStartStory,
}) => {
  const chosenOption = predictionQuestion.options.find((opt) => opt.id === selectedPrediction);

  const handleReadTitle = () => {
    sounds.playTapSound();
    sounds.speak("Where Is Coco? An interactive mystery picture book.");
  };

  const handleReadPredictionPrompt = () => {
    sounds.playTapSound();
    sounds.speak("Detective prediction: Where do you think Coco went?");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-4 md:py-6 flex flex-col justify-between min-h-[calc(100dvh-58px)] sm:min-h-[calc(100vh-65px)]">
      {/* Main 2-column landscape layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-stretch my-auto">
        {/* Left half: Story title & cover illustration (Height-capped for mobile) */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-amber-300 bg-amber-100 group max-h-[32vh] sm:max-h-none">
            <img
              src={coverImage}
              alt="Where Is Coco - Emma looking through a magnifying glass"
              referrerPolicy="no-referrer"
              className="w-full aspect-16/10 sm:aspect-4/3 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {/* Scrim with Title overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent flex flex-col justify-end p-3.5 sm:p-5 md:p-6 text-white">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="bg-amber-500/90 text-amber-950 font-extrabold text-[10px] sm:text-xs uppercase px-2 py-0.5 rounded-full tracking-wider">
                  Junior Detective Reader
                </span>
                <span className="text-[10px] sm:text-xs text-amber-200 font-medium">Grade 5–6 · CEFR A1–A2</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <h1 className="font-story font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight drop-shadow-md">
                  Where Is Coco?
                </h1>
                <button
                  onClick={handleReadTitle}
                  className="p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-all shrink-0 cursor-pointer"
                  title="Read story title aloud"
                >
                  <Volume2 className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>
              <p className="text-amber-100 text-[11px] sm:text-xs md:text-sm mt-0.5 max-w-md line-clamp-2">
                Emma came home, but her dog Coco was gone! Can you follow the clues around town to find him?
              </p>
            </div>
          </div>
        </div>

        {/* Right half: Prediction Question & Choices */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 border-2 border-amber-200/80 shadow-md">
          {/* Header & Prompt */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-amber-800 uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Step 1: Detective Prediction</span>
              </div>
              <button
                onClick={handleReadPredictionPrompt}
                className="text-amber-700 hover:text-amber-900 flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 py-0.5 sm:py-1 rounded-lg bg-amber-50 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
            </div>

            <h2 className="font-story font-bold text-xl sm:text-2xl md:text-3xl text-amber-950 leading-snug">
              {predictionQuestion.prompt}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Look at the cover clues and make your guess before reading.
              <span className="font-semibold text-amber-800"> (No wrong answers in detective predictions!)</span>
            </p>

            {/* 3 Prediction choices (Compact 3-column on mobile) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
              {predictionQuestion.options.map((opt: PredictionOption) => {
                const isSelected = selectedPrediction === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      sounds.playTapSound();
                      onSelectPrediction(opt.id);
                      sounds.speak(opt.label);
                    }}
                    className={`p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border-2 text-left transition-all relative flex flex-col items-center sm:items-start justify-between min-h-[85px] sm:min-h-[105px] cursor-pointer ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50 ring-2 ring-amber-400/40 shadow-sm'
                        : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-2xl sm:text-3xl p-0.5 sm:p-1 bg-amber-100/60 rounded-lg sm:rounded-xl">
                        {opt.iconEmoji}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600 shrink-0" />
                      )}
                    </div>
                    <div className="mt-1.5 text-center sm:text-left w-full">
                      <div className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                        {opt.label}
                      </div>
                      <div className="hidden sm:block text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                        {opt.previewText}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Prediction Feedback Callout */}
            {chosenOption && (
              <div className="mt-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-2 animate-in fade-in duration-200">
                <span className="text-lg sm:text-xl">💡</span>
                <div className="text-[11px] sm:text-xs text-amber-950">
                  <span className="font-bold">You guessed: {chosenOption.label}! </span>
                  Awesome prediction. Let's read the 8 pages, gather 6 mystery clues, and see where Coco went!
                </div>
              </div>
            )}
          </div>

          {/* Quick learning goals preview */}
          <div className="mt-3 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <span>📖 8 Pages</span>
            </span>
            <span className="flex items-center gap-1">
              <span>🔍 6 Clues</span>
            </span>
            <span className="flex items-center gap-1">
              <span>🎯 Retell Story</span>
            </span>
          </div>
        </div>
      </div>

      {/* Large Start Story Button - Centered at bottom */}
      <div className="mt-3 sm:mt-6 flex justify-center shrink-0">
        <button
          onClick={() => {
            sounds.playPageFlipSound();
            onStartStory();
          }}
          className="group px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm sm:text-base md:text-lg shadow-lg shadow-amber-600/25 active:scale-[0.98] transition-all flex items-center gap-2 sm:gap-3 animate-pulse-subtle cursor-pointer"
        >
          <span>Start Story</span>
          <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
