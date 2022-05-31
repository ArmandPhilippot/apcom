import user from '@testing-library/user-event';
import { act, render, screen } from '@test-utils';
import AckeeSelect from './ackee-select';
import { storageKey } from './ackee-select.fixture';

describe('Select', () => {
  it('should correctly set default option', () => {
    render(<AckeeSelect storageKey={storageKey} initialValue="full" />);
    expect(screen.getByRole('combobox')).toHaveValue('full');
    expect(screen.queryByRole('combobox')).not.toHaveValue('partial');
  });

  it('should correctly change value when user choose another option', async () => {
    render(<AckeeSelect storageKey={storageKey} initialValue="full" />);

    await act(async () => {
      await user.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: 'Partial' })
      );
    });

    expect(screen.getByRole('combobox')).toHaveValue('partial');
    expect(screen.queryByRole('combobox')).not.toHaveValue('full');
  });
});
