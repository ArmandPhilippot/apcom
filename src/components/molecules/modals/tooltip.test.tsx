import { render, screen } from '../../../../tests/utils';
import Tooltip from './tooltip';
import { content, icon, title } from './tooltip.fixture';

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
