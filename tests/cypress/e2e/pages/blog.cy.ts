import { CONFIG } from '../../../../src/utils/config';
import { ROUTES } from '../../../../src/utils/constants';

type ArticlesGroup = {
  first: string;
  total: string;
};

describe('Blog Page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.BLOG);
  });

  it('successfully loads', () => {
    cy.findByRole('heading', { level: 1 }).should('exist');
  });

  it('contains a breadcrumbs', () => {
    cy.findByRole('navigation', { name: 'Fil d’Ariane' }).should('exist');
  });

  it('loads the correct number of pages', () => {
    cy.findByText(
      /(?<first>\d+) articles chargés sur un total de (?<total>\d+)/i
    )
      .then(($div) => {
        const firstLastNumbers = /(?<first>\d+).*[\D](?<total>\d+)/;
        const result = RegExp(firstLastNumbers).exec($div.text());

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(result).to.not.be.null;

        const { first, total } = result
          ? (result.groups as ArticlesGroup)
          : { first: '0', total: '0' };
        const totalArticles = parseInt(total, 10);

        expect(parseInt(first, 10)).to.be.within(1, CONFIG.postsPerPage);
        expect(totalArticles).to.be.at.least(1);

        const totalPages = Math.ceil(totalArticles / CONFIG.postsPerPage);
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

  it('contains a thematics list widget and a topics list widget', () => {
    cy.findByRole('heading', { level: 2, name: 'Thématiques' }).should('exist');
    cy.findByRole('heading', { level: 2, name: 'Sujets' }).should('exist');
  });
});
