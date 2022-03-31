import '@testing-library/jest-dom/extend-expect';
import './__tests__/jest/__mocks__/matchMedia.mock';

jest.mock('next/dist/client/router', () => require('next-router-mock'));
