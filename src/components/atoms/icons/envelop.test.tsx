import { render } from '../../../../tests/utils';
import Envelop from './envelop';

describe('Envelop', () => {
  it('renders an envelop icon', () => {
    const { container } = render(<Envelop />);
    expect(container).toBeDefined();
  });
});
