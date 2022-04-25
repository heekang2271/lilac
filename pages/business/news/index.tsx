import Seo from '@components/Seo';
import { Docs, Wrapper } from '@styles/common';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BsPinFill } from 'react-icons/bs';
import { IoMdSkipForward, IoMdSkipBackward } from 'react-icons/io';
import { IoCaretForward, IoCaretBack } from 'react-icons/io5';
import Link from 'next/link';
import { fetchApi, getPageNumber } from '@libs/utils';

const SearchBox = styled.form`
  height: 50px;
  width: 100%;
  background-color: ${(props) => props.theme.accent2Color};
  padding: 4px;
  gap: 4px;
  display: flex;

  select,
  input {
    border: none;
    height: 100%;
    font-size: 15px;
    padding: 0 15px;
    outline: none;
  }

  select {
    width: 130px;
    min-width: 130px;
  }
  input {
    width: 100%;
  }
  button {
    min-width: 127px;
    width: 127px;
    height: 100%;
    background-color: #5e5e5e;
    color: #ffffff;
  }
`;

const Total = styled.div`
  margin-top: 40px;
  span {
    font-weight: 600;
    color: ${(props) => props.theme.accent1Color};
  }
`;

const NewsBox = styled.div`
  margin-top: 20px;
  border: 1px solid #7f7f7f;
  border-left: none;
  border-right: none;
`;

const Card = styled.div`
  display: block;
  padding: 20px 0;
  padding-bottom: 15px;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid #bebebe;
  }
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  overflow: hidden;

  h4 {
    font-size: 16px;
    font-weight: 600;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  svg {
    color: ${(props) => props.theme.accent1Color};
    font-size: 24px;
  }
  margin-bottom: 10px;
`;

const CardContents = styled.p`
  font-size: 14px;
  color: #808080;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardDate = styled.span`
  display: block;
  margin-top: 15px;
  font-size: 14px;
  color: #a0a0a0;
`;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

const Pagination = styled.div`
  display: flex;
  gap: 5px;
`;

interface PageBtnProps {
  arrow: boolean;
  size?: string;
  cnt: boolean;
}

const PageBtn = styled.button<PageBtnProps>`
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33px;
  width: ${(props) => (props.arrow ? '33px' : '28px')};
  font-size: 17px;
  border: 1px solid ${(props) => (props.arrow ? '#bebebe' : 'none')};
  color: ${(props) => (props.cnt ? props.theme.accent1Color : '#7f7f7f')};
  text-decoration: ${(props) => (props.cnt ? 'underline' : 'none')};
  font-weight: ${(props) => (props.cnt ? 600 : 'initial')};

  &:hover {
    color: #000000;
  }

  svg {
    font-size: ${(props) => props.size};
  }

  &:nth-child(2) {
    margin-right: 10px;
  }
  &:nth-last-child(2) {
    margin-left: 10px;
  }
`;

interface INews {
  id: number;
  title: string;
  contents: string;
  date: string;
}

interface NewsProps {
  data: {
    fixed: INews[];
    unfixed: INews[];
    total: number;
  };
  pagination: {
    start: number;
    current: number;
    end: number;
    prev: number;
    next: number;
    total: number;
  };
  query: {
    key?: string;
    value?: string;
  };
}

interface FormData {
  key: string;
  value: string;
}

const News: NextPage<NewsProps> = ({ data, pagination, query }) => {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const onValid = ({ key, value }: FormData) => {
    router.push({
      pathname: '/business/news',
      query: {
        ...(key !== '' && { key }),
        ...(value !== '' && { value }),
      },
    });
  };

  const onPageBtnClick = (page: number) => {
    router.push({
      pathname: '/business/news',
      query: {
        page,
        ...(query.key && { key: query.key }),
        ...(query.value && { value: query.value }),
      },
    });
  };

  const onCardClick = (id: number) => {
    router.push(
      {
        pathname: `/business/news/${id}`,
        query: {
          existBack: true,
        },
      },
      `/business/news/${id}`
    );
  };

  return (
    <Docs>
      <Seo title="News" />
      <Wrapper short={true}>
        <SearchBox onSubmit={handleSubmit(onValid)}>
          <select {...register('key')} defaultValue={query.key ?? ''}>
            <option value="">전체</option>
            <option value="title">제목</option>
            <option value="contents">내용</option>
          </select>
          <input
            {...register('value')}
            type="text"
            defaultValue={query.value}
            placeholder="검색어를 입력하세요."
          />
          <button type="submit">검색</button>
        </SearchBox>
        <Total>
          총: <span>{data.total}</span> 건
        </Total>
        <NewsBox>
          {data.fixed.map((news) => (
            <Link href={`/business/news/${news.id}`} key={`news${news.id}`}>
              <Card key={`news${news.id}`} onClick={() => onCardClick(news.id)}>
                <CardTitle>
                  <BsPinFill />
                  <h4>{news.title}</h4>
                </CardTitle>
                <CardContents>{news.contents}</CardContents>
                <CardDate>{news.date}</CardDate>
              </Card>
            </Link>
          ))}
          {data.unfixed.map((news) => (
            <Card key={`news${news.id}`} onClick={() => onCardClick(news.id)}>
              <CardTitle>
                <h4>{news.title}</h4>
              </CardTitle>
              <CardContents>{news.contents}</CardContents>
              <CardDate>{news.date}</CardDate>
            </Card>
          ))}
        </NewsBox>
        <PaginationBox>
          <Pagination>
            <PageBtn
              arrow={true}
              size="20px"
              onClick={() => onPageBtnClick(1)}
              cnt={false}
            >
              <IoMdSkipBackward />
            </PageBtn>
            <PageBtn
              arrow={true}
              size="22px"
              onClick={() => onPageBtnClick(pagination.prev)}
              cnt={false}
            >
              <IoCaretBack />
            </PageBtn>
            {getPageNumber(pagination.start, pagination.end).map((num) => (
              <PageBtn
                key={`pageNum${num}`}
                arrow={false}
                onClick={() => onPageBtnClick(num)}
                cnt={pagination.current == num}
              >
                {num}
              </PageBtn>
            ))}
            <PageBtn
              arrow={true}
              size="22px"
              onClick={() => onPageBtnClick(pagination.next)}
              cnt={false}
            >
              <IoCaretForward />
            </PageBtn>
            <PageBtn
              arrow={true}
              size="20px"
              onClick={() => onPageBtnClick(pagination.total)}
              cnt={false}
            >
              <IoMdSkipForward />
            </PageBtn>
          </Pagination>
        </PaginationBox>
      </Wrapper>
    </Docs>
  );
};

export default News;

export const getServerSideProps = async (ctx: any) => {
  const { query } = ctx;
  const page = query.page ?? 1;
  const key = query.key ?? '';
  const value = query.value ?? '';
  const itemCount = 5;
  const pageCount = 5;

  const res = await fetchApi('POST', `${process.env.API_URL}/news/get_data`, {
    key,
    value,
    page: Number(page),
    count: itemCount,
  });

  const start = Math.floor((page - 1) / pageCount) * pageCount + 1;
  const end =
    start + pageCount > res.totalPage ? res.totalPage : start + pageCount - 1;
  const prev = start === 1 ? 1 : start - 1;
  const next = end === res.totalPage ? end : end + 1;

  return {
    props: {
      data: {
        ...res,
        total: res.filteringLength,
      },
      pagination: {
        start,
        current: page,
        end,
        prev,
        next,
        total: res.totalPage,
      },
      query,
    },
  };
};
