import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Pocketframe Documentation',
      collapsed: false,
      items: [
        'intro',
        'getting-started',
        'configuration',
        'core-concepts',
        'service-container',
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
        'cli',
        'helper-functions',
        'contributing'
      ],
    },
  ],
};

export default sidebars;
