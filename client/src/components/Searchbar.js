import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";

const Searchbar = () => {
  return (
    <Div id="searchbar">
      <input type="text" placeholder="Search for a game..." />
      <div style={{ position: "absolute", top: "8px", left: "10px" }}>
        <BiSearchAlt color={"var(--primary-font)"} size={24} />
      </div>
    </Div>
  );
};

export default Searchbar;
const Div = styled.div`
  position: relative;
  input {
    width: 30vw;
    padding: 10px 10px 10px 40px;
    border-radius: 15vh;
    background-color: #131d29;
    border: none;
    outline: none;
    color: var(--primary-font);
    :focus {
      background-color: #2c3032;
    }
  }
  :focus-within {
    div {
      color: #4bacdd;
    }
  }
`;
