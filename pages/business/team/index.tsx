import { TeamProps } from '@libs/const';
import { NextPage } from 'next';
import TeamComponent from '@components/business/team/Team';
import { fetchApi } from '@libs/utils';

const Team: NextPage<TeamProps> = ({ data }) => {
  return <TeamComponent data={data} />;
};

export default Team;

export const getServerSideProps = async (ctx: any) => {
  const data = await fetchApi('POST', `${process.env.API_URL}/team/get_data`, {
    id: '0',
  });
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
