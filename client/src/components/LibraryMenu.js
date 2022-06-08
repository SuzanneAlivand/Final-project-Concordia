import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { GiSpiderWeb } from "react-icons/gi";
import { GiRetroController } from "react-icons/gi";
import { GiMedallist } from "react-icons/gi";
import { VscLibrary } from "react-icons/vsc";

const LibraryMenu = () => {
  const [toggleMenu, setToggleMenue] = useState(false);
  const { user, loginWithRedirect } = useAuth0();

  const handleClick = () => {
    if (user) {
      setToggleMenue(!toggleMenu);
    } else {
      loginWithRedirect();
    }
  };

  return (
    <Div>
      <button onClick={handleClick}>
        <HiPlus size="20px" />
      </button>
      {toggleMenu && user && (
        <Menu>
          <MenuItem>
            <VscLibrary
              style={{ marginRight: "6px", color: "var(--color-secondary)" }}
            />
            <p>Backlog</p>
          </MenuItem>
          <MenuItem>
            <GiRetroController
              style={{ marginRight: "6px", color: "#ff9900" }}
            />
            <p>In Progress</p>
          </MenuItem>
          <MenuItem>
            <GiMedallist style={{ marginRight: "6px", color: "#00ff00" }} />
            <p>Completed</p>
          </MenuItem>
          <MenuItem>
            <GiSpiderWeb style={{ marginRight: "6px", color: "#ff0000" }} />
            <p>Abandoned</p>
          </MenuItem>
        </Menu>
      )}
    </Div>
  );
};

export default LibraryMenu;

const Div = styled.div`
  position:  relative;
  button {
    border: none;
    margin-right: 10px;
    cursor: pointer;
    align-content: center;
    background-color: #131d29;
    color: var(--color-font);
    border-radius: 2px;
    display: flex;
    padding: 3px 5px;
  }
`;
const Menu = styled.div`
  position: absolute;
  /* position: sticky; */
  border-radius: 6px;
  height: 140px;
  width: 135px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 5px;
  background-color: #010206;
  padding: 10px;
`;
const MenuItem = styled.div`
  /* position: sticky; */
  display: flex;
  align-items: center;
  padding: 2px 4px;
  border-radius: 2px;
  :hover {
    background-color: #131d29;
  }
`;
