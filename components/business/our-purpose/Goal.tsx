import { PurposeProps } from '@libs/const';
import styled from 'styled-components';
import { PurposeContents } from '@styles/common';

const Container = styled(PurposeContents)`
  height: ${(props) => (props.notAction ? '350px' : '100%')};

  & > div {
    background-color: #cf86c7;
    box-shadow: 0 0 12px -3px #bb9bbb;
    color: #ffffff;
    border: 1px solid #bb9bbb;
    position: absolute;
    width: 240px;
    height: 310px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 15px;
    gap: 20px;
    transition: ${(props) =>
      props.notAction ? 'none' : 'transform 0.5s ease-in-out'};
    font-size: 14px;

    span:first-child {
      font-size: 22px;
    }
  }

  & > div:nth-child(1) {
    transform: ${(props) =>
      props.active || props.notAction ? 'translateX(-270px)' : 'none'};
  }

  & > div:nth-child(3) {
    transform: ${(props) =>
      props.active || props.notAction ? 'translateX(270px)' : 'none'};
  }
`;

const ImageBox = styled.div`
  width: 100%;
  height: 150px;
  background-color: #ffffff;
`;

export default function Goal({
  contents,
  active,
  ref,
  notAction,
}: PurposeProps) {
  return (
    <Container ref={(el) => (ref = el!)} active={active} notAction={notAction}>
      {contents.map((item, i) => {
        const [title, text] = item.split('\n');

        return (
          <div key={`goal${i}`}>
            <span>{title}</span>
            <ImageBox></ImageBox>
            <span>{text}</span>
          </div>
        );
      })}
    </Container>
  );
}
