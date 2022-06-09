import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LibraryContext } from "../context and reducers/LibraryContext";
import Rating from "../gameParameters/Rating";
import Metacritic from "../gameParameters/Metacritic";
import Platforms from "../gameParameters/Platforms";
import LibraryMenu from "../LibraryMenu";
import Genres from "../gameParameters/Genres";
import SpinnerOne from "../spinner/SpinnerOne";

const Backlog = () => {
  const { user } = useAuth0();
  const { backlog, setBacklog } = useContext(LibraryContext);
  const [backlogGames, setBacklogGames] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // get list of backlogs from backend
  useEffect(() => {
    if (user) {
      const headers = { email: user.email };
      fetch("/api/backlog", { headers })
        .then((res) => res.json())
        .then((data) => {
          // setPageCount(Math.ceil(data.data.count / 20));
          setBacklog(data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);
  

  // geting all the games of backlog from their IDs
  useEffect(() => {
    if (backlog) {
      const backlogLength = backlog.length;
      let fetchTracker = 0;
      const gamesInBacklog = [];
      if (backlog.length !== 0) {
        backlog.map((id) => {
          fetch(`/api/game?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
              fetchTracker++;
              console.log("fetch tracker is " + fetchTracker);
              if (!gamesInBacklog.includes(data.data)) {
                gamesInBacklog.push(data.data);
              }
              if (fetchTracker === backlogLength) {
                console.log("done fetching!");
                setLoaded(true);
                setBacklogGames(gamesInBacklog);
              }
            })
            .catch((error) => console.log(error));
        });
      } else {
        setLoaded(true);
        setBacklogGames([]);
      }
    }
  }, [backlog]);

  // console.log(backlogIdList);

  return (
    <Wrapper id="main-wrapper">
      {loaded ? (
        <>
          <Games>
            {backlogGames.map((game, index) => {
              return (
                <GameDiv key={`${index}backlog`}>
                  <GameImage>
                    <img src={game.background_image} />
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
          {/* <Pagination setPage={setPage} pageCount={pageCount} /> */}
        </>
      ) : (
        <SpinnerOne />
      )}
    </Wrapper>
  );
};

export default Backlog;

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
  img {
    max-width: 260px;
    min-width: 260px;
    max-height: 140px;
    min-height: 120px;
    border-radius: 6px;
    margin-right: 20px;
  }
`;
const Games = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
`;
const GameDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  height: 230px;
  background-color: #010206;
  border-radius: 6px;
  margin-bottom: 40px;
  padding: 15px;
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
