export type HomePage = {
  id: string;
  content: string;
};

export type HomePageBy = {
  nodeByUri: HomePage;
};

export type HomePageProps = {
  data: HomePage;
};
