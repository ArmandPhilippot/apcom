import { describe, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Link from 'next/link';
import nextRouterMock from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import {
  type OnRouteChangeHandler,
  useOnRouteChange,
  type OnRouteChangeStep,
} from './use-on-route-change';

type TestComponentProps = {
  callback: OnRouteChangeHandler;
  href: string;
  step?: OnRouteChangeStep;
};

const TestComponent = ({ callback, href, step }: TestComponentProps) => {
  useOnRouteChange(callback, step);

  return (
    <MemoryRouterProvider>
      <Link href={href}>New page</Link>
    </MemoryRouterProvider>
  );
};

describe('useOnRouteChange', () => {
  it('trigger a callback when the route change event starts', async () => {
    const cb = jest.fn();
    const user = userEvent.setup();
    const newPage = '/new-page';

    nextRouterMock.push('/initial-page');

    render(<TestComponent callback={cb} href={newPage} />);

    expect(cb).not.toHaveBeenCalled();

    await user.click(rtlScreen.getByRole('link'));

    expect(nextRouterMock).toMatchObject({
      asPath: newPage,
      pathname: newPage,
    });
    expect(cb).toHaveBeenCalled();
  });

  it('can trigger a callback when the route change event is complete', async () => {
    const cb = jest.fn();
    const user = userEvent.setup();
    const newPage = '/new-page';

    nextRouterMock.push('/initial-page');

    render(<TestComponent callback={cb} href={newPage} step="end" />);

    expect(cb).not.toHaveBeenCalled();

    await user.click(rtlScreen.getByRole('link'));

    expect(nextRouterMock).toMatchObject({
      asPath: newPage,
      pathname: newPage,
    });
    expect(cb).toHaveBeenCalled();
  });
});
