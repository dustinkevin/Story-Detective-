import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Volume2,
  X,
  Compass,
  Clock,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ResultScreenProps {
  cluesCount: number;
  totalClues: number;
  onReadAgain: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  cluesCount,
  totalClues,
  onReadAgain,
}) => {
  const [showStorySelector, setShowStorySelector] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    // Play fanfare sound
    sounds.playFanfareSound();

    // Trigger confetti fireworks
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D97706', '#059669', '#2563EB', '#F59E0B'],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 350);

      return () => clearTimeout(timer);
    } catch {
      // ignore
    }
  }, []);

  const fullRetoldStory =
    'First, Emma found the open gate and muddy paw prints. Then, she went to Sunny Park by following the neighborhood clues. Finally, she found Coco protecting an injured kitten under the wooden bridge.';

  const handleSpeakStory = () => {
    sounds.playTapSound();
    setIsPlayingAudio(true);
    sounds.speak(
      `Great job! Mystery Solved! You collected ${cluesCount} clues and retold the story: ${fullRetoldStory}`,
      () => {
        setIsPlayingAudio(false);
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col justify-between min-h-[calc(100vh-65px)]">
      {/* Certificate / Case Closed Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-xl my-auto text-center relative overflow-hidden">
        {/* Decorative corner ribbons */}
        <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
          <div className="bg-amber-500 text-amber-950 text-[10px] font-extrabold uppercase py-1 w-32 text-center rotate-45 translate-x-7 translate-y-3 shadow-xs">
            Solved!
          </div>
        </div>

        {/* Badge & Title */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-amber-950 shadow-lg shadow-amber-500/20 mb-3 ring-4 ring-amber-200">
            <Award className="w-10 h-10" />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Official Junior Detective Certificate</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>

          <h1 className="font-story font-bold text-3xl sm:text-4xl text-amber-950 mt-1">
            Mystery Solved!
          </h1>

          <p className="text-sm sm:text-base text-slate-700 font-semibold mt-1">
            Great job! You solved the mystery of "Where Is Coco?".
          </p>
        </div>

        {/* Stats Summary Pill Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto mt-6">
          <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200">
            <div className="text-2xl font-black text-amber-800 tabular-nums">
              {cluesCount}/{totalClues}
            </div>
            <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
              Clues Gathered
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200">
            <div className="text-2xl font-black text-emerald-800">4 / 4</div>
            <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
              Questions Passed
            </div>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-3 border border-indigo-200">
            <div className="text-2xl font-black text-indigo-800">100%</div>
            <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
              Story Retold
            </div>
          </div>
        </div>

        {/* Story Retelling Parchment */}
        <div className="bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-2xl p-5 max-w-xl mx-auto mt-6 text-left relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Your Complete Story Retelling:</span>
            </span>

            <button
              onClick={handleSpeakStory}
              className="flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 bg-white/90 px-2.5 py-1 rounded-lg border border-amber-300"
              title="Listen to story retelling"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isPlayingAudio ? 'Speaking...' : 'Listen'}</span>
            </button>
          </div>

          <p className="font-story text-base sm:text-lg text-amber-950 leading-relaxed">
            {fullRetoldStory}
          </p>

          <div className="mt-3 pt-2 border-t border-amber-200 flex items-center justify-between text-xs text-amber-800">
            <span className="font-semibold">Grade 5–6 Narrative Achievement</span>
            <span className="flex items-center gap-1 font-bold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" /> Past-Tense Mastery
            </span>
          </div>
        </div>
      </div>

      {/* Screen ⑤ Bottom Buttons (Side by Side) */}
      <div className="mt-6 pt-3 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Read Again Button */}
        <button
          onClick={() => {
            sounds.playTapSound();
            onReadAgain();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border-2 border-amber-400 hover:bg-amber-50 text-amber-900 font-bold text-base shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Read Again</span>
        </button>

        {/* Choose Another Story Button */}
        <button
          onClick={() => {
            sounds.playTapSound();
            setShowStorySelector(true);
          }}
          className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-base shadow-md shadow-amber-600/25 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <BookOpen className="w-5 h-5" />
          <span>Choose Another Story</span>
        </button>
      </div>

      {/* Another Story Selector Modal */}
      {showStorySelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                sounds.playTapSound();
                setShowStorySelector(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-story font-bold text-xl text-amber-950">Detective Mystery Library</h3>
                <p className="text-xs text-slate-500">More interactive Grade 5–6 mystery readers</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {/* Story 1 - Completed */}
              <div className="p-3.5 rounded-2xl border-2 border-emerald-400 bg-emerald-50/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🐕</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-slate-900">Where Is Coco?</h4>
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Solved!
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">Find the missing dog in town.</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowStorySelector(false);
                    onReadAgain();
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Play
                </button>
              </div>

              {/* Story 2 - Upcoming */}
              <div className="p-3.5 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-200 flex items-center justify-center text-amber-900">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-slate-900">The Whispering Treehouse</h4>
                      <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Next Case
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">The Mystery of the Missing Compass</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-amber-700">Coming Soon</span>
              </div>

              {/* Story 3 - Upcoming */}
              <div className="p-3.5 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-slate-700">The Clocktower Secret</h4>
                      <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Book 3
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">The Case of the Midnight Bell</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-400">Coming Soon</span>
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={() => {
                  setShowStorySelector(false);
                  onReadAgain();
                }}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors"
              >
                Replay "Where Is Coco?" in Detective Master Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
