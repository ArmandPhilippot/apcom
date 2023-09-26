import { ROUTES } from '../../../src/utils/constants';

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

    it('should navigate to the blog page', () => {
      cy.findByRole('link', { name: /Blog/i }).click();
      cy.url().should('include', ROUTES.BLOG);
      cy.findByRole('heading', { level: 1 }).contains('Blog');
    });

    it('should navigate to the CV page', () => {
      cy.findByRole('link', { name: /CV/i }).click();
      cy.url().should('include', ROUTES.CV);
      cy.findByRole('heading', { level: 1 }).contains('CV');
    });

    it('should navigate to the projects page', () => {
      cy.findByRole('link', { name: /Projets/i }).click();
      cy.url().should('include', ROUTES.PROJECTS);
      cy.findByRole('heading', { level: 1 }).contains('Projets');
    });

    it('should navigate to the contact page', () => {
      cy.findByRole('link', { name: /Contact/i }).click();
      cy.url().should('include', ROUTES.CONTACT);
      cy.findByRole('heading', { level: 1 }).contains('Contact');
    });
  }
);

describe('Footer navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to the legal notice page', () => {
    cy.findByRole('link', { name: /Mentions légales/i }).click();
    cy.url().should('include', ROUTES.LEGAL_NOTICE);
    cy.findByRole('heading', { level: 1 }).contains('Mentions légales');
  });
});
