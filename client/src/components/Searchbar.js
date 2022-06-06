import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SearchContext } from "./context/SearchContext";

const Searchbar = () => {
  const { searchTerm, setSearchTerm, searchGame } = useContext(SearchContext);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // fetching the number of all games for showing on the search placeholder
  const [allGameCount, setAllGameCount] = useState(0);
  useEffect(() => {
    fetch(`/api/games`)
      .then((res) => res.json())
      .then((data) => {
        setAllGameCount(data.data.count);
      })
      .catch((error) => console.log(error));
  }, []);
  //............................................
  // use this function for adding , in number
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const history = useHistory();
  const handleKeyPress = (e) => {
    switch (e.key) {
      case "Enter": {
        if (searchGame.length !== 0 && e.target.value.length !== 0) {
          history.push("/search");
        }
      }
    }
  };

  return (
    <Div id="searchbar">
      <input
        onKeyDown={(e) => handleKeyPress(e)}
        onChange={handleChange}
        value={searchTerm}
        type="text"
        placeholder={
          allGameCount
            ? `search among ${numberWithCommas(allGameCount)} games ...`
            : "search for a game ..."
        }
      />
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
    width: 500px;
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
