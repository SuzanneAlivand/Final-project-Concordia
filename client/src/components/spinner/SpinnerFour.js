import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import blaze from "../../assets/blaze.gif";
const Spinner = () => {
  return (
    <Div>
      <img src={blaze} />
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
    width: 5vw;
    height: auto;
  }
`;
