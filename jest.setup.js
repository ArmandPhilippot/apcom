import { afterAll, afterEach, beforeAll, jest } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import nextRouterMock from 'next-router-mock';
import './tests/jest/__mocks__/matchMedia.mock';
import { mswServer } from './tests/msw';

jest.mock('next/router', () => nextRouterMock);
jest.mock('next/dynamic', () => () => 'dynamic-import');

/* Jest complains about "Must use import to load ES Module" when importing
 * unified and rehype modules. Maybe it is not the right way to avoid those
 * errors but for now it is the only things that work. */
jest.mock('src/utils/helpers/rehype.ts', () => {
  return {
    __esModule: true,
    updateContentTree: jest.fn((str) => str),
  };
});

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
