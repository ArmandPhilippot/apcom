import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { Icon } from '../images/icons';
import { Copyright } from './copyright';

const dates = {
  start: '2012',
  end: '2022',
};
const iconHeading = 'CC BY SA';
const icon = <Icon heading={iconHeading} shape="cc-by-sa" />;
const owner = 'Your name';

describe('Copyright', () => {
  it('renders the copyright owner', () => {
    render(<Copyright dates={dates} icon={icon} owner={owner} />);
    expect(rtlScreen.getByText(owner)).toBeInTheDocument();
  });

  it('renders the copyright start date', () => {
    render(<Copyright dates={dates} icon={icon} owner={owner} />);
    expect(rtlScreen.getByText(dates.start)).toBeInTheDocument();
  });

  it('renders the copyright end date', () => {
    render(<Copyright dates={dates} icon={icon} owner={owner} />);
    expect(rtlScreen.getByText(dates.end)).toBeInTheDocument();
  });

  it('renders the copyright icon', () => {
    render(<Copyright dates={dates} icon={icon} owner={owner} />);
    expect(rtlScreen.getByTitle('CC BY SA')).toBeInTheDocument();
  });
});
