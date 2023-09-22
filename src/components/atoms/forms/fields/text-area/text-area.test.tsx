import { render, screen } from '../../../../../../tests/utils';
import { TextArea } from './text-area';

const doNothing = () => {
  // do nothing
};

describe('TextArea', () => {
  it('renders a textarea', () => {
    render(
      <TextArea
        id="textarea-field"
        name="textarea-field"
        onChange={doNothing}
        value=""
      />
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
