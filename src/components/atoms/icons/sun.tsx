import { FC, SVGAttributes } from 'react';
import styles from './sun.module.scss';

export type SunProps = SVGAttributes<SVGElement> & {
  /**
   * The SVG title.
   */
  title?: string;
};

/**
 * Sun component.
 *
 * Render a svg sun icon.
 */
export const Sun: FC<SunProps> = ({ className = '', title, ...props }) => {
  return (
    <svg
      {...props}
      className={`${styles.sun} ${className}`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title !== 'undefined' && <title>{title}</title>}
      <path d="M 69.398043,50.000437 A 19.399259,19.399204 0 0 1 49.998784,69.399641 19.399259,19.399204 0 0 1 30.599525,50.000437 19.399259,19.399204 0 0 1 49.998784,30.601234 19.399259,19.399204 0 0 1 69.398043,50.000437 Z m 27.699233,1.125154 c 2.657696,0.0679 1.156196,12.061455 -1.435545,11.463959 L 80.113224,59.000697 c -2.589801,-0.597494 -1.625657,-8.345536 1.032041,-8.278609 z m -18.06653,37.251321 c 1.644087,2.091234 -9.030355,8.610337 -10.126414,6.188346 L 62.331863,80.024585 c -1.096058,-2.423931 5.197062,-6.285342 6.839209,-4.194107 z M 38.611418,97.594444 C 38.02653,100.18909 26.24148,95.916413 27.436475,93.54001 l 7.168026,-14.256474 c 1.194024,-2.376403 8.102101,0.151313 7.517214,2.744986 z M 6.1661563,71.834242 C 3.7916868,73.028262 -0.25499873,61.16274 2.3386824,60.577853 L 17.905618,57.067567 c 2.593681,-0.584886 4.894434,6.403678 2.518995,7.598668 z M 6.146757,30.055146 c -2.3764094,-1.194991 4.46571,-11.714209 6.479353,-9.97798 l 12.090589,10.414462 c 2.014613,1.736229 -1.937017,7.926514 -4.314396,6.731524 z M 38.56777,4.2639045 C 37.982883,1.6682911 50.480855,0.41801247 50.415868,3.0766733 L 50.020123,19.028638 c -0.06596,2.657691 -7.357169,3.394862 -7.943027,0.800218 z m 40.403808,9.1622435 c 1.635357,-2.098023 10.437771,6.872168 8.339742,8.506552 l -12.58818,9.805327 c -2.099,1.634383 -7.192276,-3.626682 -5.557888,-5.724706 z M 97.096306,50.69105 c 2.657696,-0.06596 1.164926,12.462047 -1.425846,11.863582 L 80.122924,58.96578 c -2.590771,-0.597496 -1.636327,-7.814 1.021371,-7.879957 z" />
    </svg>
  );
};
