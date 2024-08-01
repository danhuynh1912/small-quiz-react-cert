import { createContext, useState, ReactNode } from 'react';
import { Question, QuizParams } from '../type';

interface Result {
  className?: string;
  message?: string;
}

interface QuizParamsContextType {
  quizParams: QuizParams;
  quiz: Question[];
  isSubmittable: boolean;
  isSubmitted: boolean;
  result: Result;
  selectParams: (params: QuizParams) => void;
  updateQuiz: (newQuiz: Question[]) => void;
  reset: () => void;
  setIsSubmitted?: React.Dispatch<React.SetStateAction<boolean>>;
}

const initQuizParams = { amount: 5, type: 'multiple' };

const QuizParamsContext = createContext<QuizParamsContextType>({
  quizParams: initQuizParams,
  quiz: [],
  isSubmittable: false,
  isSubmitted: false,
  result: {},
  selectParams: ({}) => null,
  reset: () => null,
  updateQuiz: ([]) => null,
});

interface QuizParamsProviderProps {
  children: ReactNode;
}

const QuizParamsProvider = ({ children }: QuizParamsProviderProps) => {
  const [quizParams, setQuizParams] = useState<QuizParams>(initQuizParams);
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const selectParams = (params: QuizParams) => {
    setQuizParams({ ...params });
  };

  const updateQuiz = (newQuiz: Question[]) => {
    setQuiz([...newQuiz]);
  };

  const isSubmittable =
    !!quiz.length && quiz.every(({ user_answer }: Question) => user_answer);

  const getResult = () => {
    const correctCount = quiz.reduce(
      (accumulator, currentQuestion) =>
        accumulator +
        (currentQuestion.correct_answer === currentQuestion.user_answer
          ? 1
          : 0),
      0
    );

    const color =
      correctCount > 1
        ? correctCount < quiz.length - 1
          ? 'yellow'
          : 'green'
        : 'red';
    const className = `score-${color}`;

    return isSubmitted
      ? {
          message: `You scored ${correctCount} out of ${quiz.length}`,
          className,
        }
      : {};
  };

  const reset = () => {
    const newQuizParams = { ...quizParams };
    delete newQuizParams.category;
    delete newQuizParams.difficulty;
    selectParams(newQuizParams);
    updateQuiz([]);
    setIsSubmitted(false);
  };

  return (
    <QuizParamsContext.Provider
      value={{
        quizParams,
        quiz,
        selectParams,
        updateQuiz,
        isSubmittable,
        isSubmitted,
        setIsSubmitted,
        reset,
        result: getResult(),
      }}
    >
      {children}
    </QuizParamsContext.Provider>
  );
};

export { QuizParamsProvider, QuizParamsContext };
