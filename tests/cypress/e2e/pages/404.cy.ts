import { ROUTES } from '../../../../src/utils/constants';

describe('404 Page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.NOT_FOUND, { failOnStatusCode: false });
  });

  it('successfully loads', () => {
    cy.findByRole('heading', { level: 1 }).should(
      'contain.text',
      'Page non trouvée'
    );
  });

  it('contains a breadcrumbs', () => {
    cy.findByRole('navigation', { name: 'Fil d’Ariane' }).should('exist');
  });

  it('contains a thematics list widget and a topics list widget', () => {
    cy.findByRole('heading', { level: 2, name: 'Thématiques' }).should('exist');
    cy.findByRole('heading', { level: 2, name: 'Sujets' }).should('exist');
  });

  it('provides a form to search for keywords', () => {
    const keywords = 'coldark';

    cy.findByRole('searchbox').type(keywords);
    cy.findByRole('button', { name: /Rechercher/ }).click();
    cy.findByRole('heading', { level: 1 }).should('contain.text', keywords);
  });
});
