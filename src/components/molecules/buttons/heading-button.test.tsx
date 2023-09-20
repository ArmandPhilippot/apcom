import { render, screen } from '../../../../tests/utils';
import { HeadingButton } from './heading-button';

describe('HeadingButton', () => {
  it('renders a button to collapse.', () => {
    render(
      <HeadingButton
        level={2}
        title="The accordion title"
        expanded={true}
        setExpanded={() => null}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Collapse The accordion title' })
    ).toBeInTheDocument();
  });

  it('renders a button to expand.', () => {
    render(
      <HeadingButton
        level={2}
        title="The accordion title"
        expanded={false}
        setExpanded={() => null}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Expand The accordion title' })
    ).toBeInTheDocument();
  });
});
