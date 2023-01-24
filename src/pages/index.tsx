import {useTranslate} from '@/common/hooks';

const HomePage = () => {
  const {translate} = useTranslate('common');

  return (
    <main>
      <h1>{translate('title')}</h1>
    </main>
  );
};

export default HomePage;
