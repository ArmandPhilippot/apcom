import { storageKey as ackeeStorageKey } from '@components/molecules/forms/ackee-toggle.fixture';
import { storageKey as motionStorageKey } from '@components/molecules/forms/motion-toggle.fixture';
import { render, screen } from '@test-utils';
import SettingsForm from './settings-form';

describe('SettingsForm', () => {
  it('renders a form', () => {
    render(
      <SettingsForm
        ackeeStorageKey={ackeeStorageKey}
        motionStorageKey={motionStorageKey}
      />
    );
    expect(
      screen.getByRole('form', { name: /^Settings form/i })
    ).toBeInTheDocument();
  });

  it('renders a theme setting', () => {
    render(
      <SettingsForm
        ackeeStorageKey={ackeeStorageKey}
        motionStorageKey={motionStorageKey}
      />
    );
    expect(
      screen.getByRole('radiogroup', { name: /^Theme:/i })
    ).toBeInTheDocument();
  });

  it('renders a code blocks setting', () => {
    render(
      <SettingsForm
        ackeeStorageKey={ackeeStorageKey}
        motionStorageKey={motionStorageKey}
      />
    );
    expect(
      screen.getByRole('radiogroup', { name: /^Code blocks:/i })
    ).toBeInTheDocument();
  });

  it('renders a motion setting', () => {
    render(
      <SettingsForm
        ackeeStorageKey={ackeeStorageKey}
        motionStorageKey={motionStorageKey}
      />
    );
    expect(
      screen.getByRole('radiogroup', { name: /^Animations:/i })
    ).toBeInTheDocument();
  });

  it('renders a Ackee setting', () => {
    render(
      <SettingsForm
        ackeeStorageKey={ackeeStorageKey}
        motionStorageKey={motionStorageKey}
      />
    );
    expect(
      screen.getByRole('radiogroup', { name: /^Tracking:/i })
    ).toBeInTheDocument();
  });
});
