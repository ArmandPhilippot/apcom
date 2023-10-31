import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Heading, Icon } from '../../../atoms';
import { Modal } from './modal';

const children =
  'Labore ullam delectus sit modi quam dolores. Ratione id sint aliquid facilis ipsum. Unde necessitatibus provident minus.';

describe('Modal', () => {
  it('renders the modal contents', () => {
    render(<Modal>{children}</Modal>);

    expect(rtlScreen.getByText(children)).toBeInTheDocument();
  });

  it('can render a heading', () => {
    const heading = 'A custom heading';
    const level = 2;

    render(
      <Modal heading={<Heading level={level}>{heading}</Heading>}>
        {children}
      </Modal>
    );

    expect(rtlScreen.getByRole('heading', { level })).toHaveTextContent(
      heading
    );
  });

  it('can render an icon', () => {
    const label = 'maxime ut eius';

    render(
      <Modal icon={<Icon aria-label={label} shape="arrow" />}>{children}</Modal>
    );

    expect(rtlScreen.getByLabelText(label)).toBeInTheDocument();
  });

  it('can render a close button', () => {
    const btn = 'consequatur';

    render(<Modal closeBtnLabel={btn}>{children}</Modal>);

    expect(rtlScreen.getByRole('button', { name: btn })).toBeInTheDocument();
  });
});
