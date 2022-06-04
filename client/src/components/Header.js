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
  width: 100%;
  height: 80px;
  background-color: var(--color-primary);
  color: var(--color-font);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 40%;
`;

const SearchbarDiv = styled.div`
  flex: 9;
`;
const Profile = styled.div`
  flex: 1;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
