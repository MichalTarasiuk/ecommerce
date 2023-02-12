import {useEffect} from 'react';

import {Text} from '@/common/components/components';
import {useChannel, useTranslate} from '@/common/hooks/hooks';
import {DefaultLayout} from '@/layouts/layouts';

import type {getStaticProps} from './propsProvider';
import type {InferGetStaticPropsType} from 'next';
import type {ReactElement} from 'react';

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export function HomePage({}: HomePageProps) {
  const {translate} = useTranslate('common');
  const {setChannel} = useChannel();

  useEffect(() => {
    setChannel('kodk');
  }, [setChannel]);

  return (
    <Text tag='p' size='small'>
      {translate('title')}
    </Text>
  );
}

HomePage.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);
