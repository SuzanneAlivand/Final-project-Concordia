import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import backgroundOne from "../assets/background.jpg";
import Carousel from "./carousel/Carousel";
import Spinner from "./spinner/spinner";

const Home = () => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [topGames, setTopGames] = useState([]);

  const page = Math.floor(Math.random() * 13);
  // fetching some of top games
  useEffect(() => {
    if (!loaded) {
      fetch(`/api/20topgames/${page}`)
        .then((res) => res.json())
        .then((data) => {
          setTopGames(data.data.results);
        })
        .catch((error) => setError(true))
        .finally(() => {
          setLoaded(true);
        });
    }
  }, []);

  return (
    <Wrapper>
      {topGames.length > 0 ? (
        <>
          <WelcomeDiv>
            <h2>
              Welcome to <span style={{ color: "#0ccbff" }}>MY Catlog!</span>
            </h2>
            <p>
              This website helps you to organize and keep track of your video
              games. Search for any game and add it to your library. Various
              info about each of your games will be shown to you so that you can
              decide what to play next. You can also mark any game as
              in-progress, completed or abandoned.
            </p>
            <button>Get started</button>
          </WelcomeDiv>
          <Carousel topGames={topGames} />
        </>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  border-width: 85px 5px 5px 5px;
  border-style: solid;
  border-color: #2c3032;
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
  background-image: url(${backgroundOne});
  background-size: cover;
`;
const WelcomeDiv = styled.div`
  color: var(--color-font);
  width: 450px;
  h2 {
    margin-bottom: 10px;
  }
  p {
    text-align: justify;
    text-justify: inter-word;
  }
  button {
    margin-top: 20px;
    border-radius: 5px;
    border: none;
    padding: 4px 10px;
    background-color: #0ccbff;
    cursor: pointer;
    transition: transform 200ms ease-in;
    transition: background-color 200ms ease-in-out;
    :hover {
      background-color: var(--color-tertiary);
      transform: scale(1.03);
    }
  }
`;
