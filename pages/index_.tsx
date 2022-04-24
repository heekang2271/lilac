import Seo from '@components/Seo';
import { Style } from '@libs/const';
import { Wrapper } from '@styles/common';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

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

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  p {
    text-align: center;
  }

  a {
    font-family: 'Poppins', sans-serif;
    color: ${(props) => props.theme.accent1Color};
    font-size: 18px;

    &:hover {
      text-decoration: underline;
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
        <Wrapper>
          <Title>LiLac</Title>
          <Intro>
            <p>{data.intro}</p>
            <Link href="/business/our-purpose">
              <a>Read more +</a>
            </Link>
          </Intro>
        </Wrapper>
      </Section>
      <Section bgColor="#f6f1f6">
        <Title>Technology</Title>
      </Section>
    </Container>
  );
};

export default Home;

export const getServerSideProps = async (ctx: any) => {
  const data = {
    visual: [
      {
        image: '/img/Home1.jpg',
        title: 'Lorem ipsum dolor sit amet, consectetur',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit',
      },
      {
        image: '/img/Home2.jpg',
        title: 'Lorem ipsum dolor sit amet, consectetur',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit',
      },
      {
        image: '/img/Home3.jpg',
        title: 'Lorem ipsum dolor sit amet, consectetur',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit',
      },
    ],
    intro:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.',
  };
  return {
    props: {
      data,
    },
  };
};
