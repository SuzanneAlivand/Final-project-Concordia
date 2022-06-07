import styled from "styled-components";
import Searchbar from "./Searchbar";
import avatar from "../assets/avatar.png";
import { useEffect, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { RiLoginBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
  const [error, setError] = useState(false);

  // Auth0 functions
  const handleClick = () => {
    setToggleProfileMenu(!toggleProfileMenu);
  };
  const handleLogIn = () => {
    loginWithRedirect();
  };
  const handleLogOut = () => {
    logout();
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
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          setError(true);
        });
    }
  }, [user]);

  console.log(user);
  return (
    <Div>
      <Container>
        <SearchbarDiv>
          <Searchbar />
        </SearchbarDiv>
        <ProfileMenu>
          <Profile onClick={handleClick}>
            {user ? (
              <img src={user.picture} alt="profile" />
            ) : (
              <img src={avatar} alt="profile" />
            )}
          </Profile>
          {toggleProfileMenu && user && (
            <UserMenuWrapper id="UserMenuWrapper">
              <MenuItem>
                <CgProfile style={{ marginRight: "8px" }} />
                <p>Profile</p>
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <RiLogoutBoxRLine style={{ marginRight: "8px" }} />
                <p>Logout</p>
              </MenuItem>
            </UserMenuWrapper>
          )}
          {toggleProfileMenu && !user && (
            <UserMenuWrapper id="UserMenuWrapper">
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
  :hover {
    #UserMenuWrapper {
      opacity: 1;
      transform: translateY(0px);
    }
  }
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
  transform: translateY(-10px);
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
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
