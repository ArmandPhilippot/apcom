describe('Projects Page', () => {
  it('successfully loads', () => {
    cy.visit('/projets');
    cy.findByRole('heading', { level: 1 }).contains('Projets');
  });
});
