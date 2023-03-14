import {Paragraph} from 'components/components';
import {DefaultLayout} from 'layouts/layouts';
import {useTranslate} from 'lib/translate/translate';

import type {getStaticProps} from './propsProvider';
import type {InferGetStaticPropsType} from 'next';
import type {ReactElement} from 'react';
import type {NextPageWithLayout} from 'types/next';

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const HomePage: NextPageWithLayout<HomePageProps> = ({}) => {
  const {translate} = useTranslate('common');

  return <Paragraph size='small'>{translate('title')}</Paragraph>;
};

HomePage.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);
