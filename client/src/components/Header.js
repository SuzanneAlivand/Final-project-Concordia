import styled from "styled-components";
import Searchbar from "./Searchbar";
import avatar from "../assets/avatar.png";

const Header = () => {
  return (
    <Div>
      <Container>
        <SearchbarDiv>
          <Searchbar />
        </SearchbarDiv>
        <Profile>
          <img src={avatar} alt="profile" />
        </Profile>
      </Container>
    </Div>
  );
};

export default Header;

const Div = styled.div`
  width: inherit;
  height: 80px;
  background-color: var(--color-primary);
  color: var(--color-font);
  position: fixed;
`;

const Container = styled.div`
  min-width: 1530px;
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 270px;
  justify-content: space-between;
`;

const SearchbarDiv = styled.div`
  margin-left: 360px;
`;
const Profile = styled.div`
  margin-right: 5px;
  img {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
