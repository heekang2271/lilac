import { PurposeProps } from '@libs/const';
import styled from 'styled-components';
import { PurposeContents } from '@styles/common';
import { MdOutlineSettings } from 'react-icons/md';
import { RiPsychotherapyLine } from 'react-icons/ri';

const Container = styled(PurposeContents)`
  height: ${(props) => (props.notAction ? '300px' : '100%')};

  div {
    color: #ffffff;
    font-size: 17px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 450px;
    padding: 13px;
  }

  div:nth-child(1) {
    background-color: #44c4dd;
  }
  div:nth-child(2) {
    background-color: #f17180;
  }
  div:nth-child(3) {
    background-color: #f3ab24;
  }

  @media only screen and (max-width: 850px) {
    flex-direction: column;
    gap: 20px;
    div {
      font-size: 15px;
      width: 100%;
      max-width: 450px;
    }
  }

  @media only screen and (min-width: 850px) {
    height: ${(props) => (props.notAction ? '400px' : '100%')};
    div {
      color: #ffffff;
      font-size: 17px;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 450px;
      position: absolute;
      transition: ${(props) =>
        props.notAction ? 'none' : 'transform 0.5s ease-in-out'};
    }

    div:nth-child(1) {
      transform: ${(props) =>
        props.active || props.notAction
          ? 'translateY(-90px) translateX(-20%)'
          : 'none'};
    }
    div:nth-child(2) {
      transform: ${(props) =>
        props.active || props.notAction ? 'translateX(20%)' : 'none'};
    }
    div:nth-child(3) {
      transform: translateY(100px);
      transform: ${(props) =>
        props.active || props.notAction
          ? 'translateY(90px) translateX(-20%)'
          : 'none'};
    }
  }
`;

const Icons = styled.span`
  position: absolute;
  z-index: -1;
  font-size: 200px;
  display: flex;
  align-items: center;

  svg {
    color: #e9e9e9;
  }

  &:nth-child(4) {
    font-size: 300px;
    bottom: 0;
    left: 0;
  }

  &:nth-child(5) {
    top: 0px;
    right: 50px;
  }

  @media only screen and (max-width: 850px) {
    font-size: 150px;
    &:nth-child(4) {
      font-size: 200px;
      bottom: 0;
      left: 0;
    }

    &:nth-child(5) {
      top: 0px;
      right: 0px;
    }
  }
`;

export default function Strategy({
  contents,
  active,
  ref,
  notAction,
}: PurposeProps) {
  return (
    <Container ref={(el) => (ref = el!)} active={active} notAction={notAction}>
      {contents.map((item, i) => (
        <div key={`strategy${i}`}>
          {item.split('\n').map((text, j) => (
            <span key={`strategy${i}${j}`}>{text}</span>
          ))}
        </div>
      ))}
      <Icons>
        <MdOutlineSettings />
      </Icons>
      <Icons>
        <RiPsychotherapyLine />
      </Icons>
    </Container>
  );
}
