import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme } from '@styles/theme';
import GlobalStyles from '@styles/globalStyles';
import Header from './Header';
import { Style } from '@libs/const';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  position: relative;
  padding-top: ${`${Style.headerHeight}px`};
  padding-bottom: ${Style.footerHeight};
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = styled.div`
  padding: 80px 0;
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 30px;
  }
`;

export default function ErrorLayout({ children }: LayoutProps) {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Container>
          <Header isHome={false} />
          <Main>
            <ErrorMessage>
              <>{children}</>
            </ErrorMessage>
          </Main>
          <Footer />
        </Container>
      </ThemeProvider>
    </>
  );
}
