import '@testing-library/jest-dom/extend-expect';

jest.mock('next/dist/client/router', () => require('next-router-mock'));
