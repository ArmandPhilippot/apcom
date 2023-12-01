import { ROUTES } from '../../../../src/utils/constants';

describe('Thematic', () => {
  beforeEach(() => {
    cy.visit(ROUTES.HOME);
    cy.findByRole('link', { name: /^Développement/i }).click();
  });

  it('successfully loads', () => {
    cy.findByRole('heading', { level: 1 }).should('exist');
  });

  it('contains the thematic meta', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    cy.findAllByRole('term').should('have.length.at.least', 2);

    /* The accessible name is not recognized while it should be the `dt` text
     * content */
    /* cy.findByRole('term', { name: 'Publié le :' }).should('exist');
    cy.findByRole('term', { name: 'Total :' }).should('exist'); */
  });

  it('contains a breadcrumbs', () => {
    cy.findByRole('navigation', { name: 'Fil d’Ariane' }).should('exist');
  });

  it('contains a table of contents', () => {
    cy.findByRole('heading', { level: 2, name: 'Table des matières' }).should(
      'exist'
    );
  });

  it('contains a thematics list widget and a topics list widget', () => {
    cy.findByRole('heading', { level: 2, name: 'Autres thématiques' }).should(
      'exist'
    );
    cy.findByRole('heading', { level: 2, name: 'Sujets connexes' }).should(
      'exist'
    );
  });
});
