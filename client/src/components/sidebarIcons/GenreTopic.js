import styled from "styled-components";

const GenreTopic = ({ text, src }) => {
  return (
    <Div>
      <div>
        <img src={src} />
      </div>
      <p>{text}</p>
    </Div>
  );
};

export default GenreTopic;

const Div = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 6px 0px 0px 0px;
  border-radius: 4px;
  img {
      width: 30px;
      height: 30px;
  }
  div {
    padding: 2px 5px;
    border-radius: 4px;
    margin-right: 10px;
  }
  :hover {
    background-color: #131d29;
    font-size: 1.1rem;
    color: var(--color-secondary);
  }
`;
