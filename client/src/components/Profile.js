import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { loginWithRedirect, logout, user } = useAuth0();

  return <Wrapper>profileee</Wrapper>;
};

export default Profile;

const Wrapper = styled.div`
  color: var(--color-font);
  padding: 120px 60px 0px 60px;
  height: 100vh;
  background-color: #131d29;
  margin-left: 270px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
