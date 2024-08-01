import { useContext } from 'react';

import Quiz from '../../components/quiz';
import Selections from '../../components/selections';
import useQuery from '../../hooks/useQuery';
import { QuizParamsContext } from '../../context/QuizContext';
import { Question, QuizParams, TriviaQuizData } from '../../type';
import { getShuffledArray } from '../../utils/getShuffledArray';
import { Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const context = useContext(QuizParamsContext);
  const { quizParams, quiz, updateQuiz, setIsSubmitted, isSubmittable } =
    context;

  const { isLoading } = useQuery<TriviaQuizData, QuizParams>({
    baseUrl: 'https://opentdb.com/api.php',
    params: { ...quizParams },
    skip: Object.keys(quizParams).length !== 4,
    onSuccess: (data: TriviaQuizData) => {
      const shuffledQuiz = [...data.results]?.map((question: Question) => ({
        ...question,
        options: getShuffledArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }));
      updateQuiz(shuffledQuiz);
    },
  });

  const selectAnswer = (option: string, correspondingQuestion: string) => {
    const updatedQuiz = [...quiz].map((question) => ({
      ...question,
      user_answer:
        correspondingQuestion === question.question
          ? option
          : question.user_answer,
    }));

    updateQuiz(updatedQuiz);
  };

  const onSubmit = () => {
    navigate('/result');
    setIsSubmitted && setIsSubmitted(true);
  };

  return (
    <>
      <Selections />
      {isLoading ? <Spin /> : <Quiz selectAnswer={selectAnswer} />}
      <br />
      <br />
      {isSubmittable ? <Button onClick={onSubmit}>Submit</Button> : null}
    </>
  );
};

export default Home;
