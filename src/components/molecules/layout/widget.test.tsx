import { render, screen } from '../../../../tests/utils';
import { Widget } from './widget';

const children = 'Widget body';
const title = 'Widget title';
const titleLevel = 2;

describe('Widget', () => {
  it('renders the widget title', () => {
    render(
      <Widget expanded={true} title={title} level={titleLevel}>
        {children}
      </Widget>
    );
    expect(
      screen.getByRole('heading', { level: titleLevel })
    ).toHaveTextContent(title);
  });
});
