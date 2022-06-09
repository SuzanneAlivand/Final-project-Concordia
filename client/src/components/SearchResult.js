import styled from "styled-components";
import { useContext } from "react";
import { SearchContext } from "./context and reducers/SearchContext";
import Pagination from "./pagination/Pagination";
import Error from "./Error";
import Spinner from "./spinner/spinner";

const SearchResult = () => {
  const { searchGame, error, pageCount, setPage, loaded } =
    useContext(SearchContext);

  return (
    <>
      {!error ? (
        loaded ? (
          <Wrapper>
            {searchGame?.map((game, index) => {
              return <img key={index} src={game.background_image} />;
            })}
            <Pagination setPage={setPage} pageCount={pageCount} />
          </Wrapper>
        ) : (
          <Spinner />
        )
      ) : (
        <Error />
      )}
    </>
  );
};

export default SearchResult;

const Wrapper = styled.div`
  color: var(--color-font);
  padding: 120px 60px 0px 60px;
  height: 100vh;
  background-color: #010206;
  margin-left: 270px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  img {
    max-width: 170px;
    max-height: 140px;
  }
`;
