import Seo from '@components/Seo';
import { Docs, Wrapper } from '@styles/common';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Date = styled.span`
  color: #9e9e9e;
`;

const Contents = styled.div`
  padding: 60px 0;
  border: 1px solid #bebebe;
  border-left: none;
  border-right: none;
  margin-top: 20px;

  img {
    width: 100%;
    max-width: 700px;
  }
`;

const BtnBox = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
`;
const BackBtn = styled.button`
  background-color: ${(props) => props.theme.accent1Color};
  color: #ffffff;
  padding: 12px 50px;
  font-size: 18px;
`;

interface NewsProps {
  data: {
    id: number;
    title: string;
    contents: string;
    date: string;
  };
  existBack: boolean;
}

const NewsBoard: NextPage<NewsProps> = ({ data, existBack }) => {
  const router = useRouter();

  const onListClick = () => {
    if (existBack) {
      router.back();
    } else {
      router.push('/business/news');
    }
  };

  return (
    <Docs>
      <Seo title="News" />
      <Wrapper short={true}>
        <Title>{data.title}</Title>
        <Date>{data.date}</Date>
        <Contents>{data.contents}</Contents>
        <BtnBox>
          <BackBtn onClick={onListClick}>목록</BackBtn>
        </BtnBox>
      </Wrapper>
    </Docs>
  );
};

export default NewsBoard;

export const getServerSideProps = async (ctx: any) => {
  const id = Number(ctx.params.id);
  const data = {
    id,
    title: `${id}번 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    contents:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.',
    date: '2022.04.01',
  };
  return {
    props: {
      data,
      existBack: ctx.query.existBack ? JSON.parse(ctx.query.existBack) : false,
    },
  };
};
