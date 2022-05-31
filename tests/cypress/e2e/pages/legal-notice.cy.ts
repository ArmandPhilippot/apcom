describe('Legal Notice Page', () => {
  it('successfully loads', () => {
    cy.visit('/mentions-legales');
    cy.findByRole('heading', { level: 1 }).contains('Mentions légales');
  });
});
