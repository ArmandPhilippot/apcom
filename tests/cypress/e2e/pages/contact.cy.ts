import { CONFIG } from '../../../../src/utils/config';
import { ROUTES } from '../../../../src/utils/constants';

const userName = 'Cypress Test';
const userEmail = 'cypress@testing.com';
const object = '[Cypress] quos aperiam culpa';
const message =
  'Asperiores ea nihil. Nam ipsam est sunt porro. Ratione in facilis cum. Voluptatem pariatur rerum.';

describe('Contact Page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.CONTACT);
  });

  it('shows a heading and a contact form', () => {
    cy.findByRole('heading', { level: 1 }).contains(/Contact/i);
    cy.findByRole('form', { name: /Formulaire de contact/i });
  });

  it('submits the form', () => {
    cy.intercept('POST', CONFIG.api.url ?? '').as('sendMail');
    cy.findByRole('textbox', { name: /Nom/i })
      .type(userName)
      .should('have.value', userName);
    cy.findByRole('textbox', { name: /E-mail/i })
      .type(userEmail)
      .should('have.value', userEmail);
    cy.findByRole('textbox', { name: /Sujet/i })
      .type(object)
      .should('have.value', object);
    cy.findByRole('textbox', { name: /Message/i })
      .type(message)
      .should('have.value', message);
    cy.findByRole('button', { name: /Envoyer/i }).click();
    cy.findByText(/Mail en cours/i).should('be.visible');
    cy.wait('@sendMail');
    cy.get('body').should('not.contain.text', /Mail en cours/i);
  });

  it('prevents the form to submit if some fields are missing', () => {
    cy.findByRole('textbox', { name: /E-mail/i })
      .type(userEmail)
      .should('have.value', userEmail);
    cy.findByRole('button', { name: /Envoyer/i }).click();
    cy.get('body').should('not.contain.text', /Mail en cours/i);
  });
});
