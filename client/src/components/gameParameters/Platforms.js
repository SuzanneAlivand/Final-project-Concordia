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
      {platforms?.map((item, index) => {
        if (item.platform.name === "PC") {
          return (
            <span key={index}>
              <BsWindows />
            </span>
          );
        }
        if (item.platform.name === "PlayStation") {
          return (
            <span key={index}>
              <FaPlaystation />
            </span>
          );
        }
        if (item.platform.name === "Xbox") {
          return (
            <span key={index}>
              <FaXbox />
            </span>
          );
        }
        if (item.platform.name === "Android") {
          return (
            <span key={index}>
              <ImAndroid />
            </span>
          );
        }
        if (item.platform.name === "iOS") {
          return (
            <span key={index}>
              <MdPhoneAndroid />
            </span>
          );
        }
        if (item.platform.name === "Nintendo") {
          return (
            <span key={index}>
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
