import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/intro',
        'getting-started/getting-started',
        'getting-started/configuration',
      ],
    },
     {
      type: 'category',
      label: 'The Core',
      collapsed: true,
      items: [
        'core/core-concepts',
        'core/bootstrapping',
      ],
    },
    {
      type: 'category',
      label: 'Essential Concepts',
      collapsed: true,
      items: [
        'essentials/routing',
        'essentials/middleware',
        'essentials/controllers',
        'essentials/csrf-protection',
        'essentials/requests',
        'essentials/responses',
        'essentials/database',
        'essentials/error-handling',
        'essentials/logging',
        'essentials/views',
        'essentials/validation',
      ],
    },
    {
      type: 'category',
      label: 'Getting Deeper',
      collapsed: true,
      items: [
        'getting-deeper/session',
        'getting-deeper/cache',
        'getting-deeper/file-storage',
        'getting-deeper/pocket-cli',
        'getting-deeper/helper-functions',
      ],
    },
    {
      type: 'doc',
      id: 'pocketviews/pocketview-templates',
      label: 'PockettView Templates',
    },
    {
      type: 'category',
      label: 'PocketORM',
      collapsed: true,
      items: [
        'pocketORM/getting-started',
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Testing',
    //   collapsed: true,
    //   items: [
    //     'getting-started',
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Extending Pocketframe',
    //   collapsed: true,
    //   items: [
    //     'getting-started',
    //   ],
    // },
  ],
};

export default sidebars;
