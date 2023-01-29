import {Heading} from '@/common/components';
import {useTranslate} from '@/common/hooks';

const HomePage = () => {
  const {translate} = useTranslate('common');

  return (
    <main>
      <Heading tag='h1' size='large'>
        {translate('title')}
      </Heading>
    </main>
  );
};

export default HomePage;
