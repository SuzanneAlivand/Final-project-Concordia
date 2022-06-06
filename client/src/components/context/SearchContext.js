import { createContext, useState, useEffect, useContext } from "react";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchGame, setSearchGame] = useState([]);
  const [error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let slug = searchTerm.split(" ").join("-").toLowerCase();
      if (slug) {
        fetch(`/api/search?slug=${slug}&page=${page}`)
          .then((res) => res.json())
          .then((data) => {
            setSearchGame(data.data.results);
            setPageCount(Math.ceil(data.data.count / 20));
            setLoaded(true);
            console.log(data.data.next);
          })
          .catch((error) => setError(true));
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchGame,
        setSearchGame,
        setError,
        setPageCount,
        pageCount,
        page,
        setPage,
        loaded,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export default SearchProvider;
