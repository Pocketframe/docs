import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <img src="img/pocketframe.png" alt="Pocketframe" className={styles.heroImage} />
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/docs/intro">
            Get Started
          </Link>
          <Link className="button button--secondary button--lg" to="https://github.com/Pocketframe/pocketframe">
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Pocketframe - The Lightweight PHP Framework"
      description="A fast and modular PHP framework for modern web applications.">
      <HomepageHeader />
      <main>
        <header className={styles.hero}>
          <h1>Welcome to PocketFrame</h1>
          <p>Your modern PHP solution with endless possibilities.</p>
          <button onClick={() => alert('Explore Features!')}>Explore Features</button>
        </header>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
