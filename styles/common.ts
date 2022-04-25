import React from 'react';
import styled from 'styled-components';

interface WrapperProps {
  short?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  padding: 0 40px;
  margin: 0 auto;
  max-width: ${(props) => (props.short ? '1080px' : '1200px')};

  @media only screen and (max-width: 680px) {
    padding: 0 20px;
  }
`;

export const Docs = styled.div`
  padding: 90px 0;
  padding-bottom: 150px;
`;

export const DocsTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 40px;

  @media only screen and (max-width: 680px) {
    font-size: 24px;
  }
`;

interface PurposeContentsProps {
  active?: boolean;
  notAction?: boolean;
}

export const PurposeContents = styled.div<PurposeContentsProps>`
  position: ${(props) => (props.notAction ? 'relative' : 'absolute')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  opacity: ${(props) => (props.active || props.notAction ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;
