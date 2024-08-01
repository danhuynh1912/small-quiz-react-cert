import { useEffect, useState } from 'react';

import { getParamsStringFrom } from '../utils/getParamsStringFromObject';

const useQuery = <Data, Param>({
  baseUrl = '',
  params,
  onSuccess,
  skip,
}: {
  baseUrl: string;
  params?: Param;
  skip?: boolean;
  onSuccess?: (data: Data) => void;
}) => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      !isLoading && setIsLoading(true);

      const paramsString = getParamsStringFrom(params);
      const url = paramsString ? `${baseUrl}?${paramsString}` : baseUrl;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 429) {
            alert('Rate limit exceeded. Please try again later.');
            throw new Error('Rate limit exceeded. Please try again later.');
          } else throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setData(data);
        onSuccess && onSuccess(data);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    };

    !skip && fetchData();
  }, [skip, JSON.stringify(params)]);

  return { data, isLoading: isLoading && !skip, error };
};

export default useQuery;
