import Image from 'next/image';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 0px 12px -5px rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  overflow: hidden;

  &.clone {
    display: none;
  }

  @media only screen and (max-width: 750px) {
    min-width: 100%;
    border: 1px solid #c0c0c0;
    &.clone {
      display: block;
    }
    &:hover {
      border: 1px solid ${(props) => props.theme.accent1Color};
    }
  }
`;

const CardImage = styled.div`
  height: 200px;
  background-color: #707070;
  position: relative;

  img {
    object-fit: cover;
    object-position: center;
  }
`;

const CardInfo = styled.div`
  padding: 15px 20px;
  width: 100%;
  h4 {
    font-size: 17px;
    font-family: 'Poppins', 'Spoqa Han Sans Neo', 'sans-serif';
    font-weight: 600;
    margin-bottom: 5px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  h5 {
    font-size: 15px;
    color: #707070;
    margin-bottom: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    font-size: 14px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const TechnologyCard = ({ isClone, data }: any) => {
  return (
    <Card {...(isClone && { className: 'clone' })}>
      <CardImage>
        {data.image && <Image src={data.image} layout="fill" priority />}
      </CardImage>
      <CardInfo>
        <h4>{data.title}</h4>
        <h5>{data.subtitle}</h5>
        <p>{data.description}</p>
      </CardInfo>
    </Card>
  );
};

export default TechnologyCard;
