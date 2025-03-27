import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  // icon: React.ComponentType<React.ComponentProps<'svg'>>;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Blazing Fast',
    icon: '⚡',
    description: <>Pocketframe is optimized for speed, ensuring rapid execution and minimal resource consumption.</>,
  },
  {
    title: 'MVC Architecture',
    icon: '🎭',
    description: <>Built with a robust Model-View-Controller pattern, ensuring a clear separation of concerns for scalable and maintainable development.</>,
  },
  {
    title: 'PHP & Beyond',
    icon: '🚀',
    description: <>Seamless integration with modern PHP features while maintaining a simple and clean API.</>,
  },
  {
    title: 'Scalable Architecture',
    icon: '📈',
    description: <>Designed to scale for projects of any size, ensuring stability under heavy loads.</>,
  },
  {
    title: 'Robust Security',
    icon: '🔒',
    description: <>Built with best-in-class security practices, protecting your data every step of the way.</>,
  },
  {
    title: 'Powerful ORM',
    icon: '🗄️',
    description: <>A robust and intuitive ORM that simplifies database interactions and optimizes performance.</>,
  }
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCard)}>
      <div className="text--center">
        <span className={styles.featureIcon}>{icon}</span>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
