import { t } from '@lingui/macro';
import { NavItem } from '@ts/types/nav';

export const mainNav: NavItem[] = [
  { id: 'home', name: t`Home`, slug: '/' },
  { id: 'blog', name: t`Blog`, slug: '/blog' },
  { id: 'cv', name: t`Resume`, slug: '/cv' },
  { id: 'contact', name: t`Contact`, slug: '/contact' },
];

export const footerNav: NavItem[] = [
  { id: 'legal-notice', name: t`Legal notice`, slug: '/mentions-legales' },
];
