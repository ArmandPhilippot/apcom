import type { GetServerSideProps } from 'next';
import { generateFeed } from '../utils/helpers';

const Feed = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = await generateFeed();

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=59'
  );
  res.setHeader('Content-Type', 'text/xml');
  res.write(feed.atom1());
  res.end();

  return {
    props: {},
  };
};

export default Feed;
