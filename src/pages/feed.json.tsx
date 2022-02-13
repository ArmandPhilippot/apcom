import { generateFeed } from '@utils/helpers/rss';
import { GetServerSideProps } from 'next';

const Feed = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = await generateFeed();

  if (res) {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=59'
    );
    res.setHeader('Content-Type', 'application/json');
    res.write(`${feed.json1()}`);
    res.end();
  }

  return {
    props: {},
  };
};

export default Feed;
