import styled from "styled-components";
import Searchbar from "./Searchbar";
import avatar from "../assets/avatar.png";
import { useEffect, useRef, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { RiLoginBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const { loginWithRedirect, logout, user } = useAuth0();
  const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
  const [error, setError] = useState(false);
  const menuRef = useRef(null);

  // Auth0 functions
  const handleClick = () => {
    setToggleProfileMenu(!toggleProfileMenu);
  };
  const handleLogIn = () => {
    loginWithRedirect();
  };
  const handleLogOut = () => {
    logout({ returnTo: window.location.origin });
  };
  const handleSignUp = () => {
    loginWithRedirect();
  };
  //.................
  // add user to mongodb
  useEffect(() => {
    if (user) {
      fetch("/api/new-user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user }),
      })
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => {
          setError(true);
        });
    }
  }, [user]);

  // dropdown being closed when clicking other part of the page
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (menuRef.current !== null && !menuRef.current.contains(e.target)) {
        setToggleProfileMenu(!toggleProfileMenu);
      }
    };
    if (toggleProfileMenu) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [toggleProfileMenu]);

  const history = useHistory();
  const handleGoToProfile = () => {
    history.push("/profile");
  };

  return (
    <Div>
      <Container>
        <SearchbarDiv>
          <Searchbar />
        </SearchbarDiv>
        <ProfileMenu>
          <Profile onClick={handleClick} ref={menuRef}>
            {user ? (
              <img src={user.picture} alt="profile" />
            ) : (
              <img src={avatar} alt="profile" />
            )}
          </Profile>
          {user && (
            <UserMenuWrapper className={toggleProfileMenu ? "active" : ""}>
              <MenuItem onClick={handleGoToProfile}>
                <CgProfile style={{ marginRight: "8px" }} />
                <p>Profile</p>
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <RiLogoutBoxRLine style={{ marginRight: "8px" }} />
                <p>Logout</p>
              </MenuItem>
            </UserMenuWrapper>
          )}
          {!user && (
            <UserMenuWrapper className={toggleProfileMenu ? "active" : ""}>
              <MenuItem onClick={handleLogIn}>
                <RiLoginBoxLine style={{ marginRight: "8px" }} />
                <p>Log In</p>
              </MenuItem>
              <MenuItem onClick={handleSignUp}>
                <FiUserPlus style={{ marginRight: "8px" }} />
                <p>Sign Up</p>
              </MenuItem>
            </UserMenuWrapper>
          )}
        </ProfileMenu>
      </Container>
    </Div>
  );
};

export default Header;

const Div = styled.div`
  z-index: 9;
  width: 1600;
  height: 80px;
  background-color: var(--color-primary);
  color: var(--color-font);
  position: fixed;
`;

const Container = styled.div`
  min-width: 1330px;
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 270px;
  justify-content: space-between;
`;

const SearchbarDiv = styled.div`
  margin-left: 360px;
`;
const Profile = styled.button`
  margin-right: 80px;
  outline: none;
  border: none;
  background-color: var(--color-primary);
  right: 0;
  img {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    animation-name: example;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    @keyframes example {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;
const ProfileMenu = styled.div`
  position: relative;
`;
const UserMenuWrapper = styled.div`
  position: absolute;
  top: calc(100% + 0.25rem);
  right: 90px;
  background-color: #000708;
  color: var(--color-font);
  display: flex;
  flex-direction: column;
  width: 110px;
  border-radius: 4px;
  padding: 10px 5px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
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
  padding: 5px;
  border-radius: 5px;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #131d29;
  }
`;
