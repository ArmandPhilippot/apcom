import { render } from '@tests/utils';
import Code from './code';

const code = `
function foo() {
  return 'bar';
}
`;

const language = 'javascript';

describe('Code', () => {
  it('renders a code block', () => {
    render(<Code language={language}>{code}</Code>);
  });
});
