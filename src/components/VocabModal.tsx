import React from 'react';
import { X, Volume2 } from 'lucide-react';
import { VocabularyWord } from '../types';
import { sounds } from '../utils/soundEffects';

interface VocabModalProps {
  wordData: VocabularyWord | null;
  onClose: () => void;
}

export const VocabModal: React.FC<VocabModalProps> = ({ wordData, onClose }) => {
  if (!wordData) return null;

  const handlePronounce = () => {
    sounds.playTapSound();
    sounds.speak(wordData.word, undefined, 0.8);
  };

  const handleSpeakExample = () => {
    sounds.playTapSound();
    sounds.speak(wordData.exampleSentence, undefined, 0.85);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl border-2 border-amber-300 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="bg-amber-100/90 px-4 py-3 flex items-center justify-between border-b border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{wordData.iconEmoji}</span>
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-800 font-bold">Detective Word Helper</span>
              <h3 className="text-xl font-story font-bold text-amber-950 capitalize">{wordData.word}</h3>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playTapSound();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-amber-200/80 text-amber-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 space-y-3.5">
          {/* Pronunciation */}
          <div className="flex items-center justify-between bg-amber-50 rounded-xl p-2.5 border border-amber-200/60">
            <div>
              <div className="text-[11px] text-amber-700 font-medium">Pronunciation:</div>
              <div className="text-sm font-mono font-semibold text-slate-800">{wordData.pronunciation}</div>
            </div>
            <button
              onClick={handlePronounce}
              className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen</span>
            </button>
          </div>

          {/* Simple Meaning */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Simple Meaning:</div>
            <p className="text-sm text-slate-800 font-medium mt-1 leading-snug">
              {wordData.definition}
            </p>
          </div>

          {/* Example in Story */}
          <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-100">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 uppercase tracking-wide">
              <span>Example in Story:</span>
              <button
                onClick={handleSpeakExample}
                className="text-amber-700 hover:text-amber-900 flex items-center gap-1 text-[11px] font-semibold"
              >
                <Volume2 className="w-3 h-3" />
                <span>Hear sentence</span>
              </button>
            </div>
            <p className="text-xs text-amber-950 mt-1 italic leading-relaxed">
              "{wordData.exampleSentence}"
            </p>
          </div>

          {/* Got it button */}
          <button
            onClick={() => {
              sounds.playTapSound();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold shadow-xs transition-colors text-center"
          >
            Got It! 👍
          </button>
        </div>
      </div>
    </div>
  );
};
