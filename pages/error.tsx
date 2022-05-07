import ErrorLayout from '@components/ErrorLayout';
import Seo from '@components/Seo';
import styled from 'styled-components';

const Custom500 = () => {
  return (
    <ErrorLayout>
      <Seo title={'Error'} />
      <span>500</span>
      <span>Internal server error</span>
    </ErrorLayout>
  );
};

export default Custom500;
