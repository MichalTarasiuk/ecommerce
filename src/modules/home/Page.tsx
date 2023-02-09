import {Text} from '@/common/components/components';
import {useTranslate} from '@/common/hooks/hooks';

import type {getStaticProps} from './propsProvider';
import type {InferGetStaticPropsType} from 'next';

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const HomePage = ({}: HomePageProps) => {
  const {translate} = useTranslate('common');

  return (
    <Text tag='p' size='small'>
      {translate('title')}
    </Text>
  );
};
