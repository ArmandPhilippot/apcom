import { create } from '@storybook/theming';
import { brand, fontFamilies } from './common';

const colors = {
  black: 'hsl(207, 47%, 11%)',
  blue: 'hsl(206, 75%, 31%)',
  blueBright: 'hsl(206, 77%, 36%)',
  grey: 'hsl(206, 15%, 80%)',
  greyBright: 'hsl(206, 20%, 86%)',
  greyDark: 'hsl(206, 30%, 30%)',
  white: 'hsl(206, 15%, 97%)',
  whiteDark: 'hsl(206, 20%, 93%)',
};

export default create({
  base: 'light',
  brandTitle: brand.title,
  colorPrimary: colors.blue,
  colorSecondary: colors.blueBright,
  appBg: colors.white,
  appContentBg: colors.white,
  appBorderColor: colors.grey,
  appBorderRadius: 3,
  fontBase: fontFamilies.primary,
  fontCode: fontFamilies.mono,
  textColor: colors.black,
  textInverseColor: colors.white,
  textMutedColor: colors.greyDark,
  barTextColor: colors.black,
  barSelectedColor: colors.blueBright,
  barBg: colors.whiteDark,
  inputBg: colors.greyBright,
  inputBorder: colors.grey,
  inputTextColor: colors.black,
  inputBorderRadius: 0,
});
