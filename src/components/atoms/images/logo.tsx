import { VFC } from 'react';
import styles from './logo.module.scss';

type LogoProps = {
  /**
   * SVG Image title.
   */
  title?: string;
};

/**
 * Logo component.
 *
 * Render a SVG logo.
 */
const Logo: VFC<LogoProps> = ({ title }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.wrapper}
    >
      {title && <title>{title}</title>}
      <path className={styles['bg-left']} d="M 0,0 H 506 L 0,506 Z" />
      <path className={styles['bg-right']} d="M 512,512 H 6 L 512,6 Z" />
      <path
        className={styles['letter-shadow']}
        d="m 66.049088,353.26557 h 57.233082 l 15.4763,-40.00476 h 56.64908 l 15.76831,40.00476 h 57.2331 L 196.28357,165.21398 h -58.10911 z m 80.009522,-79.42552 21.02441,-55.18904 21.02439,55.18904 z"
      />
      <path
        className={styles['letter']}
        d="m 59.569539,346.78602 h 57.233081 l 15.4763,-40.00476 H 188.928 l 15.76831,40.00476 h 57.2331 L 189.80402,158.73443 h -58.10911 z m 80.009521,-79.42552 21.02441,-55.18904 21.02439,55.18904 z"
      />
      <path
        className={styles['letter-shadow']}
        d="m 288.84935,353.26557 h 54.89704 v -50.51696 h 40.88078 c 42.04881,0 68.91332,-28.61654 68.91332,-68.32931 0,-38.5447 -21.60841,-69.20532 -67.74528,-69.20532 h -96.94586 z m 54.89704,-92.56578 v -53.437 h 29.78458 c 16.35231,0 23.94446,10.51221 23.94446,27.15651 0,15.47629 -8.46817,26.28049 -25.40449,26.28049 z"
      />
      <path
        className={styles['letter']}
        d="m 282.3698,346.78602 h 54.89704 v -50.51696 h 40.88078 c 42.04881,0 68.91332,-28.61654 68.91332,-68.3293 0,-38.54471 -21.60841,-69.20533 -67.74528,-69.20533 H 282.3698 Z m 54.89704,-92.56578 v -53.437 h 29.78458 c 16.35231,0 23.94446,10.51221 23.94446,27.15652 0,15.47628 -8.46817,26.28048 -25.40449,26.28048 z"
      />
    </svg>
  );
};

export default Logo;
