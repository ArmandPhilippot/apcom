/* eslint-disable react/jsx-no-literals */
import type { FC, SVGAttributes } from 'react';
import styles from './logo.module.scss';

export type LogoProps = Omit<SVGAttributes<SVGElement>, 'role'> & {
  /**
   * Define an accessible title for the logo.
   */
  heading?: string;
};

/**
 * Logo component.
 *
 * Render a SVG logo.
 */
export const Logo: FC<LogoProps> = ({ heading, ...props }) => (
  // eslint-disable-next-line jsx-a11y/prefer-tag-over-role -- Valid on SVG
  <svg
    {...props}
    className={styles.wrapper}
    role="img"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {heading ? <title>{heading}</title> : null}
    <path className={styles['bg-left']} d="M 0,0 H 98.828125 L 0,98.828125 Z" />
    <path
      className={styles['bg-right']}
      d="M 100,100 H 1.171875 L 100,1.171875 Z"
    />
    <path
      className={styles['letter-shadow']}
      d="m 12.900213,68.997182 h 11.178336 l 3.022715,-7.81343 h 11.064273 l 3.079748,7.81343 h 11.17834 L 38.336635,32.268355 H 26.987199 Z m 15.626859,-15.512797 4.10633,-10.77911 4.106327,10.77911 z"
    />
    <path
      className={styles.letter}
      d="m 11.634676,67.731645 h 11.178336 l 3.022715,-7.81343 H 36.9 l 3.079748,7.81343 h 11.17834 L 37.071098,31.002818 H 25.721662 Z m 15.626859,-15.512797 4.10633,-10.77911 4.106326,10.77911 z"
    />
    <path
      className={styles['letter-shadow']}
      d="m 56.415889,68.997182 h 10.722078 v -9.866594 h 7.984527 c 8.212658,0 13.459633,-5.589168 13.459633,-13.345568 0,-7.528262 -4.220393,-13.516665 -13.2315,-13.516665 H 56.415889 Z M 67.137967,50.917928 V 40.481014 h 5.817301 c 3.19381,0 4.676652,2.053166 4.676652,5.304006 0,3.022712 -1.65394,5.132908 -4.961815,5.132908 z"
    />
    <path
      className={styles.letter}
      d="M 55.150352,67.731645 H 65.87243 v -9.866594 h 7.984527 c 8.212658,0 13.459633,-5.589168 13.459633,-13.345567 0,-7.528263 -4.220393,-13.516666 -13.2315,-13.516666 H 55.150352 Z M 65.87243,49.652391 V 39.215477 h 5.8173 c 3.193811,0 4.676653,2.053166 4.676653,5.304007 0,3.022711 -1.65394,5.132907 -4.961815,5.132907 z"
    />
  </svg>
);
