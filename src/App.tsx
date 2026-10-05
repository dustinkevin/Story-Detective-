/**
 * Story Detective! - Where Is Coco?
 * Interactive English picture-book mystery for Grade 5-6 learners
 */

import { useState } from 'react';
import {
  allClueCards,
  retellingSentenceFrames,
  storyPages,
} from './data/storyData';
import { StoryQuestion, VocabularyWord } from './types';
import { sounds } from './utils/soundEffects';

import { HeaderNav } from './components/HeaderNav';
import { CoverScreen } from './components/CoverScreen';
import { StoryPageScreen } from './components/StoryPageScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { RetellScreen } from './components/RetellScreen';
import { ResultScreen } from './components/ResultScreen';
import { VocabModal } from './components/VocabModal';
import { DetectiveNotebookModal } from './components/DetectiveNotebookModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    'cover' | 'story' | 'question' | 'retell' | 'result'
  >('cover');

  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [collectedClueIds, setCollectedClueIds] = useState<string[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<StoryQuestion | null>(null);
  const [selectedWord, setSelectedWord] = useState<VocabularyWord | null>(null);
  const [isNotebookOpen, setIsNotebookOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const currentPage = storyPages[currentPageIndex];
  const totalPages = storyPages.length;

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sounds.isMuted = nextMuted;
    if (nextMuted) {
      sounds.stopSpeech();
    }
  };

  const handleStartStory = () => {
    sounds.stopSpeech();
    setCurrentPageIndex(0);
    setCurrentScreen('story');
  };

  const handleCollectClue = (clueId?: string) => {
    const idToCollect = clueId || currentPage.clue?.id;
    if (idToCollect && !collectedClueIds.includes(idToCollect)) {
      setCollectedClueIds((prev) => [...prev, idToCollect]);
    }
  };

  const handleNextPage = () => {
    sounds.stopSpeech();

    // If current page requires a clue to be collected, enforce it!
    if (
      currentPage.hasClueToCollect &&
      currentPage.clue &&
      !collectedClueIds.includes(currentPage.clue.id)
    ) {
      return; // Do not advance without collecting clue!
    }

    // Check if this page triggers a question
    if (currentPage.questionAfter) {
      setActiveQuestion(currentPage.questionAfter);
      setCurrentScreen('question');
      return;
    }

    // Check if we are on the last page (Page 8) -> go to Retell Screen
    if (currentPageIndex >= totalPages - 1) {
      setCurrentScreen('retell');
      return;
    }

    // Otherwise, advance to next story page
    setCurrentPageIndex((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    sounds.stopSpeech();
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleQuestionContinue = () => {
    sounds.stopSpeech();
    setActiveQuestion(null);

    // If question was after Page 7, advance to Page 8
    if (currentPage.pageNumber === 7) {
      setCurrentPageIndex(7);
      setCurrentScreen('story');
    } else {
      // Advance to the next page
      setCurrentPageIndex((prev) => prev + 1);
      setCurrentScreen('story');
    }
  };

  const handleFinishCase = () => {
    sounds.stopSpeech();
    setCurrentScreen('result');
  };

  const handleResetStory = () => {
    sounds.stopSpeech();
    setCurrentScreen('cover');
    setCurrentPageIndex(0);
    setSelectedPrediction(null);
    setCollectedClueIds([]);
    setActiveQuestion(null);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans select-none antialiased">
      {/* Top Header Navigation */}
      <HeaderNav
        currentScreen={currentScreen}
        currentPage={currentPage.pageNumber}
        totalPages={totalPages}
        cluesCollectedCount={collectedClueIds.length}
        totalCluesCount={allClueCards.length}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenNotebook={() => setIsNotebookOpen(true)}
        onReset={handleResetStory}
      />

      {/* Main Screen Router */}
      <main className="flex-1 flex flex-col justify-center">
        {currentScreen === 'cover' && (
          <CoverScreen
            selectedPrediction={selectedPrediction}
            onSelectPrediction={(optId) => setSelectedPrediction(optId)}
            onStartStory={handleStartStory}
          />
        )}

        {currentScreen === 'story' && (
          <StoryPageScreen
            key={currentPage.pageNumber}
            page={currentPage}
            totalPages={totalPages}
            isClueCollected={
              currentPage.clue ? collectedClueIds.includes(currentPage.clue.id) : false
            }
            onCollectClue={() => handleCollectClue()}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            onSelectWord={(wordData) => setSelectedWord(wordData)}
          />
        )}

        {currentScreen === 'question' && activeQuestion && (
          <QuestionScreen
            key={activeQuestion.id}
            question={activeQuestion}
            onContinue={handleQuestionContinue}
          />
        )}

        {currentScreen === 'retell' && (
          <RetellScreen
            collectedClues={allClueCards}
            sentenceFrames={retellingSentenceFrames}
            onFinishCase={handleFinishCase}
          />
        )}

        {currentScreen === 'result' && (
          <ResultScreen
            cluesCount={allClueCards.length}
            totalClues={allClueCards.length}
            onReadAgain={handleResetStory}
          />
        )}
      </main>

      {/* Vocabulary Helper Modal */}
      <VocabModal
        wordData={selectedWord}
        onClose={() => setSelectedWord(null)}
      />

      {/* Detective Notebook / Clue Bag Modal */}
      <DetectiveNotebookModal
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
        allClues={allClueCards}
        collectedClueIds={collectedClueIds}
      />
    </div>
  );
}
