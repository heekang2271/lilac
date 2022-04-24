import Seo from '@components/Seo';
import { Docs, Wrapper } from '@styles/common';
import { NextPage } from 'next';

const PlatformLink: NextPage = () => {
  return (
    <Docs>
      <Seo title="Platform link" />
      <Wrapper></Wrapper>
    </Docs>
  );
};

export default PlatformLink;
