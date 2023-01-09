import { useState } from 'react';
import { ETHDeposits } from '../utilities';
import { fetchData } from '../utilities/fetch';

export const useHome = () => {
  const [data, setData] = useState<ETHDeposits>([]);

  // Fetch data from the subgraph
  const getData = async () => {
    const results = await fetchData(100);
    if (results) {
      setData(results);
    }
  };

  return { data, getData };
};
