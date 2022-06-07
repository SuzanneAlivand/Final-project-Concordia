import styled from "styled-components";
import { SiNintendo } from "react-icons/si";
import { BsWindows } from "react-icons/bs";
import { FaPlaystation } from "react-icons/fa";
import { FaXbox } from "react-icons/fa";
import { ImAndroid } from "react-icons/im";
import { MdPhoneAndroid } from "react-icons/md";

const Platforms = ({ platforms }) => {
  return (
    <Div>
      {platforms.map((item) => {
        if (item.platform.name === "PC") {
          return (
            <span>
              <BsWindows />
            </span>
          );
        }
        if (item.platform.name === "PlayStation") {
          return (
            <span>
              <FaPlaystation />
            </span>
          );
        }
        if (item.platform.name === "Xbox") {
          return (
            <span>
              <FaXbox />
            </span>
          );
        }
        if (item.platform.name === "Android") {
          return (
            <span>
              <ImAndroid />
            </span>
          );
        }
        if (item.platform.name === "iOS") {
          return (
            <span>
              <MdPhoneAndroid />
            </span>
          );
        }
        if (item.platform.name === "Nintendo") {
          return (
            <span>
              <SiNintendo />
            </span>
          );
        }
      })}
    </Div>
  );
};

export default Platforms;

const Div = styled.div`
  color: var(--color-font);
  span {
    margin-right: 8px;
    font-size: 14px;
  }
`;
