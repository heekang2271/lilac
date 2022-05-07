import { PurposeProps } from '@libs/const';
import styled from 'styled-components';
import { PurposeContents } from '@styles/common';
import { AiOutlineComment } from 'react-icons/ai';
import { BsShare } from 'react-icons/bs';
import { GiUpgrade } from 'react-icons/gi';

const Container = styled(PurposeContents)`
  height: ${(props) => (props.notAction ? '290px' : '100%')};

  & > div {
    width: 160px;
    height: 160px;
    background-color: #000000;
    border-radius: 100%;
    background-color: rgba(16, 117, 189, 0.9);
    transition: ${(props) =>
      props.notAction ? 'none' : 'transform 0.5s ease-in-out'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 16px;
    position: absolute;

    svg {
      font-size: 45px;
      margin-bottom: 10px;
    }
  }

  & > div:nth-child(1) {
    transform: ${(props) =>
      props.active || props.notAction ? 'translateX(-145px)' : 'none'};
    background-color: rgba(27, 210, 192, 0.9);
  }

  & > div:nth-child(2) {
    background-color: rgba(48, 136, 242, 0.9);
  }

  & > div:nth-child(3) {
    transform: ${(props) =>
      props.active || props.notAction ? 'translateX(145px)' : 'none'};
    background-color: rgba(172, 87, 233, 0.9);
  }

  @media only screen and (min-width: 850px) {
    & > div:nth-child(1) {
      transform: ${(props) =>
        props.active || props.notAction ? 'translateX(-210px)' : 'none'};
    }

    & > div:nth-child(3) {
      transform: ${(props) =>
        props.active || props.notAction ? 'translateX(210px)' : 'none'};
    }

    & > div {
      width: 250px;
      height: 250px;
      position: absolute;
      font-size: 20px;

      svg {
        font-size: 70px;
        margin-bottom: 20px;
      }
    }
  }

  @media only screen and (max-width: 500px) {
    height: ${(props) => (props.notAction ? '320px' : '100%')};
    & > div:nth-child(1) {
      transform: ${(props) =>
        props.active || props.notAction
          ? 'translateX(-90px) translateY(70px)'
          : 'none'};
    }

    & > div:nth-child(2) {
      transform: ${(props) =>
        props.active || props.notAction ? 'translateY(-80px)' : 'none'};
    }

    & > div:nth-child(3) {
      transform: ${(props) =>
        props.active || props.notAction
          ? 'translateX(90px) translateY(70px)'
          : 'none'};
    }
  }
`;

export default function CoreValue({
  contents,
  active,
  ref,
  notAction,
}: PurposeProps) {
  return (
    <Container ref={(el) => (ref = el!)} active={active} notAction={notAction}>
      <div>
        <AiOutlineComment />
        <span>{contents[0]}</span>
      </div>
      <div>
        <BsShare />
        <span>{contents[1]}</span>
      </div>
      <div>
        <GiUpgrade />
        <span>{contents[2]}</span>
      </div>
    </Container>
  );
}
