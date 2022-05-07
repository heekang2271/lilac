import Layout from '@components/Layout';
import Seo from '@components/Seo';
import { fetchApi } from '@libs/utils';
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

  @media only screen and (max-width: 850px) {
    font-size: 15px;
    padding: 12px 40px;
  }
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
    <Layout>
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
    </Layout>
  );
};

export default NewsBoard;

export const getServerSideProps = async (ctx: any) => {
  const id = ctx.params.id;
  const data = await fetchApi(
    'POST',
    `${process.env.API_URL}/news/get_innercontent`,
    {
      id,
    }
  );
  if (data?.error === 500) {
    return {
      redirect: {
        destination: '/error',
      },
    };
  }

  return {
    props: {
      data,
      existBack: ctx.query.existBack ? JSON.parse(ctx.query.existBack) : false,
    },
  };
};
