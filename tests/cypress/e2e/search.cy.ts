import { ROUTES } from '../../../src/utils/constants';

const queryWithArticles = 'Coldark';
const queryWithoutArticles = 'etEtRerum';

describe('Search', () => {
  it('should open and close search form by clicking on search button', () => {
    cy.visit('/');
    // findByLabelText does not return the input but the label...
    cy.findByLabelText(/Ouvrir la recherche/i)
      .prev()
      .should('not.be.checked');
    cy.findByRole('searchbox', { name: /Rechercher/i }).should('not.exist');
    cy.findByLabelText(/Ouvrir la recherche/i).click();
    cy.findByLabelText(/Ouvrir la recherche/i)
      .prev()
      .should('be.checked');
    cy.findByRole('searchbox', { name: /Rechercher/i }).should('exist');
    cy.findByLabelText(/Ouvrir la recherche/i).click();
    cy.findByLabelText(/Ouvrir la recherche/i).should('not.be.checked');
    cy.findByRole('searchbox', { name: /Rechercher/i }).should('not.exist');
  });

  it('should navigate the search page', () => {
    cy.visit('/');
    cy.findByLabelText(/Ouvrir la recherche/i).click();
    cy.findByRole('searchbox', { name: /Rechercher/i }).type(
      `${queryWithArticles}{enter}`
    );
    cy.url().should('include', ROUTES.SEARCH);
    cy.findByRole('heading', { level: 1 }).contains(
      /Résultats de la recherche pour/i
    );
  });

  it('should display the total of articles if successful', () => {
    cy.visit(`${ROUTES.SEARCH}?s=${encodeURIComponent(queryWithArticles)}`);
    const metaList = cy.findByRole('heading', { level: 1 }).next();
    metaList.findByRole('term').contains(/Total/i);
    metaList.findByRole('definition').contains(/article/i);
  });

  it('should display a search form if unsuccessful', () => {
    cy.visit(`${ROUTES.SEARCH}?s=${encodeURIComponent(queryWithoutArticles)}`);
    cy.findByRole('searchbox', { name: /Rechercher/i }).should('exist');
  });
});
