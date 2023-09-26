import { ROUTES } from '../../../../src/utils/constants';

describe('Legal Notice Page', () => {
  it('successfully loads', () => {
    cy.visit(ROUTES.LEGAL_NOTICE);
    cy.findByRole('heading', { level: 1 }).contains('Mentions légales');
  });
});
