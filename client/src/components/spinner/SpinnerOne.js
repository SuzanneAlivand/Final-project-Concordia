import styled from "styled-components";
import mario from "../../assets/mario.gif";
const Spinner = () => {
  return (
    <Div>
      <img src={mario} />
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
    max-width: 10vw;
    height: auto;
  }
`;
