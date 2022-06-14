import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import { useState, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import Error from "./Error";
import Spinner from "./spinner/spinner";

const Profile = () => {
  const { logout, user, isLoading } = useAuth0();
  const [userInfo, setUserInfo] = useState([]);
  const [error, setError] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [acountOpen, setAcountOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      const headers = { email: user.email };
      fetch("/api/user", { headers })
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data.data);
          setLoaded(true);
        })
        .catch((error) => setError(true));
    }
  }, [user]);

  const handleHistory = () => {
    setHistoryOpen(!historyOpen);
  };

  const handleAcount = () => {
    setAcountOpen(!acountOpen);
  };

  const handleDeleteAcount = () => {
    const headers = { email: user.email };
    fetch("/api/delete-accont", { method: "DELETE", headers })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => setError(true))
      .finally(logout({ returnTo: window.location.origin }));
  };

  if (!isLoading && !user) {
    return (
      <Wrapper style={{ textAlign: "center" }}>
        <h3>You need to login in order to access this page!</h3>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {!error ? (
        loaded ? (
          <>
            <ProfileDev>
              <ImageDiv>
                <img src={userInfo.picture}></img>
              </ImageDiv>
              <Info>
                <h4>Name:</h4>
                <p>{userInfo.name}</p>
                <hr />
                <h4>Email:</h4>
                <p>{userInfo.email}</p>
                <hr />
              </Info>
            </ProfileDev>
            <HistoryDiv>
              <Topic>
                <h3>History</h3>
                <button className="clickButton" onClick={handleHistory}>
                  <AiOutlineDown className={historyOpen ? "up" : "down"} />
                </button>
              </Topic>
              <div className={historyOpen ? "content show" : "content"}>
                <h4>Created </h4>
                <span>{moment(userInfo.joined).format("lll")}</span>
                <h4>Last Login </h4>
                <span>{moment(userInfo.lastLogIn).format("lll")}</span>
              </div>
            </HistoryDiv>
            <DeleteDev>
              <Topic>
                <h3>Acount</h3>
                <button className="clickButton" onClick={handleAcount}>
                  <AiOutlineDown className={acountOpen ? "up" : "down"} />
                </button>
              </Topic>
              <div className={acountOpen ? "content show" : "content"}>
                <h3 className="danger">Danger</h3>
                <p>
                  Be careful! Changes below will cause irreversible damage to
                  your account!
                </p>
                <button className="deleteButton" onClick={handleDeleteAcount}>
                  <BiTrash />
                  Delete Acount
                </button>
              </div>
            </DeleteDev>
          </>
        ) : (
          <Spinner />
        )
      ) : (
        <Error />
      )}
    </Wrapper>
  );
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
  .clickButton {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: inherit;
    color: var(--color-font);
    cursor: pointer;
  }
  h4 {
    color: var(--color-secondary);
    margin-top: 10px;
  }
  .deleteButton {
    background-color: #f44336;
    color: var(--color-font);
    margin-top: 10px;
    border-radius: 4px;
    width: 135px;
    padding: 3px 2px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
  }
  .danger {
    color: #f44336;
    margin-top: 15px;
  }
  .content {
    height: 0px;
    overflow: hidden;
    transition: height 0.3s ease-in-out;
  }
  .show {
    height: 130px;
  }
  .down {
    transform: rotate(0deg);
    transition: transform 0.3s ease-in-out;
  }
  .up {
    transform: rotate(180deg);
    transition: transform 0.3s ease-in-out;
  }
`;
const ProfileDev = styled.div`
  background-color: #010206;
  border-radius: 6px;
  width: 100%;
  height: 250px;
  padding: 50px;
  display: flex;
  img {
    border-radius: 2px;
    min-width: 130px;
    max-width: 130px;
    margin-right: 50px;
    border: 1px solid var(--color-secondary);
  }
`;
const ImageDiv = styled.div``;
const Info = styled.div`
  hr {
    border: 1px dotted var(--color-secondary);
    margin: 5px 0px;
  }
`;
const HistoryDiv = styled.div`
  background-color: #010206;
  border-radius: 6px;
  width: 100%;
  height: auto;
  margin: 60px 0px 5px 0px;
  padding: 10px;
`;
const DeleteDev = styled.div`
  background-color: #010206;
  border-radius: 6px;
  height: auto;
  width: 100%;
  padding: 10px;
`;
const Topic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
