import React from 'react';
import styled from 'styled-components';

const SCardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-top: 1px solid #c0c0c0;
  padding-top: 80px;
`;

interface CardBoxProps {
  children: React.ReactNode;
}

export default function LiLacCardBox({ children }: CardBoxProps) {
  return <SCardBox>{children}</SCardBox>;
}
