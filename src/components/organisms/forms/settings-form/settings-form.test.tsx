import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { SettingsForm } from './settings-form';

describe('SettingsForm', () => {
  it('renders a form with four settings', () => {
    const label = 'voluptatem maiores rerum';
    const settingsNumber = 4;

    render(<SettingsForm aria-label={label} />);

    expect(rtlScreen.getByRole('form', { name: label })).toBeInTheDocument();
    expect(rtlScreen.getAllByRole('radiogroup')).toHaveLength(settingsNumber);
  });
});
