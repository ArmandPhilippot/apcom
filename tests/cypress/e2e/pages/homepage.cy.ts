import { CONFIG } from '../../../../src/utils/config';
import { ROUTES } from '../../../../src/utils/constants';

describe('HomePage', () => {
  beforeEach(() => {
    cy.visit(ROUTES.HOME);
  });

  it('successfully loads', () => {
    cy.findByRole('heading', { level: 1 }).contains(CONFIG.name);
    cy.findByText(CONFIG.baseline).should('exist');
  });

  it('contains the three most recent articles', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    cy.findAllByRole('link', { name: /^Consulter/i }).should('have.length', 3);
  });

  it('contains a link to contact me', () => {
    cy.findByRole('link', { name: 'Me contacter' }).should(
      'have.attr',
      'href',
      ROUTES.CONTACT
    );
  });

  it('contains a link to RSS feed', () => {
    cy.findByRole('link', { name: 'S’abonner' }).should(
      'have.attr',
      'href',
      ROUTES.RSS
    );
  });
});
