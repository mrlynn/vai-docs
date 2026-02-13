import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quickstart',
        'getting-started/configuration',
        'getting-started/project-config',
        'getting-started/shell-completions',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core-concepts/embeddings',
        'core-concepts/vector-search',
        'core-concepts/rag',
        'core-concepts/reranking',
        'core-concepts/two-stage-retrieval',
        'core-concepts/cosine-similarity',
        'core-concepts/shared-embedding-space',
        'core-concepts/mixture-of-experts',
        'core-concepts/quantization',
        'core-concepts/input-types',
        {
          type: 'category',
          label: 'Multimodal',
          items: [
            'core-concepts/multimodal/multimodal-embeddings',
            'core-concepts/multimodal/cross-modal-search',
            'core-concepts/multimodal/modality-gap',
            'core-concepts/multimodal/multimodal-rag',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Command Reference',
      link: {type: 'doc', id: 'commands/overview'},
      items: [
        {
          type: 'category',
          label: 'Project Setup',
          items: [
            'commands/project-setup/init',
            'commands/project-setup/generate',
            'commands/project-setup/scaffold',
          ],
        },
        {
          type: 'category',
          label: 'RAG Pipeline',
          items: [
            'commands/rag-pipeline/pipeline',
            'commands/rag-pipeline/query',
            'commands/rag-pipeline/chunk',
            'commands/rag-pipeline/estimate',
          ],
        },
        {
          type: 'category',
          label: 'Embeddings',
          items: [
            'commands/embeddings/embed',
            'commands/embeddings/rerank',
            'commands/embeddings/similarity',
          ],
        },
        {
          type: 'category',
          label: 'Data Management',
          items: [
            'commands/data-management/store',
            'commands/data-management/ingest',
            'commands/data-management/search',
            'commands/data-management/index-cmd',
            'commands/data-management/purge',
            'commands/data-management/refresh',
          ],
        },
        {
          type: 'category',
          label: 'Evaluation',
          items: [
            'commands/evaluation/eval',
            'commands/evaluation/eval-compare',
            'commands/evaluation/benchmark',
          ],
        },
        {
          type: 'category',
          label: 'MCP Server',
          items: [
            'commands/mcp/mcp',
            'commands/mcp/mcp-install',
            'commands/mcp/mcp-uninstall',
            'commands/mcp/mcp-status',
          ],
        },
        {
          type: 'category',
          label: 'Tools & Learning',
          items: [
            'commands/tools-and-learning/models',
            'commands/tools-and-learning/explain',
            'commands/tools-and-learning/config',
            'commands/tools-and-learning/ping',
            'commands/tools-and-learning/playground',
            'commands/tools-and-learning/completions',
            'commands/tools-and-learning/demo',
            'commands/tools-and-learning/about',
          ],
        },
        {
          type: 'category',
          label: 'Advanced',
          items: [
            'commands/advanced/chat',
            'commands/advanced/workflow-run',
            'commands/advanced/workflow-validate',
            'commands/advanced/workflow-list',
            'commands/advanced/workflow-init',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/five-minute-rag',
        {
          type: 'category',
          label: 'Chat',
          items: [
            'guides/chat/overview',
            'guides/chat/setup',
            'guides/chat/providers',
            'guides/chat/agent-mode',
          ],
        },
        {
          type: 'category',
          label: 'Workflows',
          items: [
            'guides/workflows/overview',
            'guides/workflows/schema-reference',
            'guides/workflows/writing-workflows',
            'guides/workflows/built-in-templates',
            'guides/workflows/template-expressions',
          ],
        },
        {
          type: 'category',
          label: 'MCP Server',
          items: [
            'guides/mcp-server/overview',
            'guides/mcp-server/automatic-setup',
            'guides/mcp-server/manual-configuration',
            'guides/mcp-server/transport-modes',
            'guides/mcp-server/authentication',
            'guides/mcp-server/testing',
          ],
        },
        {
          type: 'category',
          label: 'Code Generation',
          items: [
            'guides/code-generation/generate-snippets',
            'guides/code-generation/scaffold-projects',
          ],
        },
        {
          type: 'category',
          label: 'Benchmarking',
          items: [
            'guides/benchmarking/overview',
            'guides/benchmarking/embed-benchmark',
            'guides/benchmarking/asymmetric-benchmark',
            'guides/benchmarking/quantization-benchmark',
            'guides/benchmarking/cost-benchmark',
          ],
        },
        {
          type: 'category',
          label: 'Evaluation',
          items: [
            'guides/evaluation/overview',
            'guides/evaluation/test-sets',
            'guides/evaluation/comparing-configs',
          ],
        },
        {
          type: 'category',
          label: 'Data Lifecycle',
          items: [
            'guides/data-lifecycle/purge-stale',
            'guides/data-lifecycle/refresh-embeddings',
          ],
        },
        'guides/desktop-app',
        'guides/web-playground',
      ],
    },
    {
      type: 'category',
      label: 'Models',
      items: [
        'models/overview',
        'models/voyage-4-family',
        'models/domain-specific',
        'models/competitive-landscape',
        'models/choosing-a-model',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api-reference/environment-variables',
        'api-reference/mcp-tools',
        'api-reference/mcp-tool-parameters',
        'api-reference/vai-json-schema',
        'api-reference/workflow-schema',
      ],
    },
    {
      type: 'category',
      label: 'Use Cases',
      items: [
        'use-cases/developer-docs',
        'use-cases/healthcare',
        'use-cases/legal',
        'use-cases/finance',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/common-errors',
        'troubleshooting/mcp-troubleshooting',
        'troubleshooting/connectivity',
        'troubleshooting/faq',
      ],
    },
  ],
};

export default sidebars;
