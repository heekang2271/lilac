import ErrorLayout from '@components/ErrorLayout';
import Seo from '@components/Seo';

const Custom404 = () => {
  return (
    <ErrorLayout>
      <Seo title={'Error'} />
      <span>404</span>
      <span>Page not found</span>
    </ErrorLayout>
  );
};

export default Custom404;
