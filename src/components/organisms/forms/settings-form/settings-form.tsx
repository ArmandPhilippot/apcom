import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { Form, type FormProps } from '../../../atoms';
import { AckeeToggle } from './ackee-toggle';
import { MotionToggle } from './motion-toggle';
import { PrismThemeToggle } from './prism-theme-toggle';
import styles from './settings-form.module.scss';
import { ThemeToggle } from './theme-toggle';

export type SettingsFormProps = Omit<FormProps, 'children'>;

const SettingsFormWithRef: ForwardRefRenderFunction<
  HTMLFormElement,
  SettingsFormProps
> = ({ className = '', ...props }, ref) => {
  const formClass = `${styles.form} ${className}`;

  return (
    <Form {...props} className={formClass} ref={ref}>
      <ThemeToggle className={styles.item} />
      <PrismThemeToggle className={styles.item} />
      <MotionToggle className={styles.item} />
      <AckeeToggle
        className={styles.item}
        // eslint-disable-next-line react/jsx-no-literals
        direction="upwards"
      />
    </Form>
  );
};

export const SettingsForm = forwardRef(SettingsFormWithRef);
