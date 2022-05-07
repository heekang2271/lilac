import OurPurpose from '@components/home/OurPurpose';
import Technology from '@components/home/Technology';
import Seo from '@components/Seo';
import { Style } from '@libs/const';
import { Wrapper } from '@styles/common';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BsArrowRight } from 'react-icons/bs';
import Image from 'next/image';
import { fetchApi } from '@libs/utils';
import Layout from '@components/Layout';

const Container = styled.div``;

const VisualArea = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 800px;
  img {
    z-index: -10;
    object-fit: cover;
    object-position: center;
  }
`;

const ShadowMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9998;
  width: 100%;
  height: ${`${Style.headerHeight}px`};
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
`;

const VisualTextBox = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.1)
  );
  display: flex;
  align-items: center;
  color: #ffffff;
`;

interface VisualTextProps {
  align: string;
}

const VisualText = styled.div<VisualTextProps>`
  width: 100%;
  max-width: 840px;
  float: ${(props) => props.align};
  position: relative;
  z-index: 10;
  opacity: 0;
  top: 50px;

  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;

  h1,
  p {
    text-align: ${(props) => props.align};
    text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  }

  h1 {
    font-size: 52px;
    font-weight: 600;
    line-height: 1.3;
  }

  p {
    font-size: 24px;
    margin-bottom: 40px;
  }

  @keyframes upslide {
    0% {
      opacity: 0;
      top: 40px;
    }

    100% {
      opacity: 1;
      top: 0;
    }
  }

  @media only screen and (max-width: 1100px) {
    max-width: 700px;
    h1 {
      font-size: 48px;
    }

    p {
      font-size: 20px;
    }
  }

  @media only screen and (max-width: ${Style.mobileWidth}) {
    max-width: 600px;
    h1 {
      font-size: 36px;
      font-weight: 600;
    }

    p {
      font-size: 18px;
    }
  }
`;

interface SectionProps {
  bgColor: string;
}

const Section = styled.section<SectionProps>`
  background-color: ${(props) => props.bgColor};
  padding: 110px 0;
`;

const Title = styled.h2`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 60px;

  @media only screen and (max-width: ${Style.mobileWidth}) {
    font-size: 28px;
  }
`;

const TechGoBtnBox = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  a {
    border-radius: 100px;
    padding: 12px 40px;
    background-color: ${(props) => props.theme.accent1Color};
    color: #ffffff;
    font-size: 24px;
    font-family: 'Poppins', sans-serif;
    display: flex;
    align-items: center;

    svg {
      position: relative;
      left: 10px;
    }
  }
`;

const ContactBox = styled.div`
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;

  & > div:first-child {
    max-width: 700px;
    span {
      font-size: 40px;
      font-weight: 600;
    }
    p {
      margin-top: 20px;
      font-size: 18px;
    }
  }

  & > a {
    font-family: 'Poppins', sans-serif;
    background-color: #404040;
    font-size: 30px;
    padding: 12px 60px;
    border-radius: 100px;
    display: flex;
    align-items: center;

    svg {
      position: relative;
      left: 10px;
    }
  }

  @media only screen and (max-width: 800px) {
    gap: 80px;
    & > div:first-child {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        font-size: 40px;
        font-weight: 600;
      }
      p {
        text-align: center;
        margin-top: 20px;
        font-size: 18px;
      }
    }
    flex-direction: column;
  }

  @media only screen and (max-width: ${Style.mobileWidth}) {
    gap: 60px;
    & > div:first-child {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        font-size: 28px;
      }
      p {
        text-align: center;
        margin-top: 20px;
        font-size: 16px;
      }
    }
    flex-direction: column;
    & > a {
      font-size: 18px;
    }
  }
`;

interface HomeProps {
  data: {
    visual: {
      image: string;
      title: string;
      description: string;
    }[];
    intro: string;
    purpose: any;
    technology: any;
    contact: any;
  };
}

const Home: NextPage<HomeProps> = ({ data }) => {
  const $visualTexts = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleVisual = () => {
      const windowBottom = window.innerHeight;

      if ($visualTexts.current) {
        $visualTexts.current.forEach(($visualText, i) => {
          if ($visualText) {
            const clientRect = $visualText.getBoundingClientRect();
            const center =
              (clientRect.bottom - clientRect.top) / 2 + clientRect.top;
            if (center < windowBottom) {
              $visualText.style.animationName = 'upslide';
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleVisual);
    handleVisual();

    return () => {
      window.removeEventListener('scroll', handleVisual);
    };
  }, [$visualTexts]);
  return (
    <Layout>
      <Container>
        <Seo title={''} />
        <ShadowMask></ShadowMask>
        {data.visual.map((visual, i) => (
          <VisualArea key={`visual${i}`}>
            {visual.image && (
              <Image src={visual.image} layout="fill" priority />
            )}
            <VisualTextBox>
              <Wrapper>
                <VisualText
                  align={i % 2 === 0 ? 'left' : 'right'}
                  ref={(el) => ($visualTexts.current[i] = el!)}
                >
                  <h1>{visual.title}</h1>
                  {visual.description && visual.description !== '' && (
                    <p>{visual.description}</p>
                  )}
                </VisualText>
              </Wrapper>
            </VisualTextBox>
          </VisualArea>
        ))}
        <Section bgColor="#ffffff">
          <OurPurpose data={data.purpose} />
        </Section>
        <Section bgColor="#f6f1f6">
          <Title>Technology</Title>
          <Wrapper>
            <Technology technology={data.technology} />
          </Wrapper>
        </Section>
        <Section bgColor="#BC9ABC">
          <Wrapper>
            <ContactBox>
              <div>
                <span>{data.contact.title}</span>
                <p>{data.contact.description}</p>
              </div>
              <Link href="/contact/location">
                <a>
                  <span>GO</span>
                  <BsArrowRight />
                </a>
              </Link>
            </ContactBox>
          </Wrapper>
        </Section>
      </Container>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async (ctx: any) => {
  const data = await fetchApi(
    'POST',
    `${process.env.API_URL}/Main_home/get_data`
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
