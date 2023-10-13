import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { Code } from './code';

describe('Code', () => {
  it('renders a code block', () => {
    const language = 'javascript';
    const code = 'nam';

    render(<Code language={language}>{code}</Code>);

    expect(rtlScreen.getByText(code)).toBeInTheDocument();
  });
});
