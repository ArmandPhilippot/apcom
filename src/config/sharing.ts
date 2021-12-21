import { t } from '@lingui/macro';

const sharingMedia = [
  {
    id: 'diaspora',
    name: 'Diaspora',
    parameters: {
      content: '',
      image: '',
      title: 'title',
      url: 'url',
    },
    url: 'https://share.diasporafoundation.org/',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    parameters: {
      content: '',
      image: '',
      title: '',
      url: 'u',
    },
    url: 'https://www.facebook.com/sharer/sharer.php',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    parameters: {
      content: '',
      image: '',
      title: '',
      url: 'url',
    },
    url: 'https://www.linkedin.com/sharing/share-offsite/',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    parameters: {
      content: '',
      image: '',
      title: 'text',
      url: 'url',
    },
    url: 'https://twitter.com/intent/tweet',
  },
  {
    id: 'journal-du-hacker',
    name: 'Journal du Hacker',
    parameters: {
      content: '',
      image: '',
      title: 'title',
      url: 'url',
    },
    url: 'https://www.journalduhacker.net/stories/new',
  },
  {
    id: 'email',
    name: t`Email`,
    parameters: {
      content: 'body',
      image: '',
      title: 'subject',
      url: '',
    },
    url: 'mailto:',
  },
];

export default sharingMedia;
