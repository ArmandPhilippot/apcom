import { render, screen } from '@tests/utils';
import Heading from './heading';

describe('Heading', () => {
  it('renders a h1', () => {
    render(<Heading level={1}>Level 1</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Level 1'
    );
  });

  it('renders a h2', () => {
    render(<Heading level={2}>Level 2</Heading>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Level 2'
    );
  });

  it('renders a h3', () => {
    render(<Heading level={3}>Level 3</Heading>);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Level 3'
    );
  });

  it('renders a h4', () => {
    render(<Heading level={4}>Level 4</Heading>);
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Level 4'
    );
  });

  it('renders a h5', () => {
    render(<Heading level={5}>Level 5</Heading>);
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(
      'Level 5'
    );
  });

  it('renders a h6', () => {
    render(<Heading level={6}>Level 6</Heading>);
    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent(
      'Level 6'
    );
  });

  it('renders a text with heading styles', () => {
    render(
      <Heading isFake={true} level={2}>
        Fake heading
      </Heading>
    );
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
    expect(screen.getByText('Fake heading')).toHaveClass('heading');
  });
});
