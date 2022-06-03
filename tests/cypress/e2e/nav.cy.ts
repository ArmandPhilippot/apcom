describe(
  'Main navigation',
  { viewportWidth: 1280, viewportHeight: 720 },
  () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it(
      'should show hamburger button on small devices',
      { viewportWidth: 810, viewportHeight: 1080 },
      () => {
        cy.findByLabelText(/Ouvrir le menu/i).should('exist');
      }
    );

    it(
      'should open and close main nav menu by clicking on hamburger button',
      { viewportWidth: 810, viewportHeight: 1080 },
      () => {
        cy.findByLabelText(/Fermer le menu/i).should('not.exist');
        cy.findByRole('link', { name: /Blog/i }).should('not.exist');
        cy.findByLabelText(/Ouvrir le menu/i).click();
        cy.findByLabelText(/Ouvrir le menu/i).should('not.exist');
        cy.findByLabelText(/Fermer le menu/i).should('exist');
        cy.findByRole('link', { name: /Blog/i }).should('exist');
        cy.findByLabelText(/Fermer le menu/i).click();
        cy.findByLabelText(/Fermer le menu/i).should('not.exist');
        cy.findByRole('link', { name: /Blog/i }).should('not.exist');
        cy.findByLabelText(/Ouvrir le menu/i).should('exist');
      }
    );

    it('should hide hamburger button on large devices', () => {
      cy.findByLabelText(/Ouvrir le menu/i).should('be.hidden');
    });

    it('should navigate to the blog page', async () => {
      cy.findByRole('link', { name: /Blog/i }).click();
      cy.url().should('include', '/blog');
      cy.findByRole('heading', { level: 1 }).contains('Blog');
    });

    it('should navigate to the CV page', async () => {
      cy.findByRole('link', { name: /CV/i }).click();
      cy.url().should('include', '/cv');
      cy.findByRole('heading', { level: 1 }).contains('CV');
    });

    it('should navigate to the projects page', async () => {
      cy.findByRole('link', { name: /Projects/i }).click();
      cy.url().should('include', '/projets');
      cy.findByRole('heading', { level: 1 }).contains('Projets');
    });

    it('should navigate to the contact page', async () => {
      cy.findByRole('link', { name: /Contact/i }).click();
      cy.url().should('include', '/contact');
      cy.findByRole('heading', { level: 1 }).contains('Contact');
    });
  }
);

describe('Footer navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to the legal notice page', async () => {
    cy.findByRole('link', { name: /Mentions légales/i }).click();
    cy.url().should('include', '/mentions-legales');
    cy.findByRole('heading', { level: 1 }).contains('Mentions légales');
  });
});
