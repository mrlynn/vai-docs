import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './RobotMomentCallout.module.css';

type RobotPose = 'wave' | 'thinking' | 'success';
type RobotMomentVariant = 'default' | 'wide';

type RobotMomentCalloutProps = {
  pose: RobotPose;
  eyebrow: string;
  title: string;
  children: ReactNode;
  ctaLabel?: string;
  ctaTo?: string;
  variant?: RobotMomentVariant;
};

const ROBOT_ASSETS: Record<RobotPose, {src: string; alt: string}> = {
  wave: {
    src: '/img/robot/robot-wave.svg',
    alt: 'vai pixel robot waving',
  },
  thinking: {
    src: '/img/robot/robot-thinking.svg',
    alt: 'vai pixel robot thinking',
  },
  success: {
    src: '/img/robot/robot-success.svg',
    alt: 'vai pixel robot celebrating success',
  },
};

export default function RobotMomentCallout({
  pose,
  eyebrow,
  title,
  children,
  ctaLabel,
  ctaTo,
  variant = 'default',
}: RobotMomentCalloutProps): React.JSX.Element {
  const asset = ROBOT_ASSETS[pose];

  return (
    <div className={clsx(styles.callout, variant === 'wide' && styles.wide)}>
      <div className={styles.imageWrap}>
        <img src={asset.src} alt={asset.alt} className={styles.image} />
      </div>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.body}>{children}</div>
        {ctaLabel && ctaTo ? (
          <Link to={ctaTo} className={styles.cta}>
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
