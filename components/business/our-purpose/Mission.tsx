import { PurposeProps } from '@libs/const';
import styled from 'styled-components';
import { PurposeContents } from '@styles/common';
import { GiPill } from 'react-icons/gi';
import { RiPsychotherapyLine } from 'react-icons/ri';
import { MdPeopleOutline } from 'react-icons/md';

const Container = styled(PurposeContents)`
  height: ${(props) => (props.notAction ? '500px' : 'initial')};
`;

interface ItemBoxProps {
  active: boolean;
  notAction?: boolean;
  bgColor: string;
}

const ItemBox = styled.div<ItemBoxProps>`
  position: absolute;
  transition: ${(props) =>
    props.notAction ? 'none' : 'transform 0.5s ease-in-out'};

  &:nth-child(1) {
    transform: ${(props) =>
      props.active || props.notAction ? 'translateY(-110px)' : 'none'};
  }
  &:nth-child(2) {
    transform: ${(props) =>
      props.active || props.notAction
        ? 'translateY(100px) translateX(-130px)'
        : 'none'};
  }
  &:nth-child(3) {
    transform: ${(props) =>
      props.active || props.notAction
        ? 'translateY(100px) translateX(130px)'
        : 'none'};
  }

  & > div {
    position: relative;
    width: 220px;
    height: 120px;
    background-color: ${(props) => props.bgColor};
    color: #ffffff;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  & > div::before {
    content: '';
    position: absolute;
    top: -60px;
    left: 0;
    border-left: 110px solid transparent;
    border-right: 110px solid transparent;
    border-bottom: 60px solid ${(props) => props.bgColor};
  }

  & > div::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: 0;
    border-left: 110px solid transparent;
    border-right: 110px solid transparent;
    border-top: 60px solid ${(props) => props.bgColor};
  }
`;

const IconBox = styled.div`
  font-size: 60px;
`;

const TextBox = styled.div`
  position: relative;
  top: -15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span:first-child {
    font-size: 20px;
  }
  span:last-child {
    font-size: 16px;
  }
`;

const Circle = styled.div`
  width: 350px;
  height: 300px;
  border-radius: 100%;
  border: 5px solid #d0d0d0;
`;

export default function Mission({
  contents,
  active,
  ref,
  notAction,
}: PurposeProps) {
  const itemList = [
    {
      icon: <GiPill />,
      bgColor: '#F8A147',
    },
    {
      icon: <RiPsychotherapyLine />,
      bgColor: '#b4d61d',
    },
    {
      icon: <MdPeopleOutline />,
      bgColor: '#3C8DBB',
    },
  ];
  return (
    <Container ref={(el) => (ref = el!)} active={active} notAction={notAction}>
      {contents.map((item, i) => (
        <ItemBox
          key={`mission${i}`}
          active={active ?? false}
          notAction={notAction}
          bgColor={itemList[i].bgColor}
        >
          <div key={`mission${i}`}>
            <IconBox>{itemList[i].icon}</IconBox>
            <TextBox>
              {item.split('\n').map((text, j) => (
                <span key={`mission${i}${j}`}>{text}</span>
              ))}
            </TextBox>
          </div>
        </ItemBox>
      ))}
      <Circle></Circle>
    </Container>
  );
}
