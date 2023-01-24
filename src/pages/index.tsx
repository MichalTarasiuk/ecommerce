import {useTranslate} from '@/common/hooks';

const HomePage = () => {
  const {translate} = useTranslate('common');

  return <h1>{translate('variable-example.first.value')}</h1>;
};

export default HomePage;
