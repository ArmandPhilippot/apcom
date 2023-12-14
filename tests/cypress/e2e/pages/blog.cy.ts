import { CONFIG } from '../../../../src/utils/config';
import { ROUTES } from '../../../../src/utils/constants';
import { wpPostsFixture } from '../../../fixtures';

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

  it('loads the correct number of posts', () => {
    cy.findByText(
      /(?<first>\d+) articles chargés sur un total de (?<total>\d+)/i
    ).should('exist');
    cy.findAllByRole('link', { name: /En lire plus/ }).should(
      'have.length.at.most',
      CONFIG.postsPerPage
    );

    const loadMorePosts = () => {
      cy.findByRole('button', { name: /Charger plus/ })
        .should((_) => {
          /* do nothing */
        })
        .then(($loadMoreBtn) => {
          if (!$loadMoreBtn.length) {
            cy.log('No more posts');
            return;
          }

          cy.log('Loading more posts');
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          cy.wrap($loadMoreBtn).click().wait(500);
          loadMorePosts();
        });
    };

    loadMorePosts();

    cy.findAllByRole('link', { name: /En lire plus/ }).should(
      'have.length',
      wpPostsFixture.length
    );
  });

  it('contains a thematics list widget and a topics list widget', () => {
    cy.findByRole('heading', { level: 2, name: 'Thématiques' }).should('exist');
    cy.findByRole('heading', { level: 2, name: 'Sujets' }).should('exist');
  });
});
