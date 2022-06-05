import styled from "styled-components";

const LogoTopic = ({ text, Icon }) => {
  return (
    <Div>
      <div>
        <Icon />
      </div>
      <p>{text}</p>
    </Div>
  );
};

export default LogoTopic;

const Div = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px 0px 0px 0px;
  border-radius: 4px;
  transition: transform 200ms ease-in-out;
  div {
    padding: 2px 5px;
    border-radius: 4px;
    margin-right: 10px;
  }
  :hover {
    background-color: #131d29;
    transform: scale(1.05);
    color: var(--color-secondary);
  }
`;
