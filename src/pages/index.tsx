import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HeroSection() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className="container">
        <img
          src="/img/V.png"
          alt="vai"
          className={styles.heroLogo}
        />
        <h1 className={styles.heroTitle}>
          <span className="hero-gradient-text">vai</span>
        </h1>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.installCommand}>
          <code>npm install -g voyageai-cli</code>
        </div>
        <div className={styles.heroButtons}>
          <Link
            className={clsx('button', styles.heroPrimary)}
            to="/docs/">
            Get Started
          </Link>
          <Link
            className={clsx('button', styles.heroSecondary)}
            to="/docs/guides/five-minute-rag">
            5-Minute RAG Pipeline
          </Link>
          <Link
            className={clsx('button', styles.heroSecondary)}
            href="https://github.com/mrlynn/voyageai-cli">
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    title: 'CLI: 33 Commands',
    description:
      'Embed, search, rerank, ingest, evaluate, benchmark, and more. One tool for the entire RAG pipeline, from chunking documents to querying with reranking.',
    link: '/docs/commands/overview',
  },
  {
    title: 'MCP Server: 11 Tools',
    description:
      'Drop vai into Claude Desktop, Cursor, or any MCP-compatible editor. Your AI assistant gets semantic search, embeddings, reranking, and cost estimation.',
    link: '/docs/guides/mcp-server/overview',
  },
  {
    title: 'Agentic Workflows',
    description:
      'Define multi-step RAG pipelines as portable JSON files. Search multiple collections, merge results, filter by relevance, and summarize with LLMs.',
    link: '/docs/guides/workflows/overview',
  },
];

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featureGrid}>
          {features.map((feature, idx) => (
            <Link key={idx} to={feature.link} className={styles.featureCardLink}>
              <div className="feature-card">
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TerminalSection() {
  return (
    <section className={styles.terminalSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>From zero to semantic search in 5 minutes</h2>
        <div className={styles.terminalWrapper}>
          <div className="terminal-block">
            <div><span className="prompt">$ </span>vai init</div>
            <div className="output">Created .vai.json with defaults</div>
            <br />
            <div><span className="prompt">$ </span>vai pipeline ./docs --query "how does auth work?"</div>
            <div className="output">Chunking 12 files... 47 chunks</div>
            <div className="output">Embedding with voyage-3-large... done [1.2s]</div>
            <div className="output">Storing in MongoDB Atlas... 47 documents</div>
            <div className="output">Searching... 10 candidates</div>
            <div className="output">Reranking with rerank-2.5... done [0.3s]</div>
            <br />
            <div className="output">Top results:</div>
            <div className="output">  [1] docs/auth/overview.md (0.97)</div>
            <div className="output">  [2] docs/auth/jwt-tokens.md (0.94)</div>
            <div className="output">  [3] docs/api/middleware.md (0.89)</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  return (
    <section className={styles.capabilities}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Everything you need for RAG</h2>
        <div className={styles.capabilityGrid}>
          <div className={styles.capabilityItem}>
            <h4>Voyage AI Embeddings</h4>
            <p>State-of-the-art embedding models including voyage-3-large, domain-specific models for code, finance, law, and multilingual content.</p>
          </div>
          <div className={styles.capabilityItem}>
            <h4>MongoDB Atlas Vector Search</h4>
            <p>Store embeddings and run vector searches directly against your Atlas cluster. Automatic index management included.</p>
          </div>
          <div className={styles.capabilityItem}>
            <h4>Two-Stage Retrieval</h4>
            <p>Combine fast vector search with Voyage AI reranking for dramatically better result quality.</p>
          </div>
          <div className={styles.capabilityItem}>
            <h4>Chat with Your Docs</h4>
            <p>RAG-powered chat using Anthropic, OpenAI, or local Ollama models. Conversation history and agent mode included.</p>
          </div>
          <div className={styles.capabilityItem}>
            <h4>Evaluation and Benchmarks</h4>
            <p>Test retrieval quality with custom test sets, compare configurations, and benchmark embedding performance.</p>
          </div>
          <div className={styles.capabilityItem}>
            <h4>30 Educational Topics</h4>
            <p>Built-in explanations of embeddings, vector search, RAG, MoE architecture, quantization, and more.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DisclaimerSection() {
  return (
    <section className={styles.disclaimer}>
      <div className="container">
        <p className={styles.disclaimerText}>
          vai is a community project by{' '}
          <a href="https://github.com/mrlynn">Michael Lynn</a>. It is not an
          official MongoDB or Voyage AI product. Use of Voyage AI APIs and
          MongoDB Atlas requires accounts with those services.
        </p>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HeroSection />
      <main>
        <FeaturesSection />
        <TerminalSection />
        <CapabilitiesSection />
        <DisclaimerSection />
      </main>
    </Layout>
  );
}
