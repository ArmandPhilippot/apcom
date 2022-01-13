import { generateFeed } from '@utils/helpers/rss';
import { GetServerSideProps } from 'next';

const Feed = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = await generateFeed();

  if (res) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(`${feed.rss2()}`);
    res.end();
  }

  return {
    props: {},
  };
};

export default Feed;
