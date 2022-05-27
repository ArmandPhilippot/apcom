const queryWithArticles = 'Coldark';
const queryWithoutArticles = 'etEtRerum';

describe('Search', () => {
  it('should open and close search form by clicking on search button', () => {
    cy.visit('/');
    cy.findByLabelText(/Fermer la recherche/i).should('not.exist');
    cy.findByRole('searchbox', { name: /Rechercher/i }).should('not.exist');
    cy.findByLabelText(/Ouvrir la recherche/i).click();
    cy.findByLabelText(/Ouvrir la recherche/i).should('not.exist');
    cy.findByLabelText(/Fermer la recherche/i).should('exist');
    cy.findByRole('searchbox', { name: /Rechercher/i }).should('exist');
    cy.findByLabelText(/Fermer la recherche/i).click();
    cy.findByLabelText(/Fermer la recherche/i).should('not.exist');
    cy.findByRole('searchbox', { name: /Rechercher/i }).should('not.exist');
    cy.findByLabelText(/Ouvrir la recherche/i).should('exist');
  });

  it('should navigate the search page', async () => {
    cy.visit('/');
    cy.findByLabelText(/Ouvrir la recherche/i).click();
    cy.findByRole('searchbox', { name: /Rechercher/i }).type(
      `${queryWithArticles}{enter}`
    );
    cy.url().should('include', '/blog');
    cy.findByRole('heading', { level: 1 }).contains(
      /Résultats de la recherche pour/i
    );
  });

  it('should display the total of articles if successful', async () => {
    cy.visit(`/recherche?s=${encodeURIComponent(queryWithArticles)}`);
    const dtSiblings = cy.findByRole('term', { name: /Total/i }).siblings();
    dtSiblings.findByRole('definition').contains(/article/i);
  });

  it('should display a search form if unsuccessful', () => {
    cy.visit(`/recherche?s=${encodeURIComponent(queryWithoutArticles)}`);
    cy.findByRole('searchbox', { name: /Rechercher/i }).should('exist');
  });
});
