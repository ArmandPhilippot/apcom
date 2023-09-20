import { render, screen } from '../../../../tests/utils';
import { storageKey as ackeeStorageKey } from '../../molecules/forms/ackee-toggle.fixture';
import { storageKey as motionStorageKey } from '../../molecules/forms/motion-toggle.fixture';
import { SettingsModal } from './settings-modal';

describe('SettingsModal', () => {
  it('renders the modal heading', () => {
    render(
      <SettingsModal
        ackeeStorageKey={ackeeStorageKey}
        motionStorageKey={motionStorageKey}
      />
    );
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
  });

  it('renders a settings form', () => {
    render(
      <SettingsModal
        ackeeStorageKey={ackeeStorageKey}
        motionStorageKey={motionStorageKey}
      />
    );
    expect(
      screen.getByRole('form', { name: /^Settings form/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radiogroup', { name: /^Theme:/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radiogroup', { name: /^Code blocks:/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radiogroup', { name: /^Animations:/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radiogroup', { name: /^Tracking:/i })
    ).toBeInTheDocument();
  });
});
