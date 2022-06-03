import { render, screen } from '@tests/utils';
import SettingsModal from './settings-modal';

describe('SettingsModal', () => {
  it('renders a fake heading', () => {
    render(
      <SettingsModal
        ackeeStorageKey="ackee-tracking"
        motionStorageKey="reduce-motion"
      />
    );
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
  });
});
