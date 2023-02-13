import Link from 'next/link';

import {Text} from '@/common/components/components';
import {useTranslate} from '@/common/hooks/hooks';
import {DefaultLayout} from '@/layouts/layouts';

import type {getStaticProps} from './propsProvider';
import type {InferGetStaticPropsType} from 'next';
import type {ReactElement} from 'react';

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export function HomePage({}: HomePageProps) {
  const {translate} = useTranslate('common');

  return (
    <Text tag='p' size='small'>
      {translate('title')}
      <Link href='/default-channel/pl-PL'>check</Link>
    </Text>
  );
}

HomePage.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);
