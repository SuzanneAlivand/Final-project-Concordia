import { useState, useRef, useEffect, useContext } from "react";
import { HiPlus } from "react-icons/hi";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { GiSpiderWeb } from "react-icons/gi";
import { GiRetroController } from "react-icons/gi";
import { GiMedallist } from "react-icons/gi";
import { VscLibrary } from "react-icons/vsc";
import { LibraryContext } from "./context and reducers/LibraryContext";

const LibraryMenu = ({ gameId }) => {
  const [toggleMenu, setToggleMenue] = useState(false);
  const { user, loginWithRedirect } = useAuth0();
  const menuRef = useRef(null);
  const { handleBacklog, handleCompleted, handleInProgress, handleAbandoned } =
    useContext(LibraryContext);
  //......................
  // by click on + open the menu if user is logged in
  const handleClick = () => {
    if (user) {
      setToggleMenue(!toggleMenu);
    } else {
      loginWithRedirect();
    }
  };
  //......................
  // click on other part of the page shoud closes th menu
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (menuRef.current !== null && !menuRef.current.contains(e.target)) {
        setToggleMenue(!toggleMenu);
      }
    };
    if (toggleMenu) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [toggleMenu]);

  return (
    <Div>
      <button ref={menuRef} onClick={handleClick}>
        <HiPlus size="20px" />
      </button>
      {user && (
        <Menu className={toggleMenu ? "active" : ""}>
          <MenuItem
            onClick={() => {
              handleBacklog(gameId);
            }}
          >
            <VscLibrary
              style={{ marginRight: "6px", color: "var(--color-secondary)" }}
            />
            <p>Backlog</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleInProgress(gameId);
            }}
          >
            <GiRetroController
              style={{ marginRight: "6px", color: "#ff9900" }}
            />
            <p>In Progress</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCompleted(gameId);
            }}
          >
            <GiMedallist style={{ marginRight: "6px", color: "#00ff00" }} />
            <p>Completed</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleAbandoned(gameId);
            }}
          >
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
  position: relative;
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
  border-radius: 6px;
  height: 140px;
  width: 135px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 5px;
  background-color: #010206;
  padding: 10px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out,
    visibility 250ms;
  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0px);
  }
`;
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 4px;
  border-radius: 2px;
  :hover {
    background-color: #131d29;
    cursor: pointer;
  }
`;
