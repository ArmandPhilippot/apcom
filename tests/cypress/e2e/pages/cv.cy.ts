import { PERSONAL_LINKS, ROUTES } from '../../../../src/utils/constants';

describe('CV Page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.CV);
  });

  it('renders the page contents', () => {
    cy.findByRole('heading', { level: 1 }).contains('CV');
    cy.findByRole('heading', { level: 2, name: 'Compétences' }).should('exist');
    cy.findByRole('heading', {
      level: 2,
      name: 'Expériences professionnelles',
    }).should('exist');
    cy.findByRole('heading', { level: 2, name: 'Formations' }).should('exist');
  });

  it('renders an image with a link to download the CV', () => {
    cy.findByRole('img', { name: /CV/ }).should('exist');
    cy.findByRole('link', { name: /Télécharger/i }).should('exist');
  });

  it('renders some links to my repositories', () => {
    cy.findByRole('link', { name: /Github/i }).should(
      'have.attr',
      'href',
      PERSONAL_LINKS.GITHUB
    );
    cy.findByRole('link', { name: /Gitlab/i }).should(
      'have.attr',
      'href',
      PERSONAL_LINKS.GITLAB
    );
  });
});
