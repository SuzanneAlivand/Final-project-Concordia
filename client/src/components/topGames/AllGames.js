import styled from "styled-components";
import { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import SpinnerOne from "../spinner/SpinnerOne";
import Rating from "../gameParameters/Rating";
import LibraryMenu from "../LibraryMenu";
import Platforms from "../gameParameters/Platforms";
import Genres from "../gameParameters/Genres";
import Metacritic from "../gameParameters/Metacritic";
import Error from "../Error";

const AllGames = () => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [topGames, setTopGames] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetch(`/api/games?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setTopGames(data.data.results);
        setPageCount(Math.ceil(data.data.count / 20));
        setLoaded(true);
      })
      .catch((error) => setError(true));
  }, [page]);

  return (
    <Wrapper id="main-wrapper">
      {!error ? (
        loaded ? (
          <>
            <Games>
              {topGames?.map((game) => {
                return (
                  <GameDiv key={game.id}>
                    <GameImage>
                      <Image src={game.background_image} />
                      <Info>
                        <h4>{game.name}</h4>
                        <Rating value={Number(game.rating)} />
                        {game.metacritic > 0 ? (
                          <Metacritic metacritic={game.metacritic} />
                        ) : (
                          <p>
                            Metascore: <span>N/A</span>
                          </p>
                        )}
                        <p>
                          Playtime:{" "}
                          {game.playtime > 0 ? game.playtime + " h" : "N/A"}
                        </p>
                      </Info>
                    </GameImage>
                    <LibraryDiv>
                      <PlatformsDiv>
                        <Platforms platforms={game.parent_platforms} />
                        <Genres geners={game.genres} />
                      </PlatformsDiv>
                      <LibraryMenu gameId={game.id} />
                    </LibraryDiv>
                  </GameDiv>
                );
              })}
            </Games>
            <Pagination setPage={setPage} pageCount={pageCount} />
          </>
        ) : (
          <SpinnerOne />
        )
      ) : (
        <Error />
      )}
    </Wrapper>
  );
};

export default AllGames;

const Wrapper = styled.div`
  color: var(--color-font);
  padding: 120px 60px 0px 60px;
  height: 100vh;
  background-color: #131d29;
  margin-left: 270px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Games = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  min-height: 500px;
`;
const GameDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  min-height: 230px;
  background-color: #010206;
  border-radius: 6px;
  margin-bottom: 40px;
  padding: 15px;
`;
const Image = styled.img`
  max-width: 260px;
  min-width: 260px;
  max-height: 140px;
  min-height: 120px;
  border-radius: 6px;
  margin-right: 20px;
`;
const GameImage = styled.div`
  display: flex;
  padding-bottom: 15px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h4 {
    color: var(--color-secondary);
  }
`;
const PlatformsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const LibraryDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
