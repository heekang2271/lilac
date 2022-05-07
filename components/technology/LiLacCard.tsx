import Image from 'next/image';
import styled from 'styled-components';

interface SCardProps {
  reverse: boolean;
  active: boolean;
}

const SCard = styled.div<SCardProps>`
  padding: 25px;
  border: 1px solid #bebebe;
  border-radius: 20px;
  display: flex;
  gap: 40px;
  flex-direction: ${(props) => (props.reverse ? 'row-reverse' : 'row')};
  box-shadow: 0 0 10px -3px #bb9bbb;

  &:hover {
    border: ${(props) =>
      `1px solid ${props.active ? props.theme.accent1Color : '#bebebe'}`};
    box-shadow: ${(props) =>
      props.active ? '0 0 10px 0px #bb9bbb' : '0 0 10px -3px #bb9bbb'};
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  background-color: #808080;
  min-width: 300px;
  border: 1px solid #c0c0c0;

  img {
    object-fit: cover;
    object-position: center;
  }

  @media only screen and (max-width: 980px) {
    width: 230px;
    min-width: 230px;
    height: 180px;
  }

  @media only screen and (max-width: 650px) {
    display: none;
  }
`;

const ContentsBox = styled.div`
  width: 100%;
  h2 {
    font-size: 23px;
    font-weight: 500;
    margin-bottom: 5px;
    font-family: 'Poppins', 'Spoqa Han Sans Neo', 'sans-serif';
  }

  h4 {
    font-size: 16px;
    margin-bottom: 40px;
    color: #808080;
  }

  p {
    font-size: 16px;
  }

  @media only screen and (max-width: 680px) {
    h2 {
      font-size: 19px;
    }
    h4 {
      font-size: 15px;
    }

    p {
      font-size: 14px;
    }
  }
`;

interface CardProps {
  image?: string;
  title: string;
  content: string;
  subtitle: string;
  reverse: boolean;
  active?: boolean;
}

export default function LiLacCard({
  image,
  title,
  subtitle,
  content,
  reverse,
  active,
}: CardProps) {
  return (
    <SCard reverse={reverse} active={active ?? false}>
      <ImageBox>{image && <Image src={image} layout="fill" />}</ImageBox>
      <ContentsBox>
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
        <p>{content}</p>
      </ContentsBox>
    </SCard>
  );
}
