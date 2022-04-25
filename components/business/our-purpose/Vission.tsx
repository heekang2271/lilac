import { PurposeProps } from '@libs/const';
import styled from 'styled-components';
import { PurposeContents } from '@styles/common';
import { BsBuilding } from 'react-icons/bs';

const Container = styled(PurposeContents)`
  & > div:first-child {
    display: flex;
    flex-direction: column;
    font-size: 26px;
  }
  gap: 50px;
`;

const IconBox = styled.div`
  font-size: 150px;
  color: #606060;
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
      <IconBox>
        <BsBuilding />
      </IconBox>
    </Container>
  );
}
