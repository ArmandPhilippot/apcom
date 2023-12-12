export const GITHUB_API = 'https://api.github.com/graphql';

export const PERSONAL_LINKS = {
  GITHUB: 'https://github.com/ArmandPhilippot',
  GITLAB: 'https://gitlab.com/ArmandPhilippot',
  LINKEDIN: 'https://www.linkedin.com/in/armandphilippot',
} as const;

/**
 * App routes.
 *
 * All static routes should be configured here to avoid 404 if a route changes.
 */
export const ROUTES = {
  ARTICLE: '/article',
  BLOG: '/blog',
  CONTACT: '/contact',
  CV: '/cv',
  HOME: '/',
  LEGAL_NOTICE: '/mentions-legales',
  NOT_FOUND: '/404',
  PROJECTS: '/projets',
  RSS: '/feed',
  SEARCH: '/recherche',
  THEMATICS: '/thematique',
  TOPICS: '/sujet',
} as const;

export const PAGINATED_ROUTE_PREFIX = '/page';

// cSpell:ignore legales thematique developpement

export const STORAGE_KEY = {
  ACKEE: 'ackee-tracking',
  MOTION: 'reduced-motion',
  PRISM: 'prismjs-color-scheme',
  THEME: 'theme',
} as const;

export const PRISM_THEME_ATTRIBUTE = 'data-prismjs-color-scheme-current';

export const VALID_THEMES = ['dark', 'light', 'system'] as const;
