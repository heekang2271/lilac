import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme } from '@styles/theme';
import GlobalStyles from '@styles/globalStyles';
import Header from './Header';
import { BannerImage, Style } from '@libs/const';
import { useRouter } from 'next/router';
import { getPathString } from '@libs/utils';
import { Wrapper } from '@styles/common';
import { AiFillHome } from 'react-icons/ai';
import { MdArrowForwardIos } from 'react-icons/md';
import Link from 'next/link';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

interface IMain {
  isHome: boolean;
}

const Container = styled.div`
  position: relative;
  padding-bottom: ${Style.footerHeight};
  min-height: 100vh;
`;

const Main = styled.div<IMain>`
  padding-top: ${(props) => (props.isHome ? '0px' : `${Style.headerHeight}px`)};
`;

interface BannerProps {
  image: string;
}

const Banner = styled.div<BannerProps>`
  background-image: ${(props) => `url(${props.image})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 286px;
`;

const BannerWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
`;

const BannerText = styled.div`
  color: #ffffff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);

  h1 {
    font-size: 42px;
    font-weight: 600;
  }
  span {
    font-size: 24px;
    font-weight: 600;
  }

  @media only screen and (max-width: 850px) {
    h1 {
      font-size: 32px;
    }
    span {
      font-size: 20px;
    }
  }
`;

const BannerNav = styled.nav`
  height: 45px;
  min-height: 45px;
  background-color: rgba(165, 123, 165, 0.9);
  color: #ffffff;

  ${Wrapper} {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  a {
    display: flex;
    align-items: center;
  }

  a:first-child {
    font-size: 20px;
  }

  @media only screen and (max-width: 850px) {
    height: 40px;
    min-height: 40px;
    a {
      font-size: 15px;
    }
    a:first-child {
      font-size: 18px;
    }
  }
`;

type Path = 'business' | 'technology' | 'contact';

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const path = router.pathname.split('/');

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Container>
          <Header isHome={router.pathname === '/'} />
          <Main isHome={router.pathname === '/'}>
            {router.pathname !== '/' && (
              <Banner image={BannerImage[path[1] as Path]}>
                <BannerWrapper>
                  <BannerText>
                    <h1>{getPathString(path[1])}</h1>
                    <span>{getPathString(path[2])}</span>
                  </BannerText>
                  <BannerNav>
                    <Wrapper>
                      <Link href="/">
                        <a>
                          <AiFillHome />
                        </a>
                      </Link>
                      <MdArrowForwardIos />
                      <Link href={`/${path[1]}`}>
                        <a>{getPathString(path[1])}</a>
                      </Link>
                      <MdArrowForwardIos />
                      <Link href={`/${path[1]}/${path[2]}`}>
                        <a>{getPathString(path[2])}</a>
                      </Link>
                    </Wrapper>
                  </BannerNav>
                </BannerWrapper>
              </Banner>
            )}
            <>{children}</>
          </Main>
          <Footer />
        </Container>
      </ThemeProvider>
    </>
  );
}
