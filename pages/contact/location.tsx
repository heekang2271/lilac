import { Docs, Wrapper } from '@styles/common';
import { NextPage } from 'next';
import styled from 'styled-components';
import { BsBuilding } from 'react-icons/bs';
import { AiFillCar, AiOutlineMail } from 'react-icons/ai';
import { IoMdCall } from 'react-icons/io';
import Seo from '@components/Seo';
import { fetchApi } from '@libs/utils';
import Layout from '@components/Layout';

const Iframe = styled.iframe`
  height: 450px;
  width: 100%;
  border: 1px solid #c0c0c0;

  @media only screen and (max-width: 850px) {
    height: 350px;
  }
`;

const LocLayout = styled.div`
  display: flex;
  margin-top: 60px;
  & > div {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media only screen and (max-width: 756px) {
    flex-direction: column;
    gap: 20px;

    & > div {
      width: 100%;
    }
  }
`;

const InfoBox = styled.div`
  display: flex;
  /* align-items: center; */
  gap: 20px;
`;

const InfoIcon = styled.div`
  width: 70px;
  height: 70px;
  min-width: 70px;
  min-height: 70px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.accent1Color};
  color: #ffffff;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -7px;

  @media only screen and (max-width: 850px) {
    width: 50px;
    height: 50px;
    min-width: 50px;
    min-height: 50px;
    font-size: 28px;
    top: 0px;
  }
`;

const Info = styled.div`
  h4 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  @media only screen and (max-width: 850px) {
    h4 {
      font-size: 15px;
    }
    span {
      font-size: 15px;
    }
  }
`;

interface LocationProps {
  data: {
    iframeLink: string;
    address: string;
    email: string;
    call: string;
    road: string;
  };
}

const Location: NextPage<LocationProps> = ({ data }) => {
  return (
    <Layout>
      <Docs>
        <Wrapper short={true}>
          <Seo title="Location" />
          <Iframe src={data.iframeLink} loading="lazy"></Iframe>
          <LocLayout>
            <div>
              <InfoBox>
                <InfoIcon>
                  <BsBuilding />
                </InfoIcon>
                <Info>
                  <h4>주소</h4>
                  <span>{data.address}</span>
                </Info>
              </InfoBox>
              <InfoBox>
                <InfoIcon>
                  <AiOutlineMail />
                </InfoIcon>
                <Info>
                  <h4>이메일</h4>
                  <span>{data.email}</span>
                </Info>
              </InfoBox>
              <InfoBox>
                <InfoIcon>
                  <IoMdCall />
                </InfoIcon>
                <Info>
                  <h4>대표전화</h4>
                  <span>{data.call}</span>
                </Info>
              </InfoBox>
            </div>
            <div>
              <InfoBox>
                <InfoIcon>
                  <AiFillCar />
                </InfoIcon>
                <Info>
                  <h4>찾아오시는 길</h4>
                  <span>{data.road}</span>
                </Info>
              </InfoBox>
            </div>
          </LocLayout>
        </Wrapper>
      </Docs>
    </Layout>
  );
};

export default Location;

export const getServerSideProps = async (ctx: any) => {
  const data = await fetchApi(
    'POST',
    `${process.env.API_URL}/location/get_data`,
    {}
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
