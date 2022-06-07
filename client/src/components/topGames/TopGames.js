import styled from "styled-components";
import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import SpinnerFour from "../spinner/SpinnerFour.js";

const TopGames = () => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [topGames, setTopGames] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetch(`/api/top250games?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setTopGames(data.data.results);
        setPageCount(Math.ceil(data.data.count / 20));
        setLoaded(true);
      })
      .catch((error) => setError(true));
  }, [page]);

  return (
    <Wrapper>
      {loaded ? (
        <>
          {topGames?.map((game) => {
            return <img src={game.background_image} />;
          })}
          <Pagination setPage={setPage} pageCount={pageCount} />
        </>
      ) : (
        <SpinnerFour />
      )}
    </Wrapper>
  );
};

export default TopGames;

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
