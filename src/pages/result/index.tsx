import { useContext } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import Quiz from '../../components/quiz';
import { QuizParamsContext } from '../../context/QuizContext';

const Result = () => {
  const navigate = useNavigate();
  const context = useContext(QuizParamsContext);
  const { isSubmitted, result, reset } = context;

  const handleCreateANewQuiz = () => {
    navigate('/');
    reset();
  };

  return (
    <>
      {isSubmitted ? <h3>Result:</h3> : null}
      <Quiz />
      <br />
      {isSubmitted ? (
        <div className={`score ${result.className}`}>
          <p>{result.message}</p>
        </div>
      ) : null}
      <br />
      <Button onClick={handleCreateANewQuiz}>Create a new quiz</Button>
    </>
  );
};

export default Result;
