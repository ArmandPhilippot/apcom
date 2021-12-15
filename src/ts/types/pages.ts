export type Page = {
  content: string;
  date: string;
  intro: string;
  modified: string;
  title: string;
};

export type RawPage = {
  contentParts: {
    afterMore: string;
    beforeMore: string;
  };
  date: string;
  modified: string;
  title: string;
};

export type PageResponse = {
  pageBy: RawPage;
};

export type FetchPageByUriReturn = (uri: string) => Promise<RawPage>;

export type GetPageReturn = () => Promise<Page>;

export type PageProps = {
  page: Page;
};
