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
import { FiX } from "react-icons/fi";
import Pagination from "../pagination/Pagination";
import Error from "../Error";

const Completed = () => {
  const { user, loginWithRedirect, isLoading } = useAuth0();
  const { completed, setCompleted } = useContext(LibraryContext);
  const [completedGame, setCompletedGame] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState(false);

  // get a list of backlog games'IDs from backend
  useEffect(() => {
    if (user) {
      const headers = { email: user.email };
      fetch("/api/completed", { headers })
        .then((res) => res.json())
        .then((data) => {
          setPageCount(Math.ceil(data.data.length / 20));
          setCompleted(data.data);
        })
        .catch((error) => setError(true));
    }
  }, [user]);

  // geting all the games of backlog from their IDs
  useEffect(() => {
    if (completed) {
      const completedLength = completed.length;
      let fetchTracker = 0;
      const gamesInCompleted = [];
      if (completed.length !== 0) {
        completed.map((id) => {
          fetch(`/api/game?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
              fetchTracker++;
              if (!gamesInCompleted.includes(data.data)) {
                gamesInCompleted.push(data.data);
              }
              if (fetchTracker === completedLength) {
                setLoaded(true);
                setCompletedGame(gamesInCompleted);
              }
            })
            .catch((error) => setError(true));
        });
      } else {
        setLoaded(true);
        setCompletedGame([]);
      }
    }
  }, [completed]);

  useEffect(() => {
    if (user) {
      setLoaded(false);
    }
  }, [user]);

  // handle removing item from list
  const handleRemove = (id) => {
    const headers = { email: user.email };
    fetch(`/api/completed-remove/${id}`, { method: "DELETE", headers })
      .then((res) => res.json())
      .then((data) => {
        setPageCount(Math.ceil(data.data.length / 20));
        setCompleted(data.data);
      })
      .catch((error) => setError(true));
  };

  if (isLoading) {
    return (
      <Wrapper style={{ textAlign: "center" }}>
        <SpinnerOne />
      </Wrapper>
    );
  }

  if (!user) {
    return (
      <Wrapper style={{ textAlign: "center" }}>
        <h3>You need to log in order to access this page!</h3>
        <Button
          onClick={() => {
            loginWithRedirect();
          }}
        >
          Click here
        </Button>
      </Wrapper>
    );
  }

  if (loaded && completedGame.length === 0) {
    return (
      <Wrapper style={{ textAlign: "center" }}>
        <h3>Your list is empty!</h3>
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <Error />
      </Wrapper>
    );
  }
  return (
    <Wrapper id="main-wrapper">
      {loaded && completedGame.length > 0 ? (
        <>
          <Games>
            {completedGame.map((game, index) => {
              return (
                <Game>
                  <GameDiv key={`${index}backlog`}>
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
                  <Remove
                    onClick={() => {
                      handleRemove(game.id);
                    }}
                  >
                    <FiX className="removeIcon" />
                  </Remove>
                </Game>
              );
            })}
          </Games>
          <Pagination setPage={setPage} pageCount={pageCount} />
        </>
      ) : (
        <SpinnerOne />
      )}
    </Wrapper>
  );
};

export default Completed;

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
  h3 {
    margin-bottom: 15px;
  }
`;
const Games = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 500px;
  justify-content: space-around;
  align-items: flex-start;
`;
const Game = styled.div`
  display: flex;
  align-items: flex-start;
`;
const GameDiv = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  min-height: 230px;
  background-color: #010206;
  border-radius: 6px;
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
const Button = styled.button`
  border: none;
  padding: 4px 8px;
  border-radius: 2px;
  cursor: pointer;
  background-color: var(--color-font);
`;
const Remove = styled.button`
  margin-left: 6px;
  padding: 2px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: inherit;
  border: 0.3px solid #333123;
  .removeIcon {
    color: #ff0000;
    cursor: pointer;
    font-size: 20px;
  }
`;
