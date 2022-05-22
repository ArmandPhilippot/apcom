import { create } from '@storybook/theming';
import { brand, fontFamilies } from './common';

const colors = {
  black: 'hsl(208, 25%, 11%)',
  blackBright: 'hsl(208, 21%, 15%)',
  blue: 'hsl(200, 50%, 68%)',
  blueBright: 'hsl(200, 55%, 70%)',
  grey: 'hsl(208, 10%, 70%)',
  greyDark: 'hsl(208, 20%, 25%)',
  greyDarker: 'hsl(208, 18%, 20%)',
  white: 'hsl(208, 25%, 92%)',
  whiteDark: 'hsl(206, 20%, 93%)',
};

export default create({
  base: 'dark',
  brandTitle: brand.title,
  colorPrimary: colors.blue,
  colorSecondary: colors.blueBright,
  appBg: colors.black,
  appContentBg: colors.black,
  appBorderColor: colors.greyDark,
  appBorderRadius: 3,
  fontBase: fontFamilies.primary,
  fontCode: fontFamilies.mono,
  textColor: colors.white,
  textInverseColor: colors.black,
  textMutedColor: colors.grey,
  barTextColor: colors.white,
  barSelectedColor: colors.blueBright,
  barBg: colors.blackBright,
  inputBg: colors.greyDarker,
  inputBorder: colors.greyDark,
  inputTextColor: colors.white,
  inputBorderRadius: 0,
});
