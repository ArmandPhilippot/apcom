import { render, screen } from '../../../../tests/utils';
import Main from './main';

const id = 'main';
const children = 'The main content.';

describe('Main', () => {
  it('renders the content of main element', () => {
    render(<Main id={id}>{children}</Main>);
    expect(screen.getByRole('main')).toHaveTextContent(children);
  });
});
