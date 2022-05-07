import { PurposeProps } from '@libs/const';
import styled from 'styled-components';
import { PurposeContents } from '@styles/common';
import Image from 'next/image';

const Container = styled(PurposeContents)`
  height: ${(props) => (props.notAction ? '350px' : '100%')};
  flex-direction: column;
  gap: 20px;
  & > div {
    background-color: #d086d0;
    box-shadow: 0 0 12px -3px #bb9bbb;
    color: #ffffff;
    border: 1px solid #bb9bbb;
    width: 100%;
    padding: 15px;
    display: flex;
  }

  @media only screen and (max-width: 850px) {
    height: initial;
    & > div {
      align-items: center;
      span:first-child {
        width: 120px;
        min-width: 120px;
      }
      span:last-child {
        font-size: 14px;
        display: block;
      }
    }
  }

  @media only screen and (min-width: 850px) {
    flex-direction: row;
    & > div {
      position: absolute;
      width: 240px;
      height: 310px;
      border-radius: 20px;
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
  }
`;

const ImageBox = styled.div`
  width: 100%;
  height: 150px;
  background-color: #ffffff;
  display: none;
  position: relative;

  img {
    object-fit: cover;
    object-position: center;
  }

  @media only screen and (min-width: 850px) {
    display: block;
  }
`;

export default function Goal({
  images,
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
            <ImageBox>
              {images && images[i] && <Image src={images[i]} layout="fill" />}
            </ImageBox>
            <span>{text}</span>
          </div>
        );
      })}
    </Container>
  );
}
