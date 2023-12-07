import { ROUTES } from '../../../../src/utils/constants';

describe('Project Pages', () => {
  beforeEach(() => {
    cy.visit(`${ROUTES.PROJECTS}/coldark`);
  });

  it('successfully loads', () => {
    cy.findByRole('heading', { level: 1 }).should('exist');
  });

  it('contains a breadcrumbs', () => {
    cy.findByRole('navigation', { name: 'Fil d’Ariane' }).should('exist');
  });

  it('contains the project meta', () => {
    cy.findAllByRole('term').should('have.length.at.least', 1);

    /* The accessible name is not recognized while it should be the `dt` text
     * content */
    // cy.findByRole('term', { name: 'Publié le :' }).should('exist');
  });

  it('contains a table of contents', () => {
    cy.findByRole('heading', { level: 2, name: 'Table des matières' }).should(
      'exist'
    );
  });

  it('contains a sharing widget', () => {
    cy.findByRole('heading', { level: 2, name: 'Partager' }).should('exist');
  });
});
