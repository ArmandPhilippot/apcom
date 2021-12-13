export type fetchHomePageReturn = () => Promise<HomePageResponse>;

export type HomePageResponse = {
  nodeByUri: {
    id: string;
    content: string;
  };
};

export type getHomePageReturn = () => Promise<HomePage>;

export type HomePage = {
  id: string;
  content: string;
};

export type HomePageProps = {
  data: HomePage;
};
