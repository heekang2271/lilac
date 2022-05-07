import Layout from '@components/Layout';
import Seo from '@components/Seo';
import LiLacCard from '@components/technology/LiLacCard';
import LiLacCardBox from '@components/technology/LiLacCardBox';
import { fetchApi } from '@libs/utils';
import { Docs, DocsTitle, Wrapper } from '@styles/common';
import { NextPage } from 'next';
import styled from 'styled-components';

const Description = styled.p`
  display: flex;
  flex-direction: column;
`;

interface PlatformLinkProps {
  data: {
    title: string;
    description: string;
    items: {
      title: string;
      subtitle: string;
      image: string;
      content: string;
      link: string;
    }[];
  };
}

const PlatformLink: NextPage<PlatformLinkProps> = ({ data }) => {
  return (
    <Layout>
      <Docs>
        <Seo title="Platform link" />
        <Wrapper>
          {data?.title !== '' && <DocsTitle>{data.title}</DocsTitle>}
          {data?.description !== '' && (
            <Description
              dangerouslySetInnerHTML={{
                __html: data.description.replaceAll('\n', '<br>'),
              }}
            ></Description>
          )}
          <LiLacCardBox>
            {data.items.map((item, i) => (
              <a
                key={`card${i}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LiLacCard
                  title={item.title}
                  subtitle={item.subtitle}
                  image={item.image}
                  content={item.content}
                  reverse={i % 2 === 1}
                  active
                ></LiLacCard>
              </a>
            ))}
          </LiLacCardBox>
        </Wrapper>
      </Docs>
    </Layout>
  );
};

export default PlatformLink;

export const getServerSideProps = async (ctx: any) => {
  const data = await fetchApi(
    'POST',
    `${process.env.API_URL}/Platform_link/get_data`
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
