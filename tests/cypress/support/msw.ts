import type { SetupWorker } from 'msw/lib/browser';

export type CustomWindow = {
  msw?: {
    worker: SetupWorker;
  };
} & Window;

Cypress.on('test:before:run:async', async () => {
  window.process = {
    // @ts-expect-error -- window.process type is not NodeJS process type
    env: {
      NEXT_PUBLIC_STAGING_GRAPHQL_API: Cypress.env(
        'NEXT_PUBLIC_STAGING_GRAPHQL_API'
      ),
    },
  };

  if (!('msw' in window) || !window.msw) {
    const { worker } = await import('../../msw/browser');
    await worker
      .start({
        onUnhandledRequest(request) {
          if (
            request.url.includes('/_next/') ||
            request.url.includes('/__next')
          ) {
            return;
          }

          console.warn(
            '[MSW] Warning: intercepted a request without a matching request handler: %s %s',
            request.method,
            request.url
          );
        },
      })
      .then(() => {
        (window as CustomWindow).msw = {
          worker,
        };
      });
  }
});
