import styled from "styled-components";

const Metacritic = ({ metacritic }) => {
  return (
    <p>
      MetaScore:{"  "}
      <Span
        color={
          metacritic >= 85
            ? "#009900"
            : metacritic >= 70 && metacritic < 85
            ? "#00ff00"
            : metacritic >= 50 && metacritic < 70
            ? "#ff9900"
            : "#ff0000"
        }
      >
        {metacritic}
      </Span>
    </p>
  );
};
export default Metacritic;

const Span = styled.span`
  color: ${(p) => p.color};
`;
