import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Pocketframe Docs',
      collapsed: false,
      items: [
        'intro',
        'getting-started',
        'configuration',
        'core-concepts',
        'routing',
        'middleware',
        'controllers',
        'csrf-protection',
        'requests',
        'responses',
        'database',
        'error-handling',
        'logging',
        'views',
        'pocket-views-templating',
        'session',
        'validation',
        'console',
        'helper-functions',
        'contributing'
      ],
    },
  ],
};

export default sidebars;
