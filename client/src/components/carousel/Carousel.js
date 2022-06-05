import styled from "styled-components";
import { useRef, useState } from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import placeholder from "../../assets/1.PNG";

const Carousel = ({ topGames }) => {
  // setting function for homepage carousel
  const listRef = useRef();
  const [slideNumber, setSlideNumber] = useState(0);
  const handleClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 370;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${160 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 12) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-160 + distance}px)`;
    }
  };
  return (
    <LlistWrapper>
      <RiArrowLeftSLine
        size={"30px"}
        className="sliderArrow left"
        onClick={() => {
          handleClick("left");
        }}
      />
      <Lists ref={listRef}>
        {topGames?.map((game) => {
          return <img src={game.background_image} />;
        })}
      </Lists>
      <RiArrowRightSLine
        size={"30px"}
        className="sliderArrow right"
        onClick={() => {
          handleClick("right");
        }}
      />
    </LlistWrapper>
  );
};

export default Carousel;

// styling the carousel
const LlistWrapper = styled.div`
  background-color: var(--color-primary);
  padding: 15px 0px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  width: 100%;
  position: relative;
  & .sliderArrow {
    color: var(--color-font);
    position: absolute;
    z-index: 1000;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    background-color: var(--color-primary);
    height: 100%;
    :hover {
      color: #4bacdd;
    }
  }
  & .left {
    left: 0;
  }
  & .right {
    right: 0;
  }
`;
const Lists = styled.div`
  width: max-content;
  width: calc(100% - 40px);
  display: flex;
  transform: translateX(0px);
  transition: all 1s ease;
  img {
    max-width: 155px;
    max-height: 120px;
    margin-right: 10px;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    :hover {
      transform: scale(1.2);
    }
  }
`;
