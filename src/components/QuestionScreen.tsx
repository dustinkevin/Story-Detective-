import React, { useState } from 'react';
import { Volume2, Lightbulb, CheckCircle2, RotateCw, ArrowRight } from 'lucide-react';
import { StoryQuestion, StoryQuestionOption } from '../types';
import { sounds } from '../utils/soundEffects';

interface QuestionScreenProps {
  question: StoryQuestion;
  onContinue: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  onContinue,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // Shuffle options so the answer position is random
  const [shuffledOptions] = useState<StoryQuestionOption[]>(() => {
    return [...question.options].sort(() => Math.random() - 0.5);
  });

  const handleSelectOption = (option: StoryQuestionOption) => {
    // If already answered correctly, lock options
    if (feedbackState === 'correct') return;

    setSelectedOptionId(option.id);
    sounds.playTapSound();

    if (option.isCorrect) {
      setFeedbackState('correct');
      setShowHint(false); // Hide hint once correct
      sounds.playSuccessSound();
      sounds.speak('Nice clue! Great job!');
    } else {
      setFeedbackState('incorrect');
      setShowHint(true);
      sounds.playTryAgainSound();
    }
  };

  const handleReadQuestion = () => {
    sounds.playTapSound();
    sounds.speak(question.questionText);
  };

  const handleToggleHint = () => {
    if (feedbackState === 'correct') return; // Cannot view hint after solving
    sounds.playTapSound();
    setShowHint((prev) => !prev);
    if (!showHint) {
      sounds.speak(`Detective Hint: ${question.hintText}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-2 sm:py-6 flex flex-col justify-between min-h-[calc(100dvh-58px)] sm:min-h-[calc(100vh-65px)]">
      {/* Top Card: Question Header & Big Text */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-indigo-200 shadow-md my-auto flex flex-col justify-between">
        <div>
          {/* Question badge & audio */}
          <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-indigo-100">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="bg-indigo-600 text-white font-bold text-[11px] sm:text-xs uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
                Question {question.questionNumber}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-indigo-700 capitalize">
                {question.questionType === 'fact' ? '📖 Fact Finding' : '🔍 Detective Inference'}
              </span>
            </div>

            <button
              onClick={handleReadQuestion}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition-colors cursor-pointer"
              title="Hear question read aloud"
            >
              <Volume2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span>Listen</span>
            </button>
          </div>

          {/* Question Text: Large font, top center */}
          <div className="mt-4 sm:mt-6 text-center">
            <h2 className="font-story font-bold text-xl sm:text-2xl md:text-3xl text-slate-900 leading-snug">
              {question.questionText}
            </h2>
          </div>

          {/* Answer choices in a row / grid (shuffled) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mt-5 sm:mt-8">
            {shuffledOptions.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isAnsweredCorrect = feedbackState === 'correct';

              let buttonStyles =
                'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 text-slate-800';

              if (isSelected && isAnsweredCorrect) {
                buttonStyles =
                  'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400 shadow-md cursor-default';
              } else if (isSelected && feedbackState === 'incorrect') {
                buttonStyles =
                  'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-300 animate-shake';
              } else if (isAnsweredCorrect) {
                buttonStyles = 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-60';
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnsweredCorrect}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5 min-h-[90px] sm:min-h-[115px] active:scale-[0.98] cursor-pointer ${buttonStyles}`}
                >
                  <span className="text-2xl sm:text-3xl p-1 bg-amber-50 rounded-xl transition-transform">
                    {opt.iconEmoji}
                  </span>
                  <span className="font-bold text-xs sm:text-base leading-snug">
                    {opt.text}
                  </span>
                  {isSelected && isAnsweredCorrect && (
                    <span className="text-[11px] sm:text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> Correct!
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Banner */}
          {feedbackState === 'correct' && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-100 border-2 border-emerald-400 flex items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-2xl sm:text-3xl">🎉</span>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-emerald-900 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-600" />
                    <span>Nice clue! You solved this question!</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-emerald-800 mt-0.5">
                    {question.explanation}
                  </div>
                </div>
              </div>
            </div>
          )}

          {feedbackState === 'incorrect' && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center gap-2.5 animate-in fade-in duration-200">
              <span className="text-xl sm:text-2xl">🔁</span>
              <div>
                <div className="font-bold text-xs sm:text-sm text-amber-900 flex items-center gap-1">
                  <RotateCw className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-600 animate-spin" />
                  <span>Gentle nudge: That's okay! Try another answer!</span>
                </div>
                <div className="text-[11px] sm:text-xs text-amber-800 mt-0.5">
                  Look at the clue hint below to find the right answer.
                </div>
              </div>
            </div>
          )}

          {/* Hint Card Box - only shown when not yet solved */}
          {showHint && feedbackState !== 'correct' && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-indigo-50 border border-indigo-200 text-xs sm:text-sm text-indigo-950 flex items-start gap-2.5 animate-in slide-in-from-top-2 duration-150">
              <span className="text-xl sm:text-2xl shrink-0">{question.hintEmoji}</span>
              <div>
                <span className="font-bold text-indigo-900 uppercase tracking-wide block mb-0.5">
                  Detective Clue Hint:
                </span>
                <p>{question.hintText}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Screen ③ Footer: [💡 Hint] button on left, [Continue ▶] on right */}
      <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-amber-200/80 flex items-center justify-between gap-3 shrink-0">
        {/* Hint Button (hidden / disabled once correct) */}
        {feedbackState !== 'correct' ? (
          <button
            onClick={handleToggleHint}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border cursor-pointer ${
              showHint
                ? 'bg-amber-100 text-amber-900 border-amber-400'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-amber-50'
            }`}
          >
            <Lightbulb className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-600" />
            <span>{showHint ? 'Hide Hint' : '💡 Hint'}</span>
          </button>
        ) : (
          <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Question Completed</span>
          </div>
        )}

        {/* Continue Button: enabled when correct answer is chosen */}
        <button
          onClick={() => {
            sounds.playPageFlipSound();
            onContinue();
          }}
          disabled={feedbackState !== 'correct'}
          className={`flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md ${
            feedbackState === 'correct'
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 active:scale-95 animate-pulse-subtle cursor-pointer'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
