import styled from "styled-components";

const Strategy = () => {
  return <Wrapper>strategy</Wrapper>;
};

export default Strategy;

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
