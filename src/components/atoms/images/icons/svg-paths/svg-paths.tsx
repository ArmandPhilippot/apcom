import type { FC } from 'react';
import {
  ArrowIconPaths,
  type ArrowOrientation,
  CCBySAIconPaths,
  CareerIconPaths,
  CogIconPaths,
  ComputerIconPaths,
  EnvelopIconPaths,
  FeedIconPaths,
  HomeIconPaths,
  MagnifyingGlassIconPaths,
  MoonIconPaths,
  PostsStackIconPaths,
  SunIconPaths,
  CrossIconPaths,
} from './icons-paths';

export type SVGIconOrientation = ArrowOrientation;

export type SVGIconShape =
  | 'arrow'
  | 'career'
  | 'cc-by-sa'
  | 'cog'
  | 'computer'
  | 'cross'
  | 'envelop'
  | 'feed'
  | 'home'
  | 'magnifying-glass'
  | 'moon'
  | 'posts-stack'
  | 'sun';

export type SVGPathsProps = {
  /**
   * The icon orientation. Only used with arrow icon.
   *
   * @default 'right'
   */
  orientation?: SVGIconOrientation;
  /**
   * The icon shape.
   */
  shape: SVGIconShape;
};

export const SVGPaths: FC<SVGPathsProps> = ({
  orientation = 'right',
  shape,
}) => {
  switch (shape) {
    case 'arrow':
      return <ArrowIconPaths orientation={orientation} />;
    case 'career':
      return <CareerIconPaths />;
    case 'cc-by-sa':
      return <CCBySAIconPaths />;
    case 'cog':
      return <CogIconPaths />;
    case 'computer':
      return <ComputerIconPaths />;
    case 'cross':
      return <CrossIconPaths />;
    case 'envelop':
      return <EnvelopIconPaths />;
    case 'feed':
      return <FeedIconPaths />;
    case 'home':
      return <HomeIconPaths />;
    case 'magnifying-glass':
      return <MagnifyingGlassIconPaths />;
    case 'moon':
      return <MoonIconPaths />;
    case 'posts-stack':
      return <PostsStackIconPaths />;
    case 'sun':
    default:
      return <SunIconPaths />;
  }
};
