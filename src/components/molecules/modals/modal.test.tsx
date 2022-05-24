import { render, screen } from '@test-utils';
import Modal from './modal';

const title = 'A custom title';
const children =
  'Labore ullam delectus sit modi quam dolores. Ratione id sint aliquid facilis ipsum. Unde necessitatibus provident minus.';

describe('Modal', () => {
  it('renders a title', () => {
    render(<Modal title={title}>{children}</Modal>);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders the modal body', () => {
    render(<Modal title={title}>{children}</Modal>);
    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
