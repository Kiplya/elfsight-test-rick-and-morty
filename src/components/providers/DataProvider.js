import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';

export const API_URL = 'https://rickandmortyapi.com/api/character';

export function DataProvider({ children }) {
  const [params, setParams] = useState(() => {
    const initial = new URLSearchParams(window.location.search);
    if (!initial.has('page')) {
      initial.set('page', '1');
      window.history.replaceState({}, '', `?${initial.toString()}`);
    }

    return initial;
  });

  const resetParams = useCallback(() => {
    const reseted = new URLSearchParams();
    reseted.set('page', '1');
    setParams(reseted);

    window.history.pushState({}, '', `?${reseted.toString()}`);
  }, []);

  const updateParams = useCallback(
    (queryParams) => {
      let updated = new URLSearchParams(params.toString());

      if (!queryParams.length) {
        updated = new URLSearchParams(window.location.search);
        window.history.replaceState({}, '', `?${updated.toString()}`);
      } else {
        queryParams.forEach((param) => updated.set(param.key, param.value));
        window.history.pushState({}, '', `?${updated.toString()}`);
      }

      setParams(updated);
    },
    [params]
  );

  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(
    async (url) => {
      setIsFetching(true);
      setIsError(false);

      try {
        const { data } = await axios.get(url, { params });

        setCharacters(data.results);
        setInfo(data.info);
      } catch (err) {
        setIsError(true);
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    },

    [params]
  );

  useEffect(() => {
    fetchData(API_URL);
  }, [fetchData]);

  const dataValue = useMemo(
    () => ({
      params,
      updateParams,
      resetParams,
      characters,
      fetchData,
      isFetching,
      isError,
      info
    }),
    [
      characters,
      isFetching,
      isError,
      info,
      fetchData,
      updateParams,
      resetParams,
      params
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
