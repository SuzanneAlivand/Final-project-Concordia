import styled from "styled-components";
import axel from "../../assets/axel.gif";
const Spinner = () => {
  return (
    <Div>
      <img src={axel} />
    </Div>
  );
};

export default Spinner;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-font);
  height: 100vh;
  padding: 50px;
  img {
    width: 15vw;
    height: auto;
  }
`;
