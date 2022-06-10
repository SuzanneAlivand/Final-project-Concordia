import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
const SpinnerFive = ({ size }) => {
  return (
    <Div>
      <CircularProgress size={size} style={{ color: "var(--color-font)" }} />
    </Div>
  );
};

export default SpinnerFive;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-font);
  img {
    width: 10vw;
    height: 10v;
  }
`;
