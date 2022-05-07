import CoreValue from '@components/business/our-purpose/CoreValue';
import Goal from '@components/business/our-purpose/Goal';
import Mission from '@components/business/our-purpose/Mission';
import Strategy from '@components/business/our-purpose/Strategy';
import Vission from '@components/business/our-purpose/Vission';
import { Style } from '@libs/const';
import { Wrapper } from '@styles/common';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import styled from 'styled-components';

const Intro = styled.h2`
  margin-top: 40px;
  font-size: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 1100px) {
    font-size: 32px;
  }

  @media only screen and (max-width: ${Style.mobileWidth}) {
    font-size: 22px;
  }
`;

const ScrollBox = styled.div`
  display: flex;

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

const TitleBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
  & > div {
    font-size: 30px;
    height: 450px;
    display: flex;
    align-items: center;
    padding-left: 40px;
  }
`;

const StickyContainer = styled.div`
  width: 100%;
`;

const StickyBox = styled.div`
  position: sticky;
  top: calc(50% - 200px);
  width: 100%;
  height: 450px;
`;

type PurposeType = {
  title: string;
  images?: string[];
  contents: string[];
};

interface OurPurposeProps {
  data: {
    pilosophy: string;
    vision: PurposeType;
    mission: PurposeType;
    strategy: PurposeType;
    goal: PurposeType;
    coreValue: PurposeType;
  };
}

const Title = styled.h2`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 60px;
  display: none;

  @media only screen and (max-width: 1100px) {
    display: block;
  }

  @media only screen and (max-width: ${Style.mobileWidth}) {
    font-size: 28px;
  }
`;

const MoreBtnBox = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  display: none;
  a {
    border-radius: 100px;
    padding: 12px 40px;
    background-color: ${(props) => props.theme.accent1Color};
    color: #ffffff;
    font-size: 23px;
    font-family: 'Poppins', sans-serif;
    display: flex;
    align-items: center;

    svg {
      position: relative;
      left: 10px;
    }
  }

  @media only screen and (max-width: 1100px) {
    display: flex;
  }

  @media only screen and (max-width: ${Style.mobileWidth}) {
    a {
      font-size: 18px;
    }
  }
`;

const OurPurpose = ({ data }: OurPurposeProps) => {
  const $titles = useRef<HTMLDivElement[]>([]);
  const $contents = useRef<HTMLDivElement[]>([]);
  const [cntPurpose, setCntPurpose] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowCenter = (window.innerHeight - Style.headerHeight) / 2;

      if ($titles.current && $contents.current) {
        for (let i = $titles.current.length - 1; i >= 0; i--) {
          const $title = $titles.current[i];

          if ($title) {
            const top = $title.getBoundingClientRect().top;

            if (top + $title.clientHeight / 4 <= windowCenter) {
              setCntPurpose(i);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <Wrapper>
      <Title>Our purpose</Title>
      <Intro>
        {data.pilosophy.split('\n').map((text, i) => (
          <span key={`intro${i}`}>{text}</span>
        ))}
      </Intro>
      <ScrollBox>
        <TitleBox>
          <div ref={(el) => ($titles.current[0] = el!)}>
            {data.vision.title}
          </div>
          <div ref={(el) => ($titles.current[1] = el!)}>
            {data.mission.title}
          </div>
          <div ref={(el) => ($titles.current[2] = el!)}>
            {data.strategy.title}
          </div>
          <div ref={(el) => ($titles.current[3] = el!)}>{data.goal.title}</div>
          <div ref={(el) => ($titles.current[4] = el!)}>
            {data.coreValue.title}
          </div>
        </TitleBox>
        <StickyContainer>
          <StickyBox>
            <Vission
              contents={data.vision.contents}
              ref={$contents.current[0]}
              active={cntPurpose === 0}
            />
            <Mission
              contents={data.mission.contents}
              ref={$contents.current[1]}
              active={cntPurpose === 1}
            />
            <Strategy
              contents={data.strategy.contents}
              ref={$contents.current[2]}
              active={cntPurpose === 2}
            />
            <Goal
              images={data.goal.images}
              contents={data.goal.contents}
              ref={$contents.current[3]}
              active={cntPurpose === 3}
            />
            <CoreValue
              contents={data.coreValue.contents}
              ref={$contents.current[4]}
              active={cntPurpose === 4}
            />
          </StickyBox>
        </StickyContainer>
      </ScrollBox>
      <MoreBtnBox>
        <Link href="/business/our-purpose">
          <a>
            <span>See more</span>
            <BsArrowRight />
          </a>
        </Link>
      </MoreBtnBox>
    </Wrapper>
  );
};

export default OurPurpose;
