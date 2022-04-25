import CoreValue from '@components/business/our-purpose/CoreValue';
import Goal from '@components/business/our-purpose/Goal';
import Mission from '@components/business/our-purpose/Mission';
import Strategy from '@components/business/our-purpose/Strategy';
import Vission from '@components/business/our-purpose/Vission';
import Logo from '@components/Logo';
import Seo from '@components/Seo';
import { Style } from '@libs/const';
import { Docs, Wrapper } from '@styles/common';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  h2 {
    font-size: 30px;
  }
`;

const PurposeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  margin-top: 150px;
  & > div {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    h2 {
      font-size: 30px;
      font-family: 'Poppins', sans-serif;
    }
  }
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

const OurPurpose: NextPage<OurPurposeProps> = ({ data }) => {
  const $titles = useRef<HTMLDivElement[]>([]);
  const $contents = useRef<HTMLDivElement[]>([]);
  const [cntPurpose, setCntPurpose] = useState(0);

  return (
    <Docs>
      <Seo title="Our purpose" />
      <Wrapper>
        <Intro>
          {data.philosophy.split('\n').map((text, i) => (
            <h2 key={`intro${i}`}>{text}</h2>
          ))}
        </Intro>
        <PurposeBox>
          <div>
            <h2 ref={(el) => ($titles.current[0] = el!)}>
              {data.vision.title}
            </h2>
            <Vission
              contents={data.vision.contents}
              ref={$contents.current[0]}
              notAction={true}
            />
          </div>
          <div>
            <h2 ref={(el) => ($titles.current[1] = el!)}>
              {data.mission.title}
            </h2>
            <Mission
              contents={data.mission.contents}
              ref={$contents.current[1]}
              notAction={true}
            />
          </div>
          <div>
            <h2 ref={(el) => ($titles.current[2] = el!)}>
              {data.strategy.title}
            </h2>
            <Strategy
              contents={data.strategy.contents}
              ref={$contents.current[2]}
              notAction={true}
            />
          </div>
          <div>
            <h2 ref={(el) => ($titles.current[3] = el!)}>{data.goal.title}</h2>
            <Goal
              contents={data.goal.contents}
              ref={$contents.current[3]}
              notAction={true}
            />
          </div>
          <div>
            <h2 ref={(el) => ($titles.current[4] = el!)}>
              {data.coreValue.title}
            </h2>
            <CoreValue
              contents={data.coreValue.contents}
              ref={$contents.current[4]}
              notAction={true}
            />
          </div>
        </PurposeBox>
      </Wrapper>
    </Docs>
  );
};

export default OurPurpose;

export const getServerSideProps = async (ctx: any) => {
  const data = {
    philosophy:
      '항상 새로운 방식으로 혁신하고,\n이해할 수 있는 방식으로 소통하며,\n소외되지 않도록 공유한다.',
    vision: {
      title: 'Vision',
      contents: [
        '인공지능 기반 제약 및 약료 혁신기술들을\n가장 쉬운 방식으로 제공하는 기업',
      ],
    },
    mission: {
      title: 'Mission',
      contents: [
        '누구보다\n빠른 신약',
        '누구보다\n정확한 약물치료',
        '누구나\n혜택 받을 수 있도록',
      ],
    },
    strategy: {
      title: 'Strategy',
      contents: [
        'AI를 활용한 신약개발, 부스팅 플랫폼 개발',
        'AI를 활용한 정밀 환자 맞춤 약물치료 플랫폼 개발',
        '사용자 친화 인터페이스 개발',
      ],
    },
    goal: {
      title: 'Goal',
      contents: [
        'LiLac-DSP\n인공지능 기반 정주기 신약 개발, 지원시스템 개발',
        'LiLac-QSP\n인공지능 기반 약물 노출 및 반응 예측 플랫폼 개발',
        'LiLac-DSP/QSP\n웹 클라우드 기반 플랫폼 인터페이스 개발',
      ],
    },
    coreValue: {
      title: 'Core Value',
      contents: ['혁신을 위한 소통', '소통을 위한 공유', '공유를 위한 혁신'],
    },
  };
  return {
    props: {
      data,
    },
  };
};
