import type {getStaticProps} from './propsProvider';
import type {InferGetStaticPropsType} from 'next';

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const HomePage = ({}: HomePageProps) => {
  return null;
};
