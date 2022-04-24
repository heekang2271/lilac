import { TeamProps } from '@libs/const';
import { Docs, Wrapper } from '@styles/common';
import Link from 'next/link';
import styled from 'styled-components';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import React, { useState } from 'react';
import Seo from '@components/Seo';

const Container = styled.div`
  display: flex;
  font-family: 'Poppins', 'Spoqa Han Sans Neo', sans-serif;
  gap: 80px;

  @media only screen and (max-width: 1070px) {
    gap: 30px;
  }
  @media only screen and (max-width: 730px) {
    align-items: center;
    flex-direction: column;
  }
`;

const DetailBox = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 730px) {
    max-width: initial;
  }
`;

const Image = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  justify-content: center;

  img {
    max-width: 300px;
    border: 1px solid #d0d0d0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const DetailInfoBox = styled.div`
  margin-top: 40px;
`;

const DetailName = styled.div`
  font-weight: 600;
  h2 {
    font-size: 24px;
  }
  h4 {
    font-size: 18px;
  }
  margin-bottom: 30px;
`;

const Level = styled.span`
  color: ${(props) => props.theme.accent1Color};
  margin-left: 15px;
`;

const LinkList = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  row-gap: 5px;

  & > div:nth-child(odd) {
    color: ${(props) => props.theme.accent1Color};
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
  }

  & > div:nth-child(even) {
    word-break: break-all;
  }

  a {
    text-decoration: underline;
    font-size: 14px;
    &:hover {
      color: #98b9fa;
    }
  }
`;

const History = styled.div`
  margin-top: 50px;

  h4 {
    color: ${(props) => props.theme.accent1Color};
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  & > div {
    max-height: 200px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #b0b0b0;
      border-radius: 10px;

      &:hover {
        background-color: #909090;
      }
    }

    &::-webkit-scrollbar-track {
      background-color: #ffffff;
    }
  }
`;

const HistoryRow = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;

  span:first-child {
    color: #000000;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 15px;
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const CardBox = styled.div`
  overflow-y: auto;
  max-height: 1100px;
  padding: 0 20px;
  width: 100%;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b0b0b0;
    border-radius: 10px;

    &:hover {
      background-color: #909090;
    }
  }

  &::-webkit-scrollbar-track {
    background-color: #ffffff;
  }

  @media only screen and (max-width: 730px) {
    display: none;
  }
`;

const Group = styled.div`
  &:not(:last-child) {
    margin-bottom: 80px;
  }
`;

const GroupLevel = styled.h2`
  font-size: 32px;
  font-weight: 500;
  color: #595f6f;
  margin-bottom: 20px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px;

  @media only screen and (max-width: 1070px) {
    grid-template-columns: 1fr;
  }
`;

const CardName = styled.div`
  font-weight: 600;
  h4 {
    font-size: 23px;
  }
  h5 {
    font-size: 16px;
  }
  margin-bottom: 40px;
`;

const Seemore = styled.span`
  position: absolute;
  top: 23px;
  right: 23px;
  font-size: 11px;
`;

const CardInfo = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  font-size: 14px;
`;

interface CardProps {
  current: boolean;
}

const Card = styled.div<CardProps>`
  position: relative;
  border: 1px solid #c0c0c0;
  border-radius: 12px;
  padding: 23px;
  display: block;
  background-color: ${(props) =>
    props.current ? props.theme.accent1Color : '#ffffff'};
  max-width: 450px;

  &:hover {
    box-shadow: 0 0 10px -3px rgba(0, 0, 0, 0.5);
    ${CardName}, ${Seemore} {
      color: ${(props) =>
        props.current ? '#ffffff' : props.theme.accent1Color};
    }
    ${Seemore} {
      color: ${(props) => props.theme.accent1Color};
      text-decoration: underline;
    }
  }

  ${CardName} {
    color: ${(props) => (props.current ? '#ffffff' : '#7e838f')};
  }

  ${CardInfo} {
    color: ${(props) => (props.current ? '#ffffff' : '#808080')};
    & > div:nth-child(odd) {
      color: ${(props) =>
        props.current ? '#e6d5e6' : props.theme.accent1Color};
    }
  }

  ${Seemore} {
    color: ${(props) => (props.current ? props.theme.accent1Color : '#808080')};
  }
`;

const MobileSelectBox = styled.div`
  display: none;
  width: 100%;
  position: relative;
  margin-bottom: 40px;
  @media only screen and (max-width: 730px) {
    display: block;
  }
`;

const MobileSelect = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.accent1Color};
  color: #ffffff;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  svg {
    color: #ffffff;
    font-size: 24px;
  }
`;

interface SelectDetailProps {
  show: boolean;
}

const SelectDetail = styled.ul<SelectDetailProps>`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.show ? '12px 0' : '0px')};
  background-color: #ffffff;
  border: ${(props) => (props.show ? '1px solid #a0a0a0' : 'none')};
  border-top: 0;
  box-shadow: 0 0 10px -3px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  overflow-y: auto;
  max-height: ${(props) => (props.show ? '240px' : '0px')};
  /* transition: max-height 0.5s ease-in-out; */

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b0b0b0;
    border-radius: 10px;

    &:hover {
      background-color: #909090;
    }
  }

  &::-webkit-scrollbar-track {
    background-color: #ffffff;
  }
`;

interface SelectLink {
  current: boolean;
}

const SelectLink = styled.a<SelectLink>`
  font-size: 14px;
  display: block;
  padding: 5px 15px;
  color: ${(props) =>
    props.current ? props.theme.accent1Color : props.theme.textColor};
`;

export default function Team({ data: { detail, group } }: TeamProps) {
  const [selectOn, setSelectOn] = useState(false);

  const toggleSelectOn = () => {
    setSelectOn((prev) => !prev);
  };
  const onClickLink = () => {
    setSelectOn(false);
  };
  return (
    <Docs>
      <Wrapper>
        <Seo title="Team" />
        <Container>
          <MobileSelectBox>
            <MobileSelect onClick={toggleSelectOn}>
              <span>
                {detail.nameKr} ({detail.nameEn})
              </span>
              {selectOn ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
            </MobileSelect>
            <SelectDetail show={selectOn}>
              {group.map((group, i) => (
                <React.Fragment key={`mobileGroup${i}`}>
                  {group.members.map((member) => (
                    <li key={`mobileMember${member.id}`}>
                      <Link href={`/business/team/${member.id}`}>
                        <SelectLink
                          current={detail.id === member.id}
                          onClick={onClickLink}
                        >
                          {member.nameKr} ({member.nameEn})
                        </SelectLink>
                      </Link>
                    </li>
                  ))}
                </React.Fragment>
              ))}
            </SelectDetail>
          </MobileSelectBox>
          <DetailBox>
            <Image>
              <img
                src={
                  detail.image && detail.image.length > 0
                    ? detail.image[0]
                    : '/img/people_temp.png'
                }
              />
            </Image>
            <DetailInfoBox>
              <DetailName>
                <h2>
                  {detail.nameKr}
                  <Level>{detail.level}</Level>
                </h2>
                <h4>{detail.nameEn}</h4>
              </DetailName>

              <LinkList>
                <div>E-mail</div>
                <div>{detail.email}</div>
                {detail.github && (
                  <>
                    <div>Github</div>
                    <div>
                      <a href={detail.github} target="_blank">
                        {detail.github}
                      </a>
                    </div>
                  </>
                )}
                {detail.scholar && (
                  <>
                    <div>Scholar</div>
                    <div>
                      <a href={detail.scholar} target="_blank">
                        {detail.scholar}
                      </a>
                    </div>
                  </>
                )}
                {detail.link && (
                  <>
                    <div>Linkdin</div>
                    <div>
                      <a href={detail.scholar} target="_blank">
                        {detail.scholar}
                      </a>
                    </div>
                  </>
                )}
              </LinkList>
              <History>
                <h4>Career</h4>
                <div>
                  {detail.career.map(({ date, detail }, i) => (
                    <HistoryRow key={`detailCareer${i}`}>
                      <span>{date}</span>
                      <span>{detail}</span>
                    </HistoryRow>
                  ))}
                </div>
              </History>
              <History>
                <h4>Education</h4>
                <div>
                  {detail.education.map(({ date, detail }, i) => (
                    <HistoryRow key={`detailEducation${i}`}>
                      <span>{date}</span>
                      <span>{detail}</span>
                    </HistoryRow>
                  ))}
                </div>
              </History>
            </DetailInfoBox>
          </DetailBox>
          <CardBox>
            <div>
              {group.map((group, i) => (
                <Group key={`group${i}`}>
                  <GroupLevel>{group.level}</GroupLevel>
                  <CardGrid>
                    {group.members.map((member) => (
                      <Link
                        href={`/business/team/${member.id}`}
                        key={`card${member.id}`}
                      >
                        <a>
                          <Card current={detail.id === member.id}>
                            <CardName>
                              <h4>{member.nameKr}</h4>
                              <h5>{member.nameEn}</h5>
                            </CardName>
                            <Seemore>See more</Seemore>
                            <CardInfo>
                              <div>Admission</div>
                              <div>{member.admission}</div>
                              <div>E-mail</div>
                              <div>{member.email}</div>
                            </CardInfo>
                          </Card>
                        </a>
                      </Link>
                    ))}
                  </CardGrid>
                </Group>
              ))}
            </div>
          </CardBox>
        </Container>
      </Wrapper>
    </Docs>
  );
}
