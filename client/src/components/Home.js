import styled from "styled-components";
import { useRef, useState } from "react";
import backgroundOne from "../assets/background.jpg";
import Carousel from "./carousel/Carousel";

const Home = () => {
  // setting function for homepage carousel
  const listRef = useRef();
  const [slideNumber, setSlideNumber] = useState(0);
  const handleClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 350;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${160 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 13) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-160 + distance}px)`;
    }
  };

  return (
    <Wrapper>
      <WelcomeDiv>
        <h2>
          Welcome to <spn style={{ color: "#0ccbff" }}>MY Catlog!</spn>
        </h2>
        <p>
          This website helps you to organize and keep track of your video games.
          Search for any game and add it to your library. Various info about
          each of your games will be shown to you so that you can decide what to
          play next. You can also mark any game as in-progress, completed or
          abandoned.
        </p>
        <button>Get started</button>
      </WelcomeDiv>
      <Carousel handleClick={handleClick} listRef={listRef} />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
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
