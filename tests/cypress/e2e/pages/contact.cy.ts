const userName = 'Cypress Test';
const userEmail = 'cypress@testing.com';
const object = '[Cypress] quos aperiam culpa';
const message =
  'Asperiores ea nihil. Nam ipsam est sunt porro. Ratione in facilis cum. Voluptatem pariatur rerum.';

describe('Contact Page', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('shows a heading and a contact form', () => {
    cy.findByRole('heading', { level: 1 }).contains(/Contact/i);
    cy.findByRole('form', { name: /Formulaire de contact/i });
  });

  it('submits the form', async () => {
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
    cy.findByText(/E-mail en cours d'envoi/i).should('be.visible');
  });

  it('prevents the form to submit if some fields are missing', async () => {
    cy.findByRole('textbox', { name: /E-mail/i })
      .type(userEmail)
      .should('have.value', userEmail);
    cy.findByRole('button', { name: /Envoyer/i }).click();
    cy.findByText(/E-mail en cours d'envoi/i).should('not.be.visible');
  });
});
