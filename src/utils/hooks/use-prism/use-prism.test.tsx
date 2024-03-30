import { describe, expect, it } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactNode } from 'react';
import { type IntlConfig, IntlProvider } from 'react-intl';
import {
  type PrismLanguage,
  usePrism,
  type PrismAvailablePlugin,
  type PrismAttributes,
  type PrismToolbarAttributes,
} from './use-prism';

type WrapperProps = {
  children: ReactNode;
};

const createWrapper = (
  Wrapper: typeof IntlProvider,
  props: PropsWithChildren<IntlConfig>
) =>
  function CreatedWrapper({ children }: WrapperProps) {
    return <Wrapper {...props}>{children}</Wrapper>;
  };

const toolbarAttributes: PrismToolbarAttributes = {
  'data-prismjs-color-scheme-dark': 'Dark Theme 🌙',
  'data-prismjs-color-scheme-light': 'Light Theme 🌞',
  'data-prismjs-copy': 'Copy',
  'data-prismjs-copy-error': 'Use Ctrl+c to copy',
  'data-prismjs-copy-success': 'Copied!',
};

describe('usePrism', () => {
  it('returns the className and the attributes', () => {
    const { result } = renderHook(() => usePrism({}), {
      wrapper: createWrapper(IntlProvider, { locale: 'en' }),
    });

    expect(result.current.className).toStrictEqual('');
    expect(result.current.attributes).toStrictEqual(toolbarAttributes);
  });

  it('can return a className based on the given language', () => {
    const language: PrismLanguage = 'docker';
    const { result } = renderHook(() => usePrism({ language }), {
      wrapper: createWrapper(IntlProvider, { locale: 'en' }),
    });

    expect(result.current.className).toStrictEqual(`language-${language}`);
  });

  it('can return a className based on the given plugins', () => {
    const pluginWithClass: PrismAvailablePlugin = 'diff-highlight';
    const { result } = renderHook(
      () => usePrism({ plugins: [pluginWithClass] }),
      {
        wrapper: createWrapper(IntlProvider, { locale: 'en' }),
      }
    );

    expect(result.current.className).toMatch(pluginWithClass);
  });

  it('can return a className based on the given language and plugins', () => {
    const language: PrismLanguage = 'javascript';
    const pluginWithClass: PrismAvailablePlugin = 'diff-highlight';
    const { result } = renderHook(
      () => usePrism({ language, plugins: [pluginWithClass] }),
      {
        wrapper: createWrapper(IntlProvider, { locale: 'en' }),
      }
    );

    expect(result.current.className).toMatch(`language-diff-${language}`);
    expect(result.current.className).toMatch(pluginWithClass);
  });

  it('can return the default attributes with the given owns', () => {
    const attributes: Partial<PrismAttributes> = {
      'data-filter-output': '(out)',
    };
    const { result } = renderHook(() => usePrism({ attributes }), {
      wrapper: createWrapper(IntlProvider, { locale: 'en' }),
    });

    expect(result.current.attributes).toStrictEqual({
      ...toolbarAttributes,
      ...attributes,
    });
  });
});
