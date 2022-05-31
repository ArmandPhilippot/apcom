import { settings } from '@utils/config';

describe('HomePage', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.findByRole('heading', { level: 1 }).contains(settings.name);
    cy.findByText(settings.baseline.fr).should('exist');
  });
});
