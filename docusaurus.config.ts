import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'vai docs',
  tagline: 'The fastest path from documents to semantic search',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://vai-docs.vercel.app',
  baseUrl: '/',

  organizationName: 'mrlynn',
  projectName: 'vai-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: false,
        docsRouteBasePath: '/docs',
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        explicitSearchResultPath: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/mrlynn/vai-docs/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/mrlynn/vai-docs/tree/main/',
          blogTitle: 'vai Release Notes',
          blogDescription: 'Release notes and announcements for voyageai-cli',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    metadata: [
      {name: 'keywords', content: 'voyage ai, embeddings, vector search, mongodb, atlas, rag, cli, semantic search, reranking'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'v1_25',
      content: 'vai v1.27.0 is here with agentic workflows, chat, and MCP server. <a href="/blog/workflows-launch">Read the release notes</a>.',
      backgroundColor: '#00D4AA',
      textColor: '#001E2B',
      isCloseable: true,
    },
    navbar: {
      title: 'vai',
      logo: {
        alt: 'vai logo',
        src: 'img/vai-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/commands/overview',
          label: 'Commands',
          position: 'left',
        },
        {
          to: '/docs/guides/five-minute-rag',
          label: 'Guides',
          position: 'left',
        },
        {
          to: '/docs/api-reference/environment-variables',
          label: 'API',
          position: 'left',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/mrlynn/voyageai-cli',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/voyageai-cli',
          label: 'npm',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started/installation'},
            {label: 'Command Reference', to: '/docs/commands/overview'},
            {label: 'Guides', to: '/docs/guides/five-minute-rag'},
            {label: 'API Reference', to: '/docs/api-reference/environment-variables'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub', href: 'https://github.com/mrlynn/voyageai-cli'},
            {label: 'Issues', href: 'https://github.com/mrlynn/voyageai-cli/issues'},
            {label: 'npm', href: 'https://www.npmjs.com/package/voyageai-cli'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'Voyage AI Docs', href: 'https://www.mongodb.com/docs/voyageai/'},
            {label: 'MongoDB Atlas', href: 'https://www.mongodb.com/atlas'},
            {label: 'vai Playground', href: 'https://vai.mlynn.org'},
            {label: 'Blog', to: '/blog'},
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} Michael Lynn. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'python'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
