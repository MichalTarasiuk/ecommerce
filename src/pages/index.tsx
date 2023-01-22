import {useTranslate} from 'src/common/hooks';

const HomePage = () => {
  const {translate} = useTranslate('common');

  return <h1>{translate('variable-example.second.value')}</h1>;
};

export default HomePage;
