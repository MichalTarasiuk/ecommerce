import {useTranslate} from '@/common/hooks';

const HomePage = () => {
  const {translate} = useTranslate('common');

  return (
    <main>
      <h1 className='text-[red]'>{translate('title')}</h1>
    </main>
  );
};

export default HomePage;
