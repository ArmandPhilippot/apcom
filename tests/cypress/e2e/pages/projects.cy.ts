import { ROUTES } from '../../../../src/utils/constants';

describe('Projects Page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.PROJECTS);
  });

  it('successfully loads', () => {
    cy.findByRole('heading', { level: 1 }).contains('Projets');
  });

  it('contains a breadcrumbs', () => {
    cy.findByRole('navigation', { name: 'Fil d’Ariane' }).should('exist');
  });

  it('can list the projects', () => {
    cy.findAllByRole('link', { name: /Consulter/ }).should(
      'have.length.at.least',
      1
    );
  });
});
