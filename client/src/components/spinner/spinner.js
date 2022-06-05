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
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: hsl(258deg, 100%, 50%);
  height: 100%;
  width: 100%;
`;
