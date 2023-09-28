import type { SVGAttributes } from 'react';
import { HamburgerIcon, type HamburgerIconProps } from './hamburger-icon';
import styles from './icon.module.scss';
import {
  PlusMinusIcon,
  type PlusMinusIconProps,
  type PlusMinusIconShape,
} from './plus-minus-icon';
import { type SVGIconShape, SVGPaths, type SVGPathsProps } from './svg-paths';

export type IconShape = SVGIconShape | PlusMinusIconShape | 'hamburger';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type SVGIconProps = Omit<
  SVGAttributes<SVGElement>,
  'children' | 'viewBox' | 'xmlns'
> & {
  /**
   * Describe the icon.
   */
  description?: string;
  /**
   * Define an accessible title for the icon.
   */
  heading?: string;
};

type IconBaseProps<T extends IconShape> = T extends 'hamburger'
  ? HamburgerIconProps
  : T extends 'minus' | 'plus'
  ? PlusMinusIconProps
  : SVGIconProps;

type AdditionalProps<T extends IconShape> = Pick<
  SVGPathsProps,
  'orientation'
> & {
  /**
   * The icon shape.
   */
  shape: T;
  /**
   * The icon size.
   *
   * @default 'md'
   */
  size?: IconSize;
};

export type IconProps<T extends IconShape> = IconBaseProps<T> &
  Pick<SVGPathsProps, 'orientation'> &
  AdditionalProps<T>;

type BuildClassNameConfig<T extends IconShape> = Pick<
  IconProps<T>,
  'className'
> &
  Pick<AdditionalProps<T>, 'shape' | 'size'>;

const buildClassName = <T extends IconShape>({
  className,
  shape,
  size,
}: BuildClassNameConfig<T>) => {
  const classNames = ['icon', `icon--${shape}`, `icon--${size}`].map(
    (key) => styles[key]
  );

  if (className) classNames.push(className);

  return classNames.join(' ');
};

type ExtractedProps = 'className' | 'orientation' | 'shape' | 'size';

export const Icon = <T extends IconShape>({
  className = '',
  orientation,
  shape,
  size = 'md',
  ...props
}: IconProps<T>) => {
  const iconClass = buildClassName({ className, shape, size });

  if (shape === 'hamburger')
    return (
      <HamburgerIcon
        // Without casting Typescript complains because of props generic type
        {...(props as Omit<IconProps<'hamburger'>, ExtractedProps>)}
        className={iconClass}
      />
    );

  if (shape === 'minus' || shape === 'plus')
    return (
      <PlusMinusIcon
        // Without casting Typescript complains because of props generic type
        {...(props as Omit<IconProps<'minus' | 'plus'>, ExtractedProps>)}
        className={iconClass}
        shape={shape}
      />
    );

  const viewBox = shape === 'cc-by-sa' ? '0 0 100 40' : '0 0 100 100';

  // Without casting Typescript complains because of props generic type
  const { heading, description, ...remainingProps } = props as Omit<
    IconProps<SVGIconShape>,
    ExtractedProps
  >;

  return (
    <svg
      {...remainingProps}
      className={iconClass}
      viewBox={viewBox}
      // eslint-disable-next-line react/jsx-no-literals
      xmlns="http://www.w3.org/2000/svg"
    >
      {heading ? <title>{heading}</title> : null}
      {description ? <desc>{description}</desc> : null}
      <SVGPaths orientation={orientation} shape={shape} />
    </svg>
  );
};
