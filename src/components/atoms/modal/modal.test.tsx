import { render, screen } from '../../../../tests/utils';
import { Heading } from '../headings';
import { Modal } from './modal';

const title = 'A custom title';
const children =
  'Labore ullam delectus sit modi quam dolores. Ratione id sint aliquid facilis ipsum. Unde necessitatibus provident minus.';

describe('Modal', () => {
  it('renders a title', () => {
    const level = 2;

    render(
      <Modal heading={<Heading level={level}>{title}</Heading>}>
        {children}
      </Modal>
    );
    expect(screen.getByRole('heading', { level })).toHaveTextContent(title);
  });

  it('renders the modal body', () => {
    render(<Modal>{children}</Modal>);
    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
