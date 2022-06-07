import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import undertale from "../../assets/undertale.gif";
const Spinner = () => {
  return (
    <Div>
      <img src={undertale} />
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
    max-width: 3vw;
    height: auto;
  }
`;
