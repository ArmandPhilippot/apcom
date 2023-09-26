import { ROUTES } from '../../../../src/utils/constants';

describe('CV Page', () => {
  it('successfully loads', () => {
    cy.visit(ROUTES.CV);
    cy.findByRole('heading', { level: 1 }).contains('CV');
  });
});
