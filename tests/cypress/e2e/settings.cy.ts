describe('Settings', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open and close a settings menu by clicking on a button', () => {
    // findByLabelText does not return the input but the label...
    cy.findByLabelText(/Ouvrir les réglages/i)
      .prev()
      .should('not.be.checked');
    cy.findByLabelText(/Ouvrir les réglages/i).click();
    cy.findByLabelText(/Ouvrir les réglages/i)
      .prev()
      .should('be.checked');
    cy.findByLabelText(/Ouvrir les réglages/i).click();
    cy.findByLabelText(/Ouvrir les réglages/i)
      .prev()
      .should('not.be.checked');
  });

  it('should open and close a tooltip by clicking on a button', () => {
    cy.findByLabelText(/Ouvrir les réglages/i).click();
    cy.findByText(/Ackee/).should('not.be.visible');
    cy.findByRole('button', { name: /Aide/i }).click();
    cy.findByText(/Ackee/).should('be.visible');
    cy.findByRole('button', { name: /Aide/i }).click();
    cy.findByText(/Ackee/).should('not.be.visible');
  });

  it('should change the current theme', () => {
    cy.findByLabelText(/Ouvrir les réglages/i).click();
    cy.findByRole('document')
      .parent()
      .then(($html) => {
        const initialTheme = $html.attr('data-theme');

        if (initialTheme === 'light') {
          cy.findByRole('radiogroup', { name: /Thème/i })
            .findByRole('radio', { name: /Thème clair/i })
            .should('be.checked');
          cy.findByRole('radiogroup', { name: /Thème/i })
            .findByRole('radio', { name: /Thème sombre/i })
            .should('not.be.checked')
            .check({ force: true }) // because of label
            .should('be.checked');
          cy.findByRole('radiogroup', { name: /Thème/i })
            .findByRole('radio', { name: /Thème clair/i })
            .should('not.be.checked');
          cy.findByRole('document')
            .parent()
            .should('have.attr', 'data-theme', 'dark')
            .then(() => {
              expect(localStorage.getItem('theme')).to.eq('"dark"');
            });
        } else {
          cy.findByRole('radiogroup', { name: /Thème/i })
            .findByRole('radio', { name: /Thème sombre/i })
            .should('be.checked');
          cy.findByRole('radiogroup', { name: /Thème/i })
            .findByRole('radio', { name: /Thème clair/i })
            .should('not.be.checked')
            .check({ force: true }) // because of label
            .should('be.checked');
          cy.findByRole('radiogroup', { name: /Thème/i })
            .findByRole('radio', { name: /Thème sombre/i })
            .should('not.be.checked');
          cy.findByRole('document')
            .parent()
            .should('have.attr', 'data-theme', 'light')
            .then(() => {
              expect(localStorage.getItem('theme')).to.eq('light');
            });
        }
      });
  });

  it('should change the Prism theme', () => {
    cy.findByLabelText(/Ouvrir les réglages/i).click();
    // We assume that the default theme is light theme.
    cy.findByRole('radiogroup', { name: /Blocs de code/i })
      .findByRole('radio', { name: /Thème sombre/i })
      .check({ force: true }) // because of label
      .should('be.checked')
      .then(() => {
        expect(localStorage.getItem('prismjs-color-scheme')).to.eq('"dark"');
      });
    cy.findByRole('radiogroup', { name: /Blocs de code/i })
      .findByRole('radio', { name: /Thème clair/i })
      .check({ force: true }) // because of label
      .should('be.checked')
      .then(() => {
        expect(localStorage.getItem('prismjs-color-scheme')).to.eq('"light"');
      });
  });

  it('should change the motion setting', () => {
    cy.findByLabelText(/Ouvrir les réglages/i).click();
    cy.findByRole('document')
      .parent()
      .then(($html) => {
        const initialValue = $html.attr('data-reduced-motion');

        if (initialValue === 'false') {
          cy.findByRole('radiogroup', { name: /Animations/i })
            .findByRole('radio', { name: /Marche/i })
            .should('be.checked');
          cy.findByRole('radiogroup', { name: /Animations/i })
            .findByRole('radio', { name: /Arrêt/i })
            .should('not.be.checked')
            .check({ force: true }) // because of label
            .should('be.checked');
          cy.findByRole('radiogroup', { name: /Animations/i })
            .findByRole('radio', { name: /Marche/i })
            .should('not.be.checked');
          cy.findByRole('document')
            .parent()
            .should('have.attr', 'data-reduced-motion', 'true')
            .then(() => {
              expect(localStorage.getItem('reduced-motion')).to.eq('true');
            });
        } else {
          cy.findByRole('radiogroup', { name: /Animations/i })
            .findByRole('radio', { name: /Arrêt/i })
            .should('be.checked');
          cy.findByRole('radiogroup', { name: /Animations/i })
            .findByRole('radio', { name: /Marche/i })
            .should('not.be.checked')
            .check({ force: true }) // because of label
            .should('be.checked');
          cy.findByRole('radiogroup', { name: /Animations/i })
            .findByRole('radio', { name: /Arrêt/i })
            .should('not.be.checked');
          cy.findByRole('document')
            .parent()
            .should('have.attr', 'data-reduced-motion', 'true')
            .then(() => {
              expect(localStorage.getItem('reduced-motion')).to.eq('true');
            });
        }
      });
  });

  it('should change the Ackee setting', () => {
    cy.findByLabelText(/Ouvrir les réglages/i)
      .click()
      .then(() => {
        const storedValue = localStorage.getItem('ackee-tracking');
        const parsedStoredValue = storedValue ? JSON.parse(storedValue) : '';

        if (parsedStoredValue === 'full') {
          cy.findByRole('radio', { name: /Complet/i }).should('be.checked');
          cy.findByRole('radio', { name: /Partiel/i })
            .should('not.be.checked')
            .check({ force: true }) // because of label
            .should('be.checked');
          cy.findByRole('radio', { name: /Complet/i })
            .should('not.be.checked')
            .then(() => {
              const newStoredValue = localStorage.getItem('ackee-tracking');
              const parsedNewStoredValue = newStoredValue
                ? JSON.parse(newStoredValue)
                : '';
              expect(parsedNewStoredValue).to.eq('partial');
            });
        } else {
          cy.findByRole('radio', { name: /Partiel/i }).should('be.checked');
          cy.findByRole('radio', { name: /Complet/i })
            .should('not.be.checked')
            .check({ force: true }) // because of label
            .should('be.checked');
          cy.findByRole('radio', { name: /Partiel/i })
            .should('not.be.checked')
            .then(() => {
              const newStoredValue = localStorage.getItem('ackee-tracking');
              const parsedNewStoredValue = newStoredValue
                ? JSON.parse(newStoredValue)
                : '';
              expect(parsedNewStoredValue).to.eq('full');
            });
        }
      });
  });
});
