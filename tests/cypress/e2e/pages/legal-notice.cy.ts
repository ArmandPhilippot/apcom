import { ROUTES } from '../../../../src/utils/constants';

describe('Legal Notice Page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.LEGAL_NOTICE);
  });

  it('successfully loads', () => {
    cy.findByRole('heading', { level: 1 }).contains('Mentions légales');
  });

  it('contains a breadcrumbs', () => {
    cy.findByRole('navigation', { name: 'Fil d’Ariane' }).should('exist');
  });

  it('contains a table of contents', () => {
    cy.findByRole('heading', { level: 2, name: 'Table des matières' }).should(
      'exist'
    );
  });
});
