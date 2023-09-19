import { settings } from '../../../../src/utils/config';

describe('Blog Page', () => {
  beforeEach(() => {
    cy.visit('/blog');
  });

  it('loads the correct number of pages', () => {
    cy.findByText(/(\d+) articles chargés sur un total de (\d+)/i)
      .then(($div) => {
        type ArticlesGroup = {
          first: string;
          total: string;
        };

        const firstLastNumbers = /(?<first>\d+).*[\D](?<total>\d+)/;
        const result = $div.text().match(firstLastNumbers);
        expect(result).to.not.be.null;

        const { first, total } = result!.groups as ArticlesGroup;
        const firstArticles = parseInt(first, 10);
        const totalArticles = parseInt(total, 10);
        expect(firstArticles).to.be.within(1, settings.postsPerPage);
        expect(totalArticles).to.be.at.least(1);

        const totalPages = Math.ceil(totalArticles / settings.postsPerPage);
        const remainingPages = totalPages - 1;
        return Array.from({ length: remainingPages }, (_, i) => i + 1);
      })
      .then((remainingPages) => {
        if (remainingPages.length >= 1) {
          cy.wrap(remainingPages).each(() => {
            cy.findByRole('button', {
              name: /Charger plus d’articles/i,
            }).click();
          });
        }

        cy.findByRole('button', { name: /Charger plus d’articles/i }).should(
          'not.exist'
        );
      });
  });
});
