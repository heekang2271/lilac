import { PurposeProps } from '@libs/const';
import styled from 'styled-components';
import { PurposeContents } from '@styles/common';
import { BsBuilding } from 'react-icons/bs';

const Container = styled(PurposeContents)`
  flex-direction: column;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    color: ${(props) => props.theme.accent1Color};
    font-weight: 600;
    text-align: center;
  }
  gap: 10px;

  & > div:last-child {
    font-size: 24px;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  @media only screen and (max-width: 850px) {
    & > div:first-child {
      font-size: 19px;
    }
    gap: 10px;

    & > div:last-child {
      font-size: 18px;
    }
  }
`;

const IconBox = styled.div`
  font-size: 150px;
  color: ${(props) => props.theme.accent1Color};
`;

export default function Vission({
  contents,
  active,
  ref,
  notAction,
}: PurposeProps) {
  return (
    <Container ref={(el) => (ref = el!)} active={active} notAction={notAction}>
      {contents.map((item, i) => (
        <div key={`vission${i}`}>
          {item.split('\n').map((text, j) => (
            <span key={`vission${i}${j}`}>{text}</span>
          ))}
        </div>
      ))}
      {/* <IconBox>
        <BsBuilding />
      </IconBox> */}
    </Container>
  );
}
