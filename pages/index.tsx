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

const Container = styled.div`
  /* padding: 20px;
  img {
    width: 200px;
    filter: grayscale(100%) contrast(500%);
  } */
`;

interface VisualAreaProps {
  image: string;
}

const VisualArea = styled.section<VisualAreaProps>`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 800px;
  background-image: ${(props) => `url(${props.image})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
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
  max-width: 900px;
  float: ${(props) => props.align};
  position: relative;
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
    font-size: 56px;
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 40px;
  }

  p {
    font-size: 24px;
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
  };
}

const Home: NextPage<HomeProps> = ({ data }) => {
  const $visualTexts = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleVisual = () => {
      const windowBottom = window.innerHeight;
      $visualTexts.current.forEach(($visualText, i) => {
        const clientRect = $visualText.getBoundingClientRect();
        const center =
          (clientRect.bottom - clientRect.top) / 2 + clientRect.top;
        if (center < windowBottom) {
          $visualText.style.animationName = 'upslide';
        }
      });
    };

    window.addEventListener('scroll', handleVisual);
    handleVisual();

    return () => {
      window.removeEventListener('scroll', handleVisual);
    };
  }, [$visualTexts]);
  return (
    <Container>
      <Seo title={''} />
      <ShadowMask></ShadowMask>
      {data.visual.map((visual, i) => (
        <VisualArea key={`visual${i}`} image={visual.image}>
          <VisualTextBox>
            <Wrapper>
              <VisualText
                align={i % 2 === 0 ? 'left' : 'right'}
                ref={(el) => ($visualTexts.current[i] = el!)}
              >
                <h1>{visual.title}</h1>
                <p>{visual.description}</p>
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
          <TechGoBtnBox>
            <Link href="/technology/platform-link">
              <a>
                <span>GO</span>
                <BsArrowRight />
              </a>
            </Link>
          </TechGoBtnBox>
        </Wrapper>
      </Section>
      <Section bgColor="#BC9ABC">
        <Wrapper>
          <ContactBox>
            <div>
              <span>Contact us</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </p>
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
  );
};

export default Home;

export const getServerSideProps = async (ctx: any) => {
  const data = {
    visual: [
      {
        image: '/img/home1.jpg',
        title: 'Lorem ipsum dolor sit amet, consectetur',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit',
      },
      {
        image: '/img/home2.jpg',
        title: 'Lorem ipsum dolor sit amet, consectetur',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit',
      },
      {
        image: '/img/home3.jpg',
        title: 'Lorem ipsum dolor sit amet, consectetur',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit',
      },
    ],
    intro:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.',
    purpose: {
      philosophy:
        '항상 새로운 방식으로 혁신하고,\n이해할 수 있는 방식으로 소통하며,\n소외되지 않도록 공유한다.',
      vision: {
        title: 'Vision',
        contents: [
          '인공지능 기반 제약 및 약료 혁신기술들을\n가장 쉬운 방식으로 제공하는 기업',
        ],
      },
      mission: {
        title: 'Mission',
        contents: [
          '누구보다\n빠른 신약',
          '누구보다\n정확한 약물치료',
          '누구나\n혜택 받을 수 있도록',
        ],
      },
      strategy: {
        title: 'Strategy',
        contents: [
          'AI를 활용한 신약개발, 부스팅 플랫폼 개발',
          'AI를 활용한 정밀 환자 맞춤 약물치료 플랫폼 개발',
          '사용자 친화 인터페이스 개발',
        ],
      },
      goal: {
        title: 'Goal',
        contents: [
          'LiLac-DSP\n인공지능 기반 정주기 신약 개발, 지원시스템 개발',
          'LiLac-QSP\n인공지능 기반 약물 노출 및 반응 예측 플랫폼 개발',
          'LiLac-DSP/QSP\n웹 클라우드 기반 플랫폼 인터페이스 개발',
        ],
      },
      coreValue: {
        title: 'Core Value',
        contents: ['혁신을 위한 소통', '소통을 위한 공유', '공유를 위한 혁신'],
      },
    },
    technology: [
      {
        image: null,
        title: 'LiLac-ADMET',
        subTitle: '화합물에 대한 이해',
        description:
          '화합물 구조정보 기반한 화합물의 흡수, 분포, 대사, 배설 및 독성 예측 모듈 화합물 구조정보 기반한 화합물의 흡수, 분포, 대사, 배설 및 독성 예측 모듈 화합물 구조정보 기반한 화합물의 흡수, 분포, 대사, 배설 및 독성 예측 모듈',
      },
      {
        image: null,
        title: 'LiLac-ADMET',
        subTitle: '화합물에 대한 이해',
        description:
          '화합물 구조정보 기반한 화합물의 흡수, 분포, 대사, 배설 및 독성 예측 모듈',
      },
      {
        image: null,
        title: 'LiLac-ADMET',
        subTitle: '화합물에 대한 이해',
        description:
          '화합물 구조정보 기반한 화합물의 흡수, 분포, 대사, 배설 및 독성 예측 모듈',
      },
    ],
  };
  return {
    props: {
      data,
    },
  };
};
