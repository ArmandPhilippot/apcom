import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { Layout } from './layout';

const body =
  'Sit dolorem eveniet. Sit sit odio nemo vitae corrupti modi sint est rerum. Pariatur quidem maiores distinctio. Quia et illum aspernatur est cum.';

describe('Layout', () => {
  it('renders the website header', () => {
    render(<Layout>{body}</Layout>);
    expect(rtlScreen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the website main content', () => {
    render(<Layout>{body}</Layout>);
    expect(rtlScreen.getByRole('main')).toBeInTheDocument();
  });

  it('renders the website footer', () => {
    render(<Layout>{body}</Layout>);
    expect(rtlScreen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders a skip to content link', () => {
    render(<Layout>{body}</Layout>);
    expect(
      rtlScreen.getByRole('link', { name: 'Skip to content' })
    ).toBeInTheDocument();
  });

  it('renders its body', () => {
    render(<Layout>{body}</Layout>);
    expect(rtlScreen.getByText(body)).toBeInTheDocument();
  });
});
