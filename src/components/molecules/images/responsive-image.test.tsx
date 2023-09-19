import { render, screen } from '../../../../tests/utils';
import ResponsiveImage from './responsive-image';

describe('ResponsiveImage', () => {
  it('renders a responsive image', () => {
    render(
      <ResponsiveImage
        src="http://placeimg.com/640/480"
        alt="An alternative text"
        width={640}
        height={480}
      />
    );
    expect(
      screen.getByRole('img', { name: 'An alternative text' })
    ).toBeInTheDocument();
  });
});
