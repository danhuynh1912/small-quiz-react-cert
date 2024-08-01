export type SelectStateKeyName = 'category' | 'difficulty';

export interface QuizParams {
  category?: number;
  difficulty?: string;
  amount?: number;
  type?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  user_answer?: string;
  options?: string[];
}

export interface TriviaCategoriesData {
  trivia_categories?: Category[];
}

export interface TriviaQuizData {
  response_code: number;
  results: Question[];
}
