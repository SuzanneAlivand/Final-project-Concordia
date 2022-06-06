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
    let slug = searchTerm.split(" ").join("-").toLowerCase();
    fetch(`/api/search?slug=${slug}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchGame(data.data.results);
        setPageCount(Math.ceil(data.data.count / 20));
        setLoaded(true);
      })
      .catch((error) => setError(true));
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
