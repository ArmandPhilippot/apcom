import '@testing-library/jest-dom/extend-expect';
import './tests/jest/__mocks__/matchMedia.mock';

jest.mock('next/dist/client/router', () => require('next-router-mock'));
jest.mock('next/dynamic', () => () => 'dynamic-import');
