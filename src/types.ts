export interface VocabularyWord {
  word: string;
  pronunciation: string;
  definition: string;
  exampleSentence: string;
  iconEmoji: string;
}

export interface ClueHotspot {
  id: string;
  name: string;
  description: string;
  xPercent: number; // 0 - 100% position on illustration
  yPercent: number;
  isMainClue: boolean;
}

export interface ClueCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  pageNumber: number;
  iconEmoji: string;
  orderIndex: number; // 1 to 5 for retelling order
}

export interface StoryQuestionOption {
  id: string;
  text: string;
  iconEmoji: string;
  isCorrect: boolean;
}

export interface StoryQuestion {
  id: string;
  afterPage: number;
  questionNumber: number;
  questionText: string;
  questionType: 'fact' | 'inference';
  options: StoryQuestionOption[];
  hintText: string;
  hintEmoji: string;
  explanation: string;
}

export interface StoryPage {
  pageNumber: number;
  title: string;
  locationName: string;
  illustration: string;
  illustrationAlt: string;
  storyText: string;
  keyWords: Record<string, VocabularyWord>;
  clue?: ClueCard;
  hotspots?: ClueHotspot[];
  hasClueToCollect: boolean;
  questionAfter?: StoryQuestion;
}

export interface PredictionOption {
  id: string;
  label: string;
  iconEmoji: string;
  previewText: string;
}

export interface RetellingFrameOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedbackGuide?: string;
}

export interface RetellingSentenceFrame {
  id: string;
  stepName: 'First' | 'Then' | 'Finally';
  promptPrefix: string;
  promptSuffix: string;
  correctAnswerText: string;
  options: RetellingFrameOption[];
}
