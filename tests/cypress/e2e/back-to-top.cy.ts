describe('Back to top', () => {
  it('show a back to top button when scrolling', async () => {
    cy.visit('/');
    cy.findByRole('link', { name: /Retour en haut de page/i }).should(
      'not.be.visible'
    );

    // See @components/templates/layout/layout.tsx for scroll position.
    cy.scrollTo(0, 300);
    cy.findByRole('link', { name: /Retour en haut de page/i }).should(
      'be.visible'
    );
  });
});
