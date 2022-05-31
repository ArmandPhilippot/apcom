describe('CV Page', () => {
  it('successfully loads', () => {
    cy.visit('/cv');
    cy.findByRole('heading', { level: 1 }).contains('CV');
  });
});
