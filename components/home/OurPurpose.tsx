import CoreValue from '@components/business/our-purpose/CoreValue';
import Goal from '@components/business/our-purpose/Goal';
import Mission from '@components/business/our-purpose/Mission';
import Strategy from '@components/business/our-purpose/Strategy';
import Vission from '@components/business/our-purpose/Vission';
import { Style } from '@libs/const';
import { Wrapper } from '@styles/common';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Intro = styled.div`
  margin-top: 40px;
  h2 {
    font-size: 36px;
  }
`;

const ScrollBox = styled.div`
  display: flex;
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
  contents: string[];
};

interface OurPurposeProps {
  data: {
    philosophy: string;
    vision: PurposeType;
    mission: PurposeType;
    strategy: PurposeType;
    goal: PurposeType;
    coreValue: PurposeType;
  };
}

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
          const top = $title.getBoundingClientRect().top;

          if (top + $title.clientHeight / 4 <= windowCenter) {
            setCntPurpose(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Wrapper>
      <Intro>
        {data.philosophy.split('\n').map((text, i) => (
          <h2 key={`intro${i}`}>{text}</h2>
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
    </Wrapper>
  );
};

export default OurPurpose;
