import Seo from '@components/Seo';
import { Style } from '@libs/const';
import { fetchApi } from '@libs/utils';
import { Docs, DocsTitle, Wrapper } from '@styles/common';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Caution = styled.ul`
  font-size: 15px;
  color: #909090;
  list-style-type: disc;
  padding-left: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  margin-top: 60px;

  & > div {
    border: 2px solid ${(props) => props.theme.accent1Color};
    border-left: none;
    border-right: none;
    width: 100%;
    @media only screen and (max-width: ${Style.mobileWidth}) {
      padding: 10px 0;
    }
  }

  input,
  select,
  textarea {
    border: 1px solid #c0c0c0;
    width: 100%;
    max-width: 350px;
    padding: 10px 15px;
    font-size: 16px;
  }
  textarea {
    height: 400px;
    resize: none;
    max-width: initial;
  }
`;

const Label = styled.label`
  display: flex;
  height: 100%;
  min-width: 130px;
  width: 130px;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: ${Style.mobileWidth}) {
    display: inline;
    margin-top: 10px;
  }
`;

const InputBox = styled.div`
  padding: 5px 20px;
  background-color: #ffffff;
  width: 100%;

  @media only screen and (max-width: ${Style.mobileWidth}) {
    padding: 10px 0;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.accent3Color};

  &:not(:last-child) {
    border-bottom: 1px solid #c0c0c0;
  }

  @media only screen and (max-width: ${Style.mobileWidth}) {
    flex-direction: column;
    background-color: #ffffff;
    align-items: flex-start;
    &:not(:last-child) {
      border-bottom: none;
    }
  }
`;

const SubmitBtn = styled.button`
  background-color: ${(props) => props.theme.accent1Color};
  color: #ffffff;
  padding: 12px 50px;
  font-size: 18px;
`;

interface BusinessContactProps {
  data: {
    caution: string;
  }[];
  apiUrl: string;
}

interface FormData {
  category: string;
  name: string;
  email: string;
  contents: string;
}

const BusinessContact: NextPage<BusinessContactProps> = ({ data, apiUrl }) => {
  const { register, handleSubmit } = useForm<FormData>();
  const onValid = async (data: FormData) => {
    // 백으로 전송
    const result = await fetchApi(
      'POST',
      `${apiUrl}/business_contact/send_email`,
      {
        category: data.category,
        name: data.name,
        email: data.email,
        contents: data.contents,
      }
    );

    console.log(result);
  };
  return (
    <Docs>
      <Seo title="Business contact" />
      <Wrapper short={true}>
        <DocsTitle>메일 문의</DocsTitle>
        <Caution>
          {data.map(({ caution }, i) => (
            <li key={`caution${i}`}>{caution}</li>
          ))}
        </Caution>
        <Form onSubmit={handleSubmit(onValid)}>
          <div>
            <Row>
              <Label>문의 구분</Label>
              <InputBox>
                <select {...register('category')} required>
                  <option>옵션1</option>
                  <option>옵션2</option>
                  <option>옵션3</option>
                </select>
              </InputBox>
            </Row>
            <Row>
              <Label>이름</Label>
              <InputBox>
                <input type="text" {...register('name')} required />
              </InputBox>
            </Row>
            <Row>
              <Label>이메일</Label>
              <InputBox>
                <input type="email" {...register('email')} required />
              </InputBox>
            </Row>
            <Row>
              <Label>내용</Label>
              <InputBox>
                <textarea {...register('contents')}></textarea>
              </InputBox>
            </Row>
          </div>
          <SubmitBtn>제출</SubmitBtn>
        </Form>
      </Wrapper>
    </Docs>
  );
};

export default BusinessContact;

export const getServerSideProps = async (ctx: any) => {
  const data = await fetchApi(
    'POST',
    `${process.env.API_URL}/business_contact/get_data`,
    {}
  );
  return {
    props: {
      data,
      apiUrl: process.env.API_URL,
    },
  };
};
