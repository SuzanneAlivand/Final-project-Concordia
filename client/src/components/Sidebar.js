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
import rpg from "../assets/action.png";
import shooter from "../assets/rpg.png";
import adventure from "../assets/adventure.png";
import puzzle from "../assets/puzzle.png";
import racing from "../assets/racing.png";
import sports from "../assets/sports.png";

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
        <LogoTitle>My CatLog</LogoTitle>
      </LogoDiv>
      <Info>
        <Topic>
          <h3 style={{ cursor: "pointer" }}>All Games</h3>
        </Topic>
        <Topic>
          <h3>Top</h3>
          <LogoTopic text="Best of the year" Icon={GiTrophyCup} />
          <LogoTopic text="Popular in 2021" Icon={BsBarChartLine} />
          <LogoTopic text="All time top 250" Icon={AiOutlineCrown} />
        </Topic>
        <Topic>
          <h3>Library</h3>
          <LogoTopic text="Backlog" Icon={VscLibrary} />
          <LogoTopic text="In progress" Icon={CgSpinner} />
          <LogoTopic text="Completed" Icon={TiTickOutline} />
          <LogoTopic text="Abandoned" Icon={FiArchive} />
        </Topic>
        <Topic>
          <h3>Genres</h3>
          <GenreTopic text="Action" src={action} />
          <GenreTopic text="Strategy" src={strategy} />
          <GenreTopic text="RPG" src={rpg} />
          <GenreTopic text="Shooter" src={shooter} />
          <GenreTopic text="Adventure" src={adventure} />
          <GenreTopic text="Puzzle" src={puzzle} />
          <GenreTopic text="Racing" src={racing} />
          <GenreTopic text="Sports" src={sports} />
        </Topic>
      </Info>
    </Div>
  );
};

export default Sidebar;

// styling the sidebar
const Div = styled.div`
  width: 270px;
  height: 100vh;
  background-color: var(--color-primary);
  position: fixed;
  top: 0;
  color: var(--color-font);
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
