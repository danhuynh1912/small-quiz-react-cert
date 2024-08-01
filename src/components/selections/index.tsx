import { useContext, useRef } from 'react';
import { Button, Select } from 'antd';

import useQuery from '../../hooks/useQuery';
import { difficultyLevels } from '../../constants';
import { QuizParamsContext } from '../../context/QuizContext.tsx';
import {
  QuizParams,
  SelectStateKeyName,
  TriviaCategoriesData,
} from '../../type';

import './index.css';

const difficultyOptions = difficultyLevels.map((level) => ({
  value: level.toLowerCase(),
  label: level,
}));

const Selections = () => {
  const selectedRef = useRef<QuizParams>({});
  const context = useContext(QuizParamsContext);

  const { quizParams, selectParams } = context;

  const { data, isLoading } = useQuery<TriviaCategoriesData, null>({
    baseUrl: 'https://opentdb.com/api_category.php',
  });

  const handleCreate = () => {
    selectParams({ ...quizParams, ...selectedRef.current });
  };

  const handleChange = (
    value: string | number,
    keyName: SelectStateKeyName
  ) => {
    selectedRef.current = { ...selectedRef.current, [keyName]: value };
  };

  const cateforyOptions =
    data?.trivia_categories?.map((cate) => ({
      value: cate.id,
      label: cate.name,
    })) ?? [];

  return (
    <section className="selectors">
      <Select
        id="categorySelect"
        className="selector"
        loading={isLoading}
        placeholder="Select a category"
        onChange={(value) => handleChange(value, 'category')}
        options={cateforyOptions}
      />
      <Select
        id="difficultySelect"
        className="selector"
        placeholder="Select difficulty"
        onChange={(value) => handleChange(value, 'difficulty')}
        options={difficultyOptions}
      />
      <Button id="createBtn" onClick={handleCreate}>
        Create
      </Button>
    </section>
  );
};

export default Selections;
