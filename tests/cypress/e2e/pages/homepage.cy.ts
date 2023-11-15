import { CONFIG } from '../../../../src/utils/config';

describe('HomePage', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.findByRole('heading', { level: 1 }).contains(CONFIG.name);
    cy.findByText(CONFIG.baseline).should('exist');
  });
});
