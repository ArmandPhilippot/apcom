import '@testing-library/jest-dom';
import './tests/jest/__mocks__/matchMedia.mock';

jest.mock('next/dist/client/router', () => require('next-router-mock'));
jest.mock('next/dynamic', () => () => 'dynamic-import');
