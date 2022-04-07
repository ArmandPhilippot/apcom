import { render, screen } from '@test-utils';
import Tooltip from './tooltip';

const title = 'Illum eum at';
const content =
  'Non accusantium ad. Est et impedit iste animi voluptas cum accusamus accusantium. Repellat ut sint pariatur cumque cupiditate. Animi occaecati odio ut debitis ipsam similique. Repudiandae aut earum occaecati consequatur laborum ut nobis iusto. Adipisci laboriosam id.';
const icon = '?';

describe('Tooltip', () => {
  it('renders a title', () => {
    render(<Tooltip title={title} content={content} icon={icon} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders an explanation', () => {
    render(<Tooltip title={title} content={content} icon={icon} />);
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('renders an icon', () => {
    render(<Tooltip title={title} content={content} icon={icon} />);
    expect(screen.getByText(icon)).toBeInTheDocument();
  });
});
