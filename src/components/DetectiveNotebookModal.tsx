import React from 'react';
import { X, CheckCircle2, Lock } from 'lucide-react';
import { ClueCard } from '../types';
import { sounds } from '../utils/soundEffects';

interface DetectiveNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  allClues: ClueCard[];
  collectedClueIds: string[];
}

export const DetectiveNotebookModal: React.FC<DetectiveNotebookModalProps> = ({
  isOpen,
  onClose,
  allClues,
  collectedClueIds,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-amber-50 rounded-2xl shadow-2xl border-4 border-amber-800 overflow-hidden transform transition-all flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Leather/Wood styled notebook header */}
        <div className="bg-amber-900 text-amber-100 px-5 py-3.5 flex items-center justify-between border-b-2 border-amber-950">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📓</span>
            <div>
              <h3 className="font-story font-bold text-lg text-amber-50">Junior Detective Clue Bag</h3>
              <p className="text-xs text-amber-300">
                {collectedClueIds.length} of {allClues.length} mystery clues collected
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playTapSound();
              onClose();
            }}
            className="p-1 rounded-full hover:bg-amber-800 text-amber-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clue cards list */}
        <div className="p-4 overflow-y-auto space-y-3 divide-y divide-amber-200/60">
          {allClues.map((clue, idx) => {
            const isFound = collectedClueIds.includes(clue.id);

            return (
              <div
                key={clue.id}
                className={`pt-3 first:pt-0 flex items-start gap-3 transition-opacity ${
                  isFound ? 'opacity-100' : 'opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-2 ${
                    isFound
                      ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-xs'
                      : 'bg-stone-200 border-stone-300 text-stone-500'
                  }`}
                >
                  {isFound ? (
                    <span className="text-2xl">{clue.iconEmoji}</span>
                  ) : (
                    <Lock className="w-5 h-5 text-stone-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                      Clue #{idx + 1} · Page {clue.pageNumber}
                    </span>
                    {isFound ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Collected
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-stone-600 bg-stone-200 px-2 py-0.5 rounded-full">
                        Not Found Yet
                      </span>
                    )}
                  </div>

                  <h4 className="font-story font-bold text-sm text-slate-900 mt-0.5">
                    {isFound ? clue.title : 'Mystery Clue Locked'}
                  </h4>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {isFound
                      ? clue.description
                      : `Keep reading to page ${clue.pageNumber} and look for clues in the illustration!`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-amber-100/80 px-4 py-3 border-t border-amber-200 text-center">
          <button
            onClick={() => {
              sounds.playTapSound();
              onClose();
            }}
            className="w-full py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Close Notebook
          </button>
        </div>
      </div>
    </div>
  );
};
