describe('Topic', () => {
  beforeEach(() => {
    cy.visit('/sujet/docker');
  });

  it('successfully loads', () => {
    cy.findByRole('heading', { level: 1 }).should('exist');
  });

  it('contains the topic meta', () => {
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
    cy.findByRole('heading', { level: 2, name: 'Thématiques connexes' }).should(
      'exist'
    );
    cy.findByRole('heading', { level: 2, name: 'Autres sujets' }).should(
      'exist'
    );
  });
});
