import Header from '@components/Header/Header';
import { render } from '@test-utils';
import '../__mocks__/matchMedia.mock';

// Toolbar uses forwardRef. Without mocking an error occurred.
jest.mock('@components/Toolbar/Toolbar', () => 'div');

describe('Header', () => {
  it('renders the Header component', () => {
    const { container } = render(<Header isHome={false} />);
    expect(container).toBeTruthy();
  });
});
