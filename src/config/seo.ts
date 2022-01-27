import { t } from '@lingui/macro';
import { config } from './website';

export const seo = {
  homepage: {
    title: t`${config.name} | Front-end developer: WordPress/React`,
    description: t`${config.name} is a front-end developer located in France. He codes and he writes mostly about web development and open-source.`,
  },
  blog: {
    title: t`Blog: development, open source - ${config.name}`,
    description: t`Discover ${config.name}'s writings. He talks about web development, Linux and open source mostly.`,
  },
  cv: {
    title: t`CV Front-end developer - ${config.name}`,
    description: t`Discover the curriculum of ${config.name}, front-end developer located in France: skills, experiences and training.`,
  },
  contact: {
    title: t`Contact form - ${config.name}`,
    description: t`Contact ${config.name} through its website. All you need to do it's to fill the contact form.`,
  },
  legalNotice: {
    title: t`Legal notice - ${config.name}`,
    description: t`Discover the legal notice of ${config.name}'s website.`,
  },
  error404: {
    title: t`Error 404: Page not found - ${config.name}`,
    description: '',
  },
  projects: {
    title: t`Projects: open-source makings - ${config.name}`,
    description: t`Discover ${config.name} projects. Mostly related to web development and open source.`,
  },
};
