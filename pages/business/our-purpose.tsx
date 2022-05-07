import CoreValue from '@components/business/our-purpose/CoreValue';
import Goal from '@components/business/our-purpose/Goal';
import Mission from '@components/business/our-purpose/Mission';
import Strategy from '@components/business/our-purpose/Strategy';
import Vission from '@components/business/our-purpose/Vission';
import Layout from '@components/Layout';
import Logo from '@components/Logo';
import Seo from '@components/Seo';
import { Style } from '@libs/const';
import { fetchApi } from '@libs/utils';
import { Docs, Wrapper } from '@styles/common';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Intro = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  font-size: 30px;

  @media only screen and (max-width: 850px) {
    font-size: 23px;
  }
`;

const PurposeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 150px;
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
    pilosophy: string;
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
    <Layout>
      <Docs>
        <Seo title="Our purpose" />
        <Wrapper>
          <Intro>
            {data.pilosophy.split('\n').map((text, i) => (
              <span key={`intro${i}`}>{text}</span>
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
              <h2 ref={(el) => ($titles.current[3] = el!)}>
                {data.goal.title}
              </h2>
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
    </Layout>
  );
};

export default OurPurpose;

export const getServerSideProps = async (ctx: any) => {
  const data = await fetchApi(
    'POST',
    `${process.env.API_URL}/Our_purpose/get_data`
  );
  if (data?.error === 500) {
    return {
      redirect: {
        destination: '/error',
      },
    };
  }
  return {
    props: {
      data,
    },
  };
};
