import styled from "styled-components";
import { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LibraryContext } from "../context and reducers/LibraryContext";

const Backlog = () => {
  const { user } = useAuth0();
  const { backlog } = useContext(LibraryContext);
  console.log(backlog);

  // get list of backlogs from backend
  useEffect(() => {
    if (user) {
      const headers = { email: user.email };
      fetch("/api/backlog", { headers })
        .then((res) => res.json())
        .then((data) => {
          // setPageCount(Math.ceil(data.data.count / 20));
          console.log(data.data);
        })
        .catch((error) => console.log(true));
    }
  }, [user, backlog]);

  return <Wrapper>hi</Wrapper>;
};

export default Backlog;

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
  img {
    max-width: 260px;
    min-width: 260px;
    max-height: 140px;
    min-height: 120px;
    border-radius: 6px;
    margin-right: 20px;
  }
`;
