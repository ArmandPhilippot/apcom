import { render, screen } from '../../../../tests/utils';
import { Summary } from './summary';
import { cover, intro, meta, title, url } from './summary.fixture';

describe('Summary', () => {
  it('renders a title wrapped in a h2 element', () => {
    render(
      <Summary
        intro={intro}
        meta={meta}
        title={title}
        titleLevel={2}
        url={url}
      />
    );
    expect(
      screen.getByRole('heading', { level: 2, name: title })
    ).toBeInTheDocument();
  });

  it('renders an excerpt', () => {
    render(<Summary intro={intro} meta={meta} title={title} url={url} />);
    expect(screen.getByText(intro)).toBeInTheDocument();
  });

  it('renders a cover', () => {
    render(
      <Summary
        intro={intro}
        meta={{ ...meta, cover }}
        title={title}
        url={url}
      />
    );
    expect(screen.getByRole('img', { name: cover.alt })).toBeInTheDocument();
  });

  it('renders a link to the full post', () => {
    render(<Summary intro={intro} meta={meta} title={title} url={url} />);
    expect(screen.getByRole('link', { name: title })).toBeInTheDocument();
  });

  it('renders a read more link', () => {
    render(<Summary intro={intro} meta={meta} title={title} url={url} />);
    expect(
      screen.getByRole('link', { name: `Read more about ${title}` })
    ).toBeInTheDocument();
  });

  it('renders some meta', () => {
    render(<Summary intro={intro} meta={meta} title={title} url={url} />);
    expect(screen.getByText(meta.thematics![0].name)).toBeInTheDocument();
  });
});
