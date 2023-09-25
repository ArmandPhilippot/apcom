import { jest } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import nextRouterMock from 'next-router-mock';
import './tests/jest/__mocks__/matchMedia.mock';

jest.mock('next/router', () => nextRouterMock);
jest.mock('next/dynamic', () => () => 'dynamic-import');
