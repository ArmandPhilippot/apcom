describe('Back to top', () => {
  it('show a back to top button when scrolling', () => {
    cy.visit('/');
    cy.get('body').should('not.contain', /Retour en haut de page/i);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    cy.scrollTo(0, 400); // Scroll breakpoint is 300
    cy.findByRole('link', { name: /Retour en haut de page/i }).should(
      'be.visible'
    );
  });
});
