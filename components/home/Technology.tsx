import { Ref, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 10px;
`;

const AnimationBox = styled.div`
  display: flex;
  width: 100%;
  gap: 5%;
`;

const Card = styled.div`
  min-width: 30%;
  background-color: #ffffff;
  box-shadow: 0px 0px 12px -5px rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  overflow: hidden;

  @media only screen and (max-width: 835px) {
    min-width: 100%;
  }
`;

const CardImage = styled.div`
  height: 230px;
  background-color: #707070;
`;

const CardInfo = styled.div`
  padding: 15px 20px;

  h4 {
    font-size: 17px;
    font-family: 'Poppins', 'Spoqa Han Sans Neo', 'sans-serif';
    font-weight: 600;
    margin-bottom: 5px;
  }

  h5 {
    font-size: 15px;
    color: #707070;
    margin-bottom: 20px;
  }

  p {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const PageBtnBox = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 7px;
  align-items: center;
`;

interface PageBtnProps {
  current: boolean;
}

const PageBtn = styled.div<PageBtnProps>`
  width: ${(props) => (props.current ? '9px' : '6px')};
  height: ${(props) => (props.current ? '9px' : '6px')};
  background-color: ${(props) =>
    props.current ? props.theme.accent1Color : '#b0b0b0'};
  border-radius: 100%;
`;

const Technology = ({ technology }: any) => {
  const $animationBox = useRef<HTMLDivElement>(null);
  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [cntPage, setCntPage] = useState(0);

  useEffect(() => {
    if ($animationBox.current) {
      const totalCard = $animationBox.current.children.length;
      const perPage = 3;
      const btnBox = [];

      for (let i = 0; i <= Math.ceil(totalCard / perPage); i++) {
        btnBox.push(0);
      }
      setTotalPage(btnBox);
    }
  }, [$animationBox]);

  return (
    <Container>
      <AnimationBox ref={$animationBox}>
        {technology.map((data: any, i: number) => (
          <Card key={`techcard${i}`}>
            <CardImage></CardImage>
            <CardInfo>
              <h4>{data.title}</h4>
              <h5>{data.subTitle}</h5>
              <p>{data.description}</p>
            </CardInfo>
          </Card>
        ))}
      </AnimationBox>
    </Container>
  );
};

export default Technology;
