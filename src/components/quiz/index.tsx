import { useContext } from 'react';
import he from 'he';
import { Button, Spin } from 'antd';

import { QuizParamsContext } from '../../context/QuizContext';
import { Question } from '../../type';

import './index.css';

interface Props {
  selectAnswer?: (option: string, question: string) => void;
}

const Quiz = ({ selectAnswer }: Props) => {
  const context = useContext(QuizParamsContext);
  const { quiz, isSubmitted } = context;

  return (
    <section>
      {quiz?.map(
        ({
          question,
          incorrect_answers,
          correct_answer,
          user_answer,
          options,
        }: Question) => (
          <div key={question}>
            <p>{he.decode(question)}</p>
            <div className="options">
              {options.map((option: string) => (
                <Button
                  color="green"
                  danger={
                    // Red background
                    isSubmitted &&
                    option !== correct_answer &&
                    user_answer === option
                  }
                  type={
                    // If 'primary' => highlighted (red or green based on danger)
                    (isSubmitted && option === correct_answer) ||
                    option === user_answer
                      ? 'primary'
                      : undefined
                  }
                  onClick={() =>
                    !isSubmitted &&
                    selectAnswer &&
                    selectAnswer(option, question)
                  }
                  key={option}
                >
                  {he.decode(option)}
                </Button>
              ))}
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default Quiz;
