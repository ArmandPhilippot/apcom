import { FC } from 'react';
import styles from './feed.module.scss';

export type FeedProps = {
  /**
   * Set additional classnames to the icon.
   */
  className?: string;
};

/**
 * Feed Component
 *
 * Render a feed svg icon.
 */
const Feed: FC<FeedProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.icon} ${className}`}
    >
      <defs>
        <linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg">
          <stop offset="0.0" stopColor="#E3702D" />
          <stop offset="0.1071" stopColor="#EA7D31" />
          <stop offset="0.3503" stopColor="#F69537" />
          <stop offset="0.5" stopColor="#FB9E3A" />
          <stop offset="0.7016" stopColor="#EA7C31" />
          <stop offset="0.8866" stopColor="#DE642B" />
          <stop offset="1.0" stopColor="#D95B29" />
        </linearGradient>
      </defs>
      <rect
        width="256"
        height="256"
        rx="55"
        ry="55"
        x="0"
        y="0"
        fill="#CC5D15"
      />
      <rect
        width="246"
        height="246"
        rx="50"
        ry="50"
        x="5"
        y="5"
        fill="#F49C52"
      />
      <rect
        width="236"
        height="236"
        rx="47"
        ry="47"
        x="10"
        y="10"
        fill="url(#RSSg)"
      />
      <circle cx="68" cy="189" r="24" fill="#FFF" />
      <path
        d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z"
        fill="#FFF"
      />
      <path
        d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z"
        fill="#FFF"
      />
    </svg>
  );
};

export default Feed;
