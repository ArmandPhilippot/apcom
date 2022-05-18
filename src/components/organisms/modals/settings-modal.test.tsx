import { render, screen } from '@test-utils';
import SettingsModal from './settings-modal';

describe('SettingsModal', () => {
  it('renders a fake heading', () => {
    render(<SettingsModal />);
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
  });
});
