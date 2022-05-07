import Layout from '@components/Layout';
import Seo from '@components/Seo';
import LiLacCard from '@components/technology/LiLacCard';
import LiLacCardBox from '@components/technology/LiLacCardBox';
import { fetchApi } from '@libs/utils';
import { Docs, Wrapper, DocsTitle } from '@styles/common';
import { NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';

const IntroBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 70px 0;
  gap: 20px;

  @media only screen and (max-width: 980px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Description = styled.p`
  display: flex;
  flex-direction: column;
`;

interface IntroItemProps {
  color: string;
}

const IntroItem = styled.div<IntroItemProps>`
  display: flex;
  flex-direction: column;
  width: 250px;
  gap: 20px;

  & > div:first-child {
    height: 200px;
    min-height: 200px;
    border: 2px solid ${(props) => props.color};
    border-radius: 20px;
    overflow: hidden;
    background-color: #ffffff;
    position: relative;

    img {
      object-fit: cover;
      object-position: center;
    }
  }

  & > div:last-child {
    background-color: ${(props) => props.color};
    color: #ffffff;
    padding: 20px;
    height: 100%;
    border-radius: 20px;

    h5 {
      text-align: center;
      margin-bottom: 30px;
      font-size: 20px;
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding-left: 20px;

      li {
        list-style-type: disc;
      }
    }
  }

  @media only screen and (max-width: 980px) {
    flex-direction: row;
    width: 100%;
    background-color: ${(props) => props.color};
    align-items: center;
    padding: 10px;
    & > div:first-child {
      width: 200px;
      min-width: 200px;
      height: 150px;
      min-height: 150px;
      border-radius: 0;
    }

    & > div:last-child {
      min-height: initial;
      width: 100%;
      padding: 0;
      h5 {
        text-align: left;
        margin-bottom: 10px;
      }
      ul {
        gap: 0px;
        font-size: 14px;
      }
    }
  }

  @media only screen and (max-width: 650px) {
    padding: 20px;
    & > div:first-child {
      display: none;
    }

    & > div:last-child {
      h5 {
        text-align: center;
      }
    }
  }
`;

interface LiLacQSPProps {
  data: {
    title: string;
    description: string;
    intro: {
      image?: string;
      title: string;
      content: string;
    }[];
    items: {
      title: string;
      subtitle: string;
      image: string;
      content: string;
    }[];
  };
}

const LiLacQSP: NextPage<LiLacQSPProps> = ({ data }) => {
  const colors = ['#54C075', '#AC89AD', '#5580CA', '#0D2966'];
  return (
    <Layout>
      <Docs>
        <Seo title="LiLac-DSP" />
        <Wrapper short={true}>
          <DocsTitle>{data.title}</DocsTitle>
          <Description
            dangerouslySetInnerHTML={{
              __html: data.description.replaceAll('\n', '<br>'),
            }}
          ></Description>
          <IntroBox>
            {data.intro.map((intro, i) => (
              <IntroItem color={colors[i]} key={`intro${i}`}>
                <div>
                  {intro.image && <Image src={intro.image} layout="fill" />}
                </div>
                <div>
                  <h5>{intro.title}</h5>
                  <ul>
                    {intro.content.split('\n').map((text, j) => (
                      <li key={`introc${i}${j}`}>{text}</li>
                    ))}
                  </ul>
                </div>
              </IntroItem>
            ))}
          </IntroBox>
          <LiLacCardBox>
            {data.items.map((item, i) => (
              <LiLacCard
                key={`card${i}`}
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
                content={item.content}
                reverse={i % 2 === 1}
              ></LiLacCard>
            ))}
          </LiLacCardBox>
        </Wrapper>
      </Docs>
    </Layout>
  );
};

export default LiLacQSP;

export const getServerSideProps = async (ctx: any) => {
  const data = await fetchApi(
    'POST',
    `${process.env.API_URL}/LilacQSP/get_data`,
    {}
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
    },
  };
};
