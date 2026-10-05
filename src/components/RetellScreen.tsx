import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Volume2,
  Sparkles,
  Award,
  GripVertical,
  HelpCircle,
  RotateCcw,
  X,
} from 'lucide-react';
import { ClueCard, RetellingSentenceFrame, RetellingFrameOption } from '../types';
import { sounds } from '../utils/soundEffects';

interface RetellScreenProps {
  collectedClues: ClueCard[];
  sentenceFrames: RetellingSentenceFrame[];
  onFinishCase: () => void;
}

export const RetellScreen: React.FC<RetellScreenProps> = ({
  collectedClues,
  sentenceFrames,
  onFinishCase,
}) => {
  // Timeline slots: 6 slots corresponding to steps 1 to 6 (orderIndex 1 to 6)
  const totalSlots = 6;
  const [timelineSlots, setTimelineSlots] = useState<(ClueCard | null)[]>(
    Array(totalSlots).fill(null)
  );

  // Clue cards remaining in the available pool (unplaced)
  const [cluePool, setCluePool] = useState<ClueCard[]>(() => {
    // Start with all 6 clues scrambled in the pool
    return [...collectedClues].sort(() => Math.random() - 0.5);
  });

  // Selected card in pool (for click-to-place)
  const [selectedPoolCardId, setSelectedPoolCardId] = useState<string | null>(null);

  // Drag state
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [dragSource, setDragSource] = useState<'pool' | 'slot' | null>(null);
  const [dragSourceSlotIndex, setDragSourceSlotIndex] = useState<number | null>(null);
  const [dragOverSlotIndex, setDragOverSlotIndex] = useState<number | null>(null);

  // Randomize the choices for each sentence frame once on mount
  const [shuffledFrames] = useState<
    { frame: RetellingSentenceFrame; options: RetellingFrameOption[] }[]
  >(() => {
    return sentenceFrames.map((frame) => ({
      frame,
      options: [...frame.options].sort(() => Math.random() - 0.5),
    }));
  });

  const [frameSelections, setFrameSelections] = useState<Record<string, string>>({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Check if all 6 slots are filled
  const allSlotsFilled = timelineSlots.every((slot) => slot !== null);

  // Check if clues are placed in correct chronological sequence: slot i has clue with orderIndex i + 1
  const isCluesOrderCorrect =
    allSlotsFilled &&
    timelineSlots.every((clue, idx) => clue?.orderIndex === idx + 1);

  // Place card into slot
  const placeCardInSlot = (card: ClueCard, targetSlotIndex: number) => {
    sounds.playTapSound();
    const newSlots = [...timelineSlots];
    const existingInSlot = newSlots[targetSlotIndex];

    // If source was another slot, remove from there
    if (dragSource === 'slot' && dragSourceSlotIndex !== null) {
      newSlots[dragSourceSlotIndex] = existingInSlot; // swap
    } else {
      // Remove from pool
      setCluePool((prev) => prev.filter((c) => c.id !== card.id));
      // If target slot had a card, return it to pool
      if (existingInSlot) {
        setCluePool((prev) => [...prev, existingInSlot]);
      }
    }

    newSlots[targetSlotIndex] = card;
    setTimelineSlots(newSlots);
    setSelectedPoolCardId(null);
    setDraggedCardId(null);
    setDragSource(null);
    setDragSourceSlotIndex(null);
    setDragOverSlotIndex(null);

    // If all correct, celebrate
    if (newSlots.every((c, idx) => c?.orderIndex === idx + 1)) {
      sounds.playSuccessSound();
    }
  };

  // Remove card from slot and return to pool
  const returnCardToPool = (slotIndex: number) => {
    sounds.playTapSound();
    const card = timelineSlots[slotIndex];
    if (!card) return;

    const newSlots = [...timelineSlots];
    newSlots[slotIndex] = null;
    setTimelineSlots(newSlots);
    setCluePool((prev) => [...prev, card]);
  };

  // Reset all slots back to pool
  const handleResetSlots = () => {
    sounds.playTapSound();
    setTimelineSlots(Array(totalSlots).fill(null));
    setCluePool([...collectedClues].sort(() => Math.random() - 0.5));
    setSelectedPoolCardId(null);
  };

  // Handle Drag & Drop
  const handleDragStartFromPool = (e: React.DragEvent, card: ClueCard) => {
    setDraggedCardId(card.id);
    setDragSource('pool');
    setDragSourceSlotIndex(null);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', card.id);
  };

  const handleDragStartFromSlot = (e: React.DragEvent, slotIndex: number) => {
    const card = timelineSlots[slotIndex];
    if (!card) return;
    setDraggedCardId(card.id);
    setDragSource('slot');
    setDragSourceSlotIndex(slotIndex);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', card.id);
  };

  const handleSlotDragOver = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverSlotIndex !== slotIndex) {
      setDragOverSlotIndex(slotIndex);
    }
  };

  const handleSlotDrop = (e: React.DragEvent, targetSlotIndex: number) => {
    e.preventDefault();
    setDragOverSlotIndex(null);

    if (!draggedCardId) return;

    let card: ClueCard | undefined;
    if (dragSource === 'pool') {
      card = cluePool.find((c) => c.id === draggedCardId);
    } else if (dragSource === 'slot' && dragSourceSlotIndex !== null) {
      card = timelineSlots[dragSourceSlotIndex] || undefined;
    }

    if (card) {
      placeCardInSlot(card, targetSlotIndex);
    }
  };

  // Click on a pool card
  const handlePoolCardClick = (card: ClueCard) => {
    sounds.playTapSound();
    if (selectedPoolCardId === card.id) {
      setSelectedPoolCardId(null);
    } else {
      setSelectedPoolCardId(card.id);
      // Auto-place into first empty slot if available
      const firstEmptyIndex = timelineSlots.findIndex((slot) => slot === null);
      if (firstEmptyIndex !== -1) {
        placeCardInSlot(card, firstEmptyIndex);
      }
    }
  };

  // Click on a slot
  const handleSlotClick = (slotIndex: number) => {
    if (selectedPoolCardId) {
      const card = cluePool.find((c) => c.id === selectedPoolCardId);
      if (card) {
        placeCardInSlot(card, slotIndex);
      }
    } else if (timelineSlots[slotIndex]) {
      returnCardToPool(slotIndex);
    }
  };

  const handleSelectFrameOption = (frameId: string, option: RetellingFrameOption) => {
    sounds.playTapSound();
    setFrameSelections((prev) => ({
      ...prev,
      [frameId]: option.id,
    }));

    if (option.isCorrect) {
      sounds.playSuccessSound();
    } else {
      sounds.playTryAgainSound();
    }
  };

  // Check if all 3 frames are completed correctly
  const allFramesCorrect = sentenceFrames.every((frame) => {
    const selectedOptId = frameSelections[frame.id];
    const correctOpt = frame.options.find((o) => o.isCorrect);
    return selectedOptId === correctOpt?.id;
  });

  const canFinish = isCluesOrderCorrect && allFramesCorrect;

  // Read the student's complete story
  const handleReadFullStory = () => {
    sounds.playTapSound();
    setIsPlayingAudio(true);

    const f1Opt = sentenceFrames[0].options.find(
      (o) => o.id === frameSelections['frame-1']
    );
    const f2Opt = sentenceFrames[1].options.find(
      (o) => o.id === frameSelections['frame-2']
    );
    const f3Opt = sentenceFrames[2].options.find(
      (o) => o.id === frameSelections['frame-3']
    );

    const storySummary = `First, Emma found ${
      f1Opt?.text || 'clues'
    }. Then, she went to ${
      f2Opt?.text || 'Sunny Park'
    }. Finally, she found Coco ${
      f3Opt?.text || 'under the bridge'
    }!`;

    sounds.speak(storySummary, () => {
      setIsPlayingAudio(false);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 flex flex-col justify-between min-h-[calc(100vh-65px)]">
      <div className="space-y-6">
        {/* Section A: Dedicated Two-Zone Clue Board */}
        <div className="bg-white rounded-3xl p-5 md:p-6 border-2 border-amber-200/90 shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-100">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Task 1: Place 6 Clues in Chronological Story Timeline</span>
              </div>
              <h2 className="font-story font-bold text-lg md:text-xl text-amber-950 mt-0.5">
                Drag clues from the Clue Box into the Timeline Slots (Step 1 to 6)
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {isCluesOrderCorrect ? (
                <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>All 6 Clues in Perfect Timeline!</span>
                </span>
              ) : (
                <button
                  onClick={handleResetSlots}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  title="Return all clues to pool"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Slots</span>
                </button>
              )}
            </div>
          </div>

          {/* ZONE 1: Available Clue Cards Pool Box */}
          <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>📦</span>
                <span>Detective Clue Box ({cluePool.length} unplaced)</span>
              </span>
              <span className="text-[11px] text-amber-700">
                {cluePool.length > 0
                  ? 'Drag a card or click to place into timeline'
                  : 'All clues placed in timeline!'}
              </span>
            </div>

            {cluePool.length === 0 ? (
              <div className="py-4 text-center text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
                ✅ All 6 clues have been assigned to timeline slots!
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {cluePool.map((card) => {
                  const isSelected = selectedPoolCardId === card.id;

                  return (
                    <div
                      key={card.id}
                      draggable={true}
                      onDragStart={(e) => handleDragStartFromPool(e, card)}
                      onClick={() => handlePoolCardClick(card)}
                      className={`p-2.5 rounded-xl border-2 transition-all flex flex-col justify-between cursor-grab active:cursor-grabbing select-none text-left min-h-[110px] ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-400 shadow-md'
                          : 'border-amber-300 bg-white hover:border-amber-500 shadow-xs'
                      }`}
                      title="Drag to timeline slot or click to auto-place"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-2xl">{card.iconEmoji}</span>
                        <GripVertical className="w-3.5 h-3.5 text-stone-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">
                          {card.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                          {card.tagline}
                        </p>
                      </div>
                      <div className="text-[9px] text-amber-700 font-semibold mt-1">
                        + Drag or tap
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ZONE 2: Chronological Timeline Slots (6 Target Slots) */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>⏱️</span>
                <span>Story Timeline (Step 1 to 6)</span>
              </span>
              <span className="text-[11px] text-slate-500">
                Drop zone targets (Tap placed card to return it)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3">
              {timelineSlots.map((placedCard, slotIdx) => {
                const isCorrect = placedCard?.orderIndex === slotIdx + 1;
                const isOver = dragOverSlotIndex === slotIdx;

                return (
                  <div
                    key={slotIdx}
                    onDragOver={(e) => handleSlotDragOver(e, slotIdx)}
                    onDragLeave={() => setDragOverSlotIndex(null)}
                    onDrop={(e) => handleSlotDrop(e, slotIdx)}
                    onClick={() => handleSlotClick(slotIdx)}
                    className={`rounded-2xl p-3 border-2 transition-all flex flex-col justify-between min-h-[145px] relative ${
                      isOver
                        ? 'border-amber-600 bg-amber-100 ring-2 ring-amber-400'
                        : placedCard
                        ? isCorrect
                          ? 'border-emerald-400 bg-emerald-50/70 shadow-xs'
                          : 'border-amber-300 bg-amber-50/40'
                        : 'border-dashed border-slate-300 bg-slate-50/80 hover:border-amber-400 cursor-pointer'
                    }`}
                  >
                    {/* Slot Header */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                          placedCard
                            ? isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-amber-700 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        <span>Step {slotIdx + 1}</span>
                        {isCorrect && <CheckCircle2 className="w-3 h-3 ml-0.5" />}
                      </span>

                      {placedCard && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            returnCardToPool(slotIdx);
                          }}
                          className="p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          title="Remove from timeline"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Placed Card Content vs Empty Slot Placeholder */}
                    {placedCard ? (
                      <div
                        draggable={true}
                        onDragStart={(e) => handleDragStartFromSlot(e, slotIdx)}
                        className="my-auto cursor-grab active:cursor-grabbing"
                      >
                        <div className="text-2xl mb-1">{placedCard.iconEmoji}</div>
                        <h4 className="font-bold text-xs text-slate-900 leading-snug">
                          {placedCard.title}
                        </h4>
                        <p className="text-[10px] text-slate-600 mt-0.5 line-clamp-2">
                          {placedCard.tagline}
                        </p>
                      </div>
                    ) : (
                      <div className="my-auto text-center py-2">
                        <span className="text-xl opacity-40">📥</span>
                        <div className="text-[11px] font-semibold text-slate-400 mt-1">
                          Empty Slot
                        </div>
                        <div className="text-[9px] text-slate-400">
                          Drop clue here
                        </div>
                      </div>
                    )}

                    {/* Status note */}
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 mt-1">
                      {placedCard
                        ? isCorrect
                          ? '✅ In order'
                          : '⚠️ Try another step'
                        : `Step #${slotIdx + 1}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section B: 3 Sentence Retelling Frames (Randomized Options & Guidance) */}
        <div className="bg-white rounded-3xl p-5 md:p-6 border-2 border-amber-200/90 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-100">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wide">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Task 2: Complete 3 Past-Tense Story Sentences</span>
              </div>
              <h3 className="font-story font-bold text-lg md:text-xl text-amber-950 mt-0.5">
                Retell the Mystery Narrative
              </h3>
            </div>

            {/* Read aloud completed story */}
            <button
              onClick={handleReadFullStory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold self-start sm:self-auto transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingAudio ? 'Speaking...' : 'Listen to Retelling'}</span>
            </button>
          </div>

          {/* 3 Sentences List */}
          <div className="space-y-4 mt-5">
            {shuffledFrames.map(({ frame, options }, index) => {
              const selectedOptId = frameSelections[frame.id];
              const selectedOpt = options.find((o) => o.id === selectedOptId);
              const isSelectedOptionCorrect = selectedOpt?.isCorrect || false;

              return (
                <div
                  key={frame.id}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    isSelectedOptionCorrect
                      ? 'bg-emerald-50/50 border-emerald-300'
                      : selectedOptId
                      ? 'bg-amber-50/50 border-amber-300'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-slate-800">
                      {frame.promptPrefix}
                      <span className="text-amber-700 underline font-extrabold decoration-amber-400 decoration-2 mx-1">
                        {selectedOpt ? selectedOpt.text : '______________________'}
                      </span>
                      {frame.promptSuffix}
                    </span>
                    {isSelectedOptionCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 ml-auto shrink-0" />
                    )}
                  </div>

                  {/* Options row (shuffled randomized order) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
                    {options.map((opt) => {
                      const isSelected = selectedOptId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectFrameOption(frame.id, opt)}
                          className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left transition-all border cursor-pointer ${
                            isSelected
                              ? opt.isCorrect
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                : 'bg-rose-100 text-rose-950 border-rose-400'
                              : 'bg-white hover:bg-amber-50/80 text-slate-800 border-slate-200'
                          }`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>

                  {/* Guidance callout for incorrect choices */}
                  {selectedOpt && !isSelectedOptionCorrect && selectedOpt.feedbackGuide && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-100/80 border border-amber-300 text-xs text-amber-950 flex items-start gap-2 animate-in fade-in duration-150">
                      <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-900 block mb-0.5">
                          Detective Story Clue:
                        </span>
                        <span>{selectedOpt.feedbackGuide}</span>
                      </div>
                    </div>
                  )}

                  {/* Positive confirmation when correct */}
                  {selectedOpt && isSelectedOptionCorrect && (
                    <div className="mt-2 text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Great job! Correct narrative event.</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Screen ④ Bottom Footer */}
      <div className="mt-5 pt-3 border-t border-amber-200/80 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-600">
          {!isCluesOrderCorrect &&
            '👉 Place all 6 clues into the timeline slots in chronological order (Step 1 to 6). '}
          {!allFramesCorrect && '👉 Complete the 3 past-tense retelling sentences.'}
          {canFinish && '🌟 Brilliant! You have completed the story retelling!'}
        </div>

        {/* Finish the Case Button */}
        <button
          onClick={() => {
            sounds.playSuccessSound();
            onFinishCase();
          }}
          disabled={!canFinish}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm md:text-base transition-all shadow-md ${
            canFinish
              ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/25 active:scale-95 animate-pulse-subtle cursor-pointer'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Finish the Case</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
