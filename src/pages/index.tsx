import {useTranslate} from '@/common/hooks';
import {Text} from '@/common/components';

const HomePage = () => {
  const {translate} = useTranslate('common');

  return (
    <main>
      <Text tag='p' size='medium'>
        {translate('title')}
      </Text>
    </main>
  );
};

export default HomePage;
