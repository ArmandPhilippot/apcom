import dynamic from 'next/dynamic';
import type { ComponentType, FC } from 'react';
import type { ArrowOrientation, ArrowProps } from './icons-paths';

const ArrowIconPaths: ComponentType<ArrowProps> = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.ArrowIconPaths)
);

const CCBySAIconPaths = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.CCBySAIconPaths)
);

const CareerIconPaths = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.CareerIconPaths)
);

const CogIconPaths = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.CogIconPaths)
);

const ComputerIconPaths = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.ComputerIconPaths)
);

const CrossIconPaths = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.CrossIconPaths)
);

const EnvelopIconPaths = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.EnvelopIconPaths)
);

const FeedIconPaths = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.FeedIconPaths)
);

const HelpIconPaths = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.HelpIconPaths)
);

const HomeIconPaths = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.HomeIconPaths)
);

const MagnifyingGlassIconPaths = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.MagnifyingGlassIconPaths)
);

const MoonIconPaths = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.MoonIconPaths)
);

const PostsStackIconPaths = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.PostsStackIconPaths)
);

const SunIconPaths = dynamic(async () =>
  import('./icons-paths').then((mod) => mod.SunIconPaths)
);

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
  | 'help'
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
    case 'help':
      return <HelpIconPaths />;
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
