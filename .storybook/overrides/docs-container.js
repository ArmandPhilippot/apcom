import { DocsContainer as BaseContainer } from '@storybook/addon-docs/blocks';
import { useDarkMode } from 'storybook-dark-mode';
import dark from '../themes/dark';
import light from '../themes/light';

/**
 * Custom Docs Container to support dark theme.
 *
 * @see https://github.com/hipstersmoothie/storybook-dark-mode/issues/127#issuecomment-1070524402
 */
export const DocsContainer = ({ children, context }) => {
  const isDark = useDarkMode();

  return (
    <BaseContainer
      context={{
        ...context,
        storyById: (id) => {
          const storyContext = context.storyById(id);
          return {
            ...storyContext,
            parameters: {
              ...storyContext?.parameters,
              docs: {
                ...storyContext?.parameters?.docs,
                theme: isDark ? dark : light,
              },
            },
          };
        },
      }}
    >
      {children}
    </BaseContainer>
  );
};
