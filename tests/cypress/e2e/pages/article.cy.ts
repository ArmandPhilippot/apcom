import { ROUTES } from '../../../../src/utils/constants';

describe('Article', () => {
  beforeEach(() => {
    cy.visit(ROUTES.HOME);
    cy.findAllByRole('link', { name: /^Consulter/i }).then(($articles) =>
      $articles[0].click()
    );
  });

  it('successfully loads', () => {
    cy.findByRole('heading', { level: 1 }).should('exist');
  });

  it('contains the article meta', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    cy.findAllByRole('term').should('have.length.at.least', 3);

    /* The accessible name is not recognized while it should be the `dt` text
     * content */
    /* cy.findByRole('term', { name: 'Écrit par :' }).should('exist');
    cy.findByRole('term', { name: 'Publié le :' }).should('exist');
    cy.findByRole('term', { name: 'Temps de lecture :' }).should('exist'); */
  });

  it('contains a breadcrumbs', () => {
    cy.findByRole('navigation', { name: 'Fil d’Ariane' }).should('exist');
  });

  it('contains a table of contents', () => {
    cy.findByRole('heading', { level: 2, name: 'Table des matières' }).should(
      'exist'
    );
  });

  it('contains a sharing widget', () => {
    cy.findByRole('heading', { level: 2, name: 'Partager' }).should('exist');
  });

  it('contains a comments section', () => {
    cy.findByRole('heading', {
      level: 2,
      name: 'Laisser un commentaire',
    }).should('exist');
    cy.findByRole('form', { name: 'Formulaire des commentaires' }).should(
      'exist'
    );
  });
});
