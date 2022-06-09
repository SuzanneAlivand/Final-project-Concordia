import styled from "styled-components";

const Abandoned = () => {
  return <Wrapper>Hi</Wrapper>;
};

export default Abandoned;

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