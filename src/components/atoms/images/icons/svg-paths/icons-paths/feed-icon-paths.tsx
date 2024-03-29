/* eslint-disable react/jsx-no-literals */
import type { FC } from 'react';

/**
 * FeedIconPaths
 *
 * Render the svg paths to make a feed icon.
 */
export const FeedIconPaths: FC = () => (
  <>
    <defs>
      <linearGradient
        x1="30.059999"
        y1="30.059999"
        x2="225.94"
        y2="225.94"
        id="RSSg"
      >
        <stop offset="0.0" stopColor="#E3702D" />
        <stop offset="0.1071" stopColor="#EA7D31" />
        <stop offset="0.3503" stopColor="#F69537" />
        <stop offset="0.5" stopColor="#FB9E3A" />
        <stop offset="0.7016" stopColor="#EA7C31" />
        <stop offset="0.8866" stopColor="#DE642B" />
        <stop offset="1.0" stopColor="#D95B29" />
      </linearGradient>
    </defs>
    <path
      d="m 21.484375,0 h 57.03125 C 90.41797,0 100,9.582031 100,21.484375 v 57.03125 C 100,90.41797 90.41797,100 78.515625,100 H 21.484375 C 9.582031,100 0,90.41797 0,78.515625 V 21.484375 C 0,9.582031 9.582031,0 21.484375,0 Z"
      fill="#cc5d15"
      strokeWidth={0.390625}
    />
    <path
      d="m 21.484375,1.953125 h 57.03125 c 10.82031,0 19.53125,8.710938 19.53125,19.53125 v 57.03125 c 0,10.82031 -8.71094,19.53125 -19.53125,19.53125 h -57.03125 c -10.820312,0 -19.53125,-8.71094 -19.53125,-19.53125 v -57.03125 c 0,-10.820312 8.710938,-19.53125 19.53125,-19.53125 z"
      fill="#f49c52"
      strokeWidth={0.390625}
    />
    <path
      d="m 22.265625,3.90625 h 55.46875 c 10.171095,0 18.359375,8.188281 18.359375,18.359375 v 55.46875 c 0,10.171095 -8.18828,18.359375 -18.359375,18.359375 H 22.265625 C 12.094531,96.09375 3.90625,87.90547 3.90625,77.734375 v -55.46875 c 0,-10.171094 8.188281,-18.359375 18.359375,-18.359375 z"
      fill="url(#RSSg)"
      strokeWidth={0.390625}
    />
    <path
      d="m 35.9375,73.828125 a 9.375,9.375 0 0 1 -9.375,9.375 9.375,9.375 0 0 1 -9.375,-9.375 9.375,9.375 0 0 1 9.375,-9.375 9.375,9.375 0 0 1 9.375,9.375 z"
      fill="#ffffff"
      strokeWidth={0.390625}
    />
    <path
      d="M 62.5,83.203125 H 49.21875 A 32.03125,32.03125 0 0 0 17.1875,51.171875 V 37.890625 A 45.3125,45.3125 0 0 1 62.5,83.203125 Z"
      fill="#ffffff"
      strokeWidth={0.390625}
    />
    <path
      d="M 71.875,83.203125 A 54.6875,54.6875 0 0 0 17.1875,28.515625 V 14.84375 a 68.359375,68.359375 0 0 1 68.359375,68.359375 z"
      fill="#ffffff"
      strokeWidth={0.390625}
    />
  </>
);
