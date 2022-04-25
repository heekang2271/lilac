import { Style } from '@libs/const';
import { Wrapper } from '@styles/common';
import styled from 'styled-components';
import Logo from './Logo';

const SFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${Style.footerHeight};
  background-color: #4b4b4b;

  ${Wrapper} {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px;
  }
`;

const FooterText = styled.p`
  max-width: 600px;
  font-size: 13px;
  color: #a3a3a3;
`;

export default function Footer() {
  return (
    <SFooter>
      <Wrapper>
        <FooterText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </FooterText>
        <Logo size={150} filter={'grayscale(100%)'} />
      </Wrapper>
    </SFooter>
  );
}
