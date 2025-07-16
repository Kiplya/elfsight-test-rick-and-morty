import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character';

export function DataProvider({ children }) {
  const [params, setParams] = useState(() => {
    const initial = new URLSearchParams(window.location.search);
    if (!initial.has('page')) {
      initial.set('page', '1');
      window.history.replaceState({}, '', `?${initial.toString()}`);
    }

    return initial;
  });

  const updateParams = useCallback(
    (key, value) => {
      const updated = new URLSearchParams(params.toString());
      updated.set(key, value);
      setParams(updated);
      window.history.replaceState({}, '', `?${updated.toString()}`);
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

      axios
        .get(url, { params })
        .then(({ data }) => {
          setCharacters(data.results);
          setInfo(data.info);
        })
        .catch((e) => {
          setIsError(true);
          console.error(e);
        })
        .finally(() => {
          setIsFetching(false);
        });
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
      characters,
      fetchData,
      isFetching,
      isError,
      info
    }),
    [characters, isFetching, isError, info, fetchData, updateParams, params]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
