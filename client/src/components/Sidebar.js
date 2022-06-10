import styled from "styled-components";
import pishi from "../assets/pishi.png";
import LogoTopic from "./sidebarIcons/LogoTopic";
import GenreTopic from "./sidebarIcons/GenreTopic";
import { GiTrophyCup } from "react-icons/gi";
import { AiOutlineCrown } from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";
import { FiArchive } from "react-icons/fi";
import { VscLibrary } from "react-icons/vsc";
import { CgSpinner } from "react-icons/cg";
import { TiTickOutline } from "react-icons/ti";
import action from "../assets/action.png";
import strategy from "../assets/strategy.png";
import rpg from "../assets/rpg.png";
import shooter from "../assets/shooter.png";
import adventure from "../assets/adventure.png";
import puzzle from "../assets/puzzle.png";
import racing from "../assets/racing.png";
import sports from "../assets/sports.png";
import { Link, Redirect, useHistory } from "react-router-dom";


const Sidebar = () => {
  return (
    <Div>
      <LogoDiv>
        <img
          style={{
            width: "75px",
            height: " 75px",
            borderRadius: "50%",
            margin: "20px 15px",
          }}
          src={pishi}
          alt="logo"
        />
        <Link to="/">
          <LogoTitle>My CatLog</LogoTitle>
        </Link>
      </LogoDiv>
      <Info>
        <Link to="/games">
          <Topic>
            <h3 style={{ cursor: "pointer" }}>All Games</h3>
          </Topic>
        </Link>
        <Topic>
          <h3>Top</h3>
          <Link to="/best-of-the-year">
            <LogoTopic text="Best of the year" Icon={GiTrophyCup} />
          </Link>
          <Link to="/popular2021">
            <LogoTopic text="Popular in 2021" Icon={BsBarChartLine} />
          </Link>
          <Link to="/top250games">
            <LogoTopic text="All time top 250" Icon={AiOutlineCrown} />
          </Link>
        </Topic>
        <Topic>
          <h3>Library</h3>
          <Link to="/backlog">
            <LogoTopic text="Backlog" Icon={VscLibrary}/>
          </Link>
          <Link to="/inProgress">
            <LogoTopic text="In progress" Icon={CgSpinner} />
          </Link>
          <Link to="/completed">
            <LogoTopic text="Completed" Icon={TiTickOutline} />
          </Link>
          <Link to="/abandoned">
            <LogoTopic text="Abandoned" Icon={FiArchive} />
          </Link>
        </Topic>
        <Topic style={{ marginBottom: "120px" }}>
          <h3>Genres</h3>
          <Link to="/genre/action">
            <GenreTopic text="Action" src={action} />
          </Link>
          <Link to="/genre/strategy">
            <GenreTopic text="Strategy" src={strategy} />
          </Link>
          <Link to="/genre/rpg">
            <GenreTopic text="RPG" src={rpg} />
          </Link>
          <Link to="/genre/shooter">
            <GenreTopic text="Shooter" src={shooter} />
          </Link>
          <Link to="/genre/adventure">
            <GenreTopic text="Adventure" src={adventure} />
          </Link>
          <Link to="/genre/puzzle">
            <GenreTopic text="Puzzle" src={puzzle} />
          </Link>
          <Link to="/genre/racing">
            <GenreTopic text="Racing" src={racing} />
          </Link>
          <Link to="/genre/sports">
            <GenreTopic text="Sports" src={sports} />
          </Link>
        </Topic>
      </Info>
    </Div>
  );
};

export default Sidebar;

// styling the sidebar
const Div = styled.div`
  z-index: 100;
  width: 270px;
  height: 100vh;
  background-color: var(--color-primary);
  position: fixed;
  top: 0;
  color: var(--color-font);
  a {
    text-decoration: none;
    color: var(--color-font);
  }
  p {
    font-size: 15px;
  }
  h3 {
    color: var(--color-secondary);
    margin-bottom: 5px;
  }
`;

const LogoTitle = styled.h3`
  color: #0ccbff;
  font-family: "Sen", sans-serif;
  cursor: pointer;
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  padding-top: 200px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const Topic = styled.div`
  margin-bottom: 18px;
`;
