import { ROUTES } from '../../../src/utils/constants';

const queryWithoutArticles = 'etEtRerum';

describe('Search', () => {
  it('should open and close search form by clicking on search button', () => {
    cy.visit('/');
    // findByLabelText does not return the input but the label...
    cy.findByLabelText(/Ouvrir le formulaire de recherche/i)
      .prev()
      .should('not.be.checked');
    cy.findByRole('searchbox', { name: /Rechercher/i }).should('not.exist');
    cy.findByLabelText(/Ouvrir le formulaire de recherche/i).click();
    cy.findByLabelText(/Ouvrir le formulaire de recherche/i)
      .prev()
      .should('be.checked');
    cy.findByRole('searchbox', { name: /Rechercher/i }).should('exist');
    cy.findByLabelText(/Ouvrir le formulaire de recherche/i).click();
    cy.findByLabelText(/Ouvrir le formulaire de recherche/i).should(
      'not.be.checked'
    );
    cy.findByRole('searchbox', { name: /Rechercher/i }).should('not.exist');
  });

  it('should navigate the search page', () => {
    cy.visit('/');
    cy.findByLabelText(/Ouvrir le formulaire de recherche/i).click();
    cy.findByRole('searchbox', { name: /Rechercher/i }).type(
      `${'coldark'}{enter}`
    );
    cy.url().should('include', ROUTES.SEARCH);
    cy.findByRole('heading', { level: 1 }).contains(
      /Résultats de la recherche pour/i
    );
  });

  it('should display a search form if unsuccessful', () => {
    cy.visit(`${ROUTES.SEARCH}?s=${encodeURIComponent(queryWithoutArticles)}`);
    cy.findByRole('searchbox', { name: /Rechercher/i }).should('exist');
  });
});
