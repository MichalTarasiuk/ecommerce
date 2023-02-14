import {Text} from '@/common/components/components';
import {useTranslate} from '@/common/hooks/hooks';
import {MainLayout} from '@/layouts/layouts';

import type {getStaticProps} from './propsProvider';
import type {InferGetStaticPropsType} from 'next';
import type {ReactElement} from 'react';

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export function HomePage({}: HomePageProps) {
  const {translate} = useTranslate('common');

  return (
    <Text tag='p' size='small'>
      {translate('title')}
    </Text>
  );
}

HomePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
