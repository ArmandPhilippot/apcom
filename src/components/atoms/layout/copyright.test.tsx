import { render, screen } from '../../../../tests/utils';
import CCBySA from '../icons/cc-by-sa';
import Copyright from './copyright';

const dates = {
  start: '2012',
  end: '2022',
};
const icon = <CCBySA />;
const owner = 'Your name';

describe('Copyright', () => {
  it('renders the copyright owner', () => {
    render(<Copyright dates={dates} icon={icon} owner={owner} />);
    expect(screen.getByText(owner)).toBeInTheDocument();
  });

  it('renders the copyright start date', () => {
    render(<Copyright dates={dates} icon={icon} owner={owner} />);
    expect(screen.getByText(dates.start)).toBeInTheDocument();
  });

  it('renders the copyright end date', () => {
    render(<Copyright dates={dates} icon={icon} owner={owner} />);
    expect(screen.getByText(dates.end)).toBeInTheDocument();
  });

  it('renders the copyright icon', () => {
    render(<Copyright dates={dates} icon={icon} owner={owner} />);
    expect(screen.getByTitle('CC BY SA')).toBeInTheDocument();
  });
});
