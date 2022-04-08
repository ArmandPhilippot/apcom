import userEvent from '@testing-library/user-event';
import { render, screen } from '@test-utils';
import AckeeSelect from './ackee-select';

describe('Select', () => {
  it('should correctly set default option', () => {
    render(<AckeeSelect initialValue="full" />);
    expect(screen.getByRole('combobox')).toHaveValue('full');
    expect(screen.queryByRole('combobox')).not.toHaveValue('partial');
  });

  it('should correctly change value when user choose another option', () => {
    render(<AckeeSelect initialValue="full" />);

    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Partial' })
    );

    expect(screen.getByRole('combobox')).toHaveValue('partial');
    expect(screen.queryByRole('combobox')).not.toHaveValue('full');
  });
});
