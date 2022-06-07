import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
const Spinner = () => {
  return (
    <Div>
      <CircularProgress style={{ color: "var(--color-font)" }} />
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
