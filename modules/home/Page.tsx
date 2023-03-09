import {Text} from 'components/components';
import {DefaultLayout} from 'layouts/layouts';
import {useTranslate} from 'lib/translate/translate';

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

HomePage.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);
